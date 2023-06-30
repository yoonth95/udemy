import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import UseFetchMovies from 'hooks/useFetchMovies';
import UseFavoriteMovies from 'hooks/useFavoriteMovies';
import UseSearchMovies from 'hooks/useSearchMovies';
import UsePagination from 'hooks/usePagination';

import Loading from 'components/Loading';

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
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = Number(query.get('page')) || 1;
    
    const { movieList, loading, error } = UseFetchMovies(`https://yts.mx/api/v2/list_movies.json?limit=50&minimum_rating=8.8&sort_by=year`);
    
    const { search, searchInput, filterFunction } = UseSearchMovies('');
    const [filterMovie, setMovieList] = useState([]);

    const { currentData, maxPage, pageClick } = UsePagination(filterMovie, 10, page);

    const searchClick = (list) => {
        if (search.trim() !== "") {
            const filtered = filterFunction(list, search);
            setMovieList(filtered);
        } else {
            setMovieList(movieList);
        }
    };

    // movieList 값이 변경되면 filter 값 넣기
    useEffect(() => {
        setMovieList(movieList);
    }, [movieList]);

    // 로딩
    if (loading) {
        return <Loading />
    } 

    // 에러
    if (error) console.log(error);

    return (
        <div className={styles.mainUP}>
            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.searchDiv} style={{position: 'relative'}}>
                        <input type="text" className={styles.search} value={search} placeholder='검색할 영화를 입력하세요.' onChange={searchInput}/>
                        <button className={styles.searchBtn} onClick={() => searchClick(movieList)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <MovieList movies={currentData}/>
                    <ul className={styles.pagination}>
                        {Array.from({length: maxPage}, (_, i) => 
                            <Link key={i} to={`/?page=${i+1}`}><li className={(page === i + 1) ? styles.active : ''} onClick={() => pageClick(i+1)}>{i + 1}</li></Link>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Main;