import React, { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io'

const Categories = [
    { title: "All Categories" },
    { title: "Action" },
    { title: "Darama" },
    { title: "Historical" },
    { title: "Science" },
    { title: "Romantic" },
]

const YearData = [
    { title: "Sort By Year" },
    { title: "1700 - 1800" },
    { title: "1801 - 1900" },
    { title: "1901 - 2000" },
    { title: "2001 - 2010" },
    { title: "2011 - 2030" },
]

const TimesData = [
    { title: "Sort By Hours" },
    { title: "1 - 5 Hours" },
    { title: "5 - 10 Hours" },
    { title: "10 - 15 Hours" },
    { title: "15 - 20 Hours" },
]

const RatesData = [
    { title: "Sort By Star" },
    { title: "1 Star" },
    { title: "2 Star" },
    { title: "3 Star" },
    { title: "4 Star" },
    { title: "5 Star" },
]

export default function Filters() {

    const [category, setCategory] = useState(Categories[0].title)
    const [year, setYear] = useState(YearData[0].title)
    const [times, setTimes] = useState(TimesData[0].title)
    const [rates, setRates] = useState(RatesData[0].title)

    useEffect(() => {
        console.log(category, year, times, rates)
    }, [category, year, times, rates])

    return (
        <div className='my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6'>

            <Listbox value={category} onChange={(value) => setCategory(value)}>
                <div className='relative'>
                    <Listbox.Button className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs'>
                        <span className='block truncate'>{category}</span>
                        <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                            <IoIosArrowDown className='w-5 h-5' />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className='absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {
                            Categories.map((item, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-subMain text-white' : 'text-main'}`} value={item.title}>{item.title}</Listbox.Option>
                            ))
                        }
                    </Listbox.Options>
                </div>
            </Listbox>

            <Listbox value={year} onChange={(value) => setYear(value)}>
                <div className='relative'>
                    <Listbox.Button className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs'>
                        <span className='block truncate'>{year}</span>
                        <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                            <IoIosArrowDown className='w-5 h-5' />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className='absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {
                            YearData.map((item, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-subMain text-white' : 'text-main'}`} value={item.title}>{item.title}</Listbox.Option>
                            ))
                        }
                    </Listbox.Options>
                </div>
            </Listbox>

            <Listbox value={times} onChange={(value) => setTimes(value)}>
                <div className='relative'>
                    <Listbox.Button className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs'>
                        <span className='block truncate'>{times}</span>
                        <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                            <IoIosArrowDown className='w-5 h-5' />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className='absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {
                            TimesData.map((item, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-subMain text-white' : 'text-main'}`} value={item.title}>{item.title}</Listbox.Option>
                            ))
                        }
                    </Listbox.Options>
                </div>
            </Listbox>

            <Listbox value={rates} onChange={(value) => setRates(value)}>
                <div className='relative'>
                    <Listbox.Button className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs'>
                        <span className='block truncate'>{rates}</span>
                        <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                            <IoIosArrowDown className='w-5 h-5' />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className='absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {
                            RatesData.map((item, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-subMain text-white' : 'text-main'}`} value={item.title}>{item.title}</Listbox.Option>
                            ))
                        }
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    )
}
