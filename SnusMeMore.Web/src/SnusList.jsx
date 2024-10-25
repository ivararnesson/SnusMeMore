import { useEffect, useState } from 'react'
import SnusCard from './SnusCard'
import "./assets/CSS/snuslist.css"

const SnusList = ({ categoryFilter }) => {
    const [snusItems, setSnusItems] = useState()

    useEffect(() => {
        fetch('https://localhost:44311/api/content/snusitems/b6fa2545-2966-42ee-adae-a72e7eb941cf')
        .then(respons => respons.json())
        .then(result => {
            const filteredItems = result.filter(item => item.category === categoryFilter);
            setSnusItems(filteredItems)
        })
    }, [])

    return (
        <div className="snus--list">
            {snusItems ? 
            (<div className="snus--grid">
                {snusItems.map((item) => (
                    <SnusCard key={item.snusName} snus={item} />
                ))}
            </div>) 
            : 
            (<p>Loading...</p>)}
        </div>
    )
}

export default SnusList