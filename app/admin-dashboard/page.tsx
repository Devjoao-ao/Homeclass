"use client";

import { useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);

  return authenticated ? (
    <AdminDashboard onLogout={() => setAuthenticated(false)} />
  ) : (
    <AdminLogin onLogin={() => setAuthenticated(true)} />
  );
}
