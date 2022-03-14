import { useState, useEffect } from 'react'

const useFetchData = (defaultVal, apiCaller) => {
    const [fetchedData, setFetchedData] = useState(defaultVal)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            await apiCaller()
                .then((res) => {
                    if (res.status >= 400) {
                        setError(`An API Error occurred : ${res.message}`)
                    }
                    else {
                        setFetchedData(res.data)
                    }
                })
                .catch((err) => {
                    if (err) {
                        setError(`An API error occurred: ${err}`)
                    } else {
                        setError(`An API error occurred`)
                    }
                })
        }
        catch (err) {
            console.log('Awaiting api caller')
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return [fetchedData, error, fetchData]
}

export default useFetchData;
