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

function deletarItem(id) {
    $.ajax({
        method: 'POST',
        url: '/carrinho-excluir',
        data: { id: id },
        dataType: 'json',
        beforeSend: function () { $("#formItens").html("Carregando..."); },
        success: function (data) {
            listarItens(data);
        }
    });
}

function mudaQuantia(id, qtd) {
    if (qtd > 0) {
        $.ajax({
            method: 'POST',
            url: '/carrinho-qtd',
            data: { id: id, qtd: qtd },
            dataType: 'json',
            beforeSend: function () { $("#formItens").html("Carregando..."); },
            success: function (data) {
                listarItens(data);
            }
        });
    } else {
        deletarItem(id);
    }
}

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
                        </div>
                        <div class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                          <div class="input-group">

                            <input type="number" class="form-control text-center border-dark qtd" value="${value.qtd}" onchange="mudaQuantia(${value.id}, this.value)">

                            <button type="button" class="btn btn-outline-danger border-dark btn-sm" onclick="deletarItem(${value.id})">
                              <i class="bi-trash" style="font-size: 24px; line-height: 24px;"></i>
                            </button>
                          </div>
                          <div class="text-right mt-2">
                            <small class="text-secondary"> Valor: R$ ${value.valorUnit}</small><br>
                            <span class="text-dark">Subtotal: R$ ${totalItem}</span>
                          </div>
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
                    <h4 class="text-dark mb-3"><b>Total: R$ ${total}</b></h4>
                      <a href="/" class="btn btn-outline-success btn-lg">Continuar Comprando</a>
                      <a href="/fechar-compra" class="btn btn-danger btn-lg">Fechar Compra</a>
                  </div>
                </li>
              </div>
          `);
    } else {
        $("#formItens").html(`
              <div class="bloco_2">
                <li class="list-group-item py-3">
                  <div class="text-center">
                    <h4 class="text-dark mb-3">Seu carrinho está vazio.</h4>
                    <a href="/" class="btn btn-outline-success btn-lg">Continuar Comprando</a>
                  </div>
                </li>
              </div>
          `);
    }

}
