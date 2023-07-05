import React, { useState } from 'react'
import Titles from '../Titles'
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import Rating from '../Star'
import 'swiper/swiper-bundle.css';
import Empty from '../Empty'
import { useSelector } from 'react-redux'

export default function TopRated() {

    const moviesData = useSelector(state => state.movie.movieList)
    const moviesTopRate = [...moviesData].sort((a, b) => b.rate - a.rate).slice(0, 8)

    const breakpoints = {
        640: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
        1280: {
            slidesPerView: 4
        }
    };

    const [nextEl, setNextEl] = useState(null)
    const [prevEl, setPrevEl] = useState(null)
    return (
        <div className='my-16'>
            <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
            {
                moviesTopRate[0] ?
                    (
                        <div className='mt-10'>
                            <Swiper
                                breakpoints={breakpoints}
                                navigation={{ nextEl, prevEl }}
                                spaceBetween={40}
                                loop={true}
                                speed={1000}
                                modules={[Navigation, Autoplay]}
                                autoplay={true}
                            >
                                {
                                    moviesTopRate.map((movie, index) => (
                                        <SwiperSlide key={index}>
                                            <div className='p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden'>
                                                <img alt='' src={movie.image} className='w-full h-full object-cover rounded-lg select-none'></img>
                                                <div className='px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>

                                                    <Link to={`/movie/${movie._id}`} className='font-semibold text-xl trancuted line-clamp-2'>{movie.name}</Link>
                                                    <div className='flex gap-2 text-star'>
                                                        <Rating value={movie?.rate} />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>

                            <div className='w-full px-1 flex-rows gap-6 pt-12'>
                                <button className='hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white' ref={(node) => setPrevEl(node)}>
                                    <BsCaretLeftFill />
                                </button>

                                <button className='hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white' ref={(node) => setNextEl(node)}>
                                    <BsCaretRightFill />
                                </button>
                            </div>
                        </div>
                    ) :
                    (
                        <Empty bg="bg-main" />
                    )
            }
        </div>
    )
}
