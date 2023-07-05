import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { UsedInput } from '../../../Components/Input'
import Uploader from '../../../Components/Uploader'
import { Categories } from '../../../Data/Categories'
import CastModal from '../../../Components/Modals/CastModal'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'


export default function AddMovie() {

    const userData = useSelector(state => state.user)

    const [addCast, setAddCast] = useState(false)
    const [casts, setCasts] = useState()
    const [listCast, setListCast] = useState([])

    const [name, setName] = useState("")
    const [time, setTime] = useState("")
    const [language, setLanguage] = useState("")
    const [year, setYear] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState(Categories[0])
    const [image, setImage] = useState("")
    const [titleImage, setTitleImage] = useState("")



    useEffect(() => {
        if (casts)
            setListCast(prev => [...prev, casts])
    }, [casts])

    const handleDelete = (index) => {
        const newListCast = [...listCast];
        newListCast.splice(index, 1);
        setListCast(newListCast);
    }

    const handlePublishMovie = () => {
        if (name && time && year && language && category && desc && image && titleImage) {
            const data = { name, time, year, language, desc, category, image, titleImage, rate: 0, numberOfReviews: 0, reviews: [], casts: listCast }
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/movies`, data, {
                headers: {
                    Authorization: `Bearer ${userData.token}` // Gửi token trong header Authorization
                }
            })
                .then(res => toast(res.data.message, { style: { color: 'green', fontWeight: '300' } }))
                .catch(err => {
                    toast("Publish movie failed")
                    console.log(err)
                })
        }
        else toast("Please fill in all the fields.", { style: { color: 'red', fontWeight: '300' } })
    }

    return (
        <SideBar>

            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Create Movie</h2>
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <UsedInput type="text" label="Movie Title" placeholder="Game of Thones" bg={true} value={name} onChange={(e) => setName(e.target.value)} />
                    <UsedInput type="text" label="Hours" placeholder="2hr" bg={true} value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <UsedInput type="text" label="Language" placeholder="English" bg={true} value={language} onChange={(e) => setLanguage(e.target.value)} />
                    <UsedInput type="text" label="Year of Release" placeholder="2022" bg={true} value={year} onChange={(e) => setYear(e.target.value)} />
                </div>

                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>Image without Title</p>
                        <Uploader onChange={(data) => setImage(data)} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>Image with Title</p>
                        <Uploader onChange={(data) => setTitleImage(data)} />
                    </div>
                </div>

                <div className='text-sm w-full'>
                    <label className='text-border font-semibold'>Movie Description</label>
                    <textarea className='w-full h-40 mt-2 p-6 bg-main border border-border rounded' placeholder='Make it short and sweet' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>

                <div className='text-sm w-full'>
                    <label className='text-border font-semibold'>Movie Categories</label>
                    <select className='w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded' value={category} onChange={(e) => setCategory(e.target.value)} >
                        {
                            Categories.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))
                        }
                    </select>
                </div>

                {/* <div className='flex flex-col gap-2 w-full '>
                    <label className='text-border font-semibold text-sm'>Movie video</label>
                    <UploaderVideo onChange={(data) => setVideo(data)} />
                </div> */}

                <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
                    <button onClick={() => setAddCast(true)} className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>Add Cast</button>
                    <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
                        {
                            listCast.length ? (
                                listCast.map((item, index) => (
                                    <div className='p-2 italic text-xs text-text rounded flex-colo bg-main border border-border' key={index}>
                                        <img alt='' src={item?.image} className='w-full h-24 object-cover rounded mb-2'></img>
                                        <p>{item?.name}</p>
                                        <div className='flex-rows mt-2 w-full gap-2'>
                                            <button onClick={() => handleDelete(index)} className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded'>
                                                <RiDeleteBin7Fill />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (<></>)
                        }
                    </div>
                </div>

                <button onClick={handlePublishMovie} className='bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded'>Publish Movie</button>
            </div>
            <CastModal isOpen={addCast} setIsOpen={setAddCast} setCasts={setCasts} />

        </SideBar>

    )
}
