import React from 'react'
import SideBar from './SideBar'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setDataFavorites } from '../../Redux/favoriteSlice'


const ths = ['image', 'name', 'category', 'language', 'year', 'hour', 'actions']
export default function FavoritesMovies() {
    const favoriteData = useSelector(state => state.favorite.favoriteList)
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleDelete = (movieId) => {
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/favorites`, { movieId }, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
            }
        })
            .then(res => dispatch(setDataFavorites(res.data)))
            .catch(err => console.log(err))
    }

    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Favorites Movie</h2>
                    {/* <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>Delete All</button> */}
                </div>

                <div className='overflow-x-scroll overflow-hidden relative w-full'>
                    <table className='w-full table-auto border border-border divide-y divide-border'>
                        <thead>
                            <tr className='bg-dryGray'>
                                {
                                    ths.map((item, index) => (
                                        <th key={index} className='text-xs text-left text-main font-semibold px-6 py-2 uppercase'>{item}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className='bg-main divide-y divide-gray-800'>
                            {
                                favoriteData[0] &&
                                favoriteData.map((movie, index) => (
                                    <tr key={index}>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3'>
                                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                                <img alt='' src={movie.image} className='w-full h-full object-cover'></img>
                                            </div>
                                        </td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate'><Link to={`/movie/${movie._id}`}>{movie.name}</Link></td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.category}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.language}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.year}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.time}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 float-right flex-rows gap-2'>
                                            <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                                                {"Download "}
                                                <FaCloudDownloadAlt className='text-green-500' />
                                            </button>
                                            <button onClick={() => handleDelete(movie._id)} className='bg-subMain text-white rounded flex-colo w-6 h-6'>
                                                <RiDeleteBin7Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </SideBar>
    )
}

