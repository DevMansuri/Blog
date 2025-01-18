// import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Authors from "./components/Authors";

function App() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3001/authors")
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data))
  //     .catch((error) => console.error("Error fetching posts:", error));
  // }, []);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
    </>
  );
}

export default App;
