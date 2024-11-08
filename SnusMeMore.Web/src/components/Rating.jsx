import { useState } from "react";
import config from '../../config.js'
import { AuthContext } from "../AuthContext"
import { useContext } from "react"
import "../assets/CSS/master.css";

const Rating = ({ snusId, onRatingSubmit }) => {
    const [message, setMessage] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
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

    const handleKeyDown = (e, value) => {
        if (e.key === 'ArrowRight' && value < 5) {
            setSelectedRating(value + 1);
        } else if (e.key === 'ArrowLeft' && value > 1) {
            setSelectedRating(value - 1);
        } else if (e.key === 'Enter') {
            submitRating(value);
        }
    };
    return (
        <div className="snus-box" role="radiogroup" aria-labelledby="rating-label">
            {isLoggedIn && !isRatingSubmitted ? (
                <div className="snus-rating">
                    <p id="rating-label">Betygsätt produkten!</p>
                    {[1, 2, 3, 4, 5].map((value, index) => (
                        <div key={value}>
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                id={`rating-${value}`}
                                checked={selectedRating === value}
                                onChange={() => {
                                    setSelectedRating(value);
                                    submitRating(value);
                                }}
                                tabIndex={index === 0 ? 0 : -1}
                                onKeyDown={(e) => handleKeyDown(e, value)}
                                aria-labelledby={`rating-${value}-label`}
                            />
                            <label
                                id={`rating-${value}-label`}
                                htmlFor={`rating-${value}`}
                                aria-checked={selectedRating === value}
                                aria-label={`Rate ${value} out of 5`}
                            >
                                {value}
                            </label>
                        </div>
                    ))}
                </div>
            ) : isRatingSubmitted ? (
                <p aria-live="polite">{message}</p>
            ) : null}
        </div>
    );
};

export default Rating;