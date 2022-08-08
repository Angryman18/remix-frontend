import { Typography, Chip, Paper } from "@mui/material";
import { useNavigate } from "@remix-run/react";

// INTERFACS
import { PostItem } from "~/model";

const postView = {
  m: 4,
  mt: 0,
  borderRadius: "5px",
  p: 2,
  '&:hover': {
    backgroundColor: '#f1f5f9',
    cursor: 'pointer'
  }
};

interface Props {
  post: PostItem;
}

export default function Post({ post }: Props): JSX.Element {

  const navigate = useNavigate()

  const handleClick = (slug: string) => () => {
    navigate(`/post/${slug}`)
  }

  return (
    <Paper onClick={handleClick(post.slug)} sx={postView} variant="outlined">
      <Typography variant="h6">{post.title}</Typography>
      <Typography variant="body1" sx={{ color: "#94a3b8" }}>
        {post.description.slice(0, 100) + "..."}
      </Typography>
      <Typography variant="body2" sx={{ color: "#94a3b8", pt: 1 }} gutterBottom>
        {new Date(post.posted).toDateString()}
      </Typography>
      {post?.tags?.map((tag: string): JSX.Element => {
        return <Chip key={tag} label={tag} sx={{ mx: 0.5 }} size="small" />;
      })}
    </Paper>
  );
}
