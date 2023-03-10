import { Link, useNavigate } from 'react-router-dom'
import { React, useState, useEffect } from "react";
import './style.css';

function Navbar({ isLoggedIn, username }) {
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    let inputHandler = (e) => {
        let value = e.target.value.toLowerCase().split(' ').join('_')
        setSearch('/' + value)
    }


    return (
        <div className="navbar">
            <Link to='/'>
                <div className="links">Home</div>

            </Link>
            <div>

                <label for='search'>search:</label>
                <input onChange={inputHandler} type="search" placeholder="Search.." />
                <Link to={search}>


                    <button>submit</button>
                </Link>
            </div>
            <div>

                {isLoggedIn ? (
                    <Link to='/profile'>

                        <div>{username}</div>
                    </Link>
                ) : (
                    <Link to='/login'>

                        <div>guest</div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;