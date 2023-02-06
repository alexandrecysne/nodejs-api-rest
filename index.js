const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "oujfnstxvbnmxgfhrdughfgsytrtyfghgdf";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//middleware auth
function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        //console.log(bearer);
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({ err: "Token inválido!" });
            } else {
                console.log(data);
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                //envia a requisição para rota
                req.suporte = "Cysne";
                next();
            }
        })
    } else {
        res.status(401);
        res.json({ err: "Token inválido!" })
    }
    //console.log(authToken);
}


//simulando um banco de dados
var DB = {
    games: [
        {
            id: 23,
            title: "Fifa 2023",
            year: 2022,
            price: 200
        },
        {
            id: 24,
            title: "Call of duty MW",
            year: 2019,
            price: 100
        },
        {
            id: 25,
            title: "Sea of thieves",
            year: 2018,
            price: 50
        }
    ],
    users: [
        {
            id: 1,
            name: "Alexandre Cysne Esteves",
            email: "alexandre.cysne@gmail.com",
            password: "1234"
        },
        {
            id: 2,
            name: "Ilton Antonio",
            email: "iltonesteves@hotmail.com",
            password: "1234"
        }
    ]
}

//rota endpoint que lista todos os games
//middleware auth
app.get("/games", auth, (req, res) => {
    res.statusCode = 200;
    //res.json({suporte: req.suporte, user: req.loggedUser, games: DB.games});
    res.json(DB.games);
})

//rota lista game por id
app.get("/game/:id", auth,(req, res) => {
    if (isNaN(req.params.id)) {
        //isso não é um numero
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
})

//rota cadastrar game
app.post("/game", auth,(req, res) => {
    var { title, price, year } = req.body;

    DB.games.push({
        id: 10,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

//rota excluir um game
app.delete("/game/:id", auth,(req, res) => {

    if (isNaN(req.params.id)) {
        //isso não é um numero
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
})

//rota editar game por id
app.put("/game/:id", auth,(req, res) => {
    if (isNaN(req.params.id)) {
        //isso não é um numero
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {

            var { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
})

app.post("/auth", (req, res) => {
    var { email, password } = req.body;
    if (email != undefined) {
        var user = DB.users.find(u => u.email == email);
        if (user != undefined) {
            if (user.password == password) {
                //assinando e guardando as informações necessárias no token
                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '8h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha interna" });
                    } else {
                        res.status(200);
                        res.json({ token: token })
                    }
                })
            } else {
                res.status(401);
                res.json({ err: "Credenciais inválidas!" })
            }
        } else {
            res.status(404);
            res.json({ err: "O e-mail enviado não existe na base da dados!" })
        }
    } else {
        res.status(400);
        res.json({ err: "O e-mail enviado é inválido" })
    }
});

app.listen(8080, () => {
    console.log("API REST RODANDO!");
})