import Navbar from "./components/navbar";
import { useState, useEffect } from 'react'
import "./assets/CSS/master.css"
import SnusList from './SnusList'



function App() {
  return (
    <div>
      <Navbar />
      <SnusList categoryFilter="Lössnus" />
    </div>
  )
}

export default App;


