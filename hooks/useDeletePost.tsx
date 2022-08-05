import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../apiCalls";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return deletePostMutation;
};

export default useDeletePost;
