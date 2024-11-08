import { useState, useEffect, useContext } from 'react';
import "../assets/CSS/master.css";
import { Link } from 'react-router-dom';
import  icon  from "../assets/images/18icons.png";
import config from '../../config';
import { AuthContext } from "../AuthContext"
import "../assets/CSS/master.css";
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
      <h1 className="master--nav-title">{documentModel.title}</h1>
      <img src={icon} alt="over 18 icon" className='master--nav-over18' />
      <button className="hamburger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="hamburger-icon">&#9776;</span>
      </button>

      <div className={`master--li-container ${isMenuOpen ? "open" : ""}`}>
        <ul className="master--nav-ul">
          <li className="master--nav-li">
            <Link className="master--nav-li-btn" to="/">{documentModel.home}</Link>
          </li>

          <li
            className="master--nav-li"
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

          {/* <li className="master--nav-li">
            <SearchComponent />
          </li> */}

          { }
          {/* <li className="master--nav-li" onClick={() => toggleDropdown('dropdownTwo')} onMouseLeave={() => handleMouseLeave('dropdownTwo')}>
            <button className="master--nav-li-btn">
              {documentModel.optionTwo}
              <span className={`dropdown-arrow`}>&#9662;</span>
            </button>
            {dropdownState.dropdownTwo && (
              <ul className="dropdown">
                <li><Link to="/snuslist?category=VittSnus">Vitt snus</Link></li>
                <li><Link to="#">Suboption 2</Link></li>
                <li><Link to="#">Suboption 3</Link></li>
              </ul>
            )}
          </li> */}

          {/* <li
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
                <li><Link to="/snuslist?category=Nikotinfritt">Nikotinfritt snus</Link></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
              </ul>
            )}
          </li> */}
          
          <li
            className="master--nav-li"
            onMouseLeave={() => handleMouseLeave('shoppingCartDropdown')} 
          >
            <button 
              style={{ backgroundColor: purchaseEvent ? 'red' : 'white', color: purchaseEvent ? 'white' : 'black' }} 
              className="master--nav-li-btn fade-background" 
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