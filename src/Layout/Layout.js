import React from 'react'
import NavBar from './Navbar/Navbar'
import Footer from './Footer/Footer'

export default function Layout({ children }) {
    return (
        <>
            <div className='bg-main text-white'>
                <NavBar />
                {children}
                <Footer />
            </div>
        </>
    )
}
