import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "styles/Main.module.css";

import noposter from "assets/images/noposter.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MovieList = ({movies}) => {
    const handleImgError = (e) => {
        e.target.src = noposter;
    }

    return (
        <div className={styles.movieAll}>
            {movies.map(item => (
                <div key={item.id} className={styles.movie}>
                    <figure>
                        <img className={styles.imgResponsive} src={item.medium_cover_image} alt="" onError={handleImgError}/>
                        <figcaption className={styles.figTag}>
                            <span className={styles.starIcon}><FontAwesomeIcon icon={faStar} /></span>
                            <h4>{item.rating} / 10</h4> <h4>{item.genres[0]}</h4>
                            <button>
                                <Link to={`/movies/${item.slug}`}>View Details</Link>
                            </button>
                        </figcaption>
                    </figure>
                    <p className={styles.movieTitle}>
                        <Link to={`/movies/${item.slug}`}>{item.title}</Link>
                    </p>
                    <p className={styles.movieYear}>{item.year}</p>
                </div>
            ))}
        </div>
    )
}

const Main = () => {
    const [movieList, setMovieList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'ok') {
                setMovieList(data.data.movies);
            } else {
                alert('불러오기 실패');
            }
        })
        .catch(err => console.log(err));
    }, []);

    if (!movieList) {
        return null;
    }

    // 검색
    const searchInput = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const filterMovide = movieList.filter(item => item.title.toLowerCase().includes(search));

    return (
        <div className={styles.mainUP}>            
            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.searchDiv} style={{position: 'relative'}}>
                        <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                        <input type="text" className={styles.search} value={search} placeholder='검색할 영화를 입력하세요.' onChange={searchInput}/>
                    </div>
                    <MovieList movies={filterMovide}/>
                </section>
            </main>
        </div>
    );
};

export default Main;