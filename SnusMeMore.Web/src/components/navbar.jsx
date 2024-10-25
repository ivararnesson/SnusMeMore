import { useState, useEffect } from 'react';
import "../assets/CSS/master.css";

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
    fetch("https://localhost:44311/api/content/cf233671-9951-42ce-894b-b8a7d8a9aaeb")
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
                <li><a href="#">Suboption 1</a></li>
                <li><a href="#">Suboption 2</a></li>
                <li><a href="#">Suboption 3</a></li>
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
                <li><a href="#">Suboption 1</a></li>
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


