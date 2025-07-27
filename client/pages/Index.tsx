import { useState, useEffect } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";
import NotificationSystem from "@/components/NotificationSystem";
import StatusSelector from "@/components/StatusSelector";
import { Link } from "react-router-dom";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread?: number;
  online?: boolean;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey there! How are you doing?",
    time: "2:30 PM",
    avatar: "JD",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    lastMessage: "Can we schedule a meeting tomorrow?",
    time: "1:45 PM",
    avatar: "SW",
    unread: 1,
    online: true,
  },
  {
    id: "3",
    name: "Team Group",
    lastMessage: "Great work everyone! 🎉",
    time: "12:20 PM",
    avatar: "TG",
    online: false,
  },
  {
    id: "4",
    name: "Mike Johnson",
    lastMessage: "Sure, let me check and get back to you",
    time: "11:30 AM",
    avatar: "MJ",
    online: false,
  },
  {
    id: "5",
    name: "Emily Chen",
    lastMessage: "Thanks for your help with the project!",
    time: "Yesterday",
    avatar: "EC",
    online: true,
  },
];

export default function Index() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  // Check if mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-chat-bg via-chat-bg to-background flex overflow-hidden">
      {/* Sidebar - Hidden on mobile when chat is selected */}
      <div className={`${
        isMobile ? (selectedChat ? 'hidden' : 'w-full') : 'w-80'
      } bg-gradient-to-b from-chat-sidebar to-chat-sidebar/95 border-r border-white/10 flex flex-col backdrop-blur-sm`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-primary to-primary/90 p-2 rounded-xl">
                  <MessageCircleIcon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-xl font-bold gradient-text">GoponKotha</h1>
            </div>
            <div className="flex items-center gap-2">
              <NotificationSystem />
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl">
                  <SettingsIcon className="h-5 w-5" />
                </Button>
              </Link>
              <div className="glass rounded-full p-1">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                      {user?.avatar || user?.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online-status border-2 border-chat-sidebar rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <StatusSelector currentStatus="online" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-xl transition-all duration-200"
                title="Logout"
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat List */}
        <ChatSidebar
          chats={mockChats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Main Chat Area - Full width on mobile when chat is selected */}
      <div className={`${
        isMobile ? (selectedChat ? 'w-full' : 'hidden') : 'flex-1'
      } flex flex-col relative`}>
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onBack={isMobile ? handleBackToList : undefined}
          />
        ) : (
          !isMobile && (
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent"></div>
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl"></div>

              <div className="relative text-center animate-fade-in">
                <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <MessageCircleIcon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Welcome to GoponKotha</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the sidebar to start your professional chat experience
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Professional Chat Platform</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
