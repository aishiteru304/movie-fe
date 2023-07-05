import React, { useState } from 'react'
import SideBar from './SideBar'
import { UsedInput } from '../../Components/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function Password() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const userData = useSelector(state => state.user)

    const handleChangePassword = () => {
        if (oldPassword && newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/password`, { oldPassword, newPassword }, {
                    headers: {
                        Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
                    }
                })
                    .then(res => {
                        toast(res.data.message, { style: { color: 'green', fontWeight: '300' } })
                    })
                    .catch(err => {
                        console.log(err)
                        toast("Password change failed", { style: { color: 'red', fontWeight: '300' } })
                    })
            }
            else toast("Password and confirm password not equal.", { style: { color: 'red', fontWeight: '300' } })

        }

        else toast("Please fill in all the fields.", { style: { color: 'red', fontWeight: '300' } })

    }
    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Password</h2>
                <UsedInput label="Previous Password" type="password" placeholder="**********" bg={true} value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                <UsedInput label="New Password" type="password" placeholder="**********" bg={true} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <UsedInput label="Confirm Password" type="password" placeholder="**********" bg={true} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />


                <div className='flex justify-end items-center my-4'>
                    <button onClick={handleChangePassword} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>Change Password</button>
                </div>
            </div>
        </SideBar>
    )
}
