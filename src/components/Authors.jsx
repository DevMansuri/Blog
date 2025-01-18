import { useEffect, useState } from "react";
import profilePicture from '../assets/dummy.jpg'
import Pagination from "./Pagination";
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12; 

  useEffect(() => {
    fetch("http://localhost:3001/authors")
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const totalPages = Math.ceil(authors.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAuthors = authors.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Authors</h1>
      <div className="row">
        {currentAuthors.map((author) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={author.id}>
            <div className="card h-100">
              <img
                src={profilePicture}
                className="card-img-top"
                alt={`${author.firstName} ${author.lastName}`}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {author.firstName} {author.lastName}
                </h5>
                <p className="card-text">
                  <strong>Phone:</strong> {author.phone}
                </p>
                <p className="card-text">
                  <strong>Posts:</strong> {author.numPosts}
                </p>
                <p className="card-text">
                  <strong>Comments:</strong> {author.numComments}
                </p>
                <p className="card-text">
                  <strong>Likes:</strong> {author.numLikes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Authors;