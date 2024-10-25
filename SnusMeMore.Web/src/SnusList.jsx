import { useEffect, useState } from 'react'
import SnusCard from './SnusCard'
import config from '../config.js'

const SnusList = () => {
    const [snusItems, setSnusItems] = useState()

    useEffect(() => {
        fetch(config.umbracoURL + '/api/content/snusitems/' + config.snusListID)
        .then(respons => respons.json())
        .then(result => {
            setSnusItems(result)
        })
    }, [])

    return (
        <div>
            {snusItems ? 
            (<div>
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