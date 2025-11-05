"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import postService from "@/services/postService";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  status: string;
  thumbnail?: string;
}

export default function Post() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchPosts = async (page = 1) => {
    try {
      const response = await postService.all({ page });
      setPosts(response.data.result.posts.data);
      setCurrentPage(response.data.result.posts.current_page);
      setLastPage(response.data.result.posts.last_page);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleCreate = () => {
    router.push("/post/create");
  };

  const handleEdit = (id: number) => {
    router.push(`/post/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await postService.destroy(id);
      fetchPosts(currentPage);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <AppLayout>
      <div className="container py-40">
        <button onClick={handleCreate} className="btn btn-primary mb-5">
          Create Post
        </button>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Content</th>
                <th>Author</th>
                <th>Status</th>
                <th className="w-48">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">
                    No posts found
                  </td>
                </tr>
              )}
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{post.title}</td>
                  <td>{post.content.split(" ").slice(0, 15).join(" ")}...</td>
                  <td>{post?.user?.name ?? "-"}</td>
                  <td>{post.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="btn btn-sm btn-disabled">
            {currentPage} / {lastPage}
          </span>
          <button
            className="btn btn-sm"
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
