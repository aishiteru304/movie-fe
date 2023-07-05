import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const ths = ['image', 'id', 'date', 'full name', 'email', 'actions']
export default function User() {

    const userData = useSelector(state => state.user)
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
            }
        })
            .then(res => setUsersData(res.data.users)
            )
            .catch(err => {
                console.log(err)
            })
    }, [userData.token])

    const handleDeleteUser = (id) => {
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/remove`, { id }, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
            }
        })
            .then(res => {
                setUsersData(res.data.users)
                toast("Deleted user successfully", { style: { color: 'green', fontWeight: '300' } })
            }
            )
            .catch(err => {
                console.log(err)
                toast("Deleted user failed", { style: { color: 'red', fontWeight: '300' } })
            })
    }


    return (
        <SideBar>

            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Users</h2>
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
                            {usersData && usersData[0] &&
                                usersData.map((user, index) => (
                                    <tr key={index}>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3'>
                                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                                <img alt='' src={user.image} className='w-full h-full object-cover'></img>
                                            </div>
                                        </td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user._id}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user.createdAt.slice(0, 10)}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user.fullName}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user.email}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 float-right flex-rows gap-2'>
                                            <button onClick={() => handleDeleteUser(user._id)} className='bg-subMain text-white rounded flex-colo w-6 h-6 mr-4'>
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
