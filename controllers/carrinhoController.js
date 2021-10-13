const session = require("express-session");
const { post } = require("../routes");

module.exports = {

    listar: (req, res) => {

        if(!req.session.carrinho){
            req.session.carrinho = [

                {id: 1, qtd: 1, nomeProduto: "Aloha", descricao: "Topo bolo Aloha", valorUnit: 5, imagem: "/img/topo1.png"},
                {id: 2, qtd: 1, nomeProduto: "Cakeboard Quadrado", descricao: "Cakeboard em MDF - Quadrado", valorUnit: 10, imagem: "/img/cake2.jpg"},
                {id: 3, qtd: 1, nomeProduto: "Botão", descricao: "Botão em MDF", valorUnit: 3, imagem: "/img/botao1.jpg"}

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
    
    qtd: (req, res) => {

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
                        req.session.carrinho[i].qtd = qtd;

                        res.json(req.session.carrinho);
                    }
                }
            }
        
        } else {
            res.json();
        }
        
    },

}