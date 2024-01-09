import React, { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { getMovieDetail, getTvDetail } from '../api';

function DetailTv() {
  const [detailTv, setDetailTv] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageurl = "https://image.tmdb.org/t/p/w500";
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getTvDetail(id).then((result) => {
      setDetailTv(result);
    });
  }, [id]);

  const DetailTvList = () => {
    if (!detailTv) {
      return null; 
    }

    return (
      <div className="card lg:card-side p-0 bg-base-100 shadow-2xl  ">
        <img src={`${imageurl}/${detailTv.poster_path}`} className='' alt="Album"/>
        <div className="card-body">
        
          <h2 className="card-title font-bold text-3xl justify-center">{detailTv.name}</h2>
          <h2 className="font-bold text-red-600">Genre: {detailTv.genres.map((genre, index) => (
            <span key={index}>{genre.name}{index < detailTv.genres.length - 1 ? ', ' : ''}</span>
          ))}</h2>
         <div className='flex flex-col md:flex-row items-start'>
            <h2 className="font-bold text-lg">Sinopsis:</h2>
            <p className="font-regular text-lg item text-justify md:ml-3 tracking-tight">{detailTv.overview}</p>
        </div>
        <div className='flex flex-row'> 
          <h2 className="card-title font-bold text-lg">Release Date: </h2>
          <h2 className="card-title font-regular ml-4 text-lg">{detailTv.release_date}</h2>
          </div>
          <div className='flex '>
          <h2 className="card-title font-bold text-lg">Rating: </h2>
          <h2 className="card-title font-regular text-lg ml-4">{detailTv.vote_average} <FaStar color='orange'/></h2>
          </div>
          <div className='flex '>
          <h2 className="card-title font-bold text-lg">Status: </h2>
          <h2 className="card-title font-regular text-lg ml-4">{detailTv.status}</h2>
          </div>
          <div className='mt-auto ml-auto'>
            <button className='btn bg-primary-content hover:bg-black hover:text-white' onClick={() => navigate(`/tvshow`)}><IoArrowBack/> </button>
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div>
      <DetailTvList />
    </div>
  );
}

export default DetailTv;