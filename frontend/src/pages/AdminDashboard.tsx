import { useNavigate } from "react-router-dom";
import {
  useGetJobApplicationsQuery,
  useDeleteJobApplicationMutation,
  useAdminListPagesQuery,
  useAdminUpsertPageSectionMutation,
  useAdminDeletePageSectionMutation,
  PageSection,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Trash2, LogOut, Briefcase, FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetJobApplicationsQuery();
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteJobApplicationMutation();
  const {
    data: pagesData,
    isLoading: isLoadingPages,
    refetch: refetchPages,
  } = useAdminListPagesQuery();
  const [upsertPage] = useAdminUpsertPageSectionMutation();
  const [deletePageSection, { isLoading: isDeletingSection }] =
    useAdminDeletePageSectionMutation();
  const { toast } = useToast();
  const [editing, setEditing] = useState<{
    id?: string;
    page: string;
    key: string;
    data: string;
  } | null>(null);

  const handleLogout = () => {
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_email");
    navigate("/admin/login", { replace: true });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await deleteApplication(id).unwrap();
      toast({
        title: "Deleted",
        description: "The application has been removed.",
      });
      refetch();
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast({
        title: "Delete failed",
        description: "Could not delete application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const email = typeof window !== "undefined"
    ? window.localStorage.getItem("admin_email")
    : null;

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Signed in as {email || "Admin"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        <section className="bg-card rounded-2xl shadow-soft border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                Job Applications
              </h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>

          {isLoading && <p className="text-sm text-muted-foreground">Loading applications...</p>}
          {isError && (
            <p className="text-sm text-destructive">
              Failed to load applications. Make sure you are logged in and the
              backend is running.
            </p>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4">Job Title</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4 hidden md:table-cell">Phone</th>
                    <th className="py-2 pr-4 hidden md:table-cell">Created</th>
                    <th className="py-2 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.length ? (
                    data.items.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-border/60 last:border-0"
                      >
                        <td className="py-2 pr-4 font-medium">
                          {app.job_title}
                        </td>
                        <td className="py-2 pr-4">{app.name}</td>
                        <td className="py-2 pr-4">{app.email}</td>
                        <td className="py-2 pr-4 hidden md:table-cell">
                          {app.phone || "—"}
                        </td>
                        <td className="py-2 pr-4 hidden md:table-cell">
                          {app.created_at
                            ? new Date(app.created_at).toLocaleString()
                            : "—"}
                        </td>
                        <td className="py-2 pr-0 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isDeleting}
                            onClick={() => handleDelete(app._id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-4 text-center text-muted-foreground"
                      >
                        No applications yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-card rounded-2xl shadow-soft border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                Pages & Content
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setEditing({
                  page: "home",
                  key: "hero",
                  data: JSON.stringify(
                    {
                      title:
                        "Build Your Digital Future with <span class=\"text-gradient\">Codivra Solution</span>",
                      subtitle:
                        "We craft innovative web solutions, custom software, and digital strategies that drive business growth.",
                      badge: "Transforming Ideas into Digital Excellence",
                    },
                    null,
                    2
                  ),
                })
              }
            >
              <Plus className="w-4 h-4 mr-1" />
              New Section
            </Button>
          </div>

          {isLoadingPages && (
            <p className="text-sm text-muted-foreground">
              Loading page content...
            </p>
          )}

          {!isLoadingPages && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4">Page</th>
                    <th className="py-2 pr-4">Key</th>
                    <th className="py-2 pr-4 hidden md:table-cell">
                      Updated
                    </th>
                    <th className="py-2 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagesData?.sections?.length ? (
                    pagesData.sections.map((section: PageSection) => (
                      <tr
                        key={section._id}
                        className="border-b border-border/60 last:border-0"
                      >
                        <td className="py-2 pr-4 font-medium">
                          {section.page}
                        </td>
                        <td className="py-2 pr-4">{section.key}</td>
                        <td className="py-2 pr-4 hidden md:table-cell">
                          {section.updated_at
                            ? new Date(
                                section.updated_at
                              ).toLocaleString()
                            : "—"}
                        </td>
                        <td className="py-2 pr-0 text-right space-x-2">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() =>
                              setEditing({
                                id: section._id,
                                page: section.page,
                                key: section.key,
                                data: JSON.stringify(
                                  section.data ?? {},
                                  null,
                                  2
                                ),
                              })
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isDeletingSection}
                            onClick={async () => {
                              if (
                                !window.confirm(
                                  "Delete this section?"
                                )
                              )
                                return;
                              try {
                                await deletePageSection(
                                  section._id
                                ).unwrap();
                                toast({
                                  title: "Deleted",
                                  description:
                                    "The section has been removed.",
                                });
                                refetchPages();
                              } catch (error) {
                                console.error(
                                  "Failed to delete section:",
                                  error
                                );
                                toast({
                                  title: "Delete failed",
                                  description:
                                    "Could not delete section.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-muted-foreground"
                      >
                        No page sections yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {editing && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
              <div className="bg-card rounded-2xl border border-border shadow-elevated max-w-2xl w-full p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {editing.id ? "Edit Section" : "New Section"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Page
                    </label>
                    <input
                      className="w-full h-9 px-2 rounded-md border border-input bg-background text-sm"
                      value={editing.page}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          page: e.target.value,
                        } as any)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Key
                    </label>
                    <input
                      className="w-full h-9 px-2 rounded-md border border-input bg-background text-sm"
                      value={editing.key}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          key: e.target.value,
                        } as any)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Data (JSON)
                  </label>
                  <textarea
                    className="w-full h-64 p-2 rounded-md border border-input bg-background text-xs font-mono"
                    value={editing.data}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        data: e.target.value,
                      } as any)
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={async () => {
                      try {
                        const parsed = JSON.parse(editing.data);
                        await upsertPage({
                          page: editing.page,
                          key: editing.key,
                          data: parsed,
                        }).unwrap();
                        toast({
                          title: "Saved",
                          description:
                            "Section content has been updated.",
                        });
                        setEditing(null);
                        refetchPages();
                      } catch (error: any) {
                        console.error(
                          "Failed to save section:",
                          error
                        );
                        toast({
                          title: "Save failed",
                          description:
                            error?.message ||
                            "Please check your JSON and try again.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;


