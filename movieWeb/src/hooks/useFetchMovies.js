import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMovieList } from 'redux/MovieStore';

function UseFetchMovies(url) {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('fetch error');

                const data = await res.json();
                setMovieList(...movieList, data.data.movies);
                dispatch(getMovieList({ movies: data.data.movies }));       // redux 사용하여 date 값 저장
                setLoading(false);
            }
            catch (error) {
                setError(error);
                setLoading(false);
                alert("불러오기 실패");
            }

        }
        fetchData();
    }, [])

    return { movieList, loading, error }
}

export default UseFetchMovies;