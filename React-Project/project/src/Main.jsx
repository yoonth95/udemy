import React from 'react';
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/project1">Project 1</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Main;