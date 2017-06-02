module.exports = function (res) {
    return function (error) {
        console.log(error);
        res.status(500).send(error);
    };
};