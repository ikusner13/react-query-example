import { Alert } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import useFetchPost from "../../hooks/useFetchPost";

const Post = () => {
  const router = useRouter();
  const postId = router.query.id as string;

  const postQuery = useFetchPost(parseInt(postId, 10));

  if (postQuery.isError) {
    return (
      <Alert title="Error!" color="red">
        Error
      </Alert>
    );
  }

  if (postQuery.isLoading) {
    console.log("post Loading...");
    return <div>Loading...</div>;
  }

  console.log("post: ", postQuery.data);

  return (
    <div>
      <h1>{postQuery.data.content}</h1>
    </div>
  );
};

export default Post;
