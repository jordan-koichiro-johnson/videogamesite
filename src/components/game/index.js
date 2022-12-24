import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './style.css'

function Game() {
    const { game } = useParams()
    const [name, getName] = useState('')
    const [description, getDescription] = useState('')
    const [url, getURL] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://vgdb.herokuapp.com/api/game-profile/' + game)
            const json = await data.json()
            let gameName = json.name
            let gameDes = json.description
            let gameUrl = json.imgUrl
            getName(gameName)
            getDescription(gameDes)
            getURL(gameUrl)
        }
        fetchData().catch(console.error)
    })
    return (
        <div className="gamePage">
            <img src={url} alt={name} />
            <h1>
                {name}
            </h1>
            <div className="gameDescription">
                {description}
            </div>
        </div>
    )
}

export default Game