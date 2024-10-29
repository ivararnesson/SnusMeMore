import { useState, useEffect } from 'react';
import "../assets/CSS/master.css";
import { Link } from 'react-router-dom';
import config from '../../config';

function Navbar() {
  const [documentModel, setDocumentModel] = useState("");
  const [dropdownState, setDropdownState] = useState({
    dropdownOne: false,
    dropdownTwo: false,
    dropdownThree: false,
    shoppingCartDropdown: false
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setDropdownState((prevState) => {
      const newState = {
        dropdownOne: false,
        dropdownTwo: false,
        dropdownThree: false,
        shoppingCartDropdown: false,
      };
      newState[dropdownName] = !prevState[dropdownName];
      return newState;
    });
  };

  const handleMouseLeave = (dropdownName) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdownName]: false, // Stäng dropdown när musen lämnar
    }));
  };

  const getDocumentValues = async () => {
    fetch(config.umbracoURL + '/api/content/navbar/')
      .then(respons => respons.json())
      .then(result => {
        setDocumentModel(result);
        console.log(result);
      });
  }

  useEffect(() => {
    getDocumentValues();
  }, []);

  return (
    <nav className="master--nav-container">
      <h1 className="master--nav-title">{documentModel.title}</h1>
      <button className="hamburger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="hamburger-icon">&#9776;</span>
      </button>

      <div className={`master--li-container ${isMenuOpen ? "open" : ""}`}>
        <ul className="master--nav-ul">
          <li className="master--nav-li">
            <a className="master--nav-li-btn" href="/">{documentModel.home}</a>
          </li>

          <li
            className="master--nav-li"
            onClick={() => toggleDropdown('dropdownOne')}
            onMouseLeave={() => handleMouseLeave('dropdownOne')} // Stäng dropdown när musen lämnar
          >
            <a className="master--nav-li-btn">
              {documentModel.optionOne}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </a>
            {dropdownState.dropdownOne && (
              <ul className="dropdown">
                <li><Link to="/snuslist?category=Tobak">Tobakssnus</Link></li>
                <li><Link to="/snuslist?category=VitTobak">Vit Tobakssnus</Link></li>
                <li><Link to="/snuslist?category=Lössnus">Lössnus</Link></li>
              </ul>
            )}
          </li>

          <li
            className="master--nav-li"
            onClick={() => toggleDropdown('dropdownTwo')}
            onMouseLeave={() => handleMouseLeave('dropdownTwo')} // Stäng dropdown när musen lämnar
          >
            <a className="master--nav-li-btn">
              {documentModel.optionTwo}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </a>
            {dropdownState.dropdownTwo && (
              <ul className="dropdown">
                <li><Link to="/snuslist?category=VittSnus">Vitt snus</Link></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>

          <li
            className="master--nav-li"
            onClick={() => toggleDropdown('dropdownThree')}
            onMouseLeave={() => handleMouseLeave('dropdownThree')} // Stäng dropdown när musen lämnar
          >
            <a className="master--nav-li-btn">
              {documentModel.optionThree}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </a>
            {dropdownState.dropdownThree && (
              <ul className="dropdown">
                <li><Link to="/snuslist?category=Nikotinfritt">Nikotinfritt snus</Link></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>

          <li
            className="master--nav-li"
            onClick={() => toggleDropdown('shoppingCartDropdown')}
            onMouseLeave={() => handleMouseLeave('shoppingCartDropdown')} // Stäng dropdown när musen lämnar
          >
            <a className="master--nav-li-btn">
              {documentModel.shoppingCart}
            </a>
            {dropdownState.shoppingCartDropdown && (
              <ul className="dropdown">
                <li><a href="#">Suboption 1</a></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;


