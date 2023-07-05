import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { FiUploadCloud } from 'react-icons/fi'
import { ImagetoBase64 } from '../Utility/ImageToBase64'

export default function Uploader({ onChange }) {
    const [src, setSrc] = useState()
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 1000000,
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length > 0 && isImage(acceptedFiles[0].name)) {
                const data = await ImagetoBase64(acceptedFiles[0])
                setSrc(data)
                onChange(data)
            }
            else toast("Upload failed", { style: { color: 'red', fontWeight: '300' } })
        },
    })


    const isImage = (name) => {
        return (name.includes("jpg") || name.includes("png") || name.includes("jpeg") || name.includes("webp"))
    }

    return (
        <div className='w-full text-center'>
            <div
                {...getRootProps()}
                className='px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer'>
                <input {...getInputProps()} />
                {
                    src && <img alt='' src={src} className='w-20 h-20 object-cover mx-auto'></img>
                }
                {
                    !src && <>
                        <span className='mx-auto flex-colo text-subMain text-3xl'><FiUploadCloud /></span>
                        <p className='text-sm mt-2'>Drag your image here</p>
                        <em className='text-xs text-border'>(only .jpg and .png files will be accepted)</em>
                    </>
                }
            </div>
        </div>
    )
}
