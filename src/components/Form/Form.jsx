// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import Form from '../components/Form';
// import MoviesData from '../services/MoviesData';

// const api_key = "e5a384bb34c076c35bd02f72421c5306";


// const AddMovie = () => {
//     const[movieDataDB, setMovieDataDB] = useState([]);
//     const [searchTitle, setSearchTitle] = useState(""); // term dans la barre de recherche
//     const [searchReleaseDate, setSearchReleaseDate] = useState("");
//     const [errorMessage, setErrorMessage] = useState('');

//     const URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=`
    
//     const navigate = useNavigate();

//     // rechercher sur la base de données externe
//     useEffect(() =>{
//         if(searchTitle !== ""){
//             axios.get(URL+searchTitle+'&primary_release_year='+searchReleaseDate)
//             .then((response) =>
//             setMovieDataDB(response.data.results))
//             .catch((err) => setErrorMessage('Erreur serveur : Impossible de récupérer les films'));
//         }
//     }, [searchTitle,searchReleaseDate ]) // requête à chaque fois qu'une lettre et/ou une date est taper

//     const handleSearchTitle = (e) =>{ // recupère dans le input
//         let value = e.target.value;
//         setSearchTitle(value) // sa valeur est dans searchTitle
//     };

//     const handleSearchYear = (e) =>{ // recupère dans le input
//         let value = e.target.value;
//         setSearchReleaseDate(value) // sa valeur est dans ReleaseDate
//     };
//     // ajout à la base de données locale
//     function addMovie(data) {
//        // Envoyer "data" vers le serveur  
//         MoviesData.add(data)
//         .then(({ message }) => {
//             console.log(message)
//             toast.success(message);
//             //Redirection vers la page /accueil
//             navigate('/');
//         })
//         .catch((err) => setErrorMessage(err.message));
//      }  
     
//     return (
//         <main>
//             <div className="content add-movie">
//                 <div className="search">
//                     <p>{errorMessage}</p>{/* faire du style balise p? */}
//                     <input onInput = {handleSearchTitle}  list="input-search" placeholder= "Rechercher un film par titre" type='search' className='searchTitleInput'/>
//                     <input onInput = {handleSearchYear} type="text" className="searchDateInput" placeholder="Affinez votre recherche par année de sortie"/>
//                     <datalist id="input-search">
//                         {movieDataDB.map((movieData)=>{
//                             return(
//                                 <option key={movieData.id} data-id={movieData.id} 
//                                 value={movieData.original_title}/>
//                             ) 
//                         })}
//                     </datalist>  
//                 </div>
//                 <div>
//                     {errorMessage && <div className='error'>{errorMessage}</div>}
//                     <Form onValidation={addMovie} />
//                 </div>
//             </div>
//         </main>
//     )
// }