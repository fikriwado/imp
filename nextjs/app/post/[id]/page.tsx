"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/app/layouts/AppLayout";
import postService from "@/services/postService";

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail?: string | null;
  status: string;
  published_at: string | null;
  user: {
    id: number;
    name: string;
  };
}

export default function ShowPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const response = await postService.find(Number(postId));
        console.log(response);
        setPost(response.data.result);
      } catch (err) {
        console.error("Failed to fetch post", err);
        alert("Failed to load post");
        router.push("/post");
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <AppLayout>No post found</AppLayout>;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-10">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="mb-4 text-gray-600">Author: {post.user.name}</p>
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full max-h-96 object-cover mb-4 rounded"
          />
        )}
        <div className="prose mb-4">
          <p>{post.content}</p>
        </div>
        <p className="text-sm text-gray-500">Status: {post.status}</p>
        <p className="text-sm text-gray-500">
          Published at:{" "}
          {post.published_at
            ? new Date(post.published_at).toLocaleString()
            : "-"}
        </p>
      </div>
    </AppLayout>
  );
}
