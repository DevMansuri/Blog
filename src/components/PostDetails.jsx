import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";
import {
  fetchPostDetails,
  fetchLikes,
  fetchComments,
  fetchAuthorName,
} from "../api";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const postData = await fetchPostDetails(postId);
      setPost(postData);
    };

    fetchDetails();
  }, [postId]);

  const handleLikesClick = async () => {
    try {
      const likesData = await fetchLikes(postId);

      const updatedLikes = await Promise.all(
        likesData.map(async (like) => ({
          ...like,
          authorName: await fetchAuthorName(like.authorId),
        }))
      );

      setLikes(updatedLikes);
      setDialogContent("likes");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching likes:", error.message);
      alert("Failed to fetch likes. Please try again later.");
    }
  };

  const handleCommentsClick = async () => {
    try {
      const commentsData = await fetchComments(postId);

      const updatedComments = await Promise.all(
        commentsData.map(async (comment) => ({
          ...comment,
          authorName: await fetchAuthorName(comment.authorId),
        }))
      );

      setComments(updatedComments);
      setDialogContent("comments");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      alert("Failed to fetch comments. Please try again later.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent(null);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        my: 5,
        padding: 3,
        background: "linear-gradient(135deg, #f8f9fa, #ffffff)",
        minHeight: "100vh",
        borderRadius: "12px",
      }}
    >
      <Card
        sx={{
          marginBottom: 3,
          padding: 3,
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
            color: "#6c5ce7",
            fontWeight: "bold",
            textShadow: "1px 1px 6px rgba(108, 92, 231, 0.3)",
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            color: "#636e72",
            fontStyle: "italic",
          }}
        >
          Published on: {new Date(post.datePublished).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            color: "#2d3436",
            lineHeight: "1.8",
          }}
        >
          {post.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
          <Button
            variant="contained"
            startIcon={<ThumbUp />}
            sx={{
              backgroundColor: "#6c5ce7",
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "#5e548e" },
            }}
            onClick={handleLikesClick}
          >
            Show Likes
          </Button>
          <Button
            variant="contained"
            startIcon={<Comment />}
            sx={{
              backgroundColor: "#ff7043",
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e64a19" },
            }}
            onClick={handleCommentsClick}
          >
            Show Comments
          </Button>
        </Box>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#6c5ce7",
            fontWeight: "bold",
          }}
        >
          {dialogContent === "likes"
            ? `Likes (${likes.length})`
            : `Comments (${comments.length})`}
        </DialogTitle>
        <DialogContent>
          <List>
            {dialogContent === "likes" &&
              likes.map((like, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={like.authorName || "Anonymous"}
                    secondary={`Liked on: ${new Date(
                      like.datePublished
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            {dialogContent === "comments" &&
              comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={comment.authorName || "Anonymous"}
                    secondary={`${comment.text} - ${new Date(
                      comment.datePublished
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      <Button
        variant="outlined"
        sx={{
          marginTop: 3,
          color: "#6c5ce7",
          borderColor: "#6c5ce7",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#f1f2f6",
          },
        }}
        href={`/author-details/${post.authorId}`}
      >
        Back to Author
      </Button>
    </Box>
  );
};

export default PostDetails;
