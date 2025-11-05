import api from "@/lib/axios";

interface PostQueryParams {
  page?: number;
  [key: string]: any;
}

export interface PostForm {
  id?: number | string;
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
  user_id: number | string;
  thumbnail?: File | null;
}

const opsFormData = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const postService = {
  all: (data: PostQueryParams) => api.get("/post", { params: data }),
  store: (data: PostForm | FormData) => api.post("/post", data, opsFormData),
  find: (id: number | string) => api.get(`/post/${id}`),
  update: (id: number, data: PostForm | FormData) =>
    api.post(`/post/${id}`, data, opsFormData),
  destroy: (id: number | string) => api.delete(`/post/${id}`),
};

export default postService;
