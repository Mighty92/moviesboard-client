import React, {useEffect} from 'react';
import axios from 'axios';

const DeleteFilm = ({id}) => {


    const handleDelete = () =>{
        axios.delete('http://localhost:3001/movies/' + id);
        window.location.reload();
    };

    return (
        <div>
            <button className="favorite styled" onClick={() =>{
                if (window.confirm('Voulez-vous supprimer cet article?')){
                    handleDelete();
                }
            }}>
                Supprimer</button>
        </div>
    );
};

export default DeleteFilm;