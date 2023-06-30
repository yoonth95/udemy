import { useEffect, useState } from 'react';

function UseFetchMovies(url) {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch(url, {
            method: 'POST',
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setMovieList(...movieList, data.data.movies);
                } else {
                    alert('불러오기 실패');
                    setLoading(false);
                }
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [])

    return { movieList, loading, error }
}

export default UseFetchMovies;