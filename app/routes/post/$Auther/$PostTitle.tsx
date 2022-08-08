import { LoaderFunction } from "@remix-run/node";
import { useParams, useLoaderData, useLocation} from "@remix-run/react";
import { getSinglePost } from "~/apis/fetch_post";

export const loader: LoaderFunction = async ({ params }: any) => {
  try {
    const { Auther, PostTitle } = params;
    const createSlug = `${Auther}/${PostTitle}`;
    const response = await getSinglePost(createSlug);
    return response;
  } catch (err: any) {
    return 'Error Fetching Details'
  }
};

export function action({ params }: any) {
  console.log("action param", params);
  return params;
}

export default function PostTitle() {
  const params = useParams();
  const data = useLoaderData()

  const location = useLocation();


  return <div>{JSON.stringify(data)}</div>;
}
