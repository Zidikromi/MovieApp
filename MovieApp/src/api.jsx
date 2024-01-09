import axios from "axios";


const baseUrl = "https://api.themoviedb.org/3";
const apikey = "781e091cf86f075ce55528ddad5f966b";

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apikey}`);
  return movie.data.results;
};


export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?api_key=${apikey}&query=${q}`);
  return search.data;
};


export const getTvList = async () => {
    const tv = await axios.get(`${baseUrl}/tv/popular?api_key=${apikey}`);
    console.log({TVLIST: tv.data})
    return tv.data.results;
  };

export const searchTv = async (q) => {
    const searchtv = await axios.get(`${baseUrl}/search/tv?api_key=${apikey}&query=${q}`);
    console.log({ searchTV: searchTv.data})
    return searchtv.data;

  };

export const getMovieDetail = async (movie_id) => {
      const detail = await axios.get(`${baseUrl}/movie/${movie_id}?api_key=${apikey}`);
    //   console.log({ MovieDetail: detail.data})
      return detail.data;

  };

  export const getTvDetail = async (series_id) => {
    const detailTv = await axios.get(`${baseUrl}/tv/${series_id}?api_key=${apikey}`);
    console.log({ TvDetail: detailTv.data})
    return detailTv.data;

};