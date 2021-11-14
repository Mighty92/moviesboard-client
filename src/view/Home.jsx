import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ListMovies from '../components/ListMovies';

const Home = () => {

    const [search, setSearch] = useState("");


    const setSearchValue = (e) =>{
        e.preventDefault();
        setSearch(e.target.value);
      }

      const handleSubmit = (e)=>{
        e.preventDefault();
        result();
    }
  

    const [movies, setMovies] = useState([]);
    const url = 'http://localhost:3001/movies';
    useEffect(()=>{
        axios.get(`${url}`).then((res) =>{
        setMovies(res.data);
        })
    },[movies]);

    const result =() =>{}
    
        return (
            <div>
                <Logo/>
                <Navigation/>
                <hr className="menu"/>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className="form-control">
                        <input onInput={(e)=>setSearchValue(e)}
                            type="text" 
                            placeholder="Recherchez vos films"/> 
                    </label>

                    <label className="form-control" htlmlFor="ice-cream-choice">Filtrez par</label>
                        <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
                            <datalist id="ice-cream-flavors">
                                <option value="Titre"/>
                                <option value="Catégorie"/>
                                <option value="Date de sortie"/>
                            </datalist>
                            <input
                                 type="submit"
                                value="rechercher"/>
                </form>
                <div className="menu">
                    <h1 className="menuTitle">Bibliothèque</h1>
                        <div className="menuList">
                            {movies.map((film, index) => <ListMovies film={film} key={index} id={film.id}/>)}
                        </div>
                </div>
                
            
            </div>
            
        );
    };

    export default Home;