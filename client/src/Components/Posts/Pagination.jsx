
const Pagination = ({ pageNumber, setPageNumber }) => {
  return (
    <div className="pagination">
      <button id="prevPage" onClick={() => setPageNumber(prevData => prevData - 1)}>Previous Page</button>
      <span id="currentPage">Page {pageNumber}</span>
      <button id="nextPage" onClick={() => setPageNumber(prevData => prevData + 1)}>Next Page</button>
    </div>
  );
}

export default Pagination;
