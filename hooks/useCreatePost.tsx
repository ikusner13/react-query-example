import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../apiCalls";

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const addPost = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return addPost;
};

export default useCreatePost;
