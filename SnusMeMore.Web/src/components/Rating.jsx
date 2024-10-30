import { useState } from "react";
import config from '../../config.js'
import { useEffect } from "react";
import { AuthContext } from "../authContext"
import { useContext } from "react"

const Rating = ({ snusId, onRatingSubmit }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [averageRating, setAverageRating] = useState(null);
    const [isRatingSubmitted, setisRatingSubmitted] = useState(false);
    const { isLoggedIn, userId } = useContext(AuthContext);

    const getRating = async () => {
        try {
            const response = await fetch(config.umbracoURL + `/api/content/snusitem/${snusId}/average-rating`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json();
            setAverageRating(data.averageRating)

            return data.averageRating;
        } catch (error) {
            console.error('Failed to fetch rating', error)
        }
    }

    const submitRating = async (value) => {
        if (value < 1 || value > 5) {
            alert("Invalid rating.");
            return;
        }

        try {
            const response = await fetch(config.umbracoURL + `/api/content/snusitem/${snusId}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Rating: value, UserId: userId }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit rating");
            }

            const result = await response.json();
            setMessage("Tack för ditt bidrag!");
            setRating(value);
            setisRatingSubmitted(true);
            getRating();

            if (onRatingSubmit) {
                onRatingSubmit();
            }

        } catch (error) {
            console.error("Error submitting rating:", error);
            setMessage("Error submitting rating. Please try again.");
        }
    }

    const handleRatingChange = (value) => {
        setRating(value)
        submitRating(value)
    };

    useEffect(() => {
        getRating();
    }, [snusId]);

    return (
        <div className="snus-rating">
            {isLoggedIn && !isRatingSubmitted ? (
                <div>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                checked={rating === value}
                                onChange={() => handleRatingChange(value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>
            ) : isRatingSubmitted ? (
                <p>{message}</p>
            ) : null} {}
    
            {averageRating !== null && <p>Snittbetyg: {averageRating.toFixed(1)}</p>}
        </div>
    );
};

export default Rating;