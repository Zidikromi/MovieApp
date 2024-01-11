import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { getMovieList, getTvDiscover, getTvList, searchAll } from '../api';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';

import NavigationAndSearch from '../components/SearchAll';
import MySwiper from '../components/swiper';
import PopularMovieList from '../components/PopularMovie';
import ListAll from '../components/Searchlist';

const Dashboard = () => {
  // const [popularMovies, setPopularMovies] = useState([]);
  // const [popularMovies2, setPopularMovies2] = useState([]);

  const imageurl = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate();

  
  


  // const SearchList = () => {
  //   return popularMovies2.map((content, i) => {
  //     const contentType = content.media_type || 'movie';
  //     return (


  //       <a
  //         className="card card-compact w-72 p-0 shadow-xl cursor-pointer"
  //         key={i}
  //         onClick={() => {
  //           if (contentType === 'tv') {
  //             navigate(`/tv/${content.id}`);
  //           } else {
  //             navigate(`/${contentType}/${content.id}`);
  //           }
  //         }}
  //       >
  //         <figure>
  //           <img className="Movie-image" src={`${imageurl}/${content.poster_path}`} alt="" />
  //         </figure>
  //         <div className="card-body">
  //           <h2 className="Movie-title font-bold text-lg ">{content.title || content.name}</h2>
  //           <p className="Movie-date">{content.release_date}{content.first_air_date}</p>
  //           <div className="card-actions justify-center">
  //             <div className="flex justify center items-center gap-1">
  //               <p className="Movie-rate">{content.vote_average.toFixed(1)} </p>
  //               <FaStar color="orange" />
  //             </div>
  //           </div>
  //         </div>
  //       </a>
  //     );
  //   });
  // };
  // const search = async (q) => {
  //   try {
  //     if (q.length > 3) {
  //       const searchResults = await searchAll(q);
  //       setPopularMovies2(searchResults);
  //     } else {
  //       // Clear search results when the search query is less than 3 characters
  //       setPopularMovies2([]);
  //     }
  //   } catch (error) {
  //     console.error('Error searching:', error);
  //   }
  // };

  return (
  <ListAll/>
  );
};

export default Dashboard;
