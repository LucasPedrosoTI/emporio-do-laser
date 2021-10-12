const session = require("express-session");
const { post } = require("../routes");

module.exports = {

    listar: (req, res) => {

        req.session.carrinho = [];

        if(req.session.carrinho){
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



    },
    
    qtd: (req, res) => {


        
    },

}