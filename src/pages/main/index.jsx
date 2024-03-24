import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { genres, lineBorder, popularList } from '../variable'
import { getDiscoverMovie, getTrendingMovie } from '../../api'
import DisplayCard from './components/displayCard'
import dayjs from 'dayjs'
import Button from '../components/Button'
import HeroSlider from './components/heroSlider'

function Main() {
    const navigate = useNavigate();
    const [sort, setSort] = useState({
        active: false,
        type: "",
        id: ""
    })
    const [movieData, setMovieData] = useState([])
    const [movieEdited, setMovieEdited] = useState([])
    const [movieFilter, setMoiveFilter] = useState([])
    const [movieTrending, setMovieTrending] = useState([])
    const [addMovie, setAddedMovie] = useState([])
    const [dataCurrent, setCurrentData] = useState({
        page: 1,
        search: ""
    })
    const toggleAdd = (id) => {
        addMovie.find(el => el === id) ?
            setAddedMovie(addMovie.filter(el => el !== id)) :
            setAddedMovie(prev => ([...prev, id]))
    }

    // to set the filter parameter
    const toggleFilter = (id) => {
        movieFilter.find(el => el === id) ?
            setMoiveFilter(movieFilter.filter(el => el !== id)) :
            setMoiveFilter(prev => ([...prev, id]))
    }

    // filter moive function
    const filterMovie = () => {
        if (movieFilter.length < 1) { return setMovieEdited([]) }
        const filtered = movieData.filter((movie) => {
            return movieFilter.some((genre) => movie.genre_ids.includes(genre));
        });
        setMovieEdited(filtered)
    }

    const getMovie = async (page) => {
        try {
            const data = await getDiscoverMovie(page)
            page > dataCurrent.page ?
                setMovieData(prev => [...prev, ...data?.data?.results]) :
                setMovieData(data?.data?.results);
            setCurrentData(prev => ({ ...prev, page: data?.data?.page }))
        }
        catch (error) { alert(error) }
    }

    const getMovieTrend = async (page) => {
        try {
            const data = await getTrendingMovie(page)
            setMovieTrending(data?.data?.results?.slice(0, 5));

        }
        catch (error) { alert(error) }
    }
    const toggleSort = (x) => {
        setSort(prev => ({ ...prev, active: !sort.active, type: x }))
    }

    const sortMovie = (type, option) => {
        type === "Popularity" ? type = "popularity" : type === "Release-Date" ? type = "release_date" : type = "vote_average"

        const sorted = (movieEdited.length > 0 ? movieEdited : movieData).slice().sort((a, b) => {
            const dateA = +dayjs(a.release_date);
            const dateB = +dayjs(b.release_date);
            if (type === "release_date" && option === "Ascending") {
                return dateA - dateB
            } else if (type === "release_date" && option === "Descending") {
                return dateB - dateA
            } else if (option === "Ascending") {
                return a[type] - b[type]
            } else if (option === "Descending") {
                return b[type] - a[type]
            }
        })
        return setMovieEdited(sorted)
    }

    useEffect(() => {
        getMovie()
        getMovieTrend()
    }, [])

    useEffect(() => {
        filterMovie()
    }, [movieFilter])

    const movieDetail = (id) => {
        navigate(`detail/${id}`)
    }

    return (
        <div className='relative min-h-dvh mb-20'>
            <div className=''>
                <HeroSlider data={movieTrending} />
            </div>

            <div style={{ height: '300px' }} className='bg-white-trans flex justify-between items-center px-32'>
                <div>
                    <div className='bg-red w-28 h-1 mb-2'></div>
                    <p className='text-white text-2xl font-semibold'>Discover Movies</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='text-white font-semibold'>My Movies</p>
                    <p style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} className=' text-white rounded-full py-2 px-4 '
                    >
                        <span className='font-bold'>{addMovie?.length}</span> &nbsp; Movies
                    </p>
                </div>
            </div>

            <div className='flex px-32 gap-8 -mt-20'>
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
                            onClick={() => toggleSort()}
                            className='rounded px-4 py-2.5 flex justify-between items-center cursor-pointer max-w-52 w-full '
                            style={{ backgroundColor: 'rgba(47, 54, 63, 1)' }}
                        >
                            {sort.type !== "" ? sort?.type : "Popularity"}
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
                                        onClick={() => {
                                            let param1 = el.split(" ")[0]
                                            let param2 = el.split(" ")[1]
                                            sortMovie(param1, param2)
                                            toggleSort(el)
                                        }}
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
                                    <input
                                        onClick={() => toggleFilter(el.id)}
                                        type="checkbox"
                                        className="accent-red-brown w-3 h-3 cursor-pointer rounded appearance-none checked:appearance-auto checked:rounded " />
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                <div className='grid  xl:grid-cols-4 lg:grid-cols-2 gap-5'>
                    {movieData.length > 0 &&
                        (movieEdited.length >= 1 ? movieEdited : movieData)?.map(el =>
                            <div className='' key={el?.title}>
                                <DisplayCard
                                    data={el}
                                    onClick={() => movieDetail(el?.id)}
                                    onClick2={() => toggleAdd(el?.id)}
                                    added={addMovie.find(item => item === el.id)}
                                />
                                <div className='text-white text-ellipsis overflow-hidden mt-5'>
                                    <p className='text-sm font-semibold '>{el?.title}</p>
                                    <p
                                        className='text-gray text-xs'> {dayjs(el.release_date).format("YYYY")}</p>
                                </div>
                            </div>
                        )}
                    <Button
                        onClick={() => getMovie(dataCurrent.page + 1)
                        }
                        className='xl:col-span-4 lg:col-span-2 mt-10 mx-auto bg-red text-white font-semibold '>
                        Load More
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default Main