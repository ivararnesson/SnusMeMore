import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import Knox from "../src/assets/CSS/knox.png"
import { Paginator } from "primereact/paginator"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SnusCard from './SnusCard'
import "./assets/CSS/snuslist.css"

const SnusList = ({ categoryFilter }) => {
    const [snusItems, setSnusItems] = useState([])
    const [firstItem, setFirstItem] = useState(0)
    const [rows, setRows] = useState(8)

    useEffect(() => {
        fetch('https://localhost:44311/api/content/snusitems/b6fa2545-2966-42ee-adae-a72e7eb941cf')
        .then(respons => respons.json())
        .then(result => {
            const filteredItems = categoryFilter === 'all' ? result : result.filter(item => item.category === categoryFilter)
            setSnusItems(filteredItems)
            setFirstItem(0)
        })
    }, [categoryFilter])

    const currentItem = snusItems.slice(firstItem, firstItem + rows)

    return (
        <div className="snus--list">
            {snusItems.length > 0 ? (
                <div className="snus--list-container">
                    <div className="snus--grid">
                        {currentItem.map((item) => (
                            <SnusCard key={item.snusName} snus={item} />
                        ))}
                    </div> 
                    <Paginator 
                        first={firstItem}
                        rows={rows}
                        totalRecords={snusItems.length}
                        onPageChange={(e) => {
                            setFirstItem(e.first)
                            setRows(e.rows)
                        }}
                    />
                </div>
            )
            : 
            (<p>Loading...</p>)}
            <Link to="/" className="snus--list-categorylink">
                <img src={Knox} className="snus--list-categoryimg" alt="knox-icom"/>
            </Link>
        </div>
    )
}

export default SnusList