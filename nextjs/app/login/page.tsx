"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import authService from "@/services/authService";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await authService.login(form);
    const { access_token } = response.data.result;
    localStorage.setItem("token", access_token);
    router.push("/post");
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin}>
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="input input-bordered w-full"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered w-full"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="form-control mt-4">
          <button className="btn btn-primary w-full">Login</button>
        </div>
      </form>

      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="link link-primary">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
