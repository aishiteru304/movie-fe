import React, { useState } from 'react'
import SideBar from './SideBar'
import Uploader from '../../Components/Uploader'
import { UsedInput } from '../../Components/Input'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setDataUser } from '../../Redux/userSlice'
import { toast } from 'react-hot-toast'

export default function Profile() {
    const [avatar, setAvatar] = useState('')
    const [fullName, setFullName] = useState("")
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleUpload = (data) => {
        setAvatar(data)
    }

    const handleUploadProfile = () => {
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, { fullName, image: avatar }, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
            }
        })
            .then(res => {
                dispatch(setDataUser(res.data))
                sessionStorage.setItem('user', JSON.stringify(res.data))
                toast("Updated successfully", { style: { color: 'green', fontWeight: '300' } })
            })
            .catch(err => console.log(err))

    }

    const handleDeleteAccount = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
            }
        })
            .then(() => {
                sessionStorage.removeItem('user')
                toast("Deleted account successfully", { style: { color: 'green', fontWeight: '300' } })
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            })
            .catch(err => console.log(err))
    }

    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Profile</h2>
                <Uploader onChange={handleUpload} />
                <UsedInput label="Full Name" type="text" placeholder="Netflix React Tailwind" bg={true} value={fullName} onChange={e => setFullName(e.target.value)} />

                <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
                    <button onClick={handleDeleteAccount} className='bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>Delete Account</button>
                    <button onClick={handleUploadProfile} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>Upload Profile</button>
                </div>
            </div>
        </SideBar>
    )
}
