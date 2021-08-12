// hello world express app

var cors = require('cors');
import express from 'express';
var url = require('url');
import genToken from './getToken';
import jwt_decode from 'jwt-decode';
import startServer from './startServer';
var app = express();

let games: any[] = [];
let port: any[] = [];

app.get('/', cors(), (_req, res) => {
    res.redirect('/gentoken')
});

app.use('/gentoken', cors(), async (req, res, next) => {
    var query = url.parse(req.url).query;
    let obj;
    if (query) {
        obj = JSON.parse(decodeURIComponent(query))
        let b = genToken(obj.name, obj.query)
        res.json({data: b})
        return
    }
    var error = new Error('missing query');
    next(error);
})

app.use('/makeserver', cors(), (req, res) => {
    var query = req.query.id;
    var game = req.query.game;
    games.push(game);
    if (game === undefined) {
        res.send('provide game id');
    }
    let idQuery = JSON.stringify(query);
    var decoded = jwt_decode(idQuery);
    let x = JSON.stringify(decoded);
    let b = JSON.parse(x);
    let j = startServer();
    port.push(j);
    res.json({ port: j, gameId: game, data: b.data });
})

app.use('/getgames', cors(), (req, res) => {
    var query = req.query.id;
    let idQuery = JSON.stringify(query);
    if (idQuery === undefined) {
        res.json({ data: games, port: port });
    } else {
        try {
            let a = games.indexOf(idQuery);
            let g = games.indexOf(idQuery);
            res.json({ data: a, port: g });
        } catch (err) {
            res.json({ data: err });
        }
    }
})

app.listen(3001, () => {
    console.log(`Example app listening on port 3001`);
})