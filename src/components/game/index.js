import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './style.css'

function Game() {
    const { game } = useParams()
    const [description, getDescription] = useState('')
    const [url, getURL] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://vgdb.herokuapp.com/api/' + game)
            const json = await data.json()
            let gameDes = json.description
            let gameUrl = json.imgUrl

            getDescription(gameDes)
            getURL(gameUrl)
        }
        fetchData().catch(console.error)
    })
    return (
        <div className="gamePage">
            <img src={url} alt={game} />
            <h1>
                {game.split('_').join(' ')}
            </h1>
            <div className="gameDescription">
                {description}
            </div>
        </div>
    )
}

export default Game