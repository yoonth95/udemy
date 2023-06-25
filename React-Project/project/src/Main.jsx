import React from 'react';
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div style={{margin: '70px'}}>
            <h1>과제 목록</h1>
            <nav>
                <ul>
                    <li style={{margin: '40px'}}>
                        <Link to="/project1">Project 1 (9일차 과제)</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Main;