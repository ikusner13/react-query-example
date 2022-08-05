import { Badge, Button, Card, Modal, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import React from "react";
import useDeletePost from "../hooks/useDeletePost";
import { Post } from "../types";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const deletePost = useDeletePost();

  return (
    <>
      <Card shadow="lg" p="lg" key={post.id} withBorder radius="lg">
        <Card.Section p="lg">
          <Text>
            <Badge mr="lg">{post.id}</Badge>
            {post.content}
          </Text>
        </Card.Section>
        <Button component={NextLink} href={`post/${post.id}`}>
          View
        </Button>
        <Button color="red" ml="lg" onClick={() => deletePost.mutate(post.id)}>
          Delete
        </Button>
      </Card>
    </>
  );
};

export default PostCard;
