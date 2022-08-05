import { Card, Skeleton, Stack } from "@mantine/core";
import React from "react";
import { Post } from "../types";
import PostCard from "./PostCard";

const SkeletonCard = () => {
  return (
    <Stack>
      <Skeleton>
        <PostCard post={{} as Post} />
      </Skeleton>
      <Skeleton>
        <PostCard post={{} as Post} />
      </Skeleton>
    </Stack>
  );
};

export default SkeletonCard;
