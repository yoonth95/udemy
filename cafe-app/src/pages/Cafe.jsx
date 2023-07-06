import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import Footer from '../components/Footer';
import cafeList from 'api/cafeList.json';

import UseFavoriteCafe from 'hooks/useFavoriteCafe';

import 'styles/cafe.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faAngleLeft, faLocationDot, faClock, faPhone, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import cafe1 from 'assets/images/cafe1.png';
import cafe2 from 'assets/images/cafe2.png';
import cafe3 from 'assets/images/cafe3.png';
import cafe4 from 'assets/images/cafe4.png';

const Cafe = () => {
    const idx = Number(useParams().id);
    const navigate = useNavigate();
    const images = { cafe1, cafe2, cafe3, cafe4 };

    const {favorite, save_remove_Favorite} = UseFavoriteCafe(JSON.parse(localStorage.getItem("favoriteCafeList")) || []);
    const filterCafeList = cafeList.filter(e => e.idx === idx)[0];

    return (
        <div className='container'>
            <div className='cafe'>
                <div className='cafe-header'>
                    <span onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} /></span>
                    <h2 className='cafe-title'>{filterCafeList.name}</h2>
                    <div style={{display: "flex", alignItems: "center", position: "relative"}}>
                        <span className='insta'><Link to="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></Link></span>
                        <span style={{ color: 'red' }} onClick={() => save_remove_Favorite(filterCafeList.idx)}>{favorite.includes(filterCafeList.idx) ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular}/> }</span>
                    </div>
                </div>
                <div className='imgDIv'>
                    <img src={images[filterCafeList.img_src]} alt="" />
                </div>
                <div className='cafe-description'>
                    <div className='cafe-info'>
                        <span><FontAwesomeIcon icon={faLocationDot} /> {filterCafeList.location}</span>
                        <span><FontAwesomeIcon icon={faClock} /> {filterCafeList.time}</span>
                        <span><FontAwesomeIcon icon={faPhone} /> {filterCafeList.call}</span>
                    </div>
                    <div className='cafe-seats'>
                        <button onClick={() => navigate(`/cafe/${filterCafeList.idx}/seat`)}>좌석 현황</button>
                    </div>
                </div>
                <div className='cafe-menu'>
                    <p>메뉴</p>
                    <div className='cafe-price'>
                        {Object.entries(filterCafeList.menu).map(([key, value], index) => (
                            <div className='menu-item' key={index}>
                                <span className='name'>{key}</span>
                                <span className='dash'>---------------------------</span>
                                <span className='price'>{value}</span>
                            </div>
                        ))}
                    </div>
                    <button>더보기 <FontAwesomeIcon icon={faSortDown} /></button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cafe;