import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { getMovieList, getTvDiscover, getTvList, getTvTrending, searchAll } from '../api';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { useNavigate } from 'react-router-dom';
import { FreeMode, Pagination } from 'swiper/modules';


const TrendingTvList = () => {
    const [TrendingTv, setTrendingTv] = useState([]);
    const imageurl = 'https://image.tmdb.org/t/p/w500';
    const navigate = useNavigate();

    useEffect(() => {
        getTvTrending().then((result) => {
          setTrendingTv(result);
        });
      }, []);
    
    return (
<Swiper
  slidesPerView={1}
  spaceBetween={10}
  breakpoints={{
    320: {
      slidesPerView: 3,
      spaceBetween: 130,
    },
    438: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 120,
    },
  
    768: {
      slidesPerView: 4,
      spaceBetween: 150,
    },

    900: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 140,
    },
    1190: {
      slidesPerView: 5,
      spaceBetween: 240,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
    1920:{
      slidesPerView: 6,
      spaceBetween: 10,
    }
  }}
  modules={[Pagination]}
  className="mySwiper mx-auto"
>
  {TrendingTv.map((content, i) => {
    const contentType = content.media_type || 'movie';
    return (
      <SwiperSlide key={i} className='p-5'>
       <a
                            className="card card-compact rounded-sm bg-[#1a1a1a] w-40 h-[380px] sm:w-44 sm:h-[420px] md:h-[490px] md:w-56 lg:w-72 p-0 shadow-lg cursor-pointer lg:min-h-[580px] mx-auto transition-all duration-300 ease-in-out group"
                            onClick={() => navigate(`/tv/${content.id}`)}
                        >
                            <div
                                className="card-image relative"
                                style={{
                                    backgroundImage: `url(${imageurl}/${content.poster_path})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <div className="overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ">
                                    <div className="flex items-center gap-1 bg-gray-600 bg-opacity-50 md:w-14 w-12 rounded-sm transition-all duration-300 text-white">
                                        <p className="Movie-rate font-bold justify-center pl-2 md:text-sm text-xs">
                                            {content.vote_average.toFixed(1)}
                                        </p>
                                        <FaStar color="orange" />
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="card-body">
                            <h2 className="Movie-title font-regular text-xs md:text-md lg:text-lg text-white mt-auto" >{content.title || content.name}</h2>
                               
                                <p className="Movie-date md:text-sm lg:text-md text-xs text-white">
                                    {content.release_date ? content.release_date : content.first_air_date && new Date(content.first_air_date).getFullYear()}
                                </p>
                                <div className="card-actions justify-center"></div>
                            </div>
                        </a>
            </SwiperSlide>

            // 
          );
        })}
      </Swiper>
    );
  };
  

  export default TrendingTvList