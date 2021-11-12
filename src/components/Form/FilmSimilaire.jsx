import React, {useEffect, useState} from 'react';
import produce from "immer";

const FilmSimilaire = ({similarMovieData}) => {
    const [similarMovie, setSimilarMovie] = useState([{
        title: "",
        poster: "",
        release_date: ""
    }])

    //Ajouts de novueaux champs pour la création d'acteur
    function newSimilarMovie(e) {
        setSimilarMovie(currentSimilarMovie => [...currentSimilarMovie, {
            title: "",
            poster: "",
            release_date: ""
        }])

        e.preventDefault()
    }

    useEffect(() => {
        similarMovieData(similarMovie)
    }, [similarMovie])

    return (
        <div>
            {similarMovie.map((a, index) =>
                <div key={index}>
                    <input type="text" placeholder={"Titre du film"} defaultValue={a.title} onChange={e => {
                        const title = e.target.value
                        setSimilarMovie(currentSimilarMovie => produce(currentSimilarMovie, v => {
                            v[index].title = title
                        }))
                    }}/>
                    <input type="url" placeholder={"Affiche"} defaultValue={a.poster} onChange={e => {
                        const poster = e.target.value
                        setSimilarMovie(currentSimilarMovie => produce(currentSimilarMovie, v => {
                            v[index].poster = poster
                        }))
                    }}/>
                    <input type="date" placeholder={"Date de sortie"} defaultValue={a.release_date} onChange={e => {
                        const release_date = e.target.value
                        setSimilarMovie(currentSimilarMovie => produce(currentSimilarMovie, v => {
                            v[index].release_date = release_date
                        }))
                    }}/>
                </div>
            )}
            <button onClick={newSimilarMovie}>Ajouter +</button>
        </div>
    );
};

export default FilmSimilaire;