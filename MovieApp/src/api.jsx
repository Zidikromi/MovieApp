import axios from "axios";


const baseUrl = "https://api.themoviedb.org/3";
const apikey = "781e091cf86f075ce55528ddad5f966b";

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apikey}`);
  return movie.data.results;
};
export const getNowPlaying = async () => {
  const nowPlaying = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apikey}`);
  return nowPlaying.data.results;
};
export const getUpcoming2 = async () => {
  const upComing = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apikey}`);
  return upComing.data.results;
};




export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?api_key=${apikey}&query=${q}`);
  return search.data;
};


export const getTvList = async () => {
    const tv = await axios.get(`${baseUrl}/tv/popular?api_key=${apikey}`);
    // console.log({TVLIST: tv.data})
    return tv.data.results;
  };

export const searchTv = async (q) => {
    const searchtv = await axios.get(`${baseUrl}/search/tv?api_key=${apikey}&query=${q}`);
    console.log({ searchTV: searchTv.data})
    return searchtv.data;

  };
  export const searchAll = async (q) => {
    try {
      const tvResults = await searchTv(q);
      const movieResults = await searchMovie(q);
  
      const tvResultsWithMediaType = tvResults.results.map((tv) => ({ ...tv, media_type: 'tv' }));
      // Combine TV and Movie results into an array
      const combinedResults = [...tvResultsWithMediaType, ...movieResults.results];
  
      return combinedResults;
    } catch (error) {
      console.error('Error searching all:', error);
      throw error;
    }
  };

export const getMovieDetail = async (movie_id) => {
      const detail = await axios.get(`${baseUrl}/movie/${movie_id}?api_key=${apikey}`);
      // console.log({ MovieDetail: detail.data})
      return detail.data;

  };

  export const getTvDetail = async (series_id) => {
    const detailTv = await axios.get(`${baseUrl}/tv/${series_id}?api_key=${apikey}`);
    // console.log({ TvDetail: detailTv.data})
    return detailTv.data;

};


export const getVideoTrailer = async (movie_id) => {
  try {
    const Video = await axios.get(`${baseUrl}/movie/${movie_id}/videos?api_key=${apikey}`);
    // console.log({ Trailer: Video.data });
    return Video.data.results;
  } catch (error) {
    console.error("Error fetching video trailer:", error);
    throw error; 
  }
};

export const getMovieCast = async (movie_id) => {
  const castmovie = await axios.get(`${baseUrl}/movie/${movie_id}/credits?api_key=${apikey}`);
  // console.log({ CastData: castmovie.data})
  return castmovie.data;

};
export const getTvCast = async (series_id) => {
  const castTv = await axios.get(`${baseUrl}/tv/${series_id}/credits?api_key=${apikey}`);
  // console.log({ CastTVData: castTv.data})
  return castTv.data;

};

export const getTvDiscover = async () => {
  try {
    const discoverTv = await axios.get(`${baseUrl}/discover/tv`, {
      params: {
        api_key: apikey,
        include_adult: false,
        include_null_first_air_dates: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
        with_networks: 213,
      },
    });

    console.log({ DiscoverTv: discoverTv.data });
    return discoverTv.data.results;
  } catch (error) {
    console.error('Error fetching TV discover data:', error);
    throw error; // Handle the error as needed
  }
};

export const getVideoTv = async (series_id) => {
  try {
    const TvVideo = await axios.get(`${baseUrl}/tv/${series_id}/videos?api_key=${apikey}`);
    console.log({ TvVIDEO: TvVideo.data });
    return TvVideo.data.results;
  } catch (error) {
    console.error("Error fetching video trailer:", error);
    throw error; 
  }
};