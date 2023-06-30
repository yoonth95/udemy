import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UseFetchMovies from 'hooks/useFetchMovies';
import UseFavoriteMovies from 'hooks/useFavoriteMovies';
// import UseSearchMovies from 'hooks/useSearchMovies';

import styles from "styles/Main.module.css";
import noposter from "assets/images/noposter.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";

const MovieList = ({movies}) => {
    const {favorite, save_remove_Favorite} = UseFavoriteMovies(JSON.parse(localStorage.getItem("favoriteList")) || []);

    const handleImgError = (e) => {
        e.target.src = noposter;
    }

    const clickFavorite = (id) => {
        save_remove_Favorite(id);
    }

    return (
        <div className={styles.movieAll}>
            {movies.map(item => (
                <div key={item.id} className={styles.movie}>
                    <span className={ favorite.includes(item.id) ? styles.favClick : styles.fav } onClick={() => clickFavorite(item.id)}><FontAwesomeIcon icon={faHeart} /></span>
                    <figure>
                        <img className={styles.imgResponsive} src={item.medium_cover_image} alt="" onError={handleImgError}/>
                        <figcaption className={styles.figTag}>
                            <span className={styles.starIcon}><FontAwesomeIcon icon={faStar} /></span>
                            <h4>{item.rating} / 10</h4> <h4>{item.genres[0]}</h4>
                            <button><Link to={`/movies/${item.slug}`} state={{ movie: item }}>View Details</Link></button>
                        </figcaption>
                    </figure>
                    <p className={styles.movieTitle}>
                        <Link to={`/movies/${item.slug}`} state={{ movie: item }}>{item.title}</Link>
                    </p>
                    <p className={styles.movieYear}>{item.year}</p>
                </div>
            ))}
        </div>
    )
}

const Main = () => {
    const { movieList, loading, error } = UseFetchMovies(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`);
    // const { search, searchInput, filterFunction } = UseSearchMovies('');
    // const [filterMovie, setFilterMovie] = useState([]);

    // 로딩
    if (loading) {
        return null;
    } 

    // 에러
    if (error) console.log(error);

    // const searchClick = () => {
    //     const filtered = filterFunction(movieList, search);
    //     setFilterMovie(filtered);
    // };

    return (
        <div className={styles.mainUP}>
            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.searchDiv} style={{position: 'relative'}}>
                        {/* <input type="text" className={styles.search} value={search} placeholder='검색할 영화를 입력하세요.' onChange={searchInput}/> */}
                        {/* <button onClick={() => searchClick(movieList)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button> */}
                    </div>
                    <MovieList movies={movieList}/>
                </section>
            </main>
        </div>
    );
};

export default Main;