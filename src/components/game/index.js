import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './style.css'

function Game() {
    const { game } = useParams()
    const [id, getId] = useState('')
    const [name, getName] = useState('')
    const [description, getDescription] = useState('')
    const [url, getURL] = useState('')
    const [avg, getAvg] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://vgdb.herokuapp.com/api/game-profile/' + game)
            const json = await data.json()
            let gameId = json.id
            let gameName = json.name
            let gameDes = json.description
            let gameUrl = json.imgUrl
            getId(gameId)
            getName(gameName)
            getDescription(gameDes)
            getURL(gameUrl)
            fetchAvg().catch(console.error)
        }
        fetchData().catch(console.error)
        const fetchAvg = async () => {
            const data = await fetch('http://localhost:3006/api/ratings-for-game/' + id)
            const json = await data.json()
            console.log(json)
            let avg = 0
            avg = await json.map(el => {
                return avg + el.ratingNum
            })
            avg = avg / json.length
            getAvg(avg)
        }


    }, [id])
    return (
        <div className="gamePage">
            <img src={url} alt={name} />
            <h1>
                {name}
            </h1>
            <div className="gameDescription">
                {description}
            </div>
            <div>review score:{avg}</div>
        </div>
    )
}

export default Game