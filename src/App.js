import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home'
import Game from './components/game'
import Login from './components/login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUserId] = useState(0);
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  useEffect(() => {
    const storeToken = localStorage.getItem("token")

    if (storeToken) {

      console.log(storeToken)
      fetch(`https://vgdb.herokuapp.com/api/getuserfromtoken`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${storeToken}`
        }
      }).then(res => res.json())
        .then(data => {

          if (data) {

            setToken(storeToken)

            setIsLoggedIn(true)
            setUserId(data.user.username)

          } else {
            localStorage.removeItem("token")
          }
        })
    }

  }, [])


  return (
    <div className="App">
      <Router basename='/'>

        <Navbar isLoggedIn={isLoggedIn} username={username} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:game' element={<Game />} />
          <Route path='/login' element={<Login user={user} setUser={setUser} pass={pass} setPass={setPass} token={token} setToken={setToken} userId={username} setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
