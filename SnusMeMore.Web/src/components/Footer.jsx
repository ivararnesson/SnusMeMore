import React from "react";
import { Link } from "react-router-dom"
import "../assets/CSS/footer.css"

const Footer = () => {
    return (
        <div className="footer--container">
            <div className="footer--list-container">
                <ul className="footer--ul">
                    <li className="footer--li-1">SNUSMEMORE</li> 
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">SnusMeMore Koncept</Link>
                    </li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">Om oss</Link>
                    </li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">SnusMeMore & Snusbolaget</Link>
                    </li>
                </ul>
            </div>

            <div className="footer--list-container">
                <ul className="footer--ul">
                    <li className="footer--li-1">SUPPORT</li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">FAQ</Link>
                    </li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">Kontakt</Link>
                    </li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">Leveranspolicy</Link>
                    </li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">Allmäna villkor</Link>
                    </li>
                </ul>
            </div>

            {/* <div className="footer--list-container">
                <ul className="footer--ul">
                    <li className="footer--li-1">BETALA MED</li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link-payment">Mastercard/Visa</Link>
                    </li>
                </ul>
            </div> */}
        </div>
    )
}

export default Footer