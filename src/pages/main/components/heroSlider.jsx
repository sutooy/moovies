import React, { } from 'react'
import Slider from "react-slick";
import { image_url } from '../../../api';
import { roundNumber } from '../../../utils/math';
import dayjs from 'dayjs';
import { genres } from '../../variable';
import '../../../styles/components.scss'

function HeroSlider({ data }) {
    console.log(data)
    const settings = {
        dots: true,
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 2,
        speed: 1000,
        autoplay: true,

    };
    const checkGenre = (data) => {
        let genre = []
        data?.forEach((el, idx) => {
            if (genres.some((item) => item.id === el)) {
                genre.push(genres[idx].name)
            }
        });
        return genre[0]
    }
    const card = (data) => {
        return <div className="flex flex-row items-center" >
            <img
                width={240} height={350} alt='' src={image_url + data?.poster_path} />
            <div style={{ height: '300px', width: '350px' }} className='bg-black p-4'>
                <div className='flex items-center gap-3'>
                    <img height={32} width={32} src={'/asset/Star.png'} alt='star' />
                    <p className='text-white font-bold text-3xl '>
                        {roundNumber(data?.vote_average)}
                    </p>
                </div>
                <p className='text-white font-medium text-3xl ' >{data?.title}</p>
                <div className='flex items-center my-3'>
                    <p className='text-white    ' >{dayjs(data?.release_year).format("YYYY")}</p>
                    &nbsp;
                    <span className='h-2 w-2 rounded-full bg-gray' />
                    &nbsp;
                    <p className='text-white  ' >{checkGenre(data.genre_ids)}</p>
                </div>
                <div
                    style={{ textWrap: 'wrap', height: '200px' }}
                    className='text-ellipsis overflow-auto  '>
                    <p className='text-white text-xs'>{data?.overview}</p>
                </div>
            </div>
        </div>
    }
    return (
        <div style={{ height: '500px' }} className="image-slider py-20">


            <Slider {...settings} className="flex  w-full">
                {data?.map((el, index) =>
                    <div key={el.title} className=" adjust" >
                        {card(el)}
                    </div>
                )}
            </Slider>
        </div>
    )
}

export default HeroSlider