import React, { useState, useEffect } from "react"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import config from '../../config.js'
import SnusCard from "./SnusCard"
import "../assets/CSS/snuslist.css"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const TopRatedSnus = () => {
    const [topRated, setTopRated] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    const getTopRatedSnus = () => {
        fetch(config.umbracoURL + '/api/content/top-rated-snus')
        .then(respons => respons.json())
        .then(result => {
            setTopRated(result)
        })
    }

    const renderCarouselItem = (item) => {
        return (
            <img
                className="snus--list-toprated-img"
                src={item.imageUrl}
                alt={item.name}
                onClick={() => handleCardClick(item.snusName)}
            />
        )
    }

    const handleCardClick = (snusName) => {
        navigate(`/productpage?snusName=${encodeURIComponent(snusName)}`);
    }

    useEffect(() => {
        getTopRatedSnus()
    },[])

    if (location.pathname === '/login') {
        return (<div></div>)
    }

    return (
        <div className="rating--list">
            <div className="rating--list-h2-container">
                <h2 className="rating--list-h2">Topp rankat snus</h2>
            </div>
            {topRated.length > 0 ? (
                <div className="rating--list-card">
                    <AliceCarousel
                        items={topRated.map(renderCarouselItem)}
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