import "../assets/CSS/snuslist.css"
import { FaShoppingCart } from 'react-icons/fa'
import { AuthContext } from "../AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";


const SnusCard = ({ snus }) => {
    const { addToCart } = useContext(AuthContext)
    const navigate = useNavigate(); 

    const handleCardClick = () => {
        navigate(`/productpage?snusName=${encodeURIComponent(snus.snusName)}`);
    };

    return (
        <div onClick={handleCardClick} className="snus-card" style={{ cursor: 'pointer' }}>
            <img className="snus--list-img" src={snus.imageUrl} alt={snus.name} />
            <h2 id="snus-name" className="snus--list-title">{snus.snusName}</h2>
            <p className="snus--list-price">{snus.price} sek</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(snus.snusId, true); }} className="snus--list-btn">
                <FaShoppingCart />KÖP
            </button>
        </div>
    )
}

export default SnusCard