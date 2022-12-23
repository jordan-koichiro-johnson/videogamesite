import { Link, useNavigate } from 'react-router-dom'
import { React, useState, useEffect } from "react";

function Login({ user, setUser, pass, setPass }) {

    function login(e) {
        e.preventDefault()
        console.log('logging ing')
        return fetch(`http://localhost:3006/api/login`, {
            method: "POST",
            body: JSON.stringify({
                username: user,
                password: pass
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).
            then(data => {
                console.log(data);
                localStorage.setItem("token", data.token)
            })
    }
    return (
        <div className='login'>
            <h1 className="loginTitle"> Login </h1>
            <form className='formLogin'>
                <label>Username</label>
                <input className="nes-input username" name="username" type="text" value={user} onChange={e => setUser(e.target.value)} />
                <label>Password </label>
                <input className="nes-input password" name="password" type="password" value={pass} onChange={e => setPass(e.target.value)} />

                <button onClick={login}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login