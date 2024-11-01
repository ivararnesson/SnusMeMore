import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import BrandLink from "./BrandLink"
import { brandImages } from "../../brandImages.js"
import { Paginator } from "primereact/paginator"
import { useEffect, useState } from 'react'
import SnusCard from './SnusCard.jsx'
import config from '../../config.js'
import "../assets/CSS/snuslist.css"
import { useLocation, useNavigate } from 'react-router-dom';

const SnusList = () => {
    const [snusItems, setSnusItems] = useState([])
    const [brandTitle, setBrandTitle] = useState("ALL SNUS")
    const [filteredItems, setFilteredItems] = useState([])
    const [firstItem, setFirstItem] = useState(0)
    const [rows, setRows] = useState(8)
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(config.umbracoURL + '/api/content/snusitems')
            .then(response => response.json())
            .then(result => {
                setSnusItems(result)
                filterSnus(result, location.search)
                console.log(result)
            })
    }, [])

    useEffect(() => {
        filterSnus(snusItems, location.search)
    }, [location.search, snusItems])

    const filterSnus = (items, search) => {
        const queryParams = new URLSearchParams(search)
        const category = queryParams.get('category') || "all"
        const brand = queryParams.get('brand') || "all"

        setBrandTitle(brand !== "all" ? brand.toUpperCase() : category.toUpperCase())

        const filteredResult = items.filter(item => {
            const matchesBrand = brand === "all" || item.brand === brand
            const matchesCategory = category === "all" || item.category === category
            return matchesBrand && matchesCategory
        });

        setFilteredItems(filteredResult)
        setFirstItem(0)
    };

    const currentItem = filteredItems.slice(firstItem, firstItem + rows)

    const handleBrandFilter = (brand) => {
        const queryParams = new URLSearchParams(location.search)
        queryParams.set('brand', brand)
        queryParams.set('category', 'all')
        navigate(`/snuslist?${queryParams.toString()}`)
    };

    return (
        <div className="snus--list">
            <h1>{brandTitle}</h1>
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
                {brandImages.map((brand, index) => (
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