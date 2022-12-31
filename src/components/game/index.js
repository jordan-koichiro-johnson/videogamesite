import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './style.css'

function Game({ userId }) {
    const { game } = useParams()
    const [id, getId] = useState('')
    const [name, getName] = useState('')
    const [description, getDescription] = useState('')
    const [url, getURL] = useState('')
    const [avg, getAvg] = useState('')
    const [myRate, setRate] = useState('')
    const [review, setReview] = useState('');
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
            const data = await fetch('https://vgdb.herokuapp.com/api/ratings-for-game/' + id)
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
    function createReview(e) {
        e.preventDefault()

        const data = {
            ratingNum: myRate,
            UserId: userId,
            GameId: id,
            content: review
        }
        fetch('https://vgdb.herokuapp.com/api/createrating', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    }
    function handleChangeRate(e) {
        setRate(e.target.value)
    }
    function handleChangeReview(e) {
        setReview(e.target.value)
    }
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
            <label for="Score">Score:</label>
            <select name="Score" id="Score" onChange={handleChangeRate}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <textarea value={review} onChange={handleChangeReview} />
            <button onClick={createReview}>Review</button>
        </div>
    )
}

export default Game