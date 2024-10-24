import { useEffect, useState } from 'react'
import SnusCard from './SnusCard'

const SnusList = () => {
    const [snusItems, setSnusItems] = useState()

    useEffect(() => {
        fetch('https://localhost:44311/api/content/snusitems/b6fa2545-2966-42ee-adae-a72e7eb941cf')
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