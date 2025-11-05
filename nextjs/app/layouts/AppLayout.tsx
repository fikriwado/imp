import { ReactNode } from "react";
import RequireAuth from "@/components/middleware/RequireAuth";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <RequireAuth>
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        {children}
      </div>
    </RequireAuth>
  );
}
