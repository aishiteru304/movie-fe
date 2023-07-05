import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import Empty from '../Components/Empty'
import MovieInfo from '../Components/Single/MovieInfo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import Titles from '../Components/Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Components/Movie'
import { useSelector } from 'react-redux'

export default function SingleMovie() {
    let relativeMovies = []
    const { id } = useParams()
    const moviesData = useSelector(state => state.movie.movieList)
    const movie = moviesData.find((item) => item._id === id)
    if (movie)
        relativeMovies = moviesData.filter((item) => item.category === movie.category)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    return (
        <Layout>
            {
                movie ?
                    (
                        <>
                            <MovieInfo movie={movie} />
                            <div className='container mx-auto min-h-screen px-2 my-6'>
                                <MovieCasts movie={movie} />
                                <MovieRates movie={movie} />
                                <div className='my-16'>
                                    <Titles title="Relative Movies" Icon={BsCollectionFill} />
                                    <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                        {
                                            relativeMovies.map((item, index) => (
                                                <Movie movie={item} key={index} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className='bg-main h-[400px] flex items-center'>
                            <Empty bg="bg-main" />
                        </div>
                    )
            }
        </Layout>
    )
}
