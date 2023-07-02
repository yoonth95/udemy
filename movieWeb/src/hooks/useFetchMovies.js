import { useEffect, useState } from 'react';

function UseFetchMovies(url) {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('fetch error');

                const data = await res.json();
                setMovieList(...movieList, data.data.movies);
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