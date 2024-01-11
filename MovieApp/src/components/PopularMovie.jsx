import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { getMovieList, getTvDiscover, getTvList, searchAll } from '../api';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';


const PopularMovieList = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const imageurl = 'https://image.tmdb.org/t/p/w500';
    const navigate = useNavigate();

    useEffect(() => {
        getMovieList().then((result) => {
          setPopularMovies(result);
        });
      }, []);
    
    return (
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
       
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {popularMovies.map((content, i) => {
          const contentType = content.media_type || 'movie';
          return (
       
        <div className="flex justify-center mt-1 gap-3  flex-wrap ">
            <SwiperSlide key={i} className='p-5'>
              <a
                className="card card-compact w-72 p-0 shadow-xl cursor-pointer min-h-[580px] "
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
            </SwiperSlide>
            </div>
            // 
          );
        })}
      </Swiper>
    );
  };
  

  export default PopularMovieList