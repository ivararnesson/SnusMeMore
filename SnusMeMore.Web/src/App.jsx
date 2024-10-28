import Navbar from "./components/navbar";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./assets/CSS/master.css"
import SnusList from './SnusList'
import Checkout from "./pages/checkout";
import NotFound from "./pages/notFound";



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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;


