import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailMovie, getRecomendationMovie, getReviewMovie, image_backdrop, image_url } from '../../api';
import { roundNumber } from '../../utils/math';
import dayjs from 'dayjs';
import ReviewCard from './components/reviewCard';
import DisplayCard from '../main/components/displayCard';

function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieData, setMovieData] = useState()
    const [movieReview, setMovieReview] = useState()
    const [movieRecomend, setMovieRecomend] = useState()

    const getMovieDetail = async () => {
        try {
            const data = await getDetailMovie(id)
            setMovieData(data?.data);
        }
        catch (error) { alert(error) }
    }
    const getReview = async () => {
        try {
            const data = await getReviewMovie(id)
            setMovieReview(data?.data?.results);
        }
        catch (error) { alert(error) }
    }
    const getRecomendation = async () => {
        try {
            const data = await getRecomendationMovie(id)
            setMovieRecomend(data?.data?.results);
        }
        catch (error) { alert(error) }
    }

    const movieDetail = (id) => {
        navigate(`detail/${id}`)
    }

    useEffect(() => {
        getMovieDetail()
        getReview()
        getRecomendation()
        return () => {
            setMovieData(undefined)
            setMovieReview(undefined)
        }
    }, [id])

    console.log(movieRecomend)

    return (
        <div className=' w-full'>
            <div
                style={{ height: '810px', backgroundImage: `url(${image_backdrop + movieData?.backdrop_path})` }}
                className='w-full opacity-20 inset-0 bg-cover bg-center z-0 -mt-16'>
            </div>

            <div className='-mt-18 z-40'>
                <div
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
                    className='h-20 flex justify-center items-center text-white'>
                    <img className=' mr-4' height={32} width={32} src={'/asset/Star.png'} alt='star' />
                    <p className='font-semibold text-4xl mr-3'>{roundNumber(movieData?.vote_average)}</p>

                    <div
                        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                        className='border-x px-6 mx-6'
                    >
                        <p className='text-white text-xs opacity-50 font-medium '>USER SCORE</p>
                        <p className='text-xs'>{movieData?.vote_average}</p>
                    </div>

                    <div>
                        <p className='text-white text-xs opacity-50 font-medium'>STATUS</p>
                        <p className='text-xs'>{movieData?.release_date ? "RELEASE" : "NOT RELEASE"}</p>
                    </div>

                    <div
                        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                        className='border-x px-6 mx-6'
                    >
                        <p className='text-white text-xs opacity-50 font-medium'>LANGUAGE</p>
                        <p className='text-xs'>{movieData?.spoken_languages[0]?.name?.toUpperCase()}</p>
                    </div>

                    <div>
                        <p className='text-white text-xs opacity-50 font-medium'>BUDGET</p>
                        <p className='text-xs'>${movieData?.budget?.toLocaleString(["en"])}</p>
                    </div>

                    <div
                        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                        className='border-l pl-6 ml-6'
                    >
                        <p className='text-white text-xs opacity-50 font-medium'>PRODUCTION</p>
                        <p className='text-xs'>{movieData?.production_companies[0]?.name?.toUpperCase()}</p>
                    </div>

                </div>
                <div className='z-50 absolute px-32 -mt-48'>
                    <div className='flex gap-6  '>
                        <img
                            className='drop-shadow-md'
                            width={220}
                            height={330}
                            alt='poster'
                            src={image_url + movieData?.poster_path} />
                        <div className='flex flex-col justify-between'>
                            <div>
                                <p className='font-semibold text-lg	text-white'>
                                    {dayjs(movieData?.release_date).format("YYYY")}
                                </p>
                                <p className='text-4xl font-semibold text-white'>{movieData?.title}</p>
                                <p className='text-white flex gap-2'>
                                    {movieData?.genres?.map((el, idx) =>
                                        <div key={el.name}>
                                            {el.name}
                                            {idx === movieData?.genres.length - 1 ? "" : ", "}
                                        </div>)}
                                </p>
                            </div>
                            <div>
                                <div className='text-red text-sm font-semibold'>
                                    Overview
                                </div>
                                <div style={{ maxWidth: '600px', maxHeight: '120px' }} className='text-ellipsis overflow-hidden' >
                                    {movieData?.overview}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div style={{ height: '600px' }} className="bg-white px-32 pt-44 ">
                    <div className='text-red text-sm font-semibold mb-6'>
                        REVIEW
                    </div>
                    <div className='flex flex-wrap justify-around'>
                        {movieReview?.slice(0, 2).map(el =>
                            <ReviewCard data={el} />
                        )}
                    </div>
                </div>
            </div>

            <div className='px-32 py-12'>
                <p className='text-white font-semibold mb-9  '>RECOMMENDATION MOVIES</p>
                <div className='flex justify-between '>
                    {movieRecomend?.slice(0, 5)?.map(el =>
                        <div>
                            <DisplayCard data={el}
                                onClick={() => movieDetail(el?.id)}
                            />
                            <div className='text-white text-ellipsis overflow-hidden mt-5'>
                                <p className='text-sm font-semibold '>{el?.title}</p>
                                <p
                                    className='text-gray text-xs'> {dayjs(el.release_date).format("YYYY")}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Detail