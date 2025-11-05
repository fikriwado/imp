"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/app/layouts/AppLayout";
import userService from "@/services/userService";
import postService, { PostForm } from "@/services/postService";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
}

export default function CreatePost() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<PostForm>({
    title: "",
    content: "",
    thumbnail: null as File | null,
    status: "draft",
    user_id: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.all();
        setUsers(response.data.result.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("status", form.status);
      formData.append("user_id", form.user_id);
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      await postService.store(formData);
      router.push("/post");
    } catch (error) {
      alert(error.response?.data?.message || "Create post failed");
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center">
        <div className="card w-200 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl mb-4">
              Create Post
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="input input-bordered w-full h-50"
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Thumbnail</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      thumbnail: e.target.files ? e.target.files[0] : null,
                    })
                  }
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Author</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={form.user_id}
                  onChange={(e) =>
                    setForm({ ...form, user_id: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Select user
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control mt-4">
                <button className="btn btn-primary w-full">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
