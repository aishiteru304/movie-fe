import React from 'react'
import Titles from '../Titles'
import { FaUserFriends } from 'react-icons/fa'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'


export default function MovieCasts({ movie }) {
    return (
        <div className='my-12'>
            <Titles title="Casts" Icon={FaUserFriends} />
            <div className='mt-10'>
                <Swiper
                    loop={true}
                    speed={1000}
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        },
                    }}
                >
                    {
                        movie.casts.map((cast, index) => (
                            <SwiperSlide key={index}>
                                <div className='w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800'>
                                    <img alt='' src={cast.image} className='w-full h-64 object-cover rounded mb-4'></img>
                                    <p>{cast.name}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}
