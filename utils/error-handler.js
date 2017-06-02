function _erroDuplicidade(res,err) {
    return Error('Não é possivel excluir, este item esta vinculado a outros registros');
}

var ErrorHandler = {
    erroDuplicidade: _erroDuplicidade
};

module.exports = ErrorHandler;