import { LoaderFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useLocation } from "@remix-run/react";

export const loader: LoaderFunction = ({ params }: any) => {
  console.log("this is loader", params);
  return params;
};

export function action({ params }: any) {
  console.log("action param", params);
  return params;
}

export default function PostTitle() {
  const params = useParams();

  const location = useLocation();

  console.log(location);

  return <div>Hello World;</div>;
}
