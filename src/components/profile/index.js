import { React, useState, useEffect } from "react";
import './style.css';


function Profile({ username, userId }) {

    const [game, setGame] = useState([])
    useEffect(() => {

        console.log("useEffect")
        setGame([])

        async function fetchingGameName(GameId) {
            console.log("gamename")

            const name = await fetch('https://vgdb.herokuapp.com/api/game-id/' + GameId)
            const data = await name.json()

            return data

        }

        async function fetchingData() {
            console.log('fetchrates')
            const rates = await fetch('https://vgdb.herokuapp.com/api/ratings-for-user', {
                method: "GET",
                headers: {
                    "User": userId
                }
            })

            const data = await rates.json()

            await data.map(async el => {


                const gameDate = await fetchingGameName(el.GameId)
                const gameObj = {
                    content: el.content,
                    rating: el.ratingNum,
                    name: gameDate.name,
                    url: gameDate.imgUrl
                }
                setGame(game => [...game, gameObj])
            })

        }

        fetchingData()

    }, [])




    return (
        <div>
            {username}
            <div>reviews:</div>
            {game.map(function (el, index) {
                return (<div className='reviews'>
                    <div>
                        <img src={el.url} alt={el.name} />
                        {el.name}
                    </div>
                    <div>
                        {el.content}
                    </div>
                    <div>
                        {el.rating}
                    </div>
                </div>)
            })}

        </div>
    )
}

export default Profile