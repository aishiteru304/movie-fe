import React from 'react'
import Titles from '../Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Movie'
import { useSelector } from 'react-redux'
import Empty from '../Empty'

export default function PopularMovies() {
    const moviesData = useSelector(state => state.movie.movieList)
    const moviesPopular = [...moviesData].sort((a, b) => b.numberOfReviews - a.numberOfReviews).slice(0, 8)
    return (
        <div className='my-16'>
            <Titles title="Popular Movies" Icon={BsCollectionFill} />
            {
                moviesPopular[0] ?
                    (
                        <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                            {
                                moviesPopular.slice(0, 8).map((movie, index) => (
                                    <Movie key={index} movie={movie} />
                                ))
                            }
                        </div>
                    ) :
                    (
                        <Empty bg="bg-main" />
                    )

            }
        </div>
    )
}
