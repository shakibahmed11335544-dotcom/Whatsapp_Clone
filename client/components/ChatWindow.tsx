import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PhoneIcon,
  VideoIcon,
  MoreVerticalIcon,
  SendIcon,
  PaperclipIcon,
  SmileIcon,
  ArrowLeftIcon,
  ImageIcon,
  FileIcon,
  MicIcon
} from "lucide-react";
import EmojiPicker from "@/components/EmojiPicker";
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

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey there! How are you doing?",
    sender: "other",
    time: "2:28 PM"
  },
  {
    id: "2",
    text: "I'm doing great, thanks for asking! How about you?",
    sender: "me",
    time: "2:29 PM"
  },
  {
    id: "3",
    text: "All good here! Working on some exciting projects lately",
    sender: "other",
    time: "2:30 PM"
  },
  {
    id: "4",
    text: "That sounds awesome! I'd love to hear more about them",
    sender: "me",
    time: "2:31 PM"
  }
];

interface ChatWindowProps {
  chat: Chat;
  onBack?: () => void;
}

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-chat-sidebar to-chat-sidebar/95 border-b border-white/10 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            )}
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online-status border-2 border-chat-sidebar rounded-full animate-pulse"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg">{chat.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {chat.online && <div className="w-2 h-2 bg-online-status rounded-full"></div>}
                {chat.online ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
              <PhoneIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
              <VideoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
              <MoreVerticalIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background to-background/95">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-2 animate-fade-in",
              msg.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] px-5 py-3 shadow-lg",
                msg.sender === "me"
                  ? "bg-gradient-to-r from-message-sent to-message-sent/90 text-message-sent-text rounded-3xl rounded-br-lg"
                  : "bg-message-received text-message-received-text rounded-3xl rounded-bl-lg backdrop-blur-sm border border-white/10"
              )}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={cn(
                "text-xs mt-2 opacity-70 font-medium",
                msg.sender === "me" ? "text-right" : "text-left"
              )}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-chat-sidebar to-chat-sidebar/95 border-t border-white/10 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* File Attachment Options */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors" title="Attach file">
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors" title="Send image">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors" title="Voice message">
              <MicIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 relative">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 bg-background/60 border-white/20 focus:border-primary/50 focus:ring-primary/25 rounded-2xl pr-12 transition-all duration-300"
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          </div>

          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="h-12 w-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
