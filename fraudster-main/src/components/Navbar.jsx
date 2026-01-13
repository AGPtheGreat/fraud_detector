import React from 'react';
import {useAuth} from "../utils/UseAuth.jsx";

function Navbar() {
    const { user, logoutUser } = useAuth()

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="app-name">Fraudster</span>
            </div>
            <div className="navbar-right">
                <span className="account-name">{user.name}</span>
                <button className="logout-button" onClick={ logoutUser }>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;