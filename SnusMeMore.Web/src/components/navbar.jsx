import { useState, useEffect, useContext } from 'react';
import "../assets/CSS/master.css";
import { Link } from 'react-router-dom';
import config from '../../config';
import { AuthContext } from "../authContext"

function Navbar() {
  const [documentModel, setDocumentModel] = useState("");
  const [dropdownState, setDropdownState] = useState({
    dropdownOne: false,
    dropdownTwo: false,
    dropdownThree: false,
    shoppingCartDropdown: false
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userName, logout } = useContext(AuthContext)

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
            <button className="master--nav-li-btn">
              {documentModel.optionOne}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </button>
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
            <button className="master--nav-li-btn">
              {documentModel.optionTwo}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </button>
            {dropdownState.dropdownTwo && (
              <ul className="dropdown">
                <li><Link to="/snuslist?category=VitTobak">Vitt snus</Link></li>
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
            <button className="master--nav-li-btn">
              {documentModel.optionThree}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </button>
            {dropdownState.dropdownThree && (
              <ul className="dropdown">
                <li><Link to="/nikotinfritt">Nikotinfritt snus</Link></li>
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
            <button className="master--nav-li-btn">
              {documentModel.shoppingCart}
            </button>
            {dropdownState.shoppingCartDropdown && (
              <ul className="dropdown">
                <li><a href="#">Suboption 1</a></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li>
        </ul>

        {
          isLoggedIn ? (
            <div>
              <p>Inloggad som: {userName}</p>
              <button onClick={logout}>Logga ut</button>
            </div>
          ) : (
            <Link to="/login">Logga in</Link>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar;


