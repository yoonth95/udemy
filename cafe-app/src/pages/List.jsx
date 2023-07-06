import React from 'react';
import Footer from '../components/Footer';
import Box from '../components/Box';

import cafeList from 'api/cafeList.json';

import UseFavoriteCafe from 'hooks/useFavoriteCafe';

import 'styles/list.css'

const List = () => {
    const {favorite, save_remove_Favorite} = UseFavoriteCafe(JSON.parse(localStorage.getItem("favoriteCafeList")) || []);

    return (
        <div className='container'>
            <div className='list'>
                <div className='searchDiv'>
                    <h2>카페 찾기</h2>
                    <div>
                        <select name="" id="">
                            <option value="all">전체</option>
                        </select>
                        <input type="text" placeholder='키워드를 입력하세요'/>
                    </div>
                </div>
                <div className='listDiv'>
                    <p className='listTitle'>내 주변 카페</p>
                    <div className='cafeList'>
                        <Box cafeList={cafeList.filter(e => e.filter_id === 'near')} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                    </div>
                </div>
                <div className='listDiv'>
                    <p className='listTitle'>인기 카페</p>
                    <div className='cafeList'>
                        <Box cafeList={cafeList.filter(e => e.filter_id === 'famous')} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                    </div>
                </div>
                <div className='listDiv'>
                    <p className='listTitle'>한산한 카페</p>
                    <div className='cafeList'>
                        <Box cafeList={cafeList.filter(e => e.filter_id === 'quiet')} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default List;