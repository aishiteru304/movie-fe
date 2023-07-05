import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UsedInput } from '../Input';
import Uploader from '../Uploader';
import toast from 'react-hot-toast';


export default function MainModal({ isOpen, setIsOpen, setCasts }) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('');

    const handleUpload = (data) => {
        setImage(data);
    };

    const handeleAdd = () => {
        if (name && image) {
            setCasts({ name, image })
            setName('')
            setImage('')
            setIsOpen(false)
        }
        else toast("Please enter required fields", { style: { color: 'red', fontWeight: '300' } })
    }

    return (
        <div>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 overflow-y-auto"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Click ở ngoài thì mất */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl opacity-100 scale-100">
                                <Dialog.Title as="h2" className="text-3xl font-bold">
                                    Create Cast
                                </Dialog.Title>

                                <div className='flex flex-col gap-6 text-left mt-6'>
                                    <UsedInput label={"Cast Name"} placeholder={"John Doe"} type={"text"} bg={true} value={name} onChange={e => setName(e.target.value)} />
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-border font-semibold text-sm'>Cast Image</p>
                                        <Uploader onChange={handleUpload} />
                                        <button onClick={handeleAdd} className='mt-4 w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>Add</button>
                                    </div>
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}


