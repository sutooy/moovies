import dayjs from 'dayjs'
import React from 'react'
import DisplayCard from '../../main/components/displayCard'

function ReviewCard({ data }) {
    return (
        <div
            className='  p-4   rounded-2xl	'
            style={{ height: '284px', width: '582px', boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.1)' }}
        >

            <div className='flex justify-between'>
                <div className='flex gap-3 items-center'>
                    <div
                        style={{ background: 'rgba(30, 35, 43, 0.21)' }}
                        className='rounded-full bg-black h-12 w-12'>
                        <img src={data?.author_details?.avatar_path} alt="" />
                    </div>
                    <div>
                        <p className='text-sm font-bold'>{data?.author}</p>
                        <p
                            className='text-xs font-semibold text-gray'
                        >
                            {dayjs(data?.created_at).format("MMMM DD, YYYY")}
                        </p>
                    </div>
                </div>
                <div
                    style={{ background: 'rgba(196, 196, 196, 0.28)' }}
                    className='flex px-4 py-2 rounded-lg'>
                    <img className=' h-4' src={'/asset/Star.png'} alt='star' />
                    <p className='text-4xl font-semibold'>{data?.author_details?.rating}</p>
                </div>
            </div>

            <div
                style={{ textWrap: 'wrap', height: '200px' }}
                className=' text-ellipsis overflow-hidden    '>
                <p className='italic text-sm pt-7 leading-6  '>
                    {data?.content}
                </p>
            </div>
        </div >
    )
}

export default ReviewCard