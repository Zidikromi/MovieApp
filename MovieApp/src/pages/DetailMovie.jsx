import React, { useEffect, useState } from 'react';
import { IoArrowBack} from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, } from "react-icons/fa6";
import { getMovieCast, getMovieDetail, getVideoTrailer } from '../api';

function DetailMovie() {
  const [detailMovie, setDetailMovie] = useState(null);
  const [VideoTrailer, setVideoTrailer] = useState(null);
  const [cast, setCast] = useState(null);

  

  const imageurl = "https://image.tmdb.org/t/p/w500";
  const { id } = useParams();
  const navigate = useNavigate()
  

  useEffect(() => {
    getMovieDetail(id).then((result) => {
      setDetailMovie(result);
    });
  }, [id]);

    useEffect(() => {
      getVideoTrailer(id).then((result) => {
        setVideoTrailer(result);
      });
    }, [id]);

    useEffect(() => {
      getMovieCast(id).then((result) => {
        setCast(result);
      });
    }, [id]);


    const CastList = () => {
      if(!cast){
        return null
      }
      return(
        <div className='flex flex-col md:flex-row'> 
        <h2 className="card-title font-bold text-lg ">Cast: </h2>
        <h2 className=" font-regular md:ml-4 text-lg text-justify">
          {cast.cast.slice(0, 4).map((actor, index) => (
            <span key={index}>{actor.name}{index < 3 ? ', ' : ''}</span>
          ))}
        </h2>
      </div>
      )
    }
     

    const VideoList = () => {
      if(!VideoTrailer){
        return null
      }
      return(
        <div className='card mt-2 '>
          <h2 className='font-bold'>Clip</h2>
        <div className='flex flex-col md:flex-row mx-2 mt-2'>
          {VideoTrailer.slice(0, 4).map((videoId, index) => (
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

  const DetailMovieList = () => {
    if (!detailMovie) {
      return null; 
    }

    return (
      <div className="card lg:card-side bg-base-100  w-screen p-2 h-screen ">
        <img src={`${imageurl}/${detailMovie.poster_path}`} className='relative rounded-xl' alt="Album"/>
        <div className="card-body">
        {/* <div className='ml-auto hidden sm:block'>
        <button className='btn bg-primary-content hover:bg-black hover:text-white' onClick={() => navigate(`/`)}><IoArrowBack/> </button>
      </div> */}

        
          <h2 className="card-title font-bold text-3xl justify-center">{detailMovie.title}</h2>
          <h2 className="font-bold text-red-600">Genre: {detailMovie.genres.map((genre, index) => (
            <span key={index}>{genre.name}{index < detailMovie.genres.length - 1 ? ', ' : ''}</span>
          ))}</h2>
         <div className='flex flex-col md:flex-row items-start'>
            <h2 className="font-bold text-lg">Sinopsis:</h2>
            <p className="font-regular text-lg item text-justify md:ml-3 tracking-tight">{detailMovie.overview}</p>
        </div>
         <CastList/>
         <div className='flex flex-col md:flex-row'> 
          <h2 className="card-title font-bold text-lg text-justify">Production: </h2>
          <h2 className="font-regular md:ml-4 text-lg text-justify">
            {detailMovie.production_companies.map((company, index) => (
      <span key={index}>{company.name}{index < detailMovie.production_companies.length - 1 ? ', ' : ''}</span>
              ))}
            </h2>
          </div>
        <div className='flex flex-col md:flex-row'> 
          <h2 className="card-title font-bold text-lg">Release Date: </h2>
          <h2 className=" font-regular md:ml-4 text-lg text-justify">{detailMovie.release_date}</h2>
          </div>
          <div className='flex flex-col md:flex-row'>
          <h2 className="card-title font-bold text-lg">Rating: </h2>
          <h2 className="flex font-regular text-lg md:ml-4 card-title">{detailMovie.vote_average.toFixed(1)} <FaStar color='orange' /></h2>
          </div>
          <div className='flex flex-col md:flex-row'>
          <h2 className="card-title font-bold text-lg">Status: </h2>
          <h2 className=" font-regular text-lg md:ml-4">{detailMovie.status}</h2>
          </div>
          <div className='flex flex-col md:flex-row'>
          <h2 className="card-title font-bold text-lg">Tagline: </h2>
          <h2 className=" font-regular text-lg md:ml-3 text-justify">{detailMovie.tagline}</h2>
          </div>
          <div className='flex flex-col md:flex-row'>
          <h2 className="card-title font-bold text-lg">Language: </h2>
          <h2 className="font-regular text-lg md:ml-3">
  {detailMovie.spoken_languages.map((language, index) => (
    <span key={index}>{language.name}{index < detailMovie.spoken_languages.length - 1 ? ', ' : ''}</span>
  ))}
</h2>          
</div>

          <VideoList/>
          {/* <div className='card bg-black w-[50%] h-80 mt-10'>
            <video src="{detailmovie}"></video>

          </div> */}
        
        </div>
      </div>
    );
  }

  

  return (
    <div>
      <DetailMovieList />
    </div>
  );
}

export default DetailMovie;