import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
}

const AdminCareers = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([
    {
      id: "1",
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      posted: "2025-01-15",
    },
    {
      id: "2",
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      posted: "2025-01-10",
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2025-01-05",
    },
  ]);

  const handleDelete = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Manage Careers
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Post and manage job openings
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Post Job
          </Button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Department
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {job.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Location
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {job.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Type</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {job.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Posted
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {job.posted}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                    <Edit3 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
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

export default AdminCareers;
