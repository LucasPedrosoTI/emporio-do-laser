function returnErrorAlert(message) {
  return `
  <div class="alert alert-danger alert-dismissible fade show mt-4" id="cupom-alert" role="alert">
    <i class="bi bi-x-circle-fill"></i> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
}

$('#btnAplicarCupom').on('click', async function (e) {
  e.preventDefault();

  if (!$('input[name="tipoEnvioId"]:checked')[0]) {
    $('.form-cupom').append(returnErrorAlert('Selecione um tipo de envio antes'));
    return;
  }

  const codigoCupom = $('#codigoCupom').val();

  const response = await fetch(`/cupoms/validar-cupom?codigoCupom=${codigoCupom}&categorias=${Array.from(categorias)}`);
  const cupom = await response.json();

  if (!response.ok) {
    if ($('#cupom-alert').length) return;

    const errorAlert = returnErrorAlert(cupom.error);
    $('.form-cupom').append(errorAlert);
    return;
  }

  const desconto = cupom.ehPorcentagem ? total * cupom.taxaDeDesconto : cupom.taxaDeDesconto;
  const totalComDesconto = totalComFrete > 0 ? totalComFrete - desconto : total - desconto;

  if (cupomJaAdd) {
    $('.bloco-cupom h6').text(`${cupom.codigo} - ${cupom.ehPorcentagem ? percentFormatter.format(cupom.taxaDeDesconto) : currencyformatter.format(cupom.taxaDeDesconto)}`);
    $('.bloco-cupom small').text(cupom.descricao);
    $('#text_desconto').text(currencyformatter.format(totalComDesconto));
    $('#desconto_cupom').text(`- ${currencyformatter.format(desconto)}`);
  } else {
    let bloco = `
    <div class="bloco-cupom">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
              <h6 class="my-0">${cupom.codigo} - ${cupom.ehPorcentagem ? percentFormatter.format(cupom.taxaDeDesconto) : currencyformatter.format(cupom.taxaDeDesconto)}</h6>
              <small class="text-muted">${cupom.descricao}</small>
          </div>

          <span id="desconto_cupom" class="text-danger text-nowrap"> - ${currencyformatter.format(desconto)}</span>
      </li>
    </div>       
          `;

    $(bloco).insertBefore($('.bloco_2'));

    $('#divItens').append(`
              <div class="bloco-desconto">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total com desconto(R$)</span>
                  <strong id="text_desconto">${currencyformatter.format(totalComDesconto)}</strong>
                </li>
              </div>
    `);

    cupomJaAdd = true;
  }

  $('#total_input').val(round(totalComDesconto, 2));
  $('#cupomId').val(cupom.id);
});
