import axios from "axios";

const ServiceMovies = {
    //Affiche tous les films de la DB
    showAllMovies() {
        return axios
            .get('http://localhost:3000/movies')
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Affiche uniquement le film sélectionné avec son id
    show(id) {
        return axios
            .get(`http://localhost:3000/movies/${id}`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },
    //Ajoute un film dans la DB
    add(movie) {
        return axios
            .post('http://localhost:3000/movies', {
                title: movie.title,
                release_date: movie.release_date,
                categories: movie.categories,
                description: movie.description,
                poster: movie.poster,
                backdrop: movie.backdrop,
                actors: movie.actors,
                similar_movies: movie.similar_movies
            })
            .then((response) => response.data)
            .catch((err) => console.log(err))
    }
}

export default ServiceMovies;