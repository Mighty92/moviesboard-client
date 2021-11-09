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
            <>
                <Logo/>
                <Navigation/>
                <hr className="menu"/>
                <div>
                    {movies.map((film, index) => <ListMovies film={film} key={index}/>)}
                </div>
            
            </>
            
        );
    };
    
    export default Home;