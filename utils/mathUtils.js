module.exports = {
    round(num, numDecimais) {
        const casasDecimais = Math.pow(10, numDecimais);

        return Math.round(parseFloat(num) * casasDecimais) / casasDecimais;
    },
};