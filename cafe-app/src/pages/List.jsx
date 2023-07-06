import React, { useState } from 'react';
import Footer from '../components/Footer';
import Box from '../components/Box';

import cafeList from 'api/cafeList.json';

import UseFavoriteCafe from 'hooks/useFavoriteCafe';

import 'styles/list.css'

const List = () => {
    const {favorite, save_remove_Favorite} = UseFavoriteCafe(JSON.parse(localStorage.getItem("favoriteCafeList")) || []);

    const [selectVlaue, setSelectValue] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const [filterList, setFilterList] = useState(cafeList);

    const searchInput = (e) => {
        if (e.key === 'Enter') {
            const inputValue = e.target.value.trim();
            if (inputValue === '') {
                setIsSearch(false);
                setFilterList([...cafeList])
            } else {
                setIsSearch(true);
                setFilterList([...cafeList.filter(item => item.name.includes(inputValue))])
            }
        }
    }

    console.log(filterList);    

    return (
        <div className='container'>
            <div className='list'>
                <div className='searchDiv'>
                    <h2>카페 찾기</h2>
                    <div>
                        <select name="" id="" onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="all">전체</option>
                            <option value="near">주변</option>
                            <option value="famous">인기</option>
                            <option value="quiet">한산한</option>
                        </select>
                        <input type="text" placeholder='키워드를 입력하세요' onKeyUp={searchInput}/>
                    </div>
                </div>

                {!isSearch ? 
                    <>
                        <div className='listDiv'>
                            <p className='listTitle'>내 주변 카페</p>
                            <div className='cafeList'>
                                <Box cafeList={filterList.filter(e => e.filter_id === 'near')} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                            </div>
                        </div>
                        <div className='listDiv'>
                            <p className='listTitle'>인기 카페</p>
                            <div className='cafeList'>
                                <Box cafeList={filterList.filter(e => e.filter_id === 'famous')} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                            </div>
                        </div>
                        <div className='listDiv'>
                            <p className='listTitle'>한산한 카페</p>
                            <div className='cafeList'>
                                <Box cafeList={filterList.filter(e => e.filter_id === 'quiet')} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                            </div>
                        </div>
                    </>
                :
                    <>
                        <div className='listDiv'>
                            <p className='listTitle'>검색 결과</p>
                            <div className='cafeList'>
                                <Box cafeList={filterList.filter(e => e.filter_id === selectVlaue)} favorite={favorite} save_remove_Favorite={save_remove_Favorite}/>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Footer />
        </div>
    );
};

export default List;