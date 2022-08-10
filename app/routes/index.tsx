import { NavigateFunction, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";


// COMPONENTS
import { Button, Box } from "@mui/material";
import Post from "../components/Post";
import styles from "../styles/wrapper.css";

// INTERFACES
import { PostItem } from "~/model";

// APIS
import { fetchAllPost } from "../apis/fetch_post";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async () => {
  return await fetchAllPost();
};

export default function Index() {
  const navigate: NavigateFunction = useNavigate();
  const postData: PostItem[] = useLoaderData();

  return (
    <div className='container'>
      <Box sx={{ ml: "auto", p: 4 }}>
        <Button onClick={() => navigate("/create-post")} variant='contained'>
          Create a Post
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        {postData?.map((item: PostItem) => {
          return <Post key={item.title} post={item} />;
        })}
      </Box>
    </div>
  );
}
