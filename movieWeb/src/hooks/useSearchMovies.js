import { useState } from 'react';

function UseSearchMovies(initialValue) {
    const [search, setSearch] = useState(initialValue);

    const searchInput = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const filterFunction = (list, val) => {
        return list.filter(item => item.title.toLowerCase().includes(val));
    }

    return { search, searchInput, filterFunction }
}

export default UseSearchMovies;