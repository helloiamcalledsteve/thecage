/*imports */
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
    const [/*playersPrint*/, setPlayersPrint] = useState(false);
    let playersPre: string[] = [];
    let getData = (evnt: any) =>  { setName(evnt.target.value) };
    let getId = (evnt: any) => { setId(evnt.target.value) };
    let getGameId = (evnt: any) => { setGameID(evnt.target.value) };
    let getGamesAPI:Function = async () => { return await axios.get('http://localhost:3001/getgames');}


    let genToken = async () => {
        const json:string = JSON.stringify({ "name": cookies.get('name'), "query": "game1" });
        const url:string = `http://localhost:3001/gentoken?${json}`
        let res = await axios.get(url);
        console.log(res.data.data);
        return res.data.data;
    }
    const makeGame = async () => {
        const urlForAxiosRes:string = `http://localhost:3001/makeserver?id=${await genToken()}&game=${gameID}`;
        let res = await axios.get(urlForAxiosRes)
        console.log(res.data.port, res.data.gameId)
    }
    const getGames = async () => {
        let res = await getGamesAPI();
        setData(res.data.data.toString());
        console.log(print);
        console.log(res.data.data, res.data.port);
        console.log(id);
    }
    let joinGame = async () => {
        let res = await getGamesAPI();
        let games: String[] = res.data.data;
        let port = res.data.port;
        let localid: string | number | null | undefined | any = id;
        cookies.set('port', port[games.indexOf(localid)]);
        console.log(await genToken());
        try {
            let url = `http://localhost:${port[games.indexOf(localid)]}/?id=${await genToken()}`;
            console.log(await axios.get(url))
        } catch (err) {
            console.error(err);
        }

    }
    let getPlayers = async () => {
        let res = await getGamesAPI();
        let port = res.data.port;
        let localid: string | undefined | null | number = id;
        let portForApi = port[res.data.data.indexOf(localid)];
        try {
            let sendForPlayers = await axios.get(`http://localhost:${portForApi}/getplayers`);
            setPlayers(sendForPlayers.data.toString());
            console.log(res.data.data);
        } catch (e) {
            console.log(e);
        }

        return players;
    }
    let getAllPlayers = async () => {
        let res = await getGamesAPI();
        for (let i: number = 0; i < res.data.port.length; i++) {
            try {
                let sendForPlayers = await axios.get(`http://localhost:${res.data.port[i]}/getplayers`);
                playersPre.push(sendForPlayers.data.toString())
            } catch (err) {
                console.error(err);
            }

        }
        let playerPreSplited:string[] | any = playersPre.toString().split(' ');
        setPlayers(playerPreSplited);
    }
    let leaveGame = async () => {
        let res = await getGamesAPI();
        let localid: any = id;
        let portForApi = res.data.port[res.data.data.indexOf(localid)];
        let token = await genToken();
        try {
            let leaveGameUrl = `http://localhost:${portForApi}/get?id=${token}`;
            console.log(leaveGameUrl);
            console.log(await axios.get(`http://localhost:${portForApi}/get?id=${token}`));
        } catch (err){
            console.error(err);
        }

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