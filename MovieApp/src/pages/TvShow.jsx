import React, { useEffect, useState } from 'react'
import Cardmovie from '../components/Cardmovie'
import { FaStar } from "react-icons/fa6";
import { getMovieDetail, getMovieList, getTvList, searchAll, searchMovie, searchTv } from '../api'
import MovieDetail from './DetailMovie';
import { Navigate, useNavigate } from 'react-router-dom';

const TvShow = () => {
  const [popularTv, setPopularTv] = useState([])
  const imageurl = "https://image.tmdb.org/t/p/w500"
  const navigate = useNavigate()

  useEffect(() => {
    getTvList().then((result) => {
      setPopularTv(result)
    })
  }, [])

  const PopularTvList = () => {
    return popularTv.map((content, i) => {
      const contentType = content.media_type || 'movie';
      return (
        <a
          className="card card-compact w-72 p-0 shadow-xl cursor-pointer"
          key={i}
          onClick={() => {
            if (contentType === 'tv') {
              navigate(`/tv/${content.id}`);
            } else {
              navigate(`/${contentType}/${content.id}`);
            }
          }}
        >
          <figure>
            <img className="Movie-image" src={`${imageurl}/${content.poster_path}`} alt="" />
          </figure>
          <div className="card-body">
            <h2 className="Movie-title font-bold text-lg ">{content.title || content.name}</h2>
            <p className="Movie-date">{content.release_date}{content.first_air_date}</p>
            <div className="card-actions justify-center">
              <div className="flex justify center items-center gap-1">
                <p className="Movie-rate">{content.vote_average.toFixed(1)} </p>
                <FaStar color="orange" />
              </div>
            </div>
          </div>
        </a>
      );
    });
  }


  const search = async (q) => {
    try {
      if (q.length > 3) {
        const searchResults = await searchAll(q);
        setPopularTv(searchResults);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-center flex-col '>
        <div className="flex flex-row md:px-20 px-6">
          <div className="flex mr-auto ">
            <input
              type="text"
              placeholder="Search"
              className="input input-error hover:border-red-600 border-gray-600 transition-all rounded-3xl w-[275px]  h-10 mt-3 "
              onChange={({ target }) => search(target.value)}
            />
          </div>
          <div className="gap-5 mt-5 ml-3 hidden lg:flex">
            <p
              className="font-bold justify-center flex  text-red-600  hover:text-red-900  transition-all cursor-pointer"
              onClick={() => navigate(`/tvshow`)}
            >
              TV Shows
            </p>
            <p
              className="font-bold justify-center flex  text-red-600  hover:text-red-900 transition-all cursor-pointer "
              onClick={() => navigate(`/`)}
            >
              Popular
            </p>
            <p
              className="font-bold justify-center flex  text-red-600  hover:text-red-900 transition-all cursor-pointer "
              onClick={() => navigate(`/nowplaying`)}
            >
              Now Playing
            </p>
            <p
              className="font-bold justify-center flex  text-red-600  hover:text-red-900 transition-all cursor-pointer "
              onClick={() => navigate(`/upcoming`)}
            >
              Upcoming
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-5 gap-3  flex-wrap ">

          <PopularTvList />

        </div>

      </div>
    </div>
  )
}

export default TvShow