import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../assets/CSS/footer.css"
import config from "../../config"

const Footer = () => {
    const [footerValues, setFooterValues] = useState([])

    const getFooterValues = async () => {
        try {
            const response = await fetch(config.umbracoURL + '/api/content/footer')
            const result = await response.json()
            setFooterValues(result)
            console.log(result)
        } catch (error) {
            console.error("Error fetching footer values:", error)
        }
    };

    useEffect(() => {
        getFooterValues()
    }, [])

    return (
        <div className="footer--container">
                {footerValues.map((section, index) => (
                    <div key={index} className="footer--list-container">
                        <ul className="footer--ul">
                            <li className="footer--li-1">{section.header}</li>
                            {Object.entries(section)
                                .filter(([key]) => key.startsWith('option'))
                                .map(([key, value], linkIndex) => (
                                    <li key={linkIndex} className="footer--list-item">
                                        <Link to="/" className="footer--list-link">
                                            {value}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
        </div>
    )
}

export default Footer
