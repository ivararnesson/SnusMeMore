import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import BrandLink from "../BrandLink.jsx"
import Knox from "../assets/CSS/knox.png"
import Kaliber from "../assets/CSS/kaliber-logo.png"
import Lundgrens from "../assets/CSS/Lundgrens-logo.png"
import One from "../assets/CSS/ONE-logo.png"
import Velo from "../assets/CSS/velo-snus-logo.png"
import { Paginator } from "primereact/paginator"
import { useEffect, useState } from 'react'
import SnusCard from './SnusCard.jsx'
import config from '../../config.js'
import "../assets/CSS/snuslist.css"
import { useLocation } from 'react-router-dom';

const SnusList = () => {
    const [snusItems, setSnusItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [brandFilter, setBrandFilter] = useState("all")
    const [firstItem, setFirstItem] = useState(0)
    const [rows, setRows] = useState(8)
    const location = useLocation();

    const brands = [
        {imgSrc: Knox, altTxt:"Knox"},
        {imgSrc: Velo, altTxt:"Velo"},
        {imgSrc: Lundgrens, altTxt:"Lundgrens"},
        {imgSrc: One, altTxt:"One"},
        {imgSrc: Kaliber, altTxt:"Kaliber"},
        {imgSrc: Velo, altTxt:"velo-logo"},
        {imgSrc: Velo, altTxt:"velo-logo"},
        {imgSrc: Velo, altTxt:"velo-logo"},
        {imgSrc: Velo, altTxt:"velo-logo"},
        {imgSrc: Velo, altTxt:"velo-logo"},
        {imgSrc: Velo, altTxt:"velo-logo"},
        {imgSrc: Velo, altTxt:"velo-logo"},
    ]

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const category = queryParams.get('category')

        fetch(config.umbracoURL + '/api/content/snusitems/' + config.snusListID)
            .then(response => response.json())
            .then(result => {
                setSnusItems(result)

                const filteredResult = category 
                    ? result.filter(item => item.category === category) 
                    : result

                setFilteredItems(filteredResult)
            });
    }, [location.search])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const category = queryParams.get('category')

        const filtered = snusItems.filter(item => {
            const matchesBrand = brandFilter === "all" || item.brand === brandFilter
            const matchesCategory = !category || item.category === category
            return matchesBrand && matchesCategory
        })

        setFilteredItems(filtered)
        setFirstItem(0)
    }, [brandFilter, snusItems, location.search])

    const currentItem = filteredItems.slice(firstItem, firstItem + rows)

    const handleBrandFilter = (brand) => {
        setBrandFilter(brand)
    }

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
                        totalRecords={filteredItems.length}
                        onPageChange={(e) => {
                            setFirstItem(e.first)
                            setRows(e.rows)
                        }}
                    />
                </div>
            )
            : 
            (<p>Loading...</p>)}
            <div className="snus--list-brandcontainer">
                {brands.map((brand, index) => (
                    <BrandLink 
                        key={index}
                        handleBrandChange={() => {handleBrandFilter(brand.altTxt)}}
                        imgSrc={brand.imgSrc}
                        altTxt={brand.altTxt}
                    />
                ))}
            </div>
        </div>
    )
}

export default SnusList