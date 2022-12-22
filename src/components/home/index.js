import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import './style.css';




function Home() {
    const [games, getGames] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://vgdb.herokuapp.com/api/games')
            const json = await data.json()
            let newarray = json.map(el => el.name)
            console.log(newarray)
            getGames(newarray)
        }
        fetchData().catch(console.error)

    }, [])

    const navigate = useNavigate();

    return (
        <div className="home">

            {games.map(function (game) {
                return <div className="card">
                    <div className="pic">
                        <img src='https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg' alt="placeholder" />
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