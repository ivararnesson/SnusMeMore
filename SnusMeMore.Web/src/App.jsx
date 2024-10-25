import { useState, useEffect } from 'react'
import "./assets/CSS/master.css"
import SnusList from './SnusList'
import config from '../config'


function App() {
  const [documentModel, setDocumentModel] = useState("")

  const getDocumentValues = async () => {
    fetch(config.umbracoURL + '/api/content/navbar/' + config.mainPageID)
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
    <div>
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

      <SnusList />
    </div>
  )
}

export default App
