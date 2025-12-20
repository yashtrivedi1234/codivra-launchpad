import { Button } from "@/components/ui/button";
import { Trash2, Eye, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAdminListContactsQuery,
  useAdminDeleteContactMutation,
  useAdminToggleContactReadMutation,
  ContactSubmission,
} from "@/lib/api";

const AdminContact = () => {
  const { data, isLoading, isFetching, refetch } = useAdminListContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useAdminDeleteContactMutation();
  const [toggleRead, { isLoading: isToggling }] = useAdminToggleContactReadMutation();

  const items: ContactSubmission[] = data?.items || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id).unwrap();
      refetch();
    } catch (err) {}
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await toggleRead(id).unwrap();
      refetch();
    } catch (err) {}
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Contact Submissions
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and respond to contact form submissions
          </p>
        </div>

        {(isLoading || isFetching) && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        )}

        {!isLoading && !items.length && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No contact submissions yet.</p>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="space-y-4">
            {items.map((submission) => (
              <div
                key={submission._id}
                className={`rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 ${
                  submission.read
                    ? "bg-white dark:bg-slate-800"
                    : "bg-blue-50 dark:bg-blue-950/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {submission.name}
                      </h3>
                      {!submission.read && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {submission.email}
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white mb-2">
                      {submission.service}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      {submission.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {submission.created_at}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkAsRead(submission._id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      title={submission.read ? "Mark as unread" : "Mark as read"}
                      disabled={isToggling}
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(submission._id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
