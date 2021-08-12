var cors = require('cors');
import express from 'express';
import jwt_decode from 'jwt-decode';

let startServer = (() => {
    var app = express();
    let port = Math.floor(Math.random() * 5000) + 3500;
    let players: any[] = [];
    // let port = 3002 
    app.get('/', cors(), (req, res) => {
        var query = req.query.id;
        let x = JSON.stringify(query);
        let decodeQuery = jwt_decode(x);
        let firstRecode = JSON.stringify(decodeQuery);
        let lastRecode = JSON.parse(firstRecode);
        console.log(lastRecode)
        players.push(lastRecode.data[0]);
        res.json(players)
  
    })

    app.use('/get', cors(), (req, res) => {
        var query = req.query.id;
        let x = JSON.stringify(query);
        let decodeQuery = jwt_decode(x);
        let firstRecode = JSON.stringify(decodeQuery);
        let lastRecode = JSON.parse(firstRecode)
        players.splice(players.indexOf(lastRecode.data[0]), 1);
        res.json(players);
    })

    app.use('/getplayers', cors(), (_req, res) => {
        res.json(players);
    })

    app.listen(port);
    return port;
})

export default startServer;