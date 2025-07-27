import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BellIcon, XIcon, CheckIcon, MessageCircleIcon, UserPlusIcon, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "message" | "friend_request" | "call" | "system";
  title: string;
  message: string;
  time: string;
  avatar?: string;
  read: boolean;
  action?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Sarah Wilson",
    message: "Can we schedule a meeting tomorrow?",
    time: "2 min ago",
    avatar: "SW",
    read: false,
  },
  {
    id: "2",
    type: "friend_request",
    title: "Alex Rodriguez",
    message: "wants to connect with you",
    time: "5 min ago",
    avatar: "AR",
    read: false,
  },
  {
    id: "3",
    type: "call",
    title: "John Doe",
    message: "Missed voice call",
    time: "10 min ago",
    avatar: "JD",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "GoponKotha",
    message: "Your backup is complete",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "Team Group",
    message: "Emily: Great work everyone! 🎉",
    time: "2 hours ago",
    avatar: "TG",
    read: true,
  },
];

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircleIcon className="h-4 w-4" />;
      case "friend_request":
        return <UserPlusIcon className="h-4 w-4" />;
      case "call":
        return <PhoneIcon className="h-4 w-4" />;
      default:
        return <BellIcon className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-primary/20 text-primary";
      case "friend_request":
        return "bg-blue-500/20 text-blue-400";
      case "call":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 glass border-white/20" align="end">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-primary hover:bg-white/10 rounded-xl"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <BellIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-white/5",
                    !notification.read && "bg-white/5"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {notification.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                          {notification.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={cn("p-2 rounded-xl", getNotificationColor(notification.type))}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 rounded-lg"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  {notification.type === "friend_request" && !notification.read && (
                    <div className="flex gap-2 mt-3 ml-13">
                      <Button size="sm" className="rounded-xl flex-1">
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl flex-1">
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full rounded-xl hover:bg-white/5 text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
