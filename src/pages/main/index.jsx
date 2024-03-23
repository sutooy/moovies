import React from 'react'
import { useNavigate } from 'react-router-dom'

function Main() {
    const navigate = useNavigate();

    return (
        <div className='text-xl font-extrabold' onClick={() => { navigate("/detail") }}>main page</div>
    )
}

export default Main