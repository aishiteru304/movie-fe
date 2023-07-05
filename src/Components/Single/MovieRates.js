import React, { useState } from 'react'
import { BsBookmarkStarFill } from 'react-icons/bs'
import Titles from '../Titles'
import Star from '../Star'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Ratings = [
    {
        title: '0 - Poor',
        value: 0,
    },
    {
        title: '1 - Fair',
        value: 1,
    },
    {
        title: '2 - Good',
        value: 2,
    },
    {
        title: '3 - Very Good',
        value: 3,
    },
    {
        title: '4 - Excellent',
        value: 4,
    },
    {
        title: '5 - Masterpiece',
        value: 5,
    },
]
export default function MovieRates({ movie }) {
    const [message, setMessage] = useState('')
    const [selectRating, setSelectRating] = useState(0)
    const userData = useSelector(state => state.user)

    const handleSubmit = () => {
        if (message) {
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/movies/reviews`, { id: movie._id, rating: selectRating, comment: message }, {
                headers: {
                    Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
                }
            })
                .then(() => {
                    window.location.reload()
                })


                .catch(err => {
                    toast("Reviews failed", { style: { color: 'red', fontWeight: '300' } })
                    console.log(err)
                })
        }
        else toast("Please review this movie", { style: { color: 'red', fontWeight: '300' } })
    }

    return (
        <div className='mt-12'>
            <Titles title="Reviews" Icon={BsBookmarkStarFill} />

            <div className='mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded'>
                <div className='xl:col-span-2 w-full flex flex-col gap-8'>
                    <h3 className='text-xl text-text font-semibold'>
                        {`Reviews ${movie.name}`}
                    </h3>
                    <p className='text-sm leading-7 font-medium text-border'>Write a review for this movie. It will be posted on this page. lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                    <div className='text-sm w-full'>
                        <label className='text-border font-semibold'>Select Rating</label>
                        <select value={selectRating} onChange={e => setSelectRating(e.target.value)} className='w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded'>
                            {
                                Ratings.map((item, index) => (
                                    <option key={index} value={item.value}>{item.title}</option>
                                ))
                            }
                        </select>
                        <div className='flex mt-4 text-lg gap-2 text-star'>
                            <Star value={selectRating} />
                        </div>
                    </div>

                    <div className='text-sm w-full'>
                        <label className='text-border font-semibold'>Message</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} className='w-full h-40 mt-2 p-6 bg-main border border-border rounded' placeholder='Make it short and sweet....'></textarea>
                    </div>

                    <button className='bg-subMain text-white py-3 w-full flex-colo rounded' onClick={handleSubmit}>Submit</button>
                </div>

                {/* Reviews */}
                <div className='col-span-3 flex flex-col gap-6'>
                    <h3 className='text-xl text-text font-semibold'>Reviews ({movie.reviews.length})</h3>
                    <div className='w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll'>
                        {
                            movie.reviews.map((item, index) => (
                                <div key={index} className='md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg'>
                                    <div className='col-span-2 bg-main hidden md:block'>
                                        <img alt='' src={item.userImage} className='w-full h-24 rounded-lg object-cover'></img>
                                    </div>
                                    <div className='col-span-7 flex flex-col gap-2'>
                                        <h2>{item.userName}</h2>
                                        <p className='text-xs leading-6 font-medium text-text'>{item.comment}</p>
                                    </div>
                                    <div className='col-span-3 flex-rows border-l border-border text-xs gap-1 text-star'>
                                        <Star value={item.rating} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
