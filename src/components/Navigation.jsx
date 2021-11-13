import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        // Navlink permet de creer des liens
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/ajout-film" activeClassName="nav-active">
                Ajout de film
            </NavLink>
            <NavLink exact to="/modificationPage" activeClassName="nav-active">
                Page de modification
            </NavLink>
            {/* <NavLink exact to="/favoris" activeClassName="nav-active">
                Favoris
            </NavLink> */}

        </div>
    );
};

export default Navigation;