import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteFilm from './DeleteFilm';
import axios from 'axios';

const ListMovies = (props) => {

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

    const {film} = props
    const id = film.id

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
                        {isEditing ? (
                            <form onChange={(e) => setEditContent(e.target.value)} 
                            autoFocus defaultValue={editContent ? editContent : film.film}></form>
                        ) : (
                        <p>{editContent ? editContent :film.film}</p>
                        )}
                        <div className="btn-container">
                            {isEditing ? (
                                <button className="favorite styled" onClick={handleEdit}>valider</button>
                            ):(
                                <button className="favorite styled" onClick={()=> setIsEditing(true)}>Modifier</button>
                            )}                        
                            <DeleteFilm id={film.id}/>
                        </div>
                    </li>
            </div>
        </>
    )
}

export default ListMovies
