import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from "styles/Movies.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Moives = () => {
    const {moviename} = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [movieGenre, setMovieGenre] = useState('');

    // 1. Link state 값을 가져오기 (새로고침 하거나 브라우저를 종료하면 데이터가 사라짐)
    const location = useLocation();
    console.log(location.state.movie);

    // 2. redux (새로고침 하거나 브라우저를 종료하면 데이터가 사라짐)
    const { movies } = useSelector(state => state.MovieStore);
    console.log(movies.filter(item => item.slug === moviename)[0]);

    // 3. url의 파라미터 값으로 fetch 후 filter (새로고침 해도 데이터는 남아있지만 fetch를 진행해야 되기 때문에 로딩 시간이 걸림)
    useEffect(() => {
        const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'ok') {
                const movie = data.data.movies.filter(item => item.slug === moviename)[0]; 
                setMovieInfo(movie);

                const genreList = movie.genres;
                setMovieGenre(genreList.length === 1 ? genreList : genreList.join(' / '));
            } else {
                alert('불러오기 실패');
            }
        })
        .catch(err => console.log(err));
    }, [moviename])

    // 만약 movieInfo가 아직 설정되지 않았다면 렌더링을 기다림
    if (!movieInfo) {
        return null;
    }

    const backStyle = {
        backgroundImage: `linear-gradient(
            to bottom,
            rgba(20, 20, 20, 0) 10%,
            rgba(20, 20, 20, 0.25) 25%,
            rgba(20, 20, 20, 0.5) 50%,
            rgba(20, 20, 20, 0.75) 75%,
            rgba(20, 20, 20, 1) 100%
        ), url(${movieInfo.background_image})`
    }

    return (
        <div className={styles.main}>
            <div className={styles.backImage} style={backStyle}></div>
            <div className={styles.backgroundOverlay}></div>
            <div className={styles.minContent}>
                <div className={styles.container}>
                    <div className={styles.poster}>
                        <img src={movieInfo.medium_cover_image} alt="" />
                    </div>
                    <div className={styles.info}>
                        <h1>{movieInfo.title}</h1>
                        <h2>{movieInfo.year}</h2>
                        <h2>{movieGenre}</h2>

                        <div className={styles.rating}>
                            <span className={styles.starIcon}><FontAwesomeIcon icon={faStar} /></span>
                            <h4>{movieInfo.rating} / <span>10</span></h4>
                        </div>

                        <div className={styles.movieDescription}>
                            <h4>Description</h4>
                            <p>{movieInfo.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moives;