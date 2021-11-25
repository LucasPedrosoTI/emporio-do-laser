# Empório do Laser

## Manual do Usuário

Para dar início ao nosso sistema e poder testar todas as funções disponíveis, recomendados seguir as instruções a seguir:

1. Rode o comando abaixo para clonar o projeto no diretório desejado:

```
git clone https://github.com/LucasPedrosoTI/emporio-do-laser.git
cd emporio-do-laser
```

2. Abra um terminal na pasta raiz do projeto e execute o comando
   `npm install`

3. Execute o script create-schema.sql no MySQL;

4. Crie um arquivo .env na raiz do projeto com base no modelo .env.example, preencha as informações do banco de dados local.</br>
   A MAILGUN_KEY é a chave da API para envio de e-mails, faça o cadastro no [site](https://www.mailgun.com/) deles para gerar sua chave. </br>
   É necessário também gerar um token no site do [ClickEntregas](https://borzodelivery.com/br) para cálculo do frete.

5. Para criar as tabelas do banco de dados, execute as migrations do Sequelize com o comando:
   `npm run dbm`
6. Para ter registros inicias no banco de dados, execute as seeds com o comando `npm run dbsa`
7. Para iniciar o projeto, execute o comando `npm start`, em seguida acesse pelo navegador o endereço http://localhost:3000 para ter acesso as páginas do sistema;
8. Para testes é possível utilizar os usuários criados nas seeds ou simplesmente cadastrar novas contas.
<p> 
<details>
<summary>Administrador</summary>
<br>
E-mail: admin@mail.com<br>
Senha: 123456
</details>
</p>

<p>
<details>
<summary>Usuário Pessoa Física</summary>
<br>
E-mail: user@mail.com <br>
Senha: 123456 
</details>
</p>

<p>
<details>
<summary>Usuário Pessoa Jurídica</summary>
<br>
E-mail: pj@mail.com <br>
Senha: 123456 
</details> 
</p>
