import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import Empty from '../Components/Empty'
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function WatchPage() {

    const { id } = useParams()
    const moviesData = useSelector(state => state.movie.movieList)
    const movie = moviesData.find((item) => item._id === id)
    const favoriteData = useSelector(state => state.favorite.favoriteList)
    const favorite = favoriteData.some(item => item._id === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const [play, setPlay] = useState(false)

    return (
        <Layout>

            {
                movie ?
                    (

                        <div className='container mx-auto bg-dry p-6 mb-12'>
                            <div className='flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6'>
                                <Link to={`/movie/${id}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray'>
                                    <BiArrowBack /> {movie.name}
                                </Link>
                                <div className='flex-btn sm:w-auto w-full gap-5'>
                                    <button className={`bg-white hover:text-subMain transitions bg-opacity-30 ${favorite ? 'text-subMain' : 'text-white'} rounded px-4 py-3 text-sm`}>
                                        <FaHeart />
                                    </button>
                                    <a href='/img/movie.mp4' download={true} className='bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm'>
                                        <FaCloudDownloadAlt /> {" Download"}
                                    </a>
                                </div>
                            </div>

                            {
                                play ? (
                                    <video controls autoPlay className='w-full h-full rounded'>
                                        <source src='/img/movie.mp4' type='video/mp4' />
                                    </video>
                                )
                                    : (
                                        <div className='w-full h-screen rounded-lg overflow-hidden relative'>
                                            <div className='absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo'>
                                                <button onClick={() => setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                                                    <FaPlay />
                                                </button>
                                            </div>
                                            <img alt='' src={movie.titleImage} className='w-full h-full object-cover rounded-lg'></img>
                                        </div>
                                    )
                            }
                        </div>

                    )
                    : (
                        <div className='bg-main h-[400px] flex items-center'>
                            <Empty bg="bg-main" />
                        </div>
                    )
            }
        </Layout>
    )
}
