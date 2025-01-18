
const Pagination = ({
  // eslint-disable-next-line react/prop-types
  currentPage,
  // eslint-disable-next-line react/prop-types
  totalPages,
  // eslint-disable-next-line react/prop-types
  onPageChange,
  // eslint-disable-next-line react/prop-types
  pageRange = 5, 
}) => {

  const getPageNumbers = () => {
    const start = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const end = Math.min(totalPages, start + pageRange - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((page) => (
          <li
            className={`page-item ${currentPage === page ? "active" : ""}`}
            key={page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        {currentPage < totalPages - Math.floor(pageRange / 2) && (
          <li className="page-item">
            <span className="page-link">...</span>
          </li>
        )}
        {currentPage < totalPages && (
          <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
