import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBank(props) {
    const { selected } = props;
    const navigate = useNavigate();
    return (
        <nav className="navcus">
            <button className={`navbar-option ${selected === 'merchant-list' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/merchant-list')}>Merchant List</button>
            <button className={`navbar-option ${selected === 'create-merchant' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/create-merchant')}>Create Merchant</button>
            <button className={`navbar-option ${selected === 'create-manager' ? 'selected' : 'notSelected'}`} onClick={() => navigate('/create-manager')}>Create Manager</button>
        </nav>
    );
}

export default NavBank;