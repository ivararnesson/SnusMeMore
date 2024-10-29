import { useState } from "react";
import config from '../../config.js'
import { useEffect } from "react";

const Rating = ({ snusId, onRatingSubmit }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [averageRating, setAverageRating] = useState(null); 

    const handeRatingChange = (value) => {
        setRating(value);
    }

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

    const submitRating = async () => {
        if (rating < 1 || rating > 5) {
            alert("Invalid rating.");
            return;
        }

        try {
            const response = await fetch(config.umbracoURL + `/api/content/snusitem/${snusId}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Rating: rating }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit rating");
            }

            const result = await response.json();
            setMessage("Tack för ditt bidrag!");
            setRating(0);

            if (onRatingSubmit) {
                onRatingSubmit();
            }
            
            getRating();

        } catch (error) {
            console.error("Error submitting rating:", error);
            setMessage("Error submitting rating. Please try again.");
        }
    }

    useEffect(() => {
        getRating();
    }, [snusId]);

    return (
        <div className="snus-rating">
            {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                    <input
                        type="checkbox"
                        checked={rating === value}
                        onChange={() => handeRatingChange(value)}
                    />
                    {value}
                </label>
            ))}
            <button onClick={submitRating}>Betygsätt</button>
            {message && <p>{message}</p>}
            {averageRating !== null && <p>Snittbetyg: {averageRating.toFixed(1)}</p>}
        </div>
    );
};

export default Rating;