import React, { useState } from 'react'
import { image_url } from '../../../api'
import Button from '../../components/Button'
import { genres } from '../../variable'

function DisplayCard({ data, onClick }) {
    const [hover, setHover] = useState(false)
    const checkGenre = (data) => {
        let genre = []
        data.forEach((el, idx) => {
            if (genres.some((item) => item.id === el)) {
                genre.push(genres[idx].name)
            }
        });
        return genre[0]
    }
    const toggleHover = () => {
        setHover(!hover)
    }
    return (
        <div>
            <div onMouseEnter={toggleHover} onMouseLeave={toggleHover} className="w-60 min-w-fit h-80 relative">
                <div className={`absolute inset-0 bg-cover bg-center z-0 w-full shrink-0`}
                    style={{ backgroundImage: `url(${image_url + data?.poster_path})` }}
                >
                </div>
                <div style={{ backgroundColor: `rgba(0,0,0,${hover ? 0.8 : 0})` }}
                    className={` duration-300 absolute inset-0 z-10 ${hover ? "flex" : "hidden "} flex-col justify-center items-center`}>
                    <div className='  py-auto'>
                        <div className='flex items-center gap-2.5'>
                            <img height={32} width={32} src={'/asset/Star.png'} alt='star' />
                            <p className='text-2xl text-white font-semibold '>
                                {Math.round(data?.vote_average * 100) / 100}
                            </p>
                        </div>
                        <div className='my-12 text-white text-center font-semibold'>
                            {checkGenre(data.genre_ids)}
                        </div>
                        <Button
                            onClick={onClick}
                            className={`bg-red text-white opacity-100 border text-sm font-semibold`}
                        >
                            View
                        </Button>
                        <Button className={`mt-3 text-white border opacity-100 text-sm font-semibold`}>
                            Add
                        </Button>
                    </div>
                </div>
                {/* <p>{data?.title}</p> */}
            </div>
        </div>
    )
}

export default DisplayCard