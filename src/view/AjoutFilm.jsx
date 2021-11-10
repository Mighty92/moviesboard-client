import React, {useEffect, useState} from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const AjoutFilm = () => {

    const [search, setSearch] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        result();
    }
  
  const setSearchValue = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }

  const result = () =>{
      
  }

    return (
        <>
            <Logo/>
            <Navigation/>
            <hr className="menu"/>
                <h1 className="menuTitle">Liste des futurs évènements à Paris</h1>
                <div className="news-container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input onInput={(e)=>setSearchValue(e)}
                            type="text" 
                            placeholder="ecrivez-ici"/>
                        <input
                            type="submit"
                            value="rechercher"/>
                        <label for="ice-cream-choice">Film recherchez:</label>
                        <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

                        <datalist id="ice-cream-flavors">
                            <option value="Titre + Date"/>
                            <option value="Titre + Date"/>
                            <option value="Titre + Date"/>
                            <option value="Titre + Date"/>
                            <option value="Titre + Date"/>
                        </datalist>
                    </form>
                </div>
        </>
    )
}

export default AjoutFilm
