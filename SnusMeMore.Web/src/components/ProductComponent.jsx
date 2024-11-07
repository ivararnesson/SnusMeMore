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
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const snusName = queryParams.get("snusName");

        if (snusName) {
            fetch(
                `${config.umbracoURL
                }/api/content/snusitem?snusName=${encodeURIComponent(snusName)}`
            )
                .then((response) => response.json())
                .then((result) => {
                    setSnusItem(result || null);
                    setAverageRating(result.rating);
                })
                .catch((error) => console.error("Error fetching snus item:", error))
                .finally(() => setLoading(false));
        }
    }, [location.search]);

    const handleRatingSubmit = async () => {
        try {
            const response = await fetch(
                config.umbracoURL +
                `/api/content/snusitem/${snusItem.snusId}/average-rating`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setAverageRating(data.averageRating);
            } else {
                console.error("Failed to fetch updated rating.");
            }
        } catch (error) {
            console.error("Error fetching updated rating: ", error);
        }
    };

    if (loading) {
        return <p>Laddar...</p>;
    }

    if (!snusItem) {
        return <p>Snuset hittades ej.</p>;
    }

    return (
        <div className="product-page">
            <section aria-labelledby="snus-name">
                <SnusCard snus={snusItem} />
            </section>

            <section>
                <h2 id="product-info">Produktinformation</h2>
                <div className="info">
                    <p>
                        Info om produkten: <span>{snusItem.description}</span>
                    </p>
                    {/* <p>
                        Styrka: <span>{snusItem.strength}</span>
                    </p> */}
                    <p>
                        Märke: <span>{snusItem.brand}</span>
                    </p>
                    <p>
                        Kategori: <span>{snusItem.category}</span>
                    </p>

                    {/* Rating sektion */}
                    <p>
                        Aktuellt betyg: <span>{averageRating}</span>
                    </p>
                    <div aria-live="polite">
                        <Rating
                            key={snusItem.snusId}
                            snusId={snusItem.snusId}
                            onRatingSubmit={handleRatingSubmit}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductView;
