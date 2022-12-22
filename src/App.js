import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home'
import Game from './components/game'


function App() {
  return (
    <div className="App">
      <Router basename='/'>

        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:game' element={<Game />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
