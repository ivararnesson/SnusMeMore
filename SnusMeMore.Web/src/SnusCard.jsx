const SnusCard = ({ snus }) => {
    const handleAddToCart = () => {
        
    }

    return (
        <div>
            <div className="snus-card">
                <img src={snus.imageUrl} alt={snus.name} />
                <h2>{snus.snusName}</h2>
                <p>{snus.description}</p>
                <p>{snus.price} sek</p>
                <button onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    )
}

export default SnusCard