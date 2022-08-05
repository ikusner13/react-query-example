interface post {
  id: number;
  content: string;
}

const postsData: post[] = [
  {
    id: 1,
    content: "This is my first post using Next.js",
  },
  {
    id: 2,
    content: "This is my second post using Next.js",
  },
  {
    id: 3,
    content: "This is my third post using Next.js",
  },
];

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<post | post[]>
) {
  const { posts } = req.query;

  if (req.method === "GET") {
    if (posts && posts.length > 1) {
      const id = posts[1];

      const post = postsData.find((post) => post.id === parseInt(id, 10));

      if (post) {
        return res.status(200).json(post);
      }

      return res.status(404);
    }

    console.log("postsData", postsData);

    res.status(200).json(postsData);
  }

  if (req.method === "POST") {
    console.log("req.body", req.body);
    const newPost = {
      id: postsData.length + 1,
      content: req.body.content,
    };
    console.log("newPost", newPost);
    postsData.push(newPost);
    res.status(201).json(postsData);
  }

  if (req.method === "DELETE") {
    if (posts && posts.length > 1) {
      const id = posts[1];

      const post = postsData.find((post) => post.id === parseInt(id, 10));

      if (post) {
        postsData.splice(postsData.indexOf(post), 1);
        res.status(200).json(postsData);
      }

      res.status(404);
    }
    res.status(404);
  }
}
