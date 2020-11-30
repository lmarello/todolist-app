import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { loading, data }
}

export default useFetch
