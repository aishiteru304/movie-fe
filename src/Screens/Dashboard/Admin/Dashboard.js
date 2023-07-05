import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { FaEdit, FaRegListAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HiViewGridAdd } from 'react-icons/hi'
import Empty from '../../../Components/Empty'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ths = ['image', 'name', 'category', 'language', 'year', 'hour', 'actions']

export default function Dashboard() {
    const moviesData = useSelector(state => state.movie.movieList)
    const userData = useSelector(state => state.user)
    const [totalUser, setTotalUser] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
            }
        })
            .then(res => {
                setTotalUser(res.data.users.length)
            })
            .catch(err => {
                console.log(err)
            })
    }, [userData.token])

    return (
        <SideBar>

            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Dashboard</h2>
                </div>
                {
                    moviesData[0] ?
                        (
                            <>
                                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                                    <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                                        <div className='col-span-1 rounded-full h-12 w-12 flex-colo bg-orange-600'>
                                            <FaRegListAlt />
                                        </div>
                                        <div className='col-span-3'>
                                            <h2>Total Movies</h2>
                                            <p className='mt-2 font-bold'>{moviesData.length}</p>
                                        </div>
                                    </div>
                                    <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                                        <div className='col-span-1 rounded-full h-12 w-12 flex-colo bg-blue-700'>
                                            <HiViewGridAdd />
                                        </div>
                                        <div className='col-span-3'>
                                            <h2>Total Categories</h2>
                                            <p className='mt-2 font-bold'>{new Set(moviesData.map(({ category }) => category)).size}</p>
                                        </div>
                                    </div>
                                    <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                                        <div className='col-span-1 rounded-full h-12 w-12 flex-colo bg-green-600'>
                                            <FaUser />
                                        </div>
                                        <div className='col-span-3'>
                                            <h2>Total Users</h2>
                                            <p className='mt-2 font-bold'>{totalUser}</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className='text-md font-medium my-6 text-border'>Recent Movies</h3>
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
                                                moviesData.map((movie, index) => (
                                                    <tr key={index}>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3'>
                                                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                                                <img alt='' src={movie.image} className='w-full h-full object-cover'></img>
                                                            </div>
                                                        </td>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate'><Link to={`/movie/${movie.id}`}>{movie.name}</Link></td>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.category}</td>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.language}</td>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.year}</td>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.time}</td>
                                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 float-right flex-rows gap-2'>
                                                            <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                                                                {"Edit "}
                                                                <FaEdit className='text-green-500' />
                                                            </button>

                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) :
                        (
                            <Empty bg="bg-main" />
                        )
                }
            </div>

        </SideBar>
    )
}
