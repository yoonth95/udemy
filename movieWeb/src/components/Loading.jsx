import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "styles/Loading.module.css";

const Loading = () => {
    return (
        <div className={styles.loading}>
            <FontAwesomeIcon icon={faSpinner} />
            <h3>Loading...</h3>
        </div>
    );
};

export default Loading;