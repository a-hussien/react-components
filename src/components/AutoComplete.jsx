import { useEffect, useState } from "react"
import Fuse from "fuse.js"
import data from "../data/cities.json"

const AutoComplete = () => {
    const [queryText, setQueryText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleChange = (e) => setQueryText(e.target.value)

    const reset = () => {
        if(queryText){
            return
        }
        
        setQueryText('')
        setSearchResults([])
    }

    const selectItem = (e, query) => {
        e.preventDefault()
        setQueryText(query)
        setSearchResults([])
    }

    useEffect(() => {
        if(!queryText){
            setSearchResults([])
            return
        }

        const fuse = new Fuse(data, {
            keys: ['city', 'zips'],
            minMatchCharLength: 2,
            shouldSort: true,
            threshold: 0
        })

        const result = fuse.search(queryText, {limit: 5})
        setSearchResults(result)

    }, [queryText])

    const exactMatch = (query, text) => {
        const regex = new RegExp(`^${query}`)
        return regex.test(text)
    }

    const handleKeyDown = (e) => {
        if(queryText){
            if (e.key === "Tab" || e.key === "Enter") {
                e.preventDefault()
                if(exactMatch(queryText, searchResults[0].item.city)){
                    setQueryText(`${searchResults[0].item.city}, ${searchResults[0].item.state_id}`)
                }
                setSearchResults([])
            }
        }
    }

  return (
    <>
        <div className="mt-16 relative w-full flex items-center justify-center">
            <input
            type="search"
            value={queryText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlurCapture={reset}
            placeholder="Search by city name or zip code"
            className="text-lg text-black w-1/5 border-b-2 outline-none border-b-indigo-300 focus:border-b-indigo-700"
            />

            {/* AutoComplete */}
            {searchResults.length > 0 &&
                <div className="absolute top-0 z-10 w-1/5 select-none bg-transparent text-gray-500 text-lg">
                    {searchResults.length > 0 &&
                        exactMatch(queryText, searchResults[0].item.city) &&
                        `${searchResults[0].item.city}, ${searchResults[0].item.state_id}`
                    }
                </div>
            }

        </div>
        {/* AutoComplete List */}
        <div className="w-1/5">
            {searchResults.length > 0 && (
                <ul className="bg-slate-100 list-none p-2">
                    {searchResults?.map((place) => (
                    <li 
                    key={place.item.id}
                    onClick={(e) => selectItem(e, `${place.item.city}, ${place.item.state_id}`)}
                    className="p-2 text-slate-800 transition-all duration-300 ease-in-out hover:bg-slate-200 border-b-2 border-b-indigo-200 cursor-pointer"
                    >
                        {`${place.item.city}, ${place.item.state_id}, ${place.item.county_fips}`}
                    </li>
                    ))}
                </ul>
            )}
        </div>
    </>
  )
}

export default AutoComplete