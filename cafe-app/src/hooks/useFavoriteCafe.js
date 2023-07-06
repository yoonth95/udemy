import { useState } from 'react';

function UseFavoriteCafe(initialList) {
    const [favorite, setFavorite] = useState(initialList);

    const save_remove_Favorite = (id) => {
        if (favorite.includes(id)) {
            const filterList = favorite.filter(item => Number(item) !== Number(id));
            localStorage.setItem("favoriteCafeList", JSON.stringify(filterList));
            setFavorite(filterList);
        } else {
            const push_favorite = [...favorite, id];
            localStorage.setItem("favoriteCafeList", JSON.stringify(push_favorite));
            setFavorite(push_favorite);
        }
    }
    return { favorite, save_remove_Favorite }
}

export default UseFavoriteCafe;