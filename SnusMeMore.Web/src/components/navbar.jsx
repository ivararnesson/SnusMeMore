import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import  icon  from "../assets/images/18icons.png";
import config from '../../config';
import { AuthContext } from "../AuthContext"
import "../assets/CSS/navbar.css";
import SearchComponent from "./SearchComponent";
import ShoppingCart from './ShoppingCart';

function Navbar() {
  const [documentModel, setDocumentModel] = useState("");
  const [dropdownState, setDropdownState] = useState({
    dropdownOne: false,
    dropdownTwo: false,
    dropdownThree: false,
    shoppingCartDropdown: false
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userName, logout, purchaseEvent } = useContext(AuthContext)

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
      [dropdownName]: false,
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
      <h1 className="master--nav-title">
        <div>
        <Link to="/">{documentModel.title}</Link>
        </div>
        </h1>
      <img src={icon} alt="over 18 icon" className='master--nav-over18' />
      <button 
      className="hamburger-menu-btn" 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Öppna meny"
      >
        <span className="hamburger-icon">&#9776;</span>
      </button>

      <div className={`master--li-container ${isMenuOpen ? "open" : ""}`}>
        <ul className="master--nav-ul">
          <li className="master--nav-li">
            <Link className="master--nav-li-btn" to="/">{documentModel.home}</Link>
          </li>

          <li
            className={`master--nav-li ${dropdownState.dropdownOne ? 'show-dropdown' : ''}`}
            onClick={() => toggleDropdown('dropdownOne')}
            onMouseLeave={() => handleMouseLeave('dropdownOne')} // Stäng dropdown när musen lämnar
          >
            <button 
            className="master--nav-li-btn"
            aria-expanded={dropdownState.dropdownOne ? 'true' : 'false'}
            aria-controls="dropdownOneMenu"
            >
              {documentModel.optionOne}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </button>
            {dropdownState.dropdownOne && (
              <ul id="dropdownOneMenu" className="dropdown" aria-label="Alternativ för snus">
                <li><Link to="/snuslist?category=Tobak">Portionssnus</Link></li>
                <li><Link to="/snuslist?category=VitTobak">Vit Portion</Link></li>
                <li><Link to="/snuslist?category=Lössnus">Lössnus</Link></li>
                <li><Link to="/snuslist?category=VittSnus">Vitt snus</Link></li>
                <li><Link to="/snuslist?category=Nikotinfritt">Nikotinfritt snus</Link></li>
              </ul>
            )}
          </li>
          <li
            className="master--nav-li"
            onMouseLeave={() => handleMouseLeave('shoppingCartDropdown')} 
          >
            <button 
              className={`master--nav-li-btn-cart ${purchaseEvent ? 'purchaseEvent' : ''}`}
              onClick={() => toggleDropdown('shoppingCartDropdown')}
              aria-expanded={dropdownState.shoppingCartDropdown ? 'true' : 'false'}
              aria-controls="shoppingCartMenu"
            >
              {documentModel.shoppingCart}
            </button>
            {dropdownState.shoppingCartDropdown && (
              <div id="shoppingCartMenu" className="dropdown" aria-label="Din varukorg">
                <ShoppingCart />
              </div>
            )}
          </li>
        </ul>
        <li className="master--nav-li">
            <SearchComponent />
          </li>

        {isLoggedIn ? (
          <div className='logged-in-div'>
            <p>{userName}</p>
            <button onClick={logout} aria-label="Logga ut">Logga ut</button>
          </div>
        ) : (
          <Link className='login' to="/login" aria-label="Logga in">Logga in</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar;