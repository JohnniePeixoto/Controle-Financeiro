var mongoose = require('mongoose');
var model = mongoose.model('usuarios');
var errorFunction = require('../utils/error-function');
var jwt = require('jsonwebtoken')

module.exports = function (app) {
    
    app.post('/api/login', function(req, resp) {
        if ( !req.body.login ){
            resp.status(401).send({
                message: 'Insira um usuário válido'
            });
        } else if ( !req.body.senha ){
            resp.status(401).send({
                message: 'Insira uma senha válida'
            });
        }
        model.findOne({
            login: req.body.login,
            senha: req.body.senha
        }).then(function (usuario) {
            if (!usuario) {
                resp.status(401).send({
                    message: 'Usuário ou senha incorretos'
                });
            } else {
                var token = jwt.sign({ login: usuario.login }, 
                    app.get('secret'), { expiresIn: 60 * 30 } //sessão de 30min
                );
                resp.set('Authorization', token);
                resp.set('userId', usuario._id);
                resp.send({usuario: usuario});
            }
        }, errorFunction(resp));
    });

    app.get('/api/*', function _validateUser(req, resp, next) {
        var token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, app.get('secret'), function (erro, decoded) {
                if (erro) {
                    if ( erro.name === 'TokenExpiredError'){
                        erro = "Token expirou";
                    }
                    return resp.status(401).send(erro);
                } else {
                    req.usuario = decoded;
                    next();
                }
            });
        } else {
            return resp.status(401).send({ erro: 'Usuário não logado' });
        }
    });
    
    app.post('/api/verify', function(req, resp){
        model.findOne({
            login: req.body.login
        }).then(function (usuario) {
            if (!usuario) {
                resp.status(200).send({
                    message: 'Login disponível'
                });
            } else {
                resp.status(302).send({
                    message: 'Login em uso'
                });
            }
        }, errorFunction(resp));
    })
}