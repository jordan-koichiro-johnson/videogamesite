import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import './style.css';




function Home() {
    const [games, getGames] = useState([])
    const [urls, getURLs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://vgdb.herokuapp.com/api/games')
            const json = await data.json()
            let newarray = json.map(el => el.name)
            let urlarray = json.map(el => el.imgUrl)
            console.log(newarray)
            getGames(newarray)
            getURLs(urlarray)
        }
        fetchData().catch(console.error)

    }, [])
    console.log(games)
    const navigate = useNavigate();

    return (
        <div className="home">

            {games.map(function (game, index) {
                return <div className="card">
                    <div className="pic">
                        <img src={urls[index]} alt={game} />
                    </div>
                    <Link to={'/' + game.split(' ').join('_')}>
                        <div className="title">
                            {game}
                        </div>
                    </Link>
                </div>
            })}

        </div>
    );
}

export default Home;