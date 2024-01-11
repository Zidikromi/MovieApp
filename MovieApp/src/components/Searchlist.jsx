import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { searchAll } from '../api';

import PopularMovieList from './PopularMovie';
import NavigationAndSearch from './SearchAll';
import { useNavigate } from 'react-router-dom';
import PopularTvList from './PopularTv';
import TrendingTvList from './TrendingTv';


const imageurl = 'https://image.tmdb.org/t/p/w500';

const ListAll = () => {
  const [popularMovies2, setPopularMovies2] = useState([]);

  const navigate = useNavigate();

  const SearchList = () => {
    return popularMovies2.map((content, i) => {
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
  };

  const search = async (q) => {
    try {
      if (q.length > 3) {
        const searchResults = await searchAll(q);
        setPopularMovies2(searchResults);
      } else {
        // Clear search results when the search query is less than 3 characters
        setPopularMovies2([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <>
      <div className="">
        
        <div className="flex justify-center flex-col">
          <NavigationAndSearch onNavigate={navigate} onSearch={search} />

          <div className="mt-3 gap-3">
            {popularMovies2.length > 0 ? (
              // Display SearchList if there are search results
              <div className="flex justify-center mt-5 gap-3  flex-wrap ">
                <SearchList />
              </div>
            ) : (
              // Display PopularMovieList if no search results
              <div className="">
                <div>
                <h2 className='text-xl font-bold text-[#f5c518]'>Popular Movie</h2>
                <PopularMovieList />
                </div>
                <div className="mt-2">
                <h2 className='text-xl font-bold text-[#f5c518] '>Popular TV Shows</h2>
                <PopularTvList />
                </div>
                <div className="mt-2">
                <h2 className='text-xl font-bold text-[#f5c518]'>Trending TV Shows</h2>
                <TrendingTvList />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAll;
