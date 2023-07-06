import React from 'react';
import Footer from '../components/Footer';
import Box from '../components/Box';

import cafeList from 'api/cafeList.json';

import UseFavoriteCafe from 'hooks/useFavoriteCafe';

import 'styles/main.css';

const Main = () => {
    const {favorite, save_remove_Favorite} = UseFavoriteCafe(JSON.parse(localStorage.getItem("favoriteCafeList")) || []);

    return (
        <div className='container'>
            <div className='main'>
                <h2>구독 리스트</h2>
                <Box cafeList={cafeList.filter(e => favorite.includes(e.idx))} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
            </div>
            <Footer />
        </div>
    );
};

export default Main;