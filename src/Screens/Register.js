import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { UsedInput } from '../Components/Input'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Register() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = () => {
        if (email && password && fullName && confirmPassword) {
            if (password === confirmPassword) {
                axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/`, { email, password, fullName })
                    .then(() => {
                        toast("Register successfully", { style: { color: 'green', fontWeight: '300' } })
                        setTimeout(() => {
                            window.location.href = '/login'
                        }, 1000)
                    })
            }
            else toast("Password and confirm password not equal.", { style: { color: 'red', fontWeight: '300' } })

        }
        else toast("Please fill in all the fields.", { style: { color: 'red', fontWeight: '300' } })
    }
    return (
        <Layout>
            <div className='container mx-auto px-2 my-24 flex-colo'>
                <div className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border'>
                    <img alt='' src='/img/logo.png' className='w-full h-12 object-contain'></img>

                    <UsedInput label="Full Name" type="text" placeholder="Netflix React Tailwind" bg={true} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <UsedInput label="Email" type="email" placeholder="netflixo@gmail.com" bg={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <UsedInput label="Password" type="password" placeholder="**********" bg={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <UsedInput label="Confirm Password" type="password" placeholder="**********" bg={true} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <div onClick={handleRegister} className=' cursor-pointer bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
                        <FiLogIn />
                        {" Sign Up"}
                    </div>

                    <p className='text-center text-border'>
                        {"Already have an account?"}
                        <Link to='/login' className='text-dryGray font-semibold ml-2'>Sign In</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}
