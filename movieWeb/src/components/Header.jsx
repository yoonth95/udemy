import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "styles/Header.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.navbar}>
            <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <h2 className={styles.h2}><Link to='/'>MOVIE</Link></h2>
        </header>
    );
};

export default Header;