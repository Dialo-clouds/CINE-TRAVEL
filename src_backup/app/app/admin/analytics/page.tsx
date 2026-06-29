import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AdminAnalyticsPage() {
  return (
    <DashboardShell type="admin">
      <div className="p-6">
        <h1 className="text-3xl font-light mb-8">Analytics</h1>
        <p className="text-gray-400">Platform analytics and insights.</p>
      </div>
    </DashboardShell>
  );
}
