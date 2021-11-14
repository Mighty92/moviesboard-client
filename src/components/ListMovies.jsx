import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteFilm from './DeleteFilm';
import axios from 'axios';
import LikeButton from '../services/LikeButton';

const ListMovies = (props) => {
    const {film, id} = props

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");

    const handleEdit = () =>{
        const data = {
            tire: film.title,
            description: editContent ? editContent: film.description,
            date: film.release_date,
        }

        axios.put('http://localhost:3000/movies/' + film.id, data)
        .then(() =>{
            setIsEditing(false);

        })
    };

    useEffect(()=>{
        console.log(film)
    },[])
    return (
        <>    
           
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
                        <form className="modif">
                            <h4 className='text'>{film.release_date}</h4>
                            <h4 className='text'>{film.description}</h4>
                        </form>
                        <div>

                                <Link to={"/modificationPage/" + film.id} >
                                <button className="favorite styled">Modifier</button>
                                </Link>
                                              
                            <DeleteFilm id={film.id}/>
                        </div>
                    </li>
                    {/* <div className="button">
                        <LikeButton id={id} />
                    </div> */}
            </div>
            

        </>
    )
}

export default ListMovies
