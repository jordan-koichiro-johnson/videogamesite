import { Link, useNavigate } from 'react-router-dom'
import './style.css';

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <Link to='/'>
                <div className="links">Home</div>

            </Link>
        </div>
    );
}

export default Navbar;