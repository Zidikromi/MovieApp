import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { getTvDiscover } from '../api';
import { useNavigate } from 'react-router-dom';

const MySwiper = () => {
  const [discoverTv, setDiscoverTv] = useState([]);
  const imageurl = "https://image.tmdb.org/t/p/w500"
  const navigate = useNavigate();

  useEffect(() => {
    getTvDiscover().then((result) => {
      setDiscoverTv(result)
    })
  }, [])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getTvDiscover();
//         if (Array.isArray(result)) {
//           setDiscoverTv(result);
//         } else {
//           console.error('Invalid data format received from API.');
//         }
//       } catch (error) {
//         console.error('Error fetching TV data:', error);
//       }
//     };

//     fetchData();
//   }, []);

  return (
    // <>
    //  <Swiper className="mySwiper">
    //  {discoverTv.map((content, i) => (
    //     <SwiperSlide>
    //         <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${content.backdrop_path})` }}></div>
    //     </SwiperSlide>
    //          ))}
    //   </Swiper>
    // </>
    <Swiper spaceBetween={20} slidesPerView={3} className='rounded-xl'  >
    {discoverTv.map((content, i) => (
      <SwiperSlide key={i} className="relative">
        <div
          className="h-96 w-full bg-cover bg-center flex flex-col justify-end transition duration-300 transform hover:scale-105 blur-sm hover:blur-none"
          style={{
            backgroundImage: `url(${imageurl}/${content.backdrop_path})`,
          }} onClick={() => navigate()}
        >
          <div className="bg-black bg-opacity-70 p-4 text-white opacity-0 hover:opacity-100 transition-opacity">
            <h2 className="text-xl font-bold">{content.name}</h2>
            <p>Rating: {content.vote_average}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
};

export default MySwiper;
