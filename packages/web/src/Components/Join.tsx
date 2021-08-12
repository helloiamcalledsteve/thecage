import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie/es6';

const Join = () => {
    const cookies = new Cookies();
    const [name, setName] = useState(null);
    const [print, setPrint] = useState(false);
    const [data, setData] = useState(null);
    const [gameID, setGameID] = useState('game1');
    const [id, setId] = useState(null);
    const [players, setPlayers] = useState([null]);
    const [playersPrint, setPlayersPrint] = useState(false);
    let playersPre: any = [];
    let dataFor;
    function getData(evnt: any) {
        setName(evnt.target.value);
    }
    function getId(evnt: any) {
        setId(evnt.target.value);
    }
    function getGameId(evnt: any) {
        setGameID(evnt.target.value);
    }
    const genToken = async () => {
        let name = cookies.get('name');
        const json = JSON.stringify({ "name": name, "query": "game1" });
        const url = 'http://localhost:3001/gentoken?'
        const urldata = url.concat(json);
        console.log(urldata);
        let res = await axios.get(urldata)
        let token = res.data.data;
        console.log(token);
        return token;
    }
    const makeGame = async () => {
        let a = await genToken();
        let localGameId:string = gameID;
        const url = 'http://localhost:3001/makeserver?id=';
        let urldata = url.concat(a);
        let urldata2 = urldata.concat('&game=')
        let urldata3 = urldata2.concat(localGameId);
        let res = await axios.get(urldata3)
        let port = res.data.port;
        let id = res.data.gameId;
        console.log(port, id)
    }
    const getGames = async () => {
        let res = await axios.get('http://localhost:3001/getgames');
        let games = res.data.data;
        let port = res.data.port;
        let sort1 = res.data.data;
        let sort2 = res.data.port;
        let b = games.toString();
        setData(b);
        console.log(print);
        for (let i: any; i < sort1.length; i++) {
            document.getElementById('a')!.innerHTML = games[i];
        }
 
        console.log(games, port);
        console.log(id);
        return { games, port };
    }
    let joinGame = async () => {
        let res = await axios.get('http://localhost:3001/getgames');
        let games: String[] = res.data.data;
        // let name = cookies.get('name');
        let port = res.data.port;
        let localid: any = id;
        let g = games.indexOf(localid)
        let chosenPort = port[g];
        cookies.set('port', chosenPort);
        // let checkUrl = 'http://localhost:' + chosenPort + '/getplayers';
        // let checkRes = await axios.get(checkUrl);
        // let players = checkRes.data;
        let token = await genToken();
        console.log(token);
        let baseUrl = 'http://localhost:' + chosenPort + '/?id=' + token;
        let join = await axios.get(baseUrl);
        console.log(join)

    }
    let getPlayers = async () => {
        let res = await axios.get('http://localhost:3001/getgames');
        let games: String[] = res.data.data;
        let port = res.data.port;
        let localid: any = id;
        let indexOf = games.indexOf(localid);
        let portForApi = port[indexOf];
        let sendForPlayers = await axios.get(`http://localhost:${portForApi}/getplayers`);
        let data: any = sendForPlayers.data;
        setPlayers(data.toString());
        let players1 = res.data.data;
        console.log(players1);
        return players;
    }
    let getAllPlayers = async () => {
        let res = await axios.get('http://localhost:3001/getgames');
        let port = res.data.port;
        for (let i:number = 0; i < port.length; i++) {
            let sendForPlayers = await axios.get(`http://localhost:${port[i]}/getplayers`);
            let data: any = sendForPlayers.data;
            playersPre.push(data.toString())
        }
        let b = playersPre.toString();
        let g:any = b.split(' ');
        setPlayers(g);
    }
    let leaveGame = async () => {
        let res = await axios.get('http://localhost:3001/getgames');
        let games: String[] = res.data.data;
        let port = res.data.port;
        let localid: any = id;
        let indexOf = games.indexOf(localid);
        let portForApi = port[indexOf];
        let x = await genToken();
        console.log(x);
        let leaveGameUrl = `http://localhost:${portForApi}/get?id=${x}`;
        console.log(leaveGameUrl);
        let leaveGame = await axios.get(`http://localhost:${portForApi}/get?id=${x}`);
        console.log(leaveGame);
    }
    let loadAll = async () => {
        try {
            await getGames();
            await getPlayers();
        } catch (err) {
            console.warn(err);
        }

    }
    return (
        <div>
            {
                print ?
                    <h1>{data}</h1>
                :null
            }
            <input type='text' onChange={getData} />
            <button onClick={() => {
                cookies.set('name', name);
                console.log(cookies.get('name'));
            }} >Print Value</button>
            <button onClick={() => genToken()}>get token</button>
            <br />
            <input type="text" onChange={getGameId}/>
            <button onClick={() => makeGame()}>make game</button>
            <button onClick={() => getGames()}>get games</button>
            <button onClick={() => setPrint(true)}>show games</button>
            <br />
            <input type='text' onChange={getId} />
            <button onClick={() => joinGame()}>join</button>
            <button onClick={() => leaveGame()}>leave</button>
            <button onClick={() => getPlayers() }>get players</button>
            <button onClick={() => getAllPlayers() }>get all players</button>
            <button onClick={() => setPlayersPrint(true)}>show players</button>
            <button onClick={() => loadAll()}>load all</button>
            {
                print ?
                    <h1>{players}</h1>
                :null
            }
        </div>
        
    )
}

export default Join;