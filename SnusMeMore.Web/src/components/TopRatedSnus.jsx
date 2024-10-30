import React, { useState, useEffect } from "react"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import config from '../../config.js'
import SnusCard from "./SnusCard"
import "../assets/CSS/snuslist.css"

const TopRatedSnus = () => {
    const [topRated, setTopRated] = useState([])

    const getTopRatedSnus = () => {
        fetch(config.umbracoURL + '/api/content/top-rated-snus')
        .then(respons => respons.json())
        .then(result => {
            setTopRated(result)
        })
    }

    useEffect(() => {
        getTopRatedSnus()
    },[])

    return (
        <div className="rating--list">
            <div className="rating--list-h2-container">
                <h2 className="rating--list-h2">Topp rankat snus</h2>
            </div>
            {topRated.length > 0 ? (
                <div className="rating--list-card">
                    <AliceCarousel
                        items={topRated.map(item => <SnusCard key={item.rating} snus={item} />)}
                        autoPlay
                        autoPlayInterval={2000}
                        infinite
                        disableButtonsControls
                        responsive={{
                            0: { items: 1 },
                            600: { items: 2 },
                            1024: { items: 3 },
                        }}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default TopRatedSnus