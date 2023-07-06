import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import 'styles/footer.css';
import { ReactComponent as HomeIcon } from 'assets/images/home.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faBell, faHeart as faHeartRegular, faUser } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
    const [locationValue, setLocationValue] = useState('');
    const location = useLocation().pathname;

    useEffect(() => {
        setLocationValue(location);
    }, [location])

    return (
        <div className='footer'>
            <ul>
                <li><Link to='/list'>{locationValue.includes('list') ? <FontAwesomeIcon icon={faHouse} /> : <HomeIcon />}</Link></li>
                <li><FontAwesomeIcon icon={faBell} /></li>
                <li><Link to='/main'>{locationValue.includes('main') ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}</Link></li>
                <li><FontAwesomeIcon icon={faUser} /></li>
            </ul>
        </div>
    );
};

export default Footer;