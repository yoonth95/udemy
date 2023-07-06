import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import cafe1 from 'assets/images/cafe1.png';
import cafe2 from 'assets/images/cafe2.png';
import cafe3 from 'assets/images/cafe3.png';
import cafe4 from 'assets/images/cafe4.png';

import 'styles/box.css';

const Box = (props) => {
    const navigate = useNavigate();
    const images = { cafe1, cafe2, cafe3, cafe4 };

    const moveDetail = (id) => {
        console.log("디테일 이동", id);
        navigate(`/detail/${id}`)
    }

    const clickFavorite = (event, id) => {
        event.stopPropagation();  // 이벤트 버블링 중지
        props.save_remove_Favorite(id);
    }

    return (
        <>
            {props.cafeList.map(item => (
                <div className='box' key={item.idx}>
                    <img src={images[item.img_src]} alt="" onClick={() => moveDetail(item.idx)}/>
                    <div className='box-info'>
                        <div className='box-title'>
                            <p onClick={() => moveDetail(item.idx)}>{item.name}</p>
                            <span onClick={(event) => clickFavorite(event, item.idx)}>{props.favorite.includes(item.idx) ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}</span>
                        </div>
                        <p className='box-location' onClick={() => moveDetail(item.idx)}>{item.location}</p>
                        <div className='typeList'>
                            {item.type.map((i, index) => (
                                <span key={index}>{i}</span>
                            ))}
                        </div>
                        <p className='remain-seats'>잔여좌석 : {item.remain_seats}/{item.total_seats}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Box;