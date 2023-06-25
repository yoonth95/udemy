import React from 'react';

import './assets/style/project1.css';
// import Weather from './components/Weather';
import BoxContent from './components/BoxContent';

const Project1 = () => {
    const random_idx = parseInt(Math.random()*5+1);
    const img_value = require(`./assets/images/${random_idx}.jpg`)      // require로 images 폴더 접근하기

    return (
        <div className="container" style={{backgroundImage: `url(${img_value})`}}>
            {/* <Weather/> */}
            <BoxContent/>
        </div>
    );
};

export default Project1;