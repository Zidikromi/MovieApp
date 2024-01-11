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

const Dashboard = () => {
  // const [popularMovies, setPopularMovies] = useState([]);
  const [popularMovies2, setPopularMovies2] = useState([]);

  // const imageurl = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate();

  // useEffect(() => {
  //   getMovieList().then((result) => {
  //     setPopularMovies(result);
  //   });
  // }, []);


  // useEffect(() => {
  //   getTvList().then((result) => {
  //     setPopularMovies2(result);
  //   });
  // }, []);


  // const PopularMovieList = () => {
  //   return (
  //     <Swiper
  //       slidesPerView={1}
  //       spaceBetween={10}
       
  //       breakpoints={{
  //         640: {
  //           slidesPerView: 2,
  //           spaceBetween: 20,
  //         },
  //         768: {
  //           slidesPerView: 4,
  //           spaceBetween: 40,
  //         },
  //         1024: {
  //           slidesPerView: 5,
  //           spaceBetween: 50,
  //         },
  //       }}
  //       modules={[Pagination]}
  //       className="mySwiper"
  //     >
  //       {popularMovies.map((content, i) => {
  //         const contentType = content.media_type || 'movie';
  //         return (
  //           <SwiperSlide key={i} className='p-5'>
  //             <a
  //               className="card card-compact w-72 p-0 shadow-xl cursor-pointer h-full"
  //               onClick={() => {
  //                 if (contentType === 'tv') {
  //                   navigate(`/tv/${content.id}`);
  //                 } else {
  //                   navigate(`/${contentType}/${content.id}`);
  //                 }
  //               }}
  //             >
  //               <figure>
  //                 <img className="Movie-image" src={`${imageurl}/${content.poster_path}`} alt="" />
  //               </figure>
  //               <div className="card-body">
  //                 <h2 className="Movie-title font-bold text-lg ">{content.title || content.name}</h2>
  //                 <p className="Movie-date">{content.release_date}{content.first_air_date}</p>
  //                 <div className="card-actions justify-center">
  //                   <div className="flex justify center items-center gap-1">
  //                     <p className="Movie-rate">{content.vote_average.toFixed(1)} </p>
  //                     <FaStar color="orange" />
  //                   </div>
  //                 </div>
  //               </div>
  //             </a>
  //           </SwiperSlide>
  //         );
  //       })}
  //     </Swiper>
  //   );
  // };
  


  const PopularMovieList2 = () => {
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
        setPopularMovies(searchResults);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center flex-col">
        <NavigationAndSearch onNavigate={navigate} onSearch={search} />

        {/* <div className='p-20'>

          <MySwiper/>
  
     
      </div> */}
        <div className="mt-3">
          <h2 className='text-xl font-bold '>Popular Movie</h2>

          <PopularMovieList />

          {/* <PopularMovieList2 /> */}

        {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
