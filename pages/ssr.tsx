import React from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../apiCalls";
import useFetchAllPosts from "../hooks/useFetchAllPosts";
import useCreatePost from "../hooks/useCreatePost";
import { Alert, Stack } from "@mantine/core";
import SkeletonCard from "../components/SkeletonCard";
import PostCard from "../components/PostCard";

const Ssr = () => {
  // data is filled from server
  const postsQuery = useFetchAllPosts();

  if (postsQuery.isError) {
    return (
      <Alert title="Error!" color="red">
        Error
      </Alert>
    );
  }

  if (postsQuery.isLoading) {
    console.log("Loading...");
    return <SkeletonCard />;
  }

  return (
    <Stack>
      {postsQuery.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default Ssr;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
