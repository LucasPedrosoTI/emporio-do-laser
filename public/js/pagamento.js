const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
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
    let total = 0;
    let qtdItensCart = 0;

    $.each(data, function (key, value) {
      let totalItem = value.tamanhoProduto.preco * value.qtd;
      qtdItensCart++;

      let bloco = `
                  <div class="bloco">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">${value.produto.nomeProduto} - ${value.qtd}x${formatter.format(value.tamanhoProduto.preco)}</h6>
                            <small class="text-muted">Tamanho: ${value.tamanhoProduto.tamanho}</small>
                            <p>
                              <small class="text-muted">Com logomarca: ${value.comLogomarca ? 'Sim' : 'Não'}</small>
                            </p>
                        </div>
                        <span class="text-muted">${formatter.format(totalItem)}</span>
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
                  <strong>${formatter.format(total)}</strong>
                  <input type="hidden" value=${total} name="subtotal" />
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
