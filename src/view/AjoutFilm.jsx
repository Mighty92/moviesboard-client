import React, {useEffect, useRef, useState} from 'react';
import serviceMovies from "../services/serviceMovies";
import Acteur from "../components/Form/Acteur";
import FilmSimilaire from "../components/Form/FilmSimilaire";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const AjoutFilm = ({movie}) => {

    const [movieData, setMovieData] = useState("")
    const [actorsData, setActorsData] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])

    const title = useRef()
    const release_date = useRef()
    const categoriesArray = useRef()
    const description = useRef()
    const poster = useRef()
    const backdrop = useRef()

    useEffect(() => {
        setMovieData(movie)
    }, [movie])

    //Ajoute un film dans la DB
    function sendForm(e) {
        const categories = categoriesArray.current.value.split(",")

        //Création d'un objet avec les données du film
        const data = {
            title: title.current.value,
            release_date: release_date.current.value,
            categories: categories,
            description: description.current.value,
            poster: poster.current.value,
            backdrop: backdrop.current.value,
            actors: actorsData,
            similar_movies: similarMovie
        }

        serviceMovies.add(data)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))

        e.preventDefault()
    }

    //Récupère les données du components ActorsForm et enregistre dans actorData
    function getActorsData(data) {
        setActorsData(data)
    }

    //Récupère les données du components SimilarMovieForm et enregistre dans similarMovie
    function getSimilarMovieData(data) {
        setSimilarMovie(data)
    }

    return (
        <>
        <Logo/>
        <Navigation/>
        <hr className="menu"/>
        <form id={"form"}>
            <h1 className="menuTitle">Ajoutez votre film favoris</h1>
            <div class="form-container">
                <label>Titre</label>
                <input type="text"  defaultValue={movieData && movieData.title} ref={title}/>
                <label>Date de sortie</label>
                <input type="date"  defaultValue={movieData && movieData.release_date}
                    ref={release_date}/>
                <label className="categories">Catégories</label>
                <input type="text" placeholder={"action, aventure, comédie, ..."} ref={categoriesArray}/>
                <label >Description</label>
                <input type="textarea"  defaultValue={movieData && movieData.overview}
                   ref={description}/>
                <label>Affiche</label>
                <input type="url" defaultValue={movieData && movieData.poster_path} ref={poster}/>
                <label>Backdrop</label>
                <input type="textarea"  defaultValue={movieData && movieData.overview}
                    ref={description}/>

                <label>Acteurs:</label>
                <Acteur actorsData={getActorsData}/>

                <label htmlFor="similarMovies">Films similaires:</label>
                <FilmSimilaire similarMovieData={getSimilarMovieData}/>

                <button onClick={sendForm} className='favorite styled'>Valider</button>
            </div>
        </form>
    </>
    );
};

export default AjoutFilm
