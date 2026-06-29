import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AdminUsersPage() {
  return (
    <DashboardShell type="admin">
      <div className="p-6">
        <h1 className="text-3xl font-light mb-8">User Management</h1>
        <p className="text-gray-400">Full user management interface coming soon.</p>
      </div>
    </DashboardShell>
  );
}
