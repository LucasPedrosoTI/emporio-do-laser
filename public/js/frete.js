let totalComFrete = 0;

$('input[name="tipoEnvioId"]').on('change', calcularFrete());

function calcularFrete() {
  return function (e) {
    e.preventDefault();
    const tipoEnvio = $('input[name="tipoEnvioId"]:checked')[0].value;
    const cep = $('#cep').text();

    $('.bloco-cupom').remove();
    $('.bloco-desconto').remove();
    cupomJaAdd = false;
    totalComFrete = 0;

    if (cep) {
      if (tipoEnvio == 1) {
        ajaxCep(`/enderecos/calcular-frete-correios?sCepDestino=${cep}`);
      } else if (tipoEnvio == 2) {
        ajaxCep(`/enderecos/calcular-frete-clickentregas?cepDestino=${cep}`);
      }
    }
  };
}

function ajaxCep(url) {
  $.ajax({
    method: 'GET',
    url,
    dataType: 'json',
    beforeSend: function () {
      $('#divItens').append(`
          <div class="bloco-frete">
            Calculando frete...
          </div>
          `);
    },
    success: function (data) {
      atualizarComFrete(data);
    },
    error: function (xhr, ex) {
      handleError(xhr, ex);
    },
  });
}

function atualizarComFrete(data) {
  $('.bloco-frete').remove();

  const valorFrete = data.valor;

  const bloco = `
    <div class="bloco-frete">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
              <h6 class="my-0">Frete:</h6>
          </div>

          <span id="valor-frete" class="text-nowrap">${currencyformatter.format(valorFrete)}</span>
      </li>
    </div>              
  `;

  $(bloco).insertBefore($('.bloco_2'));

  totalComFrete = parseFloat(total) + parseFloat(valorFrete);

  $('#total_input').val(totalComFrete);
  $('#total_text').text(currencyformatter.format(totalComFrete));
}

function handleError(xhr, ex) {
  console.log(xhr);
  console.log(ex);
  $('.bloco-frete').remove();
  $('.form-tipo-envio').append(returnErrorAlert('Houve algum erro, tente novamente'));

  if (!$('#btn-retry').length) {
    $('#title-tipo-envio').append(`
    <button class="btn" type="button" id="btn-retry">
      <i class="bi bi-arrow-clockwise"></i>
    </button>
  `);
    $('#btn-retry').on('click', calcularFrete());
  }
}
