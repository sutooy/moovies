import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { genres, lineBorder, popularList } from '../variable'
import { getDiscoverMovie } from '../../api'
import DisplayCard from './components/displayCard'

function Main() {
    const navigate = useNavigate();
    const [sort, setSort] = useState({
        active: false,
        type: "",
        id: ""
    })
    const [movieData, setMovieData] = useState([])
    const [dataCurrent, setCurrentData] = useState({
        page: 1,
        search: ""
    })

    const getMovie = async (page) => {
        try {
            const data = await getDiscoverMovie(page)
            page > dataCurrent.page ?
                setMovieData(prev => [...prev, data?.data?.results]) :
                setMovieData(data?.data?.results);
            setCurrentData(prev => ({ ...prev, page: data?.data?.page }))
        }
        catch (error) { alert(error) }
    }

    const toggleSort = () => {
        setSort(prev => ({ ...prev, active: !sort.active }))
    }

    useEffect(() => {
        getMovie()
    }, [])

    const movieDetail = (id) => {
        navigate(`detail/${id}`)
    }

    console.log(movieData)
    return (
        <div className='relative '>
            <div className=''>Slider</div>

            <div className='flex px-32 gap-8'>
                <div
                    style={{ background: "linear-gradient(180deg, #0E1723 0%, rgba(30, 35, 42, 0) 100%)" }}
                    className='max-w-60 w-full text-white rounded-lg'>
                    <p
                        className='font-semibold p-5'>
                        Sort Result By
                    </p>
                    {lineBorder()}
                    <div className='relative rounded pb-7 pt-5 px-4' >
                        <p
                            onClick={toggleSort}
                            className='rounded px-4 py-2.5 flex justify-between items-center cursor-pointer max-w-52 w-full '
                            style={{ backgroundColor: 'rgba(47, 54, 63, 1)' }}
                        >
                            {sort.type !== "" ? sort : "Popularity"}
                            <img
                                className={`${sort.active ? "rotate-180" : ""} `}
                                height={10}
                                width={10}
                                src={"asset/Polygon.png"}
                                alt='up'
                            />
                        </p>
                        {sort.active &&
                            <div
                                style={{ backgroundColor: "rgba(17, 20, 25, 1)" }}
                                className='absolute p-4 rounded max-w-52 w-full'
                            >
                                {popularList.map(el =>
                                    <div
                                        className='text-xs pb-2 cursor-pointer hover:text-red-brown '
                                        key={el}
                                    >
                                        {el}
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    {lineBorder()}
                    <p className='p-4 font-semibold'>Genres</p>
                    {lineBorder()}

                    <div className='p-4'>
                        {genres.map(el =>
                            <div className='items-center justify-between flex pb-2' key={el.name}>
                                {el.name}
                                <div style={{ borderColor: "rgba(255, 255, 255, 0.5)" }} className='flex border-2 rounded'>
                                    <input type="checkbox" className="accent-red-brown w-3 h-3 cursor-pointer rounded appearance-none checked:appearance-auto checked:rounded " />
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                <div className='grid 2xl:flex 2xl:flex-wrap xl:grid-cols-4 lg:grid-cols-2 gap-5'>
                    {movieData.length > 0 &&
                        movieData?.map(el =>
                            <div className='' key={el?.title}>
                                <DisplayCard data={el}
                                    onClick={() => movieDetail(el?.id)}
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Main