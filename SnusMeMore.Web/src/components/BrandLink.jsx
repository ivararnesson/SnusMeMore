import React from "react";

const BrandLink = ({ imgSrc, handleBrandChange, altTxt}) => {
    return (
        <div>
            <button className="snus--list-categorylink" onClick={handleBrandChange}>
                <img src={imgSrc} alt={altTxt} className="snus--list-categorylink" />
            </button>
        </div>
    )
}

export default BrandLink