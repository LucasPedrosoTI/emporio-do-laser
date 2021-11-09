const { Endereco } = require('../database/models');

module.exports = {

    listar: (req, res) => {

        if(!req.session.carrinho){
            req.session.carrinho = [

                {id: 1, qtd: 1, nomeProduto: "Aloha", descricao: "Topo bolo Aloha", preco: 5, imagem: "/img/topo1.png"},
                {id: 2, qtd: 1, nomeProduto: "Cakeboard Quadrado", descricao: "Cakeboard em MDF - Quadrado", preco: 10, imagem: "/img/cake2.jpg"},
                {id: 3, qtd: 1, nomeProduto: "Botão", descricao: "Botão em MDF", preco: 3, imagem: "/img/botao1.jpg"}

            ]
        }

        if(req.session.carrinho){
            res.json(req.session.carrinho);
        } else {
            res.json();
        }

    },

    excluir: (req, res) => {

        let sessao = req.session.carrinho;
        for(let i = 0; i < sessao.length; i++) {
            if(sessao[i].id == req.body.id){
                req.session.carrinho.splice(i, 1);
                res.json(req.session.carrinho);
            }
        }

    },
    
    alterarQtd: (req, res) => {

        if (req.session.carrinho) {
            if (req.body.id
            && !isNaN(req.body.id)
            && req.body.qtd
            && !isNaN(req.body.qtd)
            && req.body.qtd > 0) {
                
                let id = req.body.id;
                let qtd = req.body.qtd;
                let sessao = req.session.carrinho;

                for(let i = 0; i < sessao.length; i++) {
                    if(sessao[i].id == req.body.id){
                        req.session.carrinho[i].qtd = parseInt(qtd);

                        res.json(req.session.carrinho);
                    }
                }
            }
        
        } else {
            res.json();
        }
        
    },

    pagamento: (req, res) => {

        let clienteId = req.session.usuario.Cliente.id;
        Endereco.findAll({ where: { clienteId } }).then(function (enderecos) {
            res.render('pagamento', { title: 'Empório do Laser - Pagamento', enderecos: enderecos });
        });
        
    },


    // METODO EM TESTE: Falta adaptar
    addAoCarrinho: async (req, res) => {
        let id = parseInt(req.body.id);
        let produtoId = parseInt(req.body.produtoId);
        let qtd = 1;
        let nomeProduto = req.body.nomeProduto;
        let descricao = req.body.descricao;
        let preco = parseFloat(req.body.preco);
        let imagem = req.body.nomeImagem;
      
        console.log( req.body );
    
        if(!req.session.carrinho){
            req.session.carrinho = []
        }
    
        if(req.session.carrinho){
          let productOnCart = false;
          let sessao = req.session.carrinho;
          for(let i = 0; i < sessao.length; i++) {
            if(sessao[i].id == id){
              req.session.carrinho[i].qtd += 1;
              productOnCart = true;
              res.redirect('/produtos').json(req.session.carrinho);
            }
          }
    
          if(productOnCart == false){
            req.session.carrinho.push({id, qtd, nomeProduto, descricao, preco, imagem});
            res.redirect('/produtos').json(req.sesion.carrinho);
          }
        } 
      },


}