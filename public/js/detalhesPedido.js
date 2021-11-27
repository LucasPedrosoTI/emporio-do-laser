function detalharPedido(pedidoId) {
  document.getElementById(pedidoId).classList.toggle('showDetalhesPedido');
}

$('#alteraPedidoModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);

  const pedidoId = button.data('id');
  const statusAtual = button.data('statusatual');
  const pedidoStatus = JSON.parse(`[${button.data('pedidostatus')}]`);

  const modal = $(this);
  const form = modal.find('form');

  form.attr('action', '/minha-conta/alterar-status-pedido?_method=PUT');
  modal.find('#statusAtual').text(statusAtual);
  modal.find('#pedidoId').val(pedidoId);
  const selectStatus = modal.find('#selectStatus');

  selectStatus.html('');
  pedidoStatus.forEach(s => {
    selectStatus.append(`<option value="${s.id}">${s.descricao}</option>`);
  });
});

$('#addCodigoRastreio').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);

  const pedidoId = button.data('id');

  const modal = $(this);
  const form = modal.find('form');

  form.attr('action', '/minha-conta/adicionar-codigo-rastreio?_method=PUT');
  modal.find('#pedidoId').val(pedidoId);
});

$('#pageSize').on('change', function (e) {
  const pageSize = e.target.value;
  const limit = `&limit=${pageSize}`
  let {search, pathname} = location

  if (search.includes("limit")) {
    const indexSize = search.indexOf("limit");
    const sizeSubstr = search.slice(indexSize - 1);
    search = search.replace(sizeSubstr, "");
  }

    search = search.includes("?") ? search + limit : "?" + limit;

  window.open(`${pathname}${search}`, "_self");
})