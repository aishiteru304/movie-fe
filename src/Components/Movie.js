import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setDataFavorites } from '../Redux/favoriteSlice'

export default function Movie({ movie }) {
    const favoriteData = useSelector(state => state.favorite.favoriteList)
    const favorite = favoriteData.some(item => item._id === movie._id)
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLiked = () => {
        if (userData.token) {
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/favorites`, { movieId: movie._id }, {
                headers: {
                    Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
                }
            })
                .then(res => dispatch(setDataFavorites(res.data)))
                .catch(err => console.log(err))
        }
        else toast("Please login to like this movie", { style: { color: 'red', fontWeight: '300' } })
    }
    return (
        <>
            <div className='border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden'>
                <Link to={`/movie/${movie._id}`} className='w-full'>
                    <img alt='' src={movie.image} className='w-full h-64 object-cover'></img>
                </Link>
                <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3'>
                    <h3 className='font-semibold truncate'>{movie.name}</h3>
                    <button onClick={handleLiked} className={`h-9 w-9 text-sm flex-colo transitions ${favorite ? 'bg-subMain pointer-events-none' : 'bg-transparent'} border-2 border-subMain rounded-md hover:bg-subMain text-white`}>
                        <FaHeart />
                    </button>
                </div>
            </div>
        </>
    )
}
