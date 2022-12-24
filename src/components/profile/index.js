import { React, useState, useEffect } from "react";
import './style.css';


function Profile({ username, userId }) {
    const [content, setContent] = useState([])
    const [games, setGames] = useState([])
    const [ratings, setRatings] = useState([])
    const [pics, setPics] = useState([])

    useEffect(() => {



        async function fetchingGameName(GameId) {
            console.log('gamename')
            const name = await fetch('http://localhost:3006/api/game-id/' + GameId)
            const data = await name.json()
            console.log(data)

            setGames(games => [...games, data.name])
            setPics(pics => [...pics, data.imgUrl])
        }

        async function fetchingData() {

            const rates = await fetch('http://localhost:3006/api/ratings-for-user', {
                method: "GET",
                headers: {
                    "User": userId
                }
            })
            const data = await rates.json()
            await data.map(async el => {
                console.log(el)
                setContent(content => [...content, el.content])
                console.log(ratings)
                setRatings(ratings => [...ratings, el.ratingNum])
                fetchingGameName(el.GameId)
            })

        }

        fetchingData()

    }, [])

    console.log(games)


    return (
        <div>
            {username}
            <div>reviews:</div>
            {content.map(function (content, index) {
                return (<div className='reviews'>
                    <div>
                        <img src={pics[index]} alt={games[index]} />
                        {games[index]}
                    </div>
                    <div>
                        {content}
                    </div>
                    <div>
                        {ratings[index]}
                    </div>
                </div>)
            })}

        </div>
    )
}

export default Profile