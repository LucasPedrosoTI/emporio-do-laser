let totalComFrete = 0;

$('input[name="tipoEnvioId"]').on('change', calcularFrete());

function calcularFrete() {
  return function (e) {
    const tipoEnvio = $('input[name="tipoEnvioId"]:checked')[0].value;

    $('.bloco-cupom').remove();
    $('.bloco-desconto').remove();
    cupomJaAdd = false;
    totalComFrete = 0;

    if (tipoEnvio == 1) {
      const cep = $('#cep').text();

      if (cep) {
        $.ajax({
          method: 'GET',
          url: `/enderecos/calcular-frete-correios?sCepDestino=${cep}`,
          dataType: 'json',
          beforeSend: function () {
            $('#divItens').append(`
          <div class="bloco-frete">
            Calculando frete...
          </div>
          `);
          },
          success: function ([data]) {
            atualizarComFrete(data);
          },
          error: function (xhr, ex) {
            console.log(xhr);
            console.log(ex);
            $('.bloco-frete').remove();
          },
        });
      }
    } else if (tipoEnvio == 2) {
      $('.bloco-frete').remove();
      $('#total_input').val(total);
      $('#total_text').text(currencyformatter.format(total));
    }
  };
}

function atualizarComFrete(data) {
  $('.bloco-frete').remove();

  const valorFrete = data.Valor.replace(',', '.');

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
