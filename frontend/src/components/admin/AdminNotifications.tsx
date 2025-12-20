import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAdminListContactsQuery } from "@/lib/api";
import { useState } from "react";

export default function AdminNotifications() {
  const { data: contactData, isLoading: contactLoading } = useAdminListContactsQuery();
  const contactSubmissions = contactData?.items || [];
  const unreadContacts = contactSubmissions.filter((c) => !c.read);
  const notifications = unreadContacts.map((c) => ({
    id: c._id,
    title: "New Contact Submission",
    message: `${c.name} filled the contact form`,
    time: c.created_at ? new Date(c.created_at).toLocaleString() : "",
    read: false,
    email: c.email,
    service: c.service,
    messageText: c.message,
  }));
  const allNotifications = contactSubmissions
    .map((c) => ({
      id: c._id,
      title: c.read ? "Contact Submission (Read)" : "New Contact Submission",
      message: `${c.name} filled the contact form`,
      time: c.created_at ? new Date(c.created_at).toLocaleString() : "",
      read: !!c.read,
      email: c.email,
      service: c.service,
      messageText: c.message,
    }))
    .sort((a, b) => (b.time > a.time ? 1 : -1));

  const [showAll, setShowAll] = useState(false);

  const latestNotifications = notifications.slice(0, 3);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
          onClick={() => setShowAll(false)}
        >
          <Bell className="w-5 h-5 text-black dark:text-white" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-sm font-bold">Notifications</span>
          <span className="text-xs bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-semibold">
            {notifications.length} New
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          {contactLoading ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">Loading...</div>
          ) : (showAll ? (
            allNotifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">No notifications.</div>
            ) : allNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b border-black/5 dark:border-white/5 last:border-b-0 cursor-pointer transition-all hover:bg-black/3 dark:hover:bg-white/5 ${
                  !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-transparent" : "bg-blue-500"}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-black/40 dark:text-white/40 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            latestNotifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">No new contact submissions.</div>
            ) : latestNotifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-3 border-b border-black/5 dark:border-white/5 last:border-b-0 cursor-pointer transition-all hover:bg-black/3 dark:hover:bg-white/5 bg-blue-50/50 dark:bg-blue-950/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-black/40 dark:text-white/40 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
        <DropdownMenuSeparator />
        <button
          className="w-full text-center px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          onClick={() => setShowAll(true)}
        >
          View All Notifications
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
