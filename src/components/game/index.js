import { useParams } from "react-router-dom"
import star from "../../assets/star-svgrepo-com.svg"
import './style.css'

function Game() {
    const { game } = useParams()
    return (
        <div>
            {game.split('_').join(' ')}
            <div className="reviewAvg">
                <img href={star} className='star' />
            </div>
        </div>
    )
}

export default Game