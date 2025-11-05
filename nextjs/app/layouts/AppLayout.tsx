import { ReactNode } from "react";
import RequireAuth from "@/components/middleware/RequireAuth";
import authService from "@/services/authService";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
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
    <RequireAuth>
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 btn btn-warning"
      >
        Logout
      </button>

      <div className="min-h-screen flex justify-center bg-base-200">
        {children}
      </div>
    </RequireAuth>
  );
}
