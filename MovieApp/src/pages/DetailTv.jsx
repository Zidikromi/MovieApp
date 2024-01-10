import React, { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { getMovieDetail, getTvCast, getTvDetail, getVideoTv } from '../api';

function DetailTv() {
  const [detailTv, setDetailTv] = useState(null);
  const [cast, setCast] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageurl = "https://image.tmdb.org/t/p/w500";
  const { id } = useParams();
  const navigate = useNavigate()



  useEffect(() => {
    getTvDetail(id).then((result) => {
      setDetailTv(result);
    });
  }, [id]);

  useEffect(() => {
    getTvCast(id).then((result) => {
      setCast(result);
    });
  }, [id]);

  useEffect(() => {
    getVideoTv(id).then((result) => {
      setVideo(result);
    });
  }, [id]);

  const VideoList = () => {
    if(!video || video.length === 0){
      return null
    }
    return(
      <div className='card mt-2 '>
        <h2 className='font-bold '>Clip</h2>
      <div className='flex flex-col md:flex-row mx-2 mt-2'>
        {video.slice(0, 4).map((videoId, index) => (
          <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4 '>
            <div className="h-44 blur-sm hover:blur-none hover:transition-all">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId.key}`}
                title={`${videoId.name}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
   
  }

  const CastList = () => {
    if(!cast){
      return null
    }
    return(
      <div className='flex flex-col md:flex-row'> 
      <h2 className="card-title font-bold text-lg">Cast: </h2>
      <h2 className=" font-regular md:ml-4 text-lg  text-justify">
        {cast.cast.slice(0, 4).map((actor, index) => (
          <span key={index}>{actor.name}{index < 3 ? ', ' : ''}</span>
        ))}
      </h2>
    </div>
    )
  }

  const DetailTvList = () => {
    if (!detailTv) {
      return null; 
    }

    return (
      <div className="card lg:card-side  bg-base-100  w-screen p-2 h-screen  ">
        <img src={`${imageurl}/${detailTv.poster_path}`} className='relative rounded-xl' alt="Album"/>
        <div className="card-body">
        
          <h2 className="card-title font-bold text-3xl justify-center">{detailTv.name}</h2>
          <h2 className="font-bold text-red-600">Genre: {detailTv.genres.map((genre, index) => (
            <span key={index}>{genre.name}{index < detailTv.genres.length - 1 ? ', ' : ''}</span>
          ))}</h2>
         <div className='flex flex-col md:flex-row items-start'>
            <h2 className="font-bold text-lg">Sinopsis:</h2>
            <p className="font-regular text-lg item text-justify md:ml-3 tracking-tight">{detailTv.overview}</p>
        </div>
        <CastList/>
        <div className='flex flex-col md:flex-row'> 
          <h2 className="card-title font-bold text-lg">Last Episode Date: </h2>
          <h2 className="card-title font-regular md:ml-4 text-lg">{detailTv.last_air_date}</h2>
          </div>
          <div className='flex flex-col md:flex-row'> 
          <h2 className="card-title font-bold text-lg">Production: </h2>
          <h2 className="font-regular md:ml-4 text-lg text-justify">
            {detailTv.production_companies.map((company, index) => (
      <span key={index}>{company.name}{index < detailTv.production_companies.length - 1 ? ', ' : ''}</span>
              ))}
            </h2>
          </div>
          <div className='flex flex-col md:flex-row '>
          <h2 className="card-title font-bold text-lg">Seasons: </h2>
          <h2 className="card-title font-regular text-lg md:ml-4 text-red-600">{detailTv.seasons.length} Seasons</h2>
          </div>
          <div className='flex flex-col md:flex-row'>
          <h2 className="card-title font-bold text-lg">Episode: </h2>
          <h2 className="card-title font-regular text-lg md:ml-4 text-blue-600">{detailTv.number_of_episodes} Episode</h2>
          </div>
          <div className='flex flex-col md:flex-row '>
          <h2 className="card-title font-bold text-lg">Rating: </h2>
          <h2 className="card-title font-regular text-lg md:ml-4">{detailTv.vote_average.toFixed(1)}<FaStar color='orange'/></h2>
          </div>
          <div className='flex flex-col md:flex-row '>
          <h2 className="card-title font-bold text-lg">Status: </h2>
          <h2 className="card-title font-regular text-lg md:ml-4">{detailTv.status}</h2>
          </div>
          <div className='flex flex-col md:flex-row'>
          <h2 className="card-title font-bold text-lg">Tagline: </h2>
          <h2 className=" font-regular text-lg md:ml-3">{detailTv.tagline}</h2>
          </div>
          <div className='flex flex-col md:flex-row '>
          <h2 className="card-title font-bold text-lg">Language: </h2>
          <h2 className="font-regular text-lg md:ml-3">
  {detailTv.spoken_languages.map((language, index) => (
    <span key={index}>{language.name}{index < detailTv.spoken_languages.length - 1 ? ', ' : ''}</span>
  ))}
</h2>          
</div>
<VideoList/>
          {/* <div className='mt-auto ml-auto'>
            <button className='btn bg-primary-content hover:bg-black hover:text-white' onClick={() => navigate(`/tvshow`)}><IoArrowBack/> </button>
          </div> */}
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