/*
ADMIN PAGE TEMPLATE
===================
Copy this template when creating new admin pages.

Proper Admin Layout Structure:
1. Header - Managed by AdminLayout
2. Left Sidebar - Managed by AdminLayout with navigation
3. Main Content - Your page content goes here
4. Footer - Managed by AdminLayout

All admin pages automatically get:
- Global header with notifications and user menu
- Left navigation sidebar with all admin pages
- Footer with quick links
- Consistent styling and dark mode support
*/

import { useState } from "react";
import { Plus, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

interface YourDataType {
  id: string;
  title: string;
  description: string;
  // Add your properties here
}

const AdminNewPage = () => {
  const [data, setData] = useState<YourDataType[]>([
    // Add sample data here
  ]);

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    // Add your logic here
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Your Page Title
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Description of what this page does
            </p>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewPage;

/*
LAYOUT BREAKDOWN:

The AdminLayout component provides:
1. Header: Contains logo, date, notifications, and user profile
2. Sidebar: Navigation menu with all admin pages
3. Main Content Area: Where your page content goes (the div with "p-8")
4. Footer: With quick links and copyright

To add a new admin page to navigation:
- Open /src/components/admin/AdminLayout.tsx
- Find the adminPages array
- Add your page to it:
  { name: "Page Name", path: "/admin/page-name", icon: IconName }

The page will automatically:
- Appear in the sidebar
- Highlight when active
- Have consistent header, footer, and styling
- Support dark mode
*/
