import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ListMovies from '../components/ListMovies';

const Home = () => {

    const [movies, setMovies] = useState([]);
    const url = 'http://localhost:3001/movies';
    useEffect(()=>{
        axios.get(`${url}`).then((res) =>{
        setMovies(res.data);
        })
    },[movies]);
    
        return (
            <div>
                <Logo/>
                <Navigation/>
                <hr className="menu"/>
                <form>
                    <label className="form-control">
                        <input type="checkbox" name="checkbox" />
                        Titre
                    </label>

                    <label className="form-control">
                        <input type="checkbox" name="checkbox" />
                        Date de sortie
                    </label>

                    <label className="form-control">
                        <input type="checkbox" name="checkbox" />
                        Catégorie
                    </label>
                </form>
                <div className="menu">
                    <h1 className="menuTitle">Voici la liste des films de la bibliothèque</h1>
                        <div className="menuList">
                            {movies.map((film, index) => <ListMovies film={film} key={index} id={film.id}/>)}
                        </div>
                </div>
                
            
            </div>
            
        );
    };
    
    export default Home;