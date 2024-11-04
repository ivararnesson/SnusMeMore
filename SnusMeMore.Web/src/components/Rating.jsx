import { useState } from "react";
import config from '../../config.js'
import { AuthContext } from "../AuthContext"
import { useContext } from "react"

const Rating = ({ snusId, onRatingSubmit }) => {
    const [message, setMessage] = useState("");
    const [isRatingSubmitted, setisRatingSubmitted] = useState(false);
    const { isLoggedIn, userId } = useContext(AuthContext);

    const submitRating = async (value) => {
        if (value < 1 || value > 5) {
            alert("Invalid rating.");
            return;
        }

        try {
            const response = await fetch(config.umbracoURL + `/api/content/snusitem/${snusId}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + userId
                },
                body: JSON.stringify({ Rating: value, UserId: userId }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit rating");
            }

            const result = await response.json();
            setMessage("Tack för ditt bidrag!");
            setisRatingSubmitted(true);

            if (onRatingSubmit) {
                onRatingSubmit();
            }

        } catch (error) {
            console.error("Error submitting rating:", error);
            setMessage("Error submitting rating. Please try again.");
        }
    }

    const handleRatingChange = (value) => {
        submitRating(value)
    };

    return (
        <div className="snus-rating">
            {isLoggedIn && !isRatingSubmitted ? (
                <div>
                    <p>Betygsätt produkten!</p>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                onChange={() => handleRatingChange(value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>
            ) : isRatingSubmitted ? (
                <p>{message}</p>
            ) : null} {}
        </div>
    );
};

export default Rating;