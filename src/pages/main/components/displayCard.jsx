import React, { useState } from 'react'
import { image_url } from '../../../api'
import Button from '../../components/Button'
import { genres } from '../../variable'
import { roundNumber } from '../../../utils/math'

function DisplayCard({ data, onClick, onClick2, added }) {
    const [hover, setHover] = useState(false)
    const checkGenre = (data) => {
        let genre = []
        data?.forEach((el, idx) => {
            if (genres.some((item) => item.id === el)) {
                genre.push(genres[idx].name)
            }
        });
        return genre[0]
    }
    const toggleHover = (bool) => {
        setHover(bool)
    }
    return (
        <div>
            <div onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)} className="w-60 min-w-fit h-80 relative">
                <div className={`absolute inset-0 bg-cover bg-center z-0 w-full shrink-0`}
                    style={{ backgroundImage: `url(${image_url + data?.poster_path})` }}
                >
                    <div
                        style={{ background: "rgba(30, 35, 43, 0.8)" }}
                        className='absolute top-0 right-0 font-bold text-lg text-white py-1.5 px-3'>
                        {roundNumber(data?.vote_average)}
                    </div>
                </div>
                <div style={{ backgroundColor: `rgba(0,0,0,${hover ? 0.8 : 0})` }}
                    className={` duration-300 absolute inset-0 z-10 ${hover ? "flex" : "hidden "} flex-col justify-center items-center`}>
                    <div className='  py-auto'>
                        <div className='flex items-center gap-2.5'>
                            <img height={32} width={32} src={'/asset/Star.png'} alt='star' />
                            <p
                                className='text-2xl text-white font-semibold '
                            >
                                {roundNumber(data?.vote_average)}
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
                        <Button
                            onClick={onClick2}
                            className={`${added ? "bg-green-light text-green-dark" : ""}  mt-3 text-white border opacity-100 text-sm font-semibold`}>
                            {added ? "Added" : "add"}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DisplayCard