import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../apiCalls";

const useFetchAllPosts = () => {
  const query = useQuery(["posts"], fetchPosts);

  return query;
};

export default useFetchAllPosts;
