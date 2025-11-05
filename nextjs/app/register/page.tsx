"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import authService from "@/services/authService";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.register(form);
      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister}>
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

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
          <button className="btn btn-primary w-full">Register</button>
        </div>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="link link-primary">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
