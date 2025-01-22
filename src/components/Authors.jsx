import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import avatarProfile from "../assets/avatarProfile.jpg";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { PostAdd, Comment, ThumbUp } from "@mui/icons-material";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuthor, setFilteredAuthor] = useState([]);

  const cardsPerPage = 12;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch("http://localhost:3001/authors");
        const data = await response.json();
        setAuthors(data);
        setFilteredAuthor(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAuthor();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAuthor(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredAuthor.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAuthors = filteredAuthor.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: 4,
        color: "#ffffff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #6c5ce7, #a29bfe)",
          color: "transparent",
          WebkitBackgroundClip: "text",
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
          textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(45deg, #6c5ce7, #636e72)",
            WebkitBackgroundClip: "text",
            transform: "scale(1.05)",
          },
        }}
      >
        Authors
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: { xs: "100%", sm: "70%", md: "50%" },
            "& .MuiOutlinedInput-root": {
              color: "#1a1a1a",
              "& fieldset": {
                borderColor: "#6c5ce7",
              },
              "&:hover fieldset": {
                borderColor: "#1565c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6c5ce7",
              },
            },
            "& .MuiInputBase-input": {
              color: "#6c5ce7",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#6c757d",
              fontStyle: "italic",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#6c5ce7",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#3700b3",
            },
          }}
        >
          Search
        </Button>
      </Box>

      <Container
        sx={{
          my: 4,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 4,
          padding: 4,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Grid container spacing={3}>
          {currentAuthors.map((author) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", 
                  transition: "all 0.3s ease",
                  borderRadius: "8px", 
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)", 
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "150px",
                    objectFit: "cover",
                    width: "100%",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                  image={author.profileImage || avatarProfile}
                  alt={`${author.firstName} ${author.lastName}`}
                />
                <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      color: "#2c3e50", 
                      fontWeight: "bold",
                      mb: 2,
                      textTransform: "capitalize", 
                    }}
                  >
                    {author.firstName} {author.lastName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                      color: "#555", 
                    }}
                  >
                    <Typography variant="body2">
                      <ThumbUp sx={{ marginRight: 1, color: "#3498db" }} />{" "}
                      {author.numLikes}
                    </Typography>
                    <Typography variant="body2">
                      <PostAdd sx={{ marginRight: 1, color: "#e67e22" }} />{" "}
                      {author.numPosts}
                    </Typography>
                    <Typography variant="body2">
                      <Comment sx={{ marginRight: 1, color: "#e74c3c" }} />{" "}
                      {author.numComments}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    to={`/author-details/${author.id}`}
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#6c5ce7", 
                      color: "#ffffff", 
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#5b4dcf", 
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </Box>
  );
};

export default Authors;
