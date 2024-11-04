import React from "react";
import { Link } from "react-router-dom"
import "../assets/CSS/footer.css"

const Footer = () => {
    return (
        <div className="footer--container">
            <div className="footer--list-container">
                <ul className="footer--ul">
                    <li className="footer--li-1">SnusMeMore</li> 
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
                    <li className="footer--li-1">Support</li>
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

            <div className="footer--list-container">
                <ul className="footer--ul">
                    <li className="footer--li-1">Betala med</li>
                    <li className="footer--list-item">
                        <Link to="/" className="footer--list-link">SnusMeMore Koncept</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer