import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config.js";
import "../assets/CSS/productpage.css";
import SnusCard from "../components/SnusCard.jsx";

const ProductView = () => {
    const [snusItem, setSnusItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const snusName = queryParams.get("snusName");
    
        if (snusName) {
            fetch(`${config.umbracoURL}/api/content/snusitem?snusName=${encodeURIComponent(snusName)}`)
                .then((response) => response.json())
                .then((result) => {
                    setSnusItem(result || null);
                })
                .catch((error) => console.error("Error fetching snus item:", error))
                .finally(() => setLoading(false));
        }
    }, [location.search]);
    
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!snusItem) {
        return <p>Snus item not found.</p>;
    }

    return (
        <div className="product-page">
            <SnusCard snus={snusItem} />
            <div className="info">
                <p>Info om produkten:  
                    <a> {snusItem.description}</a>
                </p>
                <p>Styrka: 
                    <a> {snusItem.strength}</a>
                </p>
                <p>Märke: 
                    <a> {snusItem.brand}</a>
                </p>
                <p>Kategori: 
                    <a> {snusItem.category}</a>
                </p>
                <p>Rating: 
                    <a> {snusItem.rating}</a>
                </p>
            </div>
        </div>
    );
};

export default ProductView;
