import { useState } from 'react';

function UsePagination(data, itemsPerPage, nowPage) {
    const [currentPage, setCurrentPage] = useState(nowPage);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    const pageClick = (page) => {
        setCurrentPage(page);
    }

    const currentData = data.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage)

    return { currentData, maxPage, pageClick }
}

export default UsePagination;