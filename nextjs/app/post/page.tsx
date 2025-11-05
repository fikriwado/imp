"use client";

import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import AppLayout from "../layouts/AppLayout";

export default function Login() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      router.push("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <AppLayout>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl mb-4">Login</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
          beatae exercitationem explicabo animi officiis odit facere eos, harum
          ut temporibus sunt debitis magni molestiae sapiente corporis suscipit
          iste ducimus aperiam!
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
