import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit3, Loader2, X } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  JobPosting,
  useAdminListJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "@/lib/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type JobFormState = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirementsText: string;
  responsibilitiesText: string;
  is_active: boolean;
  order: number;
};

const defaultForm: JobFormState = {
  title: "",
  department: "",
  location: "",
  type: "",
  description: "",
  requirementsText: "",
  responsibilitiesText: "",
  is_active: true,
  order: 0,
};

const AdminCareers = () => {
  const { data, isLoading, isFetching, refetch } = useAdminListJobsQuery();
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState<JobFormState>({ ...defaultForm });

  const openCreate = () => {
    setEditingJob(null);
    setFormData({ ...defaultForm });
    setIsModalOpen(true);
  };

  const openEdit = (job: JobPosting) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirementsText: (job.requirements || []).join("\n"),
      responsibilitiesText: (job.responsibilities || []).join("\n"),
      is_active: job.is_active ?? true,
      order: job.order ?? 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    setFormData({ ...defaultForm });
  };

  const parseListField = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requirements = parseListField(formData.requirementsText);
    const responsibilities = parseListField(formData.responsibilitiesText);

    if (!requirements.length || !responsibilities.length) {
      toast.error("Add at least one requirement and responsibility");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      department: formData.department.trim(),
      location: formData.location.trim(),
      type: formData.type.trim(),
      description: formData.description.trim(),
      requirements,
      responsibilities,
      is_active: formData.is_active,
      order: Number.isFinite(formData.order) ? Number(formData.order) : 0,
    };

    try {
      if (editingJob) {
        const res = await updateJob({ id: editingJob._id, data: payload }).unwrap();
        toast.success(res.message || "Job updated");
      } else {
        const res = await createJob(payload).unwrap();
        toast.success(res.message || "Job created");
      }
      closeModal();
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to save job");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete job?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteJob(id).unwrap();
      toast.success("Job deleted");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to delete job");
    }
  };

  const jobs = data?.items || [];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Manage Careers
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Post and manage job openings
            </p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Post Job
          </Button>
        </div>

        {(isLoading || isFetching) && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        )}

        {!isLoading && !jobs.length && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No job postings yet.</p>
            <Button onClick={openCreate} className="mt-4">Create your first job</Button>
          </div>
        )}

        {!isLoading && jobs.length > 0 && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {job.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${job.is_active === false ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-700"}`}>
                        {job.is_active === false ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">Department</p>
                        <p className="text-slate-900 dark:text-white font-medium">{job.department}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">Location</p>
                        <p className="text-slate-900 dark:text-white font-medium">{job.location}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">Type</p>
                        <p className="text-slate-900 dark:text-white font-medium">{job.type}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">Order</p>
                        <p className="text-slate-900 dark:text-white font-medium">{job.order ?? 0}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-3 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openEdit(job)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Delete"
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {editingJob ? "Edit Job" : "Post New Job"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Job Title *
                    </label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Senior React Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Department *
                    </label>
                    <Input
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="Engineering"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Location *
                    </label>
                    <Input
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Remote / San Francisco"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Employment Type *
                    </label>
                    <Input
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="Full-time"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Short Description *
                  </label>
                  <Textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Give a quick overview of this role."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Requirements (one per line) *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.requirementsText}
                      onChange={(e) =>
                        setFormData({ ...formData, requirementsText: e.target.value })
                      }
                      placeholder={"5+ years experience\nStrong with React\nGood communication"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Responsibilities (one per line) *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.responsibilitiesText}
                      onChange={(e) =>
                        setFormData({ ...formData, responsibilitiesText: e.target.value })
                      }
                      placeholder={"Build features\nReview code\nCollaborate with design"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Order (lower shows first)
                    </label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({ ...formData, order: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <input
                      id="is_active"
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({ ...formData, is_active: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="is_active"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Active
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    disabled={isCreating || isUpdating}
                  >
                    {(isCreating || isUpdating) && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingJob ? "Update Job" : "Create Job"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCareers;
