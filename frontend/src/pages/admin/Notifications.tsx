import AdminNotifications from "@/components/admin/AdminNotifications";

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
      <AdminNotifications showAllPage />
    </div>
  );
}
