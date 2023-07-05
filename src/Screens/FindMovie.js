import React from 'react'
import Layout from '../Layout/Layout'
import Movie from '../Components/Movie'
import Empty from '../Components/Empty'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function FindMovie() {
    const moviesData = useSelector(state => state.movie.movieList)

    const { name } = useParams()
    const findMovies = moviesData.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))

    return (
        <Layout>
            <div className='container mx-auto min-h-[400px] px-2 mb-6'>
                <p className='text-lg font-medium my-6'>
                    {"Total "}
                    <span className='font-bold text-subMain'>{findMovies.length}</span>
                    {" items Found"}
                </p>

                {
                    findMovies[0] ? (
                        <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                            {
                                findMovies.map((movie, index) => (
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
