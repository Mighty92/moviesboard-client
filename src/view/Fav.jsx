import React, {useEffect, useState} from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import EventService from '../services/EventService';
import StorageService from '../services/StorageService';
import ListMovies from '../components/ListMovies';
import Home from './Home';

const Fav = () => {
    const [myFav, setMyFav] = useState(null);

    let likedIds = StorageService.myLocalStorage();

    function fetchFavData() {
        return Promise.all(likedIds.map((id) => EventService.fetchId(id).then((response) => response)))
            .then((data) => {
                return data;
            });
    }

    useEffect(() => {
        const useFetchFavData = fetchFavData();
        useFetchFavData.then((data) => {
            setMyFav(data)
        })
    }, [])

    return (
        <div className="favoris">
            <Logo/>
            <Navigation/>
            <hr className="menu"/>
            <h1>Évènements sauvegardés</h1>
            <main>
                <div>
                    {myFav && myFav.length !== 0 && myFav.map((film) => <ListMovies film={film.id} key={film.id}  />)}
                </div>
            </main>
        </div>
    );
};

export default Fav;