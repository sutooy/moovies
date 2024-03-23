import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Main() {
    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate("/detail") }}>main page</div>
    )
}

export default Main