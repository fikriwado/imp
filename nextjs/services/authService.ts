import api from "@/lib/axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const authService = {
  login: (data: LoginData) => api.post("/auth/login", data),
  register: (data: RegisterData) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
};

export default authService;
