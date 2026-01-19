import { useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info, Users, Building2, Briefcase, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import CompanySidebar from "@/components/CompanySidebar";

const notificationsData = [
  {
    id: 1,
    type: "success",
    title: "Partnership Approved",
    message: "IIT Delhi has approved your partnership request. You can now post job openings.",
    time: "2 hours ago",
    read: false,
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "info",
    title: "New Candidates Available",
    message: "45 new candidates match your Software Development Engineer criteria.",
    time: "5 hours ago",
    read: false,
    icon: Users,
  },
  {
    id: 3,
    type: "warning",
    title: "Job Post Expiring",
    message: "Your Data Analyst job posting will expire in 3 days. Consider extending or updating.",
    time: "1 day ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "success",
    title: "Partnership Request Received",
    message: "NIT Trichy has sent you a partnership request for campus recruitment.",
    time: "2 days ago",
    read: true,
    icon: Building2,
  },
  {
    id: 5,
    type: "info",
    title: "Interview Reminder",
    message: "You have 5 candidate interviews scheduled for tomorrow at 10:00 AM.",
    time: "2 days ago",
    read: true,
    icon: Briefcase,
  },
  {
    id: 6,
    type: "info",
    title: "Profile Views",
    message: "Your company profile was viewed by 23 colleges in the last week.",
    time: "3 days ago",
    read: true,
    icon: Info,
  },
];

const CompanyUpdates = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.read;
    return true;
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: "All Caught Up!",
      description: "All notifications marked as read",
    });
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({
      title: "Deleted",
      description: "Notification removed",
    });
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-forest-light/20 text-forest-medium";
      case "warning":
        return "bg-gold/20 text-gold";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Updates & Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your recruitment activities
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllRead} className="gap-2">
              <Check className="w-4 h-4" />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">{notifications.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-forest-medium">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {notifications.filter((n) => n.type === "success").length}
              </p>
              <p className="text-sm text-muted-foreground">Approvals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-gold">
                {notifications.filter((n) => n.type === "warning").length}
              </p>
              <p className="text-sm text-muted-foreground">Alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2">
                <Bell className="w-5 h-5 text-forest-medium" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-forest-light/20 text-forest-medium">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-3">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`flex gap-4 p-4 rounded-lg transition-all duration-200 animate-fade-in ${
                        notification.read ? "bg-muted/30" : "bg-muted/50 border border-border"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeStyles(
                          notification.type
                        )}`}
                      >
                        <notification.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-foreground">{notification.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-display text-lg font-medium text-foreground mb-2">
                      No Notifications
                    </h3>
                    <p className="text-muted-foreground">
                      {activeTab === "unread"
                        ? "You're all caught up!"
                        : "You don't have any notifications yet"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </CompanySidebar>
  );
};

export default CompanyUpdates;
