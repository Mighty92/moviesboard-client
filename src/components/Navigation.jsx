import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        // Navlink permet de creer des liens
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/liste-evenements" activeClassName="nav-active">
                Liste des évènements
            </NavLink>
            <NavLink exact to="/favoris" activeClassName="nav-active">
                Favoris
            </NavLink>

        </div>
    );
};

export default Navigation;