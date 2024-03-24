import React, { useEffect, useState } from 'react'
import { genres } from '../variable'
import { getSearchMovie } from '../../api'
import { useNavigate } from 'react-router-dom'

function Header() {
    const [genre, setGenre] = useState(false)
    const [movieData, setMovieData] = useState([])
    const [dataCurrent, setCurrentData] = useState({
        page: 1,
        search: ""
    })
    const navigate = useNavigate();

    const handleDetail = (id) => {
        navigate(`/detail/${id}`)
        setMovieData([])
    }

    const getSearch = async (title) => {
        try {
            const data = await getSearchMovie(dataCurrent.page, title)
            setMovieData(data?.data?.results)
            setCurrentData(prev => ({ ...prev, page: data?.data?.page }))
        }
        catch (error) { alert(error) }
    }

    useEffect(() => {
        // Debounce function
        const timeoutId = setTimeout(async () => {
            getSearch(dataCurrent.search)
        }, 1000); // Adjust delay as needed

        return () => {
            clearTimeout(timeoutId);
            setMovieData([])
        }
    }, [dataCurrent.search]);

    const boldString = (text, word) => {
        if (!text || !word) return text; // Handle empty cases
        const wordRegex = new RegExp(`\\b${word}\\b`, 'gi'); // Case-insensitive whole word match
        text = text.replace(wordRegex, ` <strong>${word}</strong>`); // Replace with bold tags
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    }

    const toggleGenre = () => setGenre(!genre)

    return (
        <div className='nav-container bg-white-trans w-full z-40 absolute top-0'>
            <div className='flex flex-wrap h-full justify-center items-center '>
                <img width={112} height={31} alt='logo' src={'/asset/moovietime-logo@2x.png'} />
                <form className='relative flex px-3 gap-2 rounded mx-9'>
                    <div className='flex items-center'>
                        <img width={20} height={16} alt='logo' src={'/asset/movie-icon@2x.png'} />
                    </div>
                    <input
                        onChange={(e) => {
                            e.preventDefault()
                            setCurrentData(prev => ({ ...prev, search: e.target.value }))
                        }}
                        type='search'
                        className="w-full h-9 py-2.5 text-white focus:outline-none "
                        placeholder="Find movie"
                    />
                    <div className='flex items-center'>
                        <img width={12} height={12} alt='logo' src={'/asset/search-icon@2x.png'} />
                    </div>
                    {movieData.length > 0 &&
                        <div className='absolute p-5 text-white -ml-3 mt-10 bg-black opacity-90 rounded-lg'>
                            {movieData.map(el =>
                                <div
                                    onClick={() => handleDetail(el.id)}
                                    className='cursor-pointer' key={el.id}
                                >
                                    {
                                        boldString(el.title, dataCurrent.search)
                                    }
                                </div>
                            )}
                        </div>
                    }
                </form>
                <div>

                </div>

                <div className='relative mr-9'>
                    <div
                        className='flex items-center cursor-pointer'
                        onClick={toggleGenre}
                    >
                        <img width={24} height={24} alt='logo' src={'/asset/grid-icon@2x.png'} />
                        <p className='text-white font-semibold	'>
                            CATEGORIES
                        </p>
                    </div>
                    {genre &&
                        <div style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.5)' }} className='absolute bg-white w-full px-4 rounded-md '>
                            {genres.map((el, index) =>
                                <div className='text-xs font-semibold my-4 cursor-pointer hover:text-red-brown' key={el.name}>
                                    {el.name.toUpperCase()}
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div className="flex justify-around items-center mr-9 gap-9 text-white font-semibold	">
                    <p>
                        MOVIES
                    </p>
                    <p>
                        TV SHOWS
                    </p>
                    <p>
                        LOGIN
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header