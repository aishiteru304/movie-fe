import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaSearch, FaHeart } from 'react-icons/fa'
import { CgUser } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'


export default function NavBar() {
    const userData = useSelector(state => state.user)
    const favoriteData = useSelector(state => state.favorite.favoriteList)
    const hover = 'hover:text-subMain transitions text-white'
    const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover)

    const [search, setSearch] = useState("")
    const handleSearch = () => {
        if (search) {
            window.location.href = `/findmovie/${search}`
        }
        else toast("Please enter the name of the movie.", { style: { color: 'red', fontWeight: '300' } })
    }
    return (
        <>
            <div className='bg-main shadow-md sticky top-0 z-20'>
                <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
                    {/* Logo section */}
                    <div className='col-span-1 lg:block hidden'>
                        <Link to='/'>
                            <img alt='' src='/img/logo.png' className='w-full h-12 object-contain'></img>
                        </Link>
                    </div>

                    {/* Search section */}
                    <div className='col-span-3'>
                        <div className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                            <button onClick={handleSearch} type='submit' className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                                <FaSearch />
                            </button>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search Moive Name from here' className='font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black'></input>
                        </div>
                    </div>

                    {/* Menu section */}
                    <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
                        <NavLink to='/movies' className={Hover}>
                            Movies
                        </NavLink>

                        <NavLink to='/about-us' className={Hover}>
                            About Us
                        </NavLink>

                        <NavLink to='/contact-us' className={Hover}>
                            Contact Us
                        </NavLink>


                        {
                            userData.image ?
                                <NavLink to='/profile' className='text-white '>
                                    <img alt='' src={userData.image} className='w-8 h-8 rounded-full' />
                                </NavLink>
                                :
                                <NavLink to='/login' className={Hover}>
                                    <CgUser className='w-8 h-8' />
                                </NavLink>

                        }


                        <NavLink to='/favorite' className='relative'>
                            <FaHeart className='w-6 h-6' />
                            <div className='w-5 h-5 rounded-full bg-subMain text-white flex-colo absolute text-xs -top-5 -right-1'>{userData.fullName ? favoriteData.length : '0'}</div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
