import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavMan(props) {
    const { selected } = props;
    const navigate = useNavigate();
    return (
        <nav className="navcus">
            <button className={`navbar-option ${selected === 'flagged-transactions' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/flagged-transactions')}>Flagged Transactions</button>
            <button className={`navbar-option ${selected === 'create-customer' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/create-customer')}>Create Customer</button>
        </nav>
    );
}

export default NavMan;