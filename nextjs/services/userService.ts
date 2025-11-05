import api from "@/lib/axios";

const userService = {
  all: () => api.get("/user"),
};

export default userService;
