import { useState } from "react";
import { Plus, Trash2, Edit3, Loader2, X, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  Service,
} from "@/lib/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminServices = () => {
  const { data, isLoading, refetch } = useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [] as string[],
    // price: 0, (removed)
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: [],
      price: 0,
    });
    setEditingService(null);
    setIconFile(null);
    setIconPreview(null);
    setIsModalOpen(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features || [],
      // price: service.price || 0, (removed)
    });
    setIconPreview(service.icon || null);
    setIconFile(null);
    setIsModalOpen(true);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      // formDataObj.append("price", formData.price.toString()); (removed)
      formData.features.forEach((feature) => {
        formDataObj.append("features[]", feature);
      });

      if (iconFile) {
        formDataObj.append("icon", iconFile);
      }

      if (editingService) {
        const result = await updateService({
          id: editingService._id,
          data: formDataObj as any,
        }).unwrap();
        toast.success(result.message || "Service updated successfully");
      } else {
        const result = await createService(formDataObj as any).unwrap();
        toast.success(result.message || "Service created successfully");
      }
      resetForm();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to save service");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await deleteService(id).unwrap();
      toast.success(response.message || "Service deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to delete service");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Manage Services
            </h1>
            <p className="text-white/60">
              Add, edit, and manage your services
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] gap-2">
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#00D9FF]" />
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items && data.items.length > 0 ? (
              data.items.map((service, idx) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-lg flex items-center justify-center">
                          <span className="text-2xl text-white">{service.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {service.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {/* Price removed from display */}
                            <span className="text-xs bg-[#00D9FF]/20 text-[#00D9FF] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mb-4">
                      {service.description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <ul className="text-xs text-white/40 mb-4 space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(service)}
                        className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service._id)}
                        disabled={isDeleting}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-white/50 text-lg">
                  No services found. Add your first service to get started.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#0A0F1C]/95 backdrop-blur-xl flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl my-8"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 transition-all"
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 transition-all h-24 resize-none"
                    placeholder="Describe the service..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-3 uppercase tracking-wider">
                      Icon Image (Optional)
                    </label>
                    <div className="space-y-3">
                      {iconPreview && (
                        <div className="w-full h-32 bg-white/10 rounded-xl flex items-center justify-center">
                          <img src={iconPreview} alt="Icon preview" className="max-w-full max-h-full" />
                        </div>
                      )}
                      <label className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                        <Upload className="w-5 h-5 text-white/60" />
                        <span className="text-sm font-medium text-white/60">
                          {iconFile ? iconFile.name : "Click to upload icon"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleIconChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  {/* Price input removed from form */}
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features.join(", ")}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: e.target.value.split(",").map((f) => f.trim()).filter((f) => f),
                    })}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 transition-all"
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                  >
                    {(isCreating || isUpdating) && (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    )}
                    {editingService ? "Update" : "Create"} Service
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
