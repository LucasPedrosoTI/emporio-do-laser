$(function () {
    $.ajax({
        method: 'GET',
        url: '/carrinho-listar',
        dataType: 'json',
        beforeSend: function () { $("#formItens").html("Carregando..."); },
        success: function (data) {
            listarItens(data);
        }
    });
});

function listarItens(data) {

    $("#formItens").html("");

    if ($(data).length > 0) {
        let total = 0;

        $.each(data, function (key, value) {
            let totalItem = value.valorUnit * value.qtd;

            let bloco = `
                  <div class="bloco">
                    <li class="list-group-item py-3">
                      <div class="row g3">
                        <div class="col-4 col-md-3 col-lg-2">
                          <a href="#">
                            <img src="${value.imagem}" class="img-thumbnail">
                          </a>          
                        </div>
                        <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                          <h4><b><a href="#" class="text-decoration-none text-danger">${value.nomeProduto}</a></b></h4>
                          <h5>
                            <small>${value.descricao}</small>
                          </h5>
                          <br>
                          <b>
                            ${value.qtd} unidade(s)<br>
                            valor:  R$ ${value.valorUnit}<br>
                            Subtotal: R$ ${totalItem}
                          </b>
                        </div>
                        
                      </div>
                    </li>
                  </div>       
              `;

            total += totalItem;

            $("#formItens").append(bloco);
        });

        $("#formItens").append(`
              <div class="bloco_2">
                <li class="list-group-item py-3">
                  <div class="text-end">
                    <h4 class="text-dark mb-3"><b>Total: ${total}</b></h4>
                    <a href="/carrinho" class="btn btn-outline-success btn-lg">Voltar ao Carrinho</a>
                    <a href="#" class="btn btn-danger btn-lg">Continuar</a>
                  </div>
                </li>
              </div>
          `);
    } else {
        $("#formItens").html(`
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