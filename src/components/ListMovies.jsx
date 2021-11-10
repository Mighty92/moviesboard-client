import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import DeleteFilm from './DeleteFilm';

const ListMovies = (props) => {
    const {film} = props
    const id = film.id

    useEffect(()=>{
        console.log(film)
    },[])
    return (
        <>    
           
            <div className="menuItem">
                <form>
                    <h1>{film.title}</h1>
                        <Link className='cards__item__link' to={{ pathname: "/details", search: `${id}` }}>
                            <figure>
                                <img
                                className='img'
                                src={film.backdrop}
                                />
                            </figure>
                        </Link>
                </form>
                    <li className="info">
                        <h4 className='text'>{film.release_date}</h4>
                        <h4 className='text'>{film.description}</h4>
                        <button className="favorite styled">Modifier</button>
                        <DeleteFilm id={film.id}/>
                    </li>
            </div>
        </>
    )
}

export default ListMovies
