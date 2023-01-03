import { useEffect, useState } from 'react'
import GlobalStyle from './globalStyled'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'reactstrap'
import axios from 'axios'

function App() {
    const [data, setData] = useState<Array<Number>>([1, 2, 3, 4, 5])

    const getData = async () => {
        const data: any = await axios.get('http://localhost:3002/')
        setData(data.data[0].name)
    }

    useEffect(() => {
        getData()
        console.log(...data)
    }, [])

    return (
        <div className="App">
        </div>
        // null
    )
}

export default App
