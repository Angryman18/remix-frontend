import { LoaderFunction } from "@remix-run/node";
import { useParams, useLoaderData, useLocation } from "@remix-run/react";
import { getSinglePost } from "~/apis/fetch_post";
import { Box, Typography, Stack } from "@mui/material";
import styles from "../../../styles/wrapper.css";
import { BiEdit } from "react-icons/bi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ params }: any) => {
  try {
    const { Auther, PostTitle } = params;
    const createSlug = `${Auther}/${PostTitle}`;
    const response = await getSinglePost(createSlug);
    return response;
  } catch (err: any) {
    return "Error Fetching Details";
  }
};

export function action({ params }: any) {
  console.log("action param", params);
  return params;
}

export default function PostTitle() {
  const params = useParams();
  const [content] = useLoaderData();

  const location = useLocation();

  return (
    <div className="wrapper">
      <Typography variant="h4">{content?.title}</Typography>
      <Stack direction="row" alignItems="center" gap={0.5}>
        {/* {post.description.slice(0, 100) + "..."} */}
        <BiEdit style={{ fontSize: "1.3rem", color: "#94a3b8" }} />
        <Typography variant="body1" sx={{ color: "#94a3b8" }}>
          {content.auther}
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: "#94a3b8", pt: 1 }} gutterBottom>
        {new Date(content.posted).toDateString()}
      </Typography>
      <Typography>{content?.description}</Typography>
    </div>
  );
}
