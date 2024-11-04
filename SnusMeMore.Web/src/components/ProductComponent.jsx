import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config.js";
import "../assets/CSS/productpage.css";
import SnusCard from "../components/SnusCard.jsx";
import Rating from "./Rating.jsx";

const ProductView = () => {
    const [snusItem, setSnusItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [averageRating, setAverageRating] = useState(0)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const snusName = queryParams.get("snusName");

        if (snusName) {
            fetch(`${config.umbracoURL}/api/content/snusitem?snusName=${encodeURIComponent(snusName)}`)
                .then((response) => response.json())
                .then((result) => {
                    setSnusItem(result || null);
                    setAverageRating(result.rating)
                })
                .catch((error) => console.error("Error fetching snus item:", error))
                .finally(() => setLoading(false));
        }
    }, [location.search]);

    const handleRatingSubmit = async () => {
        try {
            const response = await fetch(config.umbracoURL + `/api/content/snusitem/${snusItem.snusId}/average-rating`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json()
                setAverageRating(data.averageRating)
            }
            else {
                console.error("Failed to fetch updated rating.")
            }
        }
        catch (error){
            console.error("Error fetching updated rating: ", error)
        }
    }

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
                    <a> {averageRating}</a>
                </p>
                <Rating snusId={snusItem.snusId} onRatingSubmit={handleRatingSubmit} />
            </div>
        </div>
    );
};

export default ProductView;
