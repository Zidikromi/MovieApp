import React, { useEffect, useState } from 'react'

import Cardmovie from '../components/Cardmovie'
import { FaStar} from "react-icons/fa6";
import { getMovieDetail, getMovieList,searchMovie } from '../api'
import MovieDetail from './DetailMovie';
import { Navigate, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const imageurl = "https://image.tmdb.org/t/p/w500"
  const navigate = useNavigate()

    useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
    }, [])

    const PopularMovieList = () => {
      return popularMovies.map((movie, i) => {
        return(
          <a className="card card-compact w-72 p-0 shadow-xl cursor-pointer" key={i} onClick={() => navigate(`/movie/${movie.id}`)}>
          <figure>   <img className='Movie-image' src={`${imageurl}/${movie.poster_path}`} alt="" /></figure>
          <div className="card-body">
            <h2 className="Movie-title font-bold text-lg ">{movie.title}</h2>
            <p className='Movie-date'>{movie.release_date}</p>
            <div className="card-actions justify-center">
              <div className="flex justify center items-center gap-1">
           <p className='Movie-rate'>{movie.vote_average} </p><FaStar color='orange'/>
           </div>
    </div>
  </div>
</a>
        )
      })
    }


    const search = async (q) => {
      try{
        if (q.length > 3) {

    
        const querymovie = await searchMovie(q)
        setPopularMovies(querymovie.results)
       } 
      }catch (error){
        console.error('Error Searching Movies:', error)
      }
       
    }

  return (
    <div>
      

        <div className='flex justify-center flex-col '>
        <button className="font-bold justify-center flex btn w-44 text-white bg-accent hover:bg-black" onClick={() => navigate(`/tvshow`)}>Series Search disini</button>
          
        <h1 className="font-bold">Movie</h1>
      
        <div className=' flex justify-center flex-col'>
        <input type="text" placeholder="Search" className="input input-bordered rounded-3xl w-full max-w-xs h-10 mt-3  " 
        onChange={({target}) => search(target.value)}
        />
        <div className="flex justify-center mt-5 gap-3  flex-wrap ">
      
          <PopularMovieList/>

        </div>
        </div>
        </div>
    </div>
  )
}

export default Dashboard