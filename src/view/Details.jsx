import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation } from "react-router";
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import DeleteFilm from '../components/DeleteFilm';


const Details = () => {

    const id = useLocation().search.split("?")[1];
    const [detailFilm, setDetailFilm] = useState(null);

    useEffect (() => {
        detailsRes();
    },[])
    
    const detailsRes = () =>{
        axios.get(`http://localhost:3001/movies/${id}`)
        .then((res) =>{
        setDetailFilm(res.data);
        })
    }


    return (
        <div>
            <Logo/>
            <Navigation/>
            <hr className="menu"/>
            <div className="detail">
                <h1 className="pdetail"> Détails </h1>
                <h2>Voici le détail du film</h2>
            </div>
            <div className="conteneur-flexible">
                {detailFilm &&
                <>
                    <div className="element-flexible">
                    <img src={detailFilm.poster} className="detail-img"/>
                    </div>
                    <div className="element-flexible">
                        <h3 className="title">{detailFilm.title}</h3>
                        <h3 className="text">{detailFilm.release_date}</h3>
                        <h3 className="text">{detailFilm.categories}</h3>


                        <h3 className="text">
                            Acteur: <br/>
                            {detailFilm.actors[0].name} / {detailFilm.actors[0].character},<br/>
                            {detailFilm.actors[1].name} / {detailFilm.actors[1].character},<br/>
                            {detailFilm.actors[2].name} / {detailFilm.actors[2].character},<br/>
                            {detailFilm.actors[3].name} / {detailFilm.actors[3].character},<br/>
                            {detailFilm.actors[4].name} / {detailFilm.actors[4].character},<br/>
                            {detailFilm.actors[5].name} / {detailFilm.actors[5].character}<br/>
                        </h3>
                        <br/>
                        <h3 className="text">
                            Film Similaire: <br/>
                            {detailFilm.similar_movies[0].title} / {detailFilm.similar_movies[0].release_date},<br/>
                            {detailFilm.similar_movies[1].title} / {detailFilm.similar_movies[1].release_date},<br/>
                            {detailFilm.similar_movies[2].title} / {detailFilm.similar_movies[2].release_date}<br/>
                        </h3>
                    </div>
                    <div className="element-flexible">
                        <h3 className="text">{detailFilm.description}</h3>
                        <img src={detailFilm.backdrop} className="detail-img1"/>

                        
                        <button className="favorite styled">Modifier</button>
                        <DeleteFilm id={detailFilm.id}/>
                    </div>
                </>
                }

            </div>
        </div>
    )
}

export default Details
