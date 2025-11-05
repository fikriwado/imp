import { ReactNode } from "react";
import AuthRedirect from "@/components/middleware/AuthRedirect";

interface AuthLayoutProps {
  title?: string;
  children: ReactNode;
}

export default function AuthLayout({ title = "-", children }: AuthLayoutProps) {
  return (
    <AuthRedirect>
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl mb-4">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
}
