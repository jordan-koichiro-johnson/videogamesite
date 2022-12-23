import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home'
import Game from './components/game'
import Login from './components/login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  return (
    <div className="App">
      <Router basename='/'>

        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:game' element={<Game />} />
          <Route path='/login' element={<Login user={user} setUser={setUser} pass={pass} setPass={setPass} />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
