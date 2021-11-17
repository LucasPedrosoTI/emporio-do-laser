module.exports = {
  calcularPesoTotal: function (carrinho) {
    return carrinho.reduce((prev, curr) => {
      const pesoAtual = curr.tamanhoProduto.peso * parseInt(curr.qtd);
      return prev + pesoAtual;
    }, 0);
  },

  calcularValorTotal: function (carrinho) {
    return carrinho.reduce((prev, curr) => {
      const valorAtual = curr.tamanhoProduto.preco * parseInt(curr.qtd);
      return prev + valorAtual;
    }, 0);
  },
};
