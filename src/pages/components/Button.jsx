import React from 'react'

function Button({ children = null, className = "", onClick = undefined }) {
    return (
        <div
            style={{ borderRadius: '32px' }}
            onClick={onClick}
            className={`${className} cursor-pointer px-9 py-2`}
        >
            {children}
        </div>
    )
}

export default Button