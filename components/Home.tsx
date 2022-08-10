import { Alert, Badge, Button, Card, Stack, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import type { NextPage } from "next";
import PostCard from "../components/PostCard";
import SkeletonCard from "../components/SkeletonCard";
import useCreatePost from "../hooks/useCreatePost";
import useFetchAllPosts from "../hooks/useFetchAllPosts";

const Home = () => {
  const postsQuery = useFetchAllPosts();

  const addPost = useCreatePost();

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
    <>
      <Button component={NextLink} href="/ssr" ml="lg" my="lg">
        SSR query
      </Button>
      <span>{addPost.isSuccess && "post added"}</span>
      <span>{addPost.isError && "could not add post"}</span>
      <Stack>
        {postsQuery.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
      <Button
        onClick={() =>
          addPost.mutate({
            content: `Post ${postsQuery.data.length + 1}`,
          })
        }
        ml="lg"
        mt="lg"
      >
        Add Post
      </Button>
    </>
  );
};

export default Home;
