import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavCus(props) {
    const { selected } = props;
    const navigate = useNavigate();
    return (
        <nav className="navcus">
            <button className={`navbar-option ${selected === 'transactions' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/transaction-list')}>Transactions</button>
            <button className={`navbar-option ${selected === 'pending-action' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/pending-action')}>Review</button>
            <button className={`navbar-option ${selected === 'settings' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/settings')}>Settings</button>
        </nav>
    );
}

export default NavCus;