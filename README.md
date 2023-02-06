# nodejs-api-rest
Siga os passos abaixo para instalar e configurar um projeto API REST, com biblioteca Axios, Cors, framework back-end express js, body-parser, e autorização com Middleware.
***

## Softwares instalados
1. Nodejs - https://nodejs.org
1. VS Code - https://code.visualstudio.com

## Bibliotecas instaladas
1. nodemon
1. EJS Embedded JavaScript Templating
1. body-parser
1. express-session
1. cors
1. axios
1. JWT

## Instalação do nodejs

* https://nodejs.org
* Site para download do nodejs

> Comando para verificar a versão do nodejs:
```
> node -v
```

## Instalação do editor de código VS Code

* https://code.visualstudio.com
* Site para download do Visual Studio Code

## Iniciando um projeto node

* Crie uma pasta no seu local de preferência
* Acesse essa pasta no seu editor de código de sua preferência
* Digite no terminal, ou Command Prompt
```
npm init
```
* Siga os passos solicitados, informe uma descrição, um author
* Ao concluir será criado o arquivo de configuração **package.json** na pasta do projeto
* Nesse mesmo arquivo de configuração, é configurado o arquivo index.js como main do projeto.
* Nesse arquivo index.js contém as configurações, connection, listen e rotas.
* Caso seja necessário criar um projeto do zero, esse arquivo index.js precisa ser criado manualmente.

## Instalando framework Back-end Express js
* https://expressjs.com/
```
npm install express --save
```
* Após a instalação a mesma poderá ser visualizada no arquivo package.json (dependencies)

## Instalando a biblioteca nodemon globalmente (carregamento automático)

```
npm install nodemon -g
```
* Após a instalação da biblioteca, não será mais necessário parar e iniciar o projeto todas as vezes que os código for alterados ou criados.

* Comando para iniciar o projeto normalmente.
```
node index.js
```

* Comando para iniciar o projeto com nodemon.
```
nodemon index.js
```

## Instalando a biblioteca EJS Embedded JavaScript Templating

```
npm install ejs --save
```
* https://ejs.co/
* Essa biblioteca vai permitir trabalhar com arquivos .ejs / html no node.

## Instalando a biblioteca body-parser

```
npm install body-parser --save
```
* Essa biblioteca vai permitir capturar os dados enviados pelo formulário.


## instalando a biblioteca axios
* https://github.com/axios/axios

Cors
```
npm install cors --save
```

## Autenticação com JWT (JSON Web Tokens)
* https://jwt.io/
```
npm install --save jsonwebtoken
```
