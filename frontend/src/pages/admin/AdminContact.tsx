import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const AdminContact = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "I would like to discuss a potential project...",
      date: "2025-01-15",
      read: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Partnership Opportunity",
      message: "We would like to explore partnership options...",
      date: "2025-01-14",
      read: true,
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      subject: "Support Request",
      message: "I need help with the platform...",
      date: "2025-01-13",
      read: false,
    },
  ]);

  const handleDelete = (id: string) => {
    setSubmissions(submissions.filter((sub) => sub.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === id ? { ...sub, read: !sub.read } : sub
      )
    );
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Contact Submissions
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and respond to contact form submissions
          </p>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
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
                    {submission.subject}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {submission.message}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {submission.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkAsRead(submission.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                    title={submission.read ? "Mark as unread" : "Mark as read"}
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
