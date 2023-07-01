function UsePagination(data, itemsPerPage, nowPage) {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice((nowPage-1)*itemsPerPage, nowPage*itemsPerPage);

    return { currentData, maxPage }
}
export default UsePagination;