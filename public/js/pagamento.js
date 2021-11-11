let total = 0;
let cupomJaAdd = false;
const categorias = new Set();

const currencyformatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

$(function () {
  $.ajax({
    method: 'GET',
    url: '/carrinho/listar',
    dataType: 'json',
    beforeSend: function () {
      $('#divItens').html('Carregando...');
    },
    success: function (data) {
      listarItens(data);
    },
  });
});

function listarItens(data) {
  $('#divItens').html('');

  if ($(data).length > 0) {
    let qtdItensCart = 0;

    $.each(data, function (key, value) {
      let totalItem = value.tamanhoProduto.preco * value.qtd;
      categorias.add(value.produto.categoriaId);
      qtdItensCart++;

      let bloco = `
                  <div class="bloco">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">${value.produto.nomeProduto} - ${value.qtd}x${currencyformatter.format(value.tamanhoProduto.preco)}</h6>
                            <small class="text-muted">Tamanho: ${value.tamanhoProduto.tamanho}</small>
                            <p>
                              <small class="text-muted">Com logomarca: ${value.comLogomarca ? 'Sim' : 'Não'}</small>
                            </p>
                        </div>
                        <span class="text-muted">${currencyformatter.format(totalItem)}</span>
                        <input name="products" type="hidden" value="${value.produto.nomeProduto}">
                    </li>
                  </div>       
              `;

      total += totalItem;

      $('#divItens').append(bloco);
    });

    $('#divItens').append(`
              <div class="bloco_2">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (R$)</span>
                  <strong id="total_text">${currencyformatter.format(total)}</strong>
                  <input id="total_input" type="hidden" value=${total} name="subtotal" />
                </li>
              </div>
          `);
  } else {
    $('#divItens').html(`
              <div class="bloco_2">
                <li class="list-group-item py-3">
                  <div class="text-center">
                    <h4 class="text-dark mb-3">Sua lista está vazía.</h4>
                    <a href="/" class="btn btn-outline-success btn-lg">Voltar ao Início</a>
                  </div>
                </li>
              </div>
          `);
  }
}

// Validações

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';

  window.addEventListener(
    'load',
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');

      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          'submit',
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    },
    false
  );
})();

const selectEndereco = document.getElementById('selectEndereco');
const destinatario = document.getElementById('destinatario');
const rua = document.getElementById('rua');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cep = document.getElementById('cep');

selectEndereco.addEventListener('change', async function (e) {
  const enderecoId = e.target.value;

  const response = await fetch(`/enderecos/${enderecoId}`);
  const { endereco } = await response.json();

  destinatario.innerText = endereco.destinatario;
  rua.innerText = endereco.rua;
  numero.innerText = endereco.numero;
  complemento.innerText = endereco.complemento;
  bairro.innerText = endereco.bairro;
  cidade.innerText = endereco.cidade;
  estado.innerText = endereco.estado;
  cep.innerText = endereco.cep;
});

$('input[name="tipoPagamentoId"]').on('click change', function (e) {
  const tipoPagamento = $('input[name="tipoPagamentoId"]:checked')[0];

  if (tipoPagamento.value != 1) {
    $('#campos-cartao').html(``);
  } else {
    $('#campos-cartao').html(`
    
      <div class="col-md mb-2">
        <label for="cc-name">Nome Completo</label>
        <input class="form-control" id="cc-name" name="cardName" placeholder="" required="" type="text" />
        <small class="text-muted">Nome completo como impresso no cartão</small>
        <div class="invalid-feedback">Insira o nome completo como impresso no cartão</div>
      </div>

      <div class="col-md mb-2">
        <label for="cc-number">Número</label>
        <input class="form-control" id="cc-number" name="cardNumber" placeholder="" required="" type="text" />
        <div class="invalid-feedback">Insira o Número do cartão</div>
      </div>

      <div class="row">
        <div class="col-md mb-2">
          <label for="cc-expiration">Validade</label>
          <input class="form-control" id="cc-expiration" name="cardDate" placeholder="" required="" type="text" />
          <div class="invalid-feedback">Insira a data de validade do cartão</div>
        </div>
        <div class="col-md mb-2">
          <label for="cc-cvv">CVV</label>
          <input class="form-control" id="cc-cvv" name="cardCvv" placeholder="" required="" type="text" />
          <div class="invalid-feedback">Insira o CVV</div>
        </div>
      </div>
    
    `);
  }
});

$('#btnAplicarCupom').on('click', async function (e) {
  e.preventDefault();

  const codigoCupom = $('#codigoCupom').val();

  const response = await fetch(`/cupoms/validar-cupom?codigoCupom=${codigoCupom}&categorias=${Array.from(categorias)}`);
  const cupom = await response.json();

  console.log(cupom);

  if (!response.ok) {
    if ($('#cupom-alert').length) return;

    const errorAlert = `
      <div class="alert alert-danger alert-dismissible fade show mt-4" id="cupom-alert" role="alert">
        <i class="bi bi-x-circle-fill"></i> ${cupom.error}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    $('.form-cupom').append(errorAlert);
    return;
  }

  const desconto = cupom.ehPorcentagem ? total * cupom.taxaDeDesconto : cupom.taxaDeDesconto;
  const totalComDesconto = parseFloat(total) - desconto;

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
              <div class="bloco-descontoo">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total com desconto(R$)</span>
                  <strong id="text_desconto">${currencyformatter.format(totalComDesconto)}</strong>
                </li>
              </div>
    `);

    cupomJaAdd = true;
  }

  $('#total_input').val(totalComDesconto);
  $('#cupomId').val(cupom.id);
});
