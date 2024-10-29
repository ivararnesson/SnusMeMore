import "../assets/CSS/snuslist.css"
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from "../authContext";
import { useContext } from "react"
import Rating from "./Rating"

const SnusCard = ({ snus }) => {
    const { addToCart } = useContext(AuthContext)

    const handleRatingSubmit = () => {
        console.log("Rating submitted for:", snus.snusName);
    };
    
    return (
        <div>
            <div className="snus-card">
                <img className="snus--list-img" src={snus.imageUrl} alt={snus.name} />
                <h2 className="snus--list-title">{snus.snusName}</h2>
                {/* <p className="snus--list-category">{snus.category}</p> */}
                {/* <p className="snus--list-description">{snus.description}</p> */}
                <p className="snus--list-price">{snus.price} sek</p>
                <button onClick={() => addToCart(snus.snusId)} className="snus--list-btn"><FaShoppingCart />KÖP</button>
                <Rating snusId={snus.snusId} onRatingSubmit={handleRatingSubmit} />
            </div>
        </div>
    )
}

export default SnusCard