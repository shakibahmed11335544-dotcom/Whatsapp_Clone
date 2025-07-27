import { SearchIcon, MoreVerticalIcon, MessageCircleIcon, FilterIcon } from "lucide-react";
import MessageSearch from "@/components/MessageSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread?: number;
  online?: boolean;
}

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export default function ChatSidebar({ chats, selectedChat, onSelectChat }: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Search and Actions */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 h-12 bg-background/60 border-white/20 focus:border-primary/50 focus:ring-primary/25 rounded-xl transition-all duration-300"
            />
          </div>
          <MessageSearch />
          <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
            <MessageCircleIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
            <MoreVerticalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={cn(
              "flex items-center gap-4 p-4 m-2 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/5 group",
              selectedChat?.id === chat.id && "bg-white/10 shadow-lg"
            )}
          >
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-white/10 group-hover:ring-primary/20 transition-all duration-300">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-lg">
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online-status border-2 border-chat-sidebar rounded-full animate-pulse"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground font-medium">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate flex-1 mr-2">
                  {chat.lastMessage}
                </p>
                {chat.unread && (
                  <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-lg">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
