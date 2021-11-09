import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';


const ListMovies = (props) => {
    const {film, id} = props

    useEffect(()=>{
        console.log(film)
    },[])
    return (
        <div className="menuItem">
            <h1>{film.title}</h1>
                <Link className='cards__item__link' to={{ pathname: "/details", search: `${id}` }}>
                    <figure>
                        <img
                        className='img'
                        src={film.backdrop}
                        />
                    </figure>
                </Link>
                <li className="info">
                    <h4 className='text'>{film.release_date}</h4>
                    <h4 className='text'>{film.description}</h4>
                    <button className="favorite styled">Modifier</button>
                    <button className="favorite styled">Suprimer</button>
                </li>
        </div>
    )
}

export default ListMovies
