import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../assets/CSS/master.css";
import SearchComponent from "./SearchComponent";

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
            [dropdownName]: false,
        }));
    };

    const getDocumentValues = async () => {
        fetch("https://localhost:44311/api/content/navbar/cf233671-9951-42ce-894b-b8a7d8a9aaeb")
            .then(response => response.json())
            .then(result => {
                setDocumentModel(result);
                console.log(result);
            });
    };

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
                        <Link className="master--nav-li-btn" to="/">{documentModel.home}</Link>
                    </li>

                    {/* Dropdown Meny */}
                    <li className="master--nav-li" onClick={() => toggleDropdown('dropdownOne')} onMouseLeave={() => handleMouseLeave('dropdownOne')}>
                        <a className="master--nav-li-btn">
                            {documentModel.optionOne}
                            <span className={`dropdown-arrow`}>&#9662;</span>
                        </a>
                        {dropdownState.dropdownOne && (
                            <ul className="dropdown">
                                <li><Link to="/tobakssnus">Tobakssnus</Link></li>
                                <li><Link to="/vittobakssnus">Vit Tobakssnus</Link></li>
                                <li><Link to="/lössnus">Lössnus</Link></li>
                            </ul>
                        )}
                    </li>

                    {/* Sökfält */}
                    <li className="master--nav-li">
                        <SearchComponent />
                    </li>
                    
                    {}
                    <li className="master--nav-li" onClick={() => toggleDropdown('dropdownTwo')} onMouseLeave={() => handleMouseLeave('dropdownTwo')}>
                        <a className="master--nav-li-btn">
                            {documentModel.optionTwo}
                            <span className={`dropdown-arrow`}>&#9662;</span>
                        </a>
                        {dropdownState.dropdownTwo && (
                            <ul className="dropdown">
                                <li><Link to="/vittsnus">Vitt snus</Link></li>
                                <li><Link to="#">Suboption 2</Link></li>
                                <li><Link to="#">Suboption 3</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className="master--nav-li" onClick={() => toggleDropdown('dropdownThree')} onMouseLeave={() => handleMouseLeave('dropdownThree')}>
                        <a className="master--nav-li-btn">
                            {documentModel.optionThree}
                            <span className={`dropdown-arrow`}>&#9662;</span>
                        </a>
                        {dropdownState.dropdownThree && (
                            <ul className="dropdown">
                                <li><Link to="/nikotinfritt">Nikotinfritt snus</Link></li>
                                <li><Link to="#">Suboption 2</Link></li>
                                <li><Link to="#">Suboption 3</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className="master--nav-li" onClick={() => toggleDropdown('shoppingCartDropdown')} onMouseLeave={() => handleMouseLeave('shoppingCartDropdown')}>
                        <a className="master--nav-li-btn">
                            {documentModel.shoppingCart}
                        </a>
                        {dropdownState.shoppingCartDropdown && (
                            <ul className="dropdown">
                                <li><Link to="#">Suboption 1</Link></li>
                                <li><Link to="#">Suboption 2</Link></li>
                                <li><Link to="#">Suboption 3</Link></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;