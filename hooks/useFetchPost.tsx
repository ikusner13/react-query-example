import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../apiCalls";

const useFetchPost = (postId: number) => {
  const query = useQuery(["posts", postId], () => fetchPost(postId));

  return query;
};

export default useFetchPost;
