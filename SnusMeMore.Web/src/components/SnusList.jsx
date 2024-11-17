import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import BrandLink from "./BrandLink"
import { brandImages } from "../../brandImages.js"
import { Paginator } from "primereact/paginator"
import { useEffect, useState, useRef } from 'react'
import SnusCard from './SnusCard.jsx'
import config from '../../config.js'
import "../assets/CSS/snuslist.css"
import { useLocation, useNavigate } from 'react-router-dom';

const SnusList = () => {
    const [snusItems, setSnusItems] = useState([])
    const [brandTitle, setBrandTitle] = useState("all")
    const [filteredItems, setFilteredItems] = useState([])
    const [firstItem, setFirstItem] = useState(0)
    const [rows, setRows] = useState(8)
    const location = useLocation()
    const navigate = useNavigate()
    const headingRef = useRef(null)


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
        const brand = queryParams.get('brand') || "Allt snus"

        if (category !== "all") {
            setBrandTitle(category)
        } else {
            setBrandTitle(brand !== "Allt snus" ? brand : "Allt snus")
        }

        const filteredResult = items.filter(item => {
            const matchesBrand = brand === "Allt snus" || item.brand === brand
            const matchesCategory = category === "all" || item.category === category
            return matchesBrand && matchesCategory
        });

        setFilteredItems(filteredResult)
        setFirstItem(0)
    };

    const currentItem = filteredItems.slice(firstItem, firstItem + rows)

    const handleBrandFilter = (brand) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('brand', brand);
        queryParams.set('category', 'all');
        navigate(`/snuslist?${queryParams.toString()}`);
    
        setTimeout(() => {
            // Scroll the element into view first
            headingRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
    
            // Use window.scrollBy to adjust for navbar height after scrolling
            setTimeout(() => {
                const navbarHeight = 120; // Replace with your actual navbar height
                window.scrollBy({ top: -navbarHeight, behavior: 'smooth' });
            }, 300); // Adjust this delay if needed based on scroll speed
        }, 100);
    };

    return (
        <main className="snus--list">
            <h1 ref={headingRef} aria-live="polite">{brandTitle}</h1>
            {snusItems.length > 0 ? (
                <section className="snus--list-container" role="region" aria-labelledby="snusListHeading">
                    <h2 id="snusListHeading" className="visually-hidden">List of Snus Products</h2>
                    <ul className="snus--grid">
                        {currentItem.map((item) => (
                            <li key={item.snusName}>
                                <SnusCard snus={item} />
                            </li>
                        ))}
                    </ul> 
                    <Paginator 
                        first={firstItem}
                        rows={rows}
                        totalRecords={filteredItems.length}
                        onPageChange={(e) => {
                            setFirstItem(e.first)
                            setRows(e.rows)
                        }}
                        aria-label="Snus pagination controls"
                    />
                </section>
            )
            : 
            (<p>Loading...</p>)}
            <nav className="snus--list-brandcontainer" aria-labelledby="brandFilterHeading">
                <h2 id="brandFilterHeading" className="visually-hidden">Filter by Brand</h2>
                <ul>
                    {brandImages.map((brand, index) => (
                        <li key={index}>
                            <BrandLink 
                                handleBrandChange={() => {handleBrandFilter(brand.altTxt)}}
                                imgSrc={brand.imgSrc}
                                altTxt={brand.altTxt}
                                aria-label={`Filter by brand: ${brand.altTxt}`}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </main>
    )
}

export default SnusList