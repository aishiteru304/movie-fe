import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Listbox } from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io'
import Movie from '../Components/Movie'
import Empty from '../Components/Empty'
import { useSelector } from 'react-redux'


const Categories = [
    { title: "All Categories" },
    { title: "Action" },
    { title: "Drama" },
    { title: "Historical" },
    { title: "Science" },
    { title: "Romantic" },
]

const YearData = [
    { title: "Sort By Year" },
    { title: "1901 - 2000" },
    { title: "2001 - 2010" },
    { title: "2011 - 2015" },
    { title: "2016 - 2020" },
    { title: "2021 - 2023" },
]

const TimesData = [
    { title: "Sort By Hours" },
    { title: "1 - 2 Hours" },
    { title: "3 - 4 Hours" },
    { title: "5 - 6 Hours" },
    { title: "7 - 20 Hours" },
]

const RatesData = [
    { title: "Sort By Star" },
    { title: "1 Star" },
    { title: "2 Star" },
    { title: "3 Star" },
    { title: "4 Star" },
    { title: "5 Star" },
]

export default function Movies() {

    const moviesData = useSelector(state => state.movie.movieList)


    const [category, setCategory] = useState(Categories[0].title)
    const [year, setYear] = useState(YearData[0].title)
    const [times, setTimes] = useState(TimesData[0].title)
    const [rates, setRates] = useState(RatesData[0].title)
    const [data, setData] = useState(moviesData)



    useEffect(() => {
        let temp = moviesData
        if (category !== Categories[0].title) {
            temp = moviesData.filter((item) => item.category === category)
        }
        if (year !== YearData[0].title) {
            const yearLimit = year.split(' - ')
            temp = temp.filter((item) => item.year >= yearLimit[0] && item.year <= yearLimit[1])
        }
        if (times !== TimesData[0].title) {
            const timesLimit = times.replace(" Hours", "").split(' - ')
            temp = temp.filter((item) => parseFloat(item.time.split('hr')[0]) >= parseFloat(timesLimit[0]) && parseFloat(item.time.split('hr')[0]) <= parseFloat(timesLimit[1]))
        }
        if (rates !== RatesData[0].title) {
            temp = temp.filter((item) => parseFloat(item.rate) >= parseFloat(rates[0]))
        }
        setData(temp)
    }, [category, year, times, rates, moviesData])

    return (
        <Layout>
            <div className='min-height-screen container mx-auto px-2 my-6'>
                {/* Filter section */}
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

                {/* Movie section */}
                <p className='text-lg font-medium my-6'>
                    {"Total "}
                    <span className='font-bold text-subMain'>{data.length}</span>
                    {" items Found"}
                </p>

                {
                    data[0] ? (
                        <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                            {
                                data.map((movie, index) => (
                                    <Movie movie={movie} key={index} />
                                ))

                            }
                        </div>
                    ) : (
                        <Empty bg="bg-main" />
                    )
                }



            </div>
        </Layout>
    )
}
