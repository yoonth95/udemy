import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';

import cafeList from 'api/cafeList.json';
import 'styles/seat.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';

const Seat = () => {
    const navigate = useNavigate();
    const idx = Number(useParams().id);
    const [remain, setRemain] = useState([]);
    
    const filterCafeList = cafeList.filter(e => e.idx === idx)[0];

    useEffect(() => {
        const indexes = [];
        while (indexes.length < filterCafeList.remain_seats) {
            const randomValue = Math.floor(Math.random() * filterCafeList.total_seats);
            if (!indexes.includes(randomValue)) {
                indexes.push(randomValue)
            }
        }

        setRemain(indexes);
    }, [filterCafeList]);

    console.log(remain);

    return (
        <div className='container'>
            <div className='topBackColor'></div>
            <div className='seat'>
                <div className='seat-header'>
                    <span onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} /></span>
                    <h2 className='seat-title'>{filterCafeList.name}</h2>
                </div>
                <p className='seats-text'>잔여좌석 : {filterCafeList.remain_seats} / {filterCafeList.total_seats}</p>
                <div className='seats-table'>
                    {Array.from({length: filterCafeList.total_seats}, (_, i) =>
                        <div key={i} className={`seat-box ${remain.includes(i) ? 'seat-remain' : 'seat-no'}`}></div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Seat;