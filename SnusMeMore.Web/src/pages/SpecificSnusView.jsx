import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config.js";
import "../assets/CSS/productpage.css";
import SnusCard from "../components/SnusCard.jsx"; // Assumes SnusCard is used to display individual snus details

const ProductPage = () => {
    const [snusItem, setSnusItem] = useState(null); // To hold the specific snus item
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const SnusName = queryParams.get("SnusName"); // Get SnusName from URL
    
        if (SnusName) {
            fetch(`${config.umbracoURL}/api/content/snusitem?snusName=${encodeURIComponent(SnusName)}`)
                .then((response) => response.json())
                .then((result) => {
                    setSnusItem(result || null); // Set found item or null if not found
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
            {/* <h1>{snusItem.Name}</h1> */}
            <SnusCard snus={snusItem} />
            <div className="info">
                <h1>{snusItem.category}</h1>
            </div>
        </div>
    );
};

export default ProductPage;
