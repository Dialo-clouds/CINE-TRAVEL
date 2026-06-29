import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AdminContentPage() {
  return (
    <DashboardShell type="admin">
      <div className="p-6">
        <h1 className="text-3xl font-light mb-8">Content Management</h1>
        <p className="text-gray-400">Content moderation and management interface.</p>
      </div>
    </DashboardShell>
  );
}
