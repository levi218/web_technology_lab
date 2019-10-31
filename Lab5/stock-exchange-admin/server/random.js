module.exports = {
    rnd_unif: function () {
        return Math.random() * 2 - 1
    },
    rnd_norm: function () {
        return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    }
};