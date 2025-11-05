import api from "@/lib/axios";

interface PostQueryParams {
  page?: number;
  [key: string]: any;
}

const postService = {
  all: (data: PostQueryParams) => api.get("/post", { params: data }),
  destroy: (id: number | string) => api.delete(`/post/${id}`),
};

export default postService;
