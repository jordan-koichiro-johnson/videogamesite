import { useParams } from "react-router-dom"

function Game() {
    const { game } = useParams()
    return (
        <div>{game.split('_').join(' ')}</div>
    )
}

export default Game