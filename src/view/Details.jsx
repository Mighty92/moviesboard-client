import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';


const Details = () => {

    const [detailFilm, setDetailFilm] = useState(null);
    const url = 'http://localhost:3001/movies/1';

    useEffect (() => {
        detailsRes();
    },[])
    
    const detailsRes = () =>{
        axios.get(`${url}`).then((res) =>{
            console.log(detailFilm.actors[0].name);
            setDetailFilm(res.data);
            })
    }


    return (
        <div>
            <Logo/>
            <Navigation/>
            <hr className="menu"/>
            <div className="detail">
                <h1> Détails </h1>
                    <p>Voici le détail du film</p>
            </div>
            <div>
                {detailFilm &&
                <>
                    <div>
                        <img src={detailFilm.backdrop}/>
                    </div>
                    <div>
                        <h3>{detailFilm.title}</h3>
                        <h3>{detailFilm.release_date}</h3>
                        <h3>{detailFilm.categories}</h3>
                    </div>
                    <div>
                        <h3>{detailFilm.description}</h3>
                        <img src={detailFilm.poster}/>
                        <h3>Acteur: {detailFilm.film}</h3>
                    </div>
                </>
                }

            </div>
        </div>
    )
}

export default Details
