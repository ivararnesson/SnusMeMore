import { useState, useEffect } from 'react'
import "./assets/CSS/master.css"



function App() {
  const [documentModel, setDocumentModel] = useState("")

  const getDocumentValues = async () => {
    fetch("https://localhost:44311/api/content/cf233671-9951-42ce-894b-b8a7d8a9aaeb")
    .then(respons => respons.json())
    .then(result => {
      setDocumentModel(result) 
      console.log(result)
    })
  }

  useEffect(() => {
    getDocumentValues()
  },[])

  return (
    <nav className="master--nav-container">
      <h1 className="master--nav-title">{documentModel.title}</h1>
      <div className="master--li-container">
        <ul className="master--nav-ul">
          <li className="master--nav-li">
            <a className="master--nav-li-btn" href="/">{documentModel.home}</a>
          </li>
          <li className="master--nav-li">
            <a className="master--nav-li-btn" href="/">{documentModel.optionOne}</a>
          </li>
          <li className="master--nav-li">
            <a className="master--nav-li-btn" href="/">{documentModel.optionTwo}</a>
          </li>
          <li className="master--nav-li">
            <a className="master--nav-li-btn" href="/">{documentModel.optionThree}</a>
          </li>
        </ul>
        <a className="master--nav-li-btn">{documentModel.shoppingCart}</a>
      </div>
    </nav>
  )
}

export default App
