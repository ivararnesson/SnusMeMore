import { useState, useEffect } from 'react'
import "./assets/CSS/master.css"



function App() {
  const [documentModel, setDocumentModel] = useState("")
  const [showDropdownOne, setShowDropdownOne] = useState(false);
  const [showDropdownTwo, setShowDropdownTwo] = useState(false);
  const [showDropdownThree, setShowDropdownThree] = useState(false);
  const [showShoppingCartDropdown, setShowShoppingCartDropdown] = useState(false);

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
          
          <li className="master--nav-li" onMouseEnter={() => setShowDropdownOne(true)} onMouseLeave={() => setShowDropdownOne(false)}>
            <a className="master--nav-li-btn">{documentModel.optionOne}</a>
            {showDropdownOne && (
              <ul className="dropdown">
                <li><a href="#">Suboption 1</a></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>
          
          <li className="master--nav-li" onMouseEnter={() => setShowDropdownTwo(true)} onMouseLeave={() => setShowDropdownTwo(false)}>
            <a className="master--nav-li-btn">{documentModel.optionTwo}</a>
            {showDropdownTwo && (
              <ul className="dropdown">
                <li><a href="#">Suboption 1</a></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>
          
          <li className="master--nav-li" onMouseEnter={() => setShowDropdownThree(true)} onMouseLeave={() => setShowDropdownThree(false)}>
            <a className="master--nav-li-btn">{documentModel.optionThree}</a>
            {showDropdownThree && (
              <ul className="dropdown">
                <li><a href="#">Suboption 1</a></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>
        </ul>
        
        <a className="master--nav-li-btn" onMouseEnter={() => setShowShoppingCartDropdown(true)} onMouseLeave={() => setShowShoppingCartDropdown(false)}>
          {documentModel.shoppingCart}
        </a>
        {showShoppingCartDropdown && (
          <ul className="dropdown dropdown--cart">
            <li><a href="#">View Cart</a></li>
            <li><a href="#">Checkout</a></li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default App





