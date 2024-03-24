import React from 'react'

function Footer() {
    return (
        <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.29)" }}
            className='h-40 px-32 py-16 flex justify-between items-center'>
            <p className='text-gray'>©  2021 MoovieTime. All rights reserved.</p>

            <img
                width={88}
                height={25}
                alt='logo'
                src={'/asset/moovietime-logo-grey@2x.png'}
            />

            <p className='text-gray'>{`Made with <react>`}</p>
        </div>
    )
}

export default Footer