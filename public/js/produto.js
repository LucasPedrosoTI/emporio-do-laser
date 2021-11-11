const selectTamanhoProduto = document.getElementById('tamanhoProduto');
const inputQuantidade = document.getElementById('quantidade');
const precoProduto = document.getElementById('precoProduto');
const txtEstoque = document.getElementById('txtEstoque');
const estoque = document.getElementById('estoque');

selectTamanhoProduto.addEventListener('change', async function (e) {
  const tamanhoId = e.target.value;

  const response = await fetch(`/produtos/tamanhos/${tamanhoId}`);
  const tamanhoProduto = await response.json();

  inputQuantidade.disabled = false;
  inputQuantidade.max = tamanhoProduto.quantidade;

  precoProduto.innerText = tamanhoProduto.preco;

  !txtEstoque.classList.contains('visible') && txtEstoque.classList.add('visible');
  txtEstoque.classList.contains('invisible') && txtEstoque.classList.remove('invisible');

  estoque.innerText = tamanhoProduto.quantidade;
});
