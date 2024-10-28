import Navbar from "./components/navbar";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./assets/CSS/master.css"
import SnusList from './SnusList'





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SnusList categoryFilter="all" />} />
        <Route path="/lössnus" element={<SnusList categoryFilter="Lössnus" />} />
        <Route path="/tobakssnus" element={<SnusList categoryFilter="Tobak" />} />
        <Route path="/vittsnus" element={<SnusList categoryFilter="VittSnus" />} />
        <Route path="/nikotinfritt" element={<SnusList categoryFilter="Nikotinfritt" />} />
        <Route path="/vittobakssnus" element={<SnusList categoryFilter="VitTobak" />} />
      </Routes>
    </Router>
  )
}

export default App;


