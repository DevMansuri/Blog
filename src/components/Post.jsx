import { useState, useEffect } from "react";
import { Comment, ThumbUp, Delete } from "@mui/icons-material";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const postPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/posts");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setIsDialogOpen(false);
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openDeleteDialog = (postId) => {
    setSelectedPost(postId);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedPost(null);
    setIsDialogOpen(false);
  };

  const totalPages = Math.ceil(filteredPosts.length / postPerPage);
  const indexOfLastCard = currentPage * postPerPage;
  const indexOfFirstCard = indexOfLastCard - postPerPage;
  const currentPost = filteredPosts.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          color: "black",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
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
            textShadow: "1px 1px 6px rgba(108, 92, 231, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          Posts
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            marginBottom: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: { xs: "100%", sm: "70%", md: "50%" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6c5ce7",
                },
                "&:hover fieldset": {
                  borderColor: "#5e548e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5e548e",
                },
              },
              input: {
                color: "#2d3436",
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
              "&:hover": {
                backgroundColor: "#5e548e",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Search
          </Button>
        </Box>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress sx={{ color: "#6c5ce7" }} />
          </Box>
        ) : (
          currentPost.map((post) => (
            <Box
              key={post.id}
              sx={{
                padding: 3,
                marginBottom: 3,
                border: "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s, transform 0.3s",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#6c5ce7",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#636e72",
                  marginBottom: 2,
                }}
              >
                {post.description.substring(0, 150)}...
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6c5ce7",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ThumbUp sx={{ marginRight: 0.5 }} />
                    {post.numLikes}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#e17055",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Comment sx={{ marginRight: 0.5 }} />
                    {post.numComments}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" }, // Stack buttons vertically on small screens
                    alignItems: "center", // Align buttons to the center
                  }}
                >
                  <Button
                    component={Link}
                    to={`/post-details/${post.id}`}
                    variant="outlined"
                    sx={{
                      color: "#6c5ce7",
                      borderColor: "#6c5ce7",
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" }, // Full width on mobile, auto width on larger screens
                      "&:hover": {
                        backgroundColor: "#f1f2f6",
                      },
                    }}
                  >
                    View Post
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => openDeleteDialog(post.id)}
                    sx={{
                      width: { xs: "100%", sm: "auto" }, // Full width on mobile, auto width on larger screens
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          ))
        )}

        <Pagination
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            "& button": {
              backgroundColor: "#6c5ce7",
              color: "white",
              "&:hover": {
                backgroundColor: "#5e548e",
              },
            },
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <Dialog open={isDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>Cancel</Button>
            <Button
              onClick={() => handleDelete(selectedPost)}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Post;
