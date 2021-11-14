import React, {useEffect, useState} from 'react';
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import {uploadImage, addMovie, getCategories} from "../components/utils/crud";
import Categorie from "../components/Categorie"

const backdropPlaceholder = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.10wallpaper.com%2Ffr%2Flist%2FBeautiful_Nature_Scenery_4K_HD_Photo.html&psig=AOvVaw3TszFs97KeGsudUQMZk23b&ust=1636675673321000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD51ZKCj_QCFQAAAAAdAAAAABAD"
const posterPlaceholder = "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fdefault-placeholder.png?alt=media&token=c6082f11-8efe-42cc-b43d-c7b23b75f9b0"
const avatarPlaceholder = "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fsbcf-default-avatar.png?alt=media&token=d9863a53-4983-47d4-9ce7-434a9b5c9268"

const AjoutFilm = () => {

    const defaultActorData = {
        name: "",
        photo: "",
        photoName: "",
        character: ""
    }
    const defaultMovieData = {
        title: "",
        poster: "",
        posterName: "",
        release_date: ""
    }
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        poster: posterPlaceholder,
        backdrop: backdropPlaceholder,
        release_date: "",
        posterName: "",
        backdropName: ""
    });
    const [actorForm, setActorForm] = useState(false);
    const [actorData, setActorData] = useState(defaultActorData);

    const [movieForm, setMovieForm] = useState(false);
    const [movieData, setMovieData] = useState(defaultMovieData);

    const [actorProgress, setActorProgress] = useState(100);
    const [movieProgress, setMovieProgress] = useState(100);
    const [posterProgress, setPosterProgress] = useState(100);
    const [backdropProgress, setBackdropProgress] = useState(100);

    const [actorsList, setActorsList] = useState([])
    const [moviesList, setMoviesList] = useState([])

    const [categoriesList, setCategoriesList] = useState([])
    const [allCategories, setAllCategories] = useState([])


    const [tmdbMovies, setTmdbMovies] = useState([])
    const [tmdbMoviesTitles, setTmdbMoviesTitles] = useState([])
    const [selectedTitle, setSelectedTitle] = useState("")

    useEffect(() => {
        getCategories(setAllCategories);
    }, [])

    useEffect(() => {
        setTmdbMoviesTitles(tmdbMovies.map(movie => movie.title))
    }, [tmdbMovies])

    // HANDLE ADD MOVIE SUBMIT
    const handleSubmit = (e) => {
        const data = inputs;
        e.preventDefault()
        if (
            !actorsList.length ||
            !categoriesList.length ||
            !data.title.length ||
            !data.description.length ||
            !data.release_date.length ||
            !moviesList.length
        ) {
            alert("Veuillez remplir chacun des champs");
            return
        }
        delete data.posterName
        delete data.backdropName
        data.actors = actorsList
        data.similar_movies = moviesList
        data.categories = categoriesList
        console.log({...data})
        addMovie({...data})
        alert('Le film a été ajouté avec succès !')
        window.location.href = "/"
    }

// HANDLE ACTOR FORM
    const handleActorSubmit = (e) => {
        const actorsValid = actorsList.filter(item => item.name === actorData.name)
        if (actorsValid.length) {
            alert('L\'acteur existe déjà!')
            return
        }

        if (!actorData.photoName.length) {
            actorData.photo = avatarPlaceholder
        }
        if (actorData.name.length && actorData.character.length) {
            const actorDataCopy = actorData;
            delete actorDataCopy.photoName;
            setActorsList((oldArray) => [...oldArray, actorDataCopy])
            resetActorForm()
        } else {
            alert("Veuillez remplir chacun des champs")
        }
    }
// HANDLE SIMILAR MOVIES FORM
    const handleMovieSubmit = (e) => {
        const moviesValid = moviesList.filter(item => item.name === movieData.name)
        if (moviesValid.length) {
            alert('L\'acteur existe déjà!')
            return
        }
        if (!movieData.posterName.length) {
            movieData.poster = posterPlaceholder
        }
        if (movieData.title.length && movieData.release_date.length) {
            const movieDataCopy = movieData;
            delete movieDataCopy.posterName;
            setMoviesList((oldArray) => [...oldArray, movieDataCopy])
            resetMovieForm()
        } else {
            alert("Veuillez remplir tout les champs")
        }
    }
    const handleUpload = (e, setProgress, type) => {
        let files;
        if (e.dataTransfer === undefined) {
            files = e.target.files;
        } else {
            files = e.dataTransfer.files;
        }
        e.preventDefault();
        e.stopPropagation();

        if (files && files.length > 0) {
            uploadImage(files[0], "images", setProgress).then((res) => {
                if (type === "actor") {

                    setActorData({
                        ...actorData,
                        photo: res.url,
                        photoName: res.name
                    })
                } else if (type === "movie") {
                    setMovieData({
                        ...movieData,
                        poster: res.url,
                        posterName: res.name
                    })
                } else {
                    setInputs({
                        ...inputs,
                        [`${type}`]: res.url,
                        [`${type}Name`]: res.name
                    })
                }
            });
            try {
                e.dataTransfer.clearData();
            } catch (error) {

            }
        }
    }
