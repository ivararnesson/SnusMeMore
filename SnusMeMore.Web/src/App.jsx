import Navbar from "./components/navbar";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./assets/CSS/master.css"
import SearchResults from './components/SearchResults';
import SnusList from './components/SnusList'
import LoginForm from "./components/LoginForm";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SnusList />} />
        <Route path="/snuslist" element={<SnusList />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/tobakssnus" element={<SnusList categoryFilter="Tobak"brandFilter="all" />} />
        <Route path="/vittsnus" element={<SnusList categoryFilter="VittSnus" brandFilter="all" />} />
        <Route path="/nikotinfritt" element={<SnusList categoryFilter="Nikotinfritt" brandFilter="all" />} />
        <Route path="/vittobakssnus" element={<SnusList categoryFilter="VitTobak" brandFilter="all" />} />
        <Route path="/knox" element={<SnusList categoryFilter="all" brandFilter="Knox" />} />
        <Route path="/velo" element={<SnusList categoryFilter="all" brandFilter="Velo" />} />
        <Route path="/lundgrens" element={<SnusList categoryFilter="all" brandFilter="Lundgrens" />} />
        <Route path="/one" element={<SnusList categoryFilter="all" brandFilter="One" />} />
        <Route path="/kaliber" element={<SnusList categoryFilter="all" brandFilter="Kaliber" />} /> */}
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </Router>
  )
}

export default App;


