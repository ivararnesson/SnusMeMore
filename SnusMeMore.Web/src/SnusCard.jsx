import "./assets/CSS/snuslist.css"
import { FaShoppingCart } from 'react-icons/fa';

const SnusCard = ({ snus }) => {

    return (
        <div>
            <div className="snus-card">
                <img className="snus--list-img" src={snus.imageUrl} alt={snus.name} />
                <h2 className="snus--list-title">{snus.snusName}</h2>
                {/* <p className="snus--list-category">{snus.category}</p> */}
                {/* <p className="snus--list-description">{snus.description}</p> */}
                <p className="snus--list-price">{snus.price} sek</p>
                <button className="snus--list-btn"><FaShoppingCart />KÖP</button>
            </div>
        </div>
    )
}

export default SnusCard