// HANDLE ACTOR FORM INPUTS CHANGE
    const handleActorChange = (e) => {
        setActorData({
            ...actorData,
            [e.target.name]: e.target.value
        })
    }


    const handleMovieChange = (e) => {
        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value
        })
    }
    const handleInputsChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const resetActorForm = () => {
        setActorForm(false);
        setActorData(defaultActorData);
    }
    const resetMovieForm = () => {
        setMovieForm(false);
        setMovieData(defaultMovieData);
    }


    return (
        <>
        <Logo/>
        <Navigation/>
        <hr className="menu"/>
        <h1 className="menuTitle">Ajoutez votre film favoris</h1>

        <form id={"form"} onSubmit={handleSubmit}>
            <div class="form-container">
                <div className="input-group">
                    <div className="input-wrapper">
                    <label><h1>Titre*</h1></label>
                        <input type="text"
                               required={true}
                               name="title"
                               onChange={handleInputsChange}
                               value={inputs.title}/>
                    </div>
                    <div className="input-wrapper">
                        <label><h1>Date de sortie*</h1></label>
                        <input type="date"
                               required={true}
                               name="release_date"
                               onChange={handleInputsChange}
                               value={inputs.release_date}/>
                    </div>
                </div>

                <div className="input-wrapper">
    
                    <Categorie categoriesList={allCategories}
                                    actualCategories={categoriesList}
                                    setCategories={setCategoriesList}
                                   />
                </div>

                {/*DESCRIPTION INPUT*/}
                <div className="input-wrapper">
                    <label><h1>Description*</h1></label>
                    <textarea className="home-textarea" name="description" id="" cols="30" rows="10"
                              required={true}
                              placeholder="Bruce Wayne, alias Batman, est un super-héros de fiction appartenant à l'univers de DC Comics. ... Batman n'est en effet qu'un simple humain qui a décidé de lutter contre le crime après avoir vu ses parents se faire abattre par un voleur dans une ruelle de Gotham City, la ville où se déroulent la plupart de ses aventures."
                              onChange={handleInputsChange}
                              value={inputs.description}></textarea>
                </div>

                {/*POSTER + BACKDROP INPUT GROUP*/}
                <div className="input-group">
                    <div className="input-wrapper">
                        <label><h1>Affiche*</h1></label>
                                    <input
                                        onChange={(e) => handleUpload(e, setPosterProgress, "poster")}
                                        className="fileinput"
                                        type="file"
                                        name="image"
                                        id="fileinput-poster"
                                        accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                    />

                    </div>
                    <div className="input-wrapper">
                        <label><h1>Arrière plan*</h1></label>
                                    <input
                                        onChange={(e) => handleUpload(e, setBackdropProgress, "backdrop")}
                                        className="fileinput"
                                        type="file"
                                        name="image"
                                        id="fileinput-backdrop"
                                        accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                    />
                                        </div>
                                    </div>
                                <div><h1>Acteur</h1></div>
                                <div className="input-wrapper">
                                    <label><h1>Nom de l'acteur*</h1></label>
                                    <input
                                        type="text"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="name"
                                        value={actorData.name}
                                        onChange={handleActorChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label><h1>Rôle de l'acteur*</h1></label>
                                    <input
                                        type="text"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="character"
                                        value={actorData.character}
                                        onChange={handleActorChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label><h1>Photo</h1></label>

                                                <input
                                                    onChange={(e) => handleUpload(e, setActorProgress, "actor")}
                                                    className="fileinput"
                                                    type="file"
                                                    name="photo"
                                                    id="fileinput"
                                                    accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                                />
                                </div>
                                <input className="favorite styled" type="button" disabled={actorProgress == 100 ? false : true} value="valider les acteurs"
                                       onClick={handleActorSubmit}/>

                <div className="input-wrapper ">
                    <label><h1>Films Similaires</h1></label>
                    <div className="tiles-wrapper">
                        {/*SIMILAR MOVIES ADD TILE*/}
                        <div className="add-tile">
                            <div>

                                <div className="input-wrapper">
                                    <label><h1>Titre*</h1></label>
                                    <input
                                        type="text"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="title"
                                        value={movieData.title}
                                        onChange={handleMovieChange}
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label><h1>Date de sortie*</h1></label>
                                    <input
                                        type="date"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="release_date"
                                        value={movieData.release_date}
                                        onChange={handleMovieChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label><h1>Affiche</h1></label>

                                                <input
                                        onChange={handleMovieChange}
                                        className="fileinput"
                                                    type="file"
                                                    name="poster"
                                                    id="movieUpload"
                                                    accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                                />

                                </div>
                                <input className="favorite styled" type="button" disabled={movieProgress == 100 ? false : true} value="valider les films similaires"
                                       onClick={handleMovieSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="favorite styled" type="submit">Ajouter</button>
            </div>
        </form>
    </>
    );
};

export default AjoutFilm
