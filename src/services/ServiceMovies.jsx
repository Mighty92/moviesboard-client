import axios from "axios";

const api_key = "e5a384bb34c076c35bd02f72421c5306";


const moviesService = {
 // Récupérer le tableau des données depuis le serveur
 fetchAll() {
    return axios
      .post(`${api_key}/movies`)
      .then((response) => response.data)
      .catch(errorHandler);
  },
  add(movie){
    return axios
    .post(`${api_key}/movies`,{
      title : movie.title,
      category : [movie.category],
      release_date : movie.release_date,
      description : movie.description,
      // actor : [{movie.actor}],
      similar_movies : movie.similar_movies,
      poster : movie.poster,
    })
    .then((response) => response.data)
    .catch(errorHandler);
  }
};
// const [movieData, setMovieData] = useState([]);
// console.log(movieData
const errorHandler = (err) => {
  const {
    request: { status },
    data: { message },
  } = err.response;
  console.error(`${status} : ${message}`);
};

export default moviesService;