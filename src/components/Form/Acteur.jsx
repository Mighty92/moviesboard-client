import React, {useEffect, useState} from 'react';
import produce from "immer";
import { IoIosAddCircle } from "react-icons/io";


const Acteur = ({actorsData}) => {
    const [actors, setActors] = useState([{
        name: "",
        photo: "",
        character: ""
    }])

    //Ajouts de novueaux champs pour la création d'acteur
    function newActor(e) {
        setActors(currentActor => [...currentActor, {
            name: "",
            photo: "",
            character: ""
        }])

        e.preventDefault()
    }

    useEffect(() => {
        actorsData(actors)
    }, [actors])

    return (
        <div>
            {actors.map((a, index) =>
                <div key={index}>
                    <input type="text" placeholder={"Nom de l'acteur"} defaultValue={a.name} onChange={e => {
                        const name = e.target.value
                        setActors(currentActor => produce(currentActor, v => {
                            v[index].name = name
                        }))
                    }}/>
                    <input type="url" placeholder={"Photo"} defaultValue={a.photo} onChange={e => {
                        const photo = e.target.value
                        setActors(currentActor => produce(currentActor, v => {
                            v[index].photo = photo
                        }))
                    }}/>
                    <input type="text" placeholder={"Charactère"} defaultValue={a.character} onChange={e => {
                        const character = e.target.value
                        setActors(currentActor => produce(currentActor, v => {
                            v[index].character = character
                        }))
                    }}/>
                </div>
            )}
            <IoIosAddCircle onClick={newActor}/>
        </div>
    );
};

export default Acteur;