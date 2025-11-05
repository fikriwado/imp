import api from "@/lib/axios";

interface PostQueryParams {
  page?: number;
  [key: string]: any;
}

export interface PostForm {
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
  user_id: number | string;
  thumbnail?: File | null;
}

const postService = {
  all: (data: PostQueryParams) => api.get("/post", { params: data }),
  store: (data: PostForm | Record<string, any>) => api.post("/post", data),
  destroy: (id: number | string) => api.delete(`/post/${id}`),
};

export default postService;
