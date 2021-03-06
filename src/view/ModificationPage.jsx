import React, {useEffect, useState} from 'react';
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

import {uploadImage, getCategories, getMovieData, editMovie} from "../components/utils/crud";
import Categorie from "../components/Categorie";
import {useParams} from "react-router-dom";

const backdropPlaceholder = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.10wallpaper.com%2Ffr%2Flist%2FBeautiful_Nature_Scenery_4K_HD_Photo.html&psig=AOvVaw3TszFs97KeGsudUQMZk23b&ust=1636675673321000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD51ZKCj_QCFQAAAAAdAAAAABAD"
const posterPlaceholder = "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fdefault-placeholder.png?alt=media&token=c6082f11-8efe-42cc-b43d-c7b23b75f9b0"
const avatarPlaceholder = "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fsbcf-default-avatar.png?alt=media&token=d9863a53-4983-47d4-9ce7-434a9b5c9268"
const ModificationPage = () => {
    const {id} = useParams()
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
    const [data, setData] = useState({})

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

    const [actorsList, setActorsList] = useState(data.actors)
    const [moviesList, setMoviesList] = useState(data.similar_movies)

    const [categoriesList, setCategoriesList] = useState(data.categories)
    const [allCategories, setAllCategories] = useState([])


    useEffect(() => {
        getCategories(setAllCategories);
        getMovieData(id, setData)
    }, [])

    useEffect(() => {
        setCategoriesList(data.categories);
        setActorsList(data.actors)
        setMoviesList(data.similar_movies)
        setInputs(
            {
                ...data,
                posterName: "affiche",
                backdropName: "arri??re plan"
            }
        )
    }, [data])

    // G??rer la soumission du film ajouter
    const handleSubmit = (e) => {
        const newData = inputs
        e.preventDefault()
        if (
            !actorsList.length ||
            !categoriesList.length ||
            !newData.title.length ||
            !newData.description.length ||
            !newData.release_date.length ||
            !moviesList.length
        ) {
            alert("Veuillez remplir tout les champs");
            return
        }
        delete newData.posterName
        delete newData.backdropName
        delete newData.id
        newData.actors = actorsList
        newData.similar_movies = moviesList
        newData.categories = categoriesList
        editMovie(id, {...newData})
        alert('Le film ?? bien ??t?? modifi?? !')
        window.location.href = "/"
    }

// G??rer le formulaire acteur
    const handleActorSubmit = (e) => {
        const actorsValid = actorsList.filter(item => item.name === actorData.name)
        if (actorsValid.length) {
            alert('Cette acteur existe d??j??!')
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
            alert("Veuillez remplir tout les champs")
        }
    }
// G??rer le formulaie des films similaires
    const handleMovieSubmit = (e) => {
        const moviesValid = moviesList.filter(item => item.name === movieData.name)
        if (moviesValid.length) {
            alert('Cette acteur existe d??j??!')
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
// G??rer la liste des acteurs
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
            <h1 className="page-title">Voici le film que vous souhaitez modifier</h1>
            {data && actorsList && moviesList && 
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="input-wrapper">
                    <label><h1>Titre</h1></label>
                    <input type="text"
                        className="form-input"
                        name="title"
                        onChange={handleInputsChange}
                        required={true}
                        value={inputs.title}
                    />
                    </div>
                    <div className="input-wrapper">
                    <label><h1>Date de sortie</h1></label>
                        <input type="date"
                            required={true}
                            name="release_date"
                            onChange={handleInputsChange}
                            value={inputs.release_date}
                        />
                    </div>
                    <div className="input-wrapper">
                        <Categorie categoriesList={allCategories} actualCategories={categoriesList}
                                    setCategories={setCategoriesList}
                        />
                    </div>
                    <div className="input-wrapper">
                    <label><h1>Description</h1></label>
                    <textarea className="home-textarea" name="description" id="" cols="30" rows="10"
                        required={true}
                        onChange={handleInputsChange}
                        value={inputs.description}>
                    </textarea>
                    </div>
                    <div className="input-group">
                    <label><h1>Affiche</h1></label>
                        {posterProgress === 100
                            ? <>
                            <input
                                onChange={(e) => handleUpload(e, setPosterProgress, "poster")}
                                className="fileinput"
                                type="file"
                                name="image"
                                id="fileinput-poster"
                                accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                            />
                            </>
                        : "Chargement..."}
                        <div className="input-wrapper">
                        <label><h1>Arri??re Plan</h1></label>
                        <div className="upload-wrapper">
                            {backdropProgress === 100
                                ? <>
                                    <input
                                        onChange={(e) => handleUpload(e, setBackdropProgress, "backdrop")}
                                        className="fileinput"
                                        type="file"
                                        name="image"
                                        id="fileinput-backdrop"
                                        accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                    />
                                </>
                                : "Chargement..."}
                        </div>
                    </div>
                </div>

                <div className="input-wrapper ">
                    <label><h1>Acteur</h1></label>
                    <div className="tiles-wrapper">
                        {/*ACTOR ADD TILE*/}
                        <div className="add-tile">
                            <div className="add-tile-link"
                                 onClick={() => setActorForm(true)}>

                            </div>
                            <div className={`add-tile-form ${actorForm ? "" : "disabled"}`}>

                                <div className="input-wrapper">
                                    <label><h1>Nom</h1></label>
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
                                    <label><h1>R??le jou??</h1></label>
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
                                    <div className="upload-wrapper">
                                        {actorProgress === 100
                                            ? <>
                                                <input
                                                    onChange={(e) => handleUpload(e, setActorProgress, "actor")}
                                                    className="fileinput"
                                                    type="file"
                                                    name="photo"
                                                    id="fileinput"
                                                    accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                                />
                                            </>
                                            : "Chargement..."}
                                    </div>

                                </div>
                                <input className="favorite styled" type="button" disabled={actorProgress === 100 ? false : true} value="valider"
                                       onClick={handleActorSubmit}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="input-wrapper ">
                    <label><h1>Film Similaire</h1></label>
                    <div className="tiles-wrapper">
                        {/*SIMILAR MOVIES ADD TILE*/}
                        <div className="add-tile">
                            <div className="add-tile-link"
                                 onClick={() => setMovieForm(true)}>
                               
                            </div>
                            <div className={`add-tile-form ${movieForm ? "" : "disabled"}`}>

                                <div className="input-wrapper">
                                    <label><h1>Titre</h1></label>
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
                                    <label><h1>Date de sortie</h1></label>
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
                                    <div className="upload-wrapper">
                                        {movieProgress === 100
                                            ? <>
                                                <input
                                                    onChange={(e) => handleUpload(e, setMovieProgress, "movie")}
                                                    className="fileinput"
                                                    type="file"
                                                    name="poster"
                                                    id="movieUpload"
                                                    accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                                />
                                            </>
                                            : "Chargement..."}
                                    </div>

                                </div>
                                <input className="favorite styled" type="button" disabled={movieProgress === 100 ? false : true} value="valider"
                                       onClick={handleMovieSubmit}/>
                            </div>
                        </div>

                    </div>
                </div>
                <button className="favorite styled" type="submit">Modifier</button>
                </div>
            </form>}
        
        </>
    )
}
export default ModificationPage;