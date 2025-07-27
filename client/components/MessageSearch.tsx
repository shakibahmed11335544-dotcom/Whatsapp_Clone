import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  SearchIcon, 
  FilterIcon, 
  CalendarIcon, 
  UserIcon,
  XIcon,
  FileIcon,
  ImageIcon,
  LinkIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  chatName: string;
  chatAvatar: string;
  message: string;
  timestamp: string;
  sender: string;
  type: "text" | "image" | "file" | "link";
  highlight?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    chatName: "Sarah Wilson",
    chatAvatar: "SW",
    message: "Can we schedule a meeting tomorrow?",
    timestamp: "2 hours ago",
    sender: "Sarah Wilson",
    type: "text",
    highlight: "meeting"
  },
  {
    id: "2",
    chatName: "Team Group",
    chatAvatar: "TG",
    message: "Check out this design mockup",
    timestamp: "1 day ago", 
    sender: "Emily Chen",
    type: "image",
    highlight: "design"
  },
  {
    id: "3",
    chatName: "John Doe",
    chatAvatar: "JD",
    message: "Here's the project documentation",
    timestamp: "2 days ago",
    sender: "John Doe", 
    type: "file",
    highlight: "project"
  },
  {
    id: "4",
    chatName: "Mike Johnson",
    chatAvatar: "MJ",
    message: "https://goponkotha.app/invite/team",
    timestamp: "3 days ago",
    sender: "Mike Johnson",
    type: "link"
  }
];

export default function MessageSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockSearchResults.filter(result =>
          result.message.toLowerCase().includes(query.toLowerCase()) ||
          result.sender.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-400" />;
      case "file":
        return <FileIcon className="h-4 w-4 text-green-400" />;
      case "link":
        return <LinkIcon className="h-4 w-4 text-purple-400" />;
      default:
        return null;
    }
  };

  const highlightText = (text: string, highlight?: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-primary/30 text-primary-foreground rounded px-1">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl transition-colors">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 glass border-white/20" align="end">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 bg-background/60 border-white/20 rounded-xl"
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSearch("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-white/10 rounded-lg"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10 rounded-xl">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 glass border-white/20" align="end">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Content Type</label>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="bg-background/60 border-white/20 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Messages</SelectItem>
                        <SelectItem value="text">Text Only</SelectItem>
                        <SelectItem value="images">Images</SelectItem>
                        <SelectItem value="files">Files</SelectItem>
                        <SelectItem value="links">Links</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Time Period</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="bg-background/60 border-white/20 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching messages...</p>
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No messages found</p>
              <p className="text-sm mt-1">Try adjusting your search terms</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-1 p-2">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5 group"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                        {result.chatAvatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {result.chatName}
                        </h4>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(result.type)}
                          <span className="text-xs text-muted-foreground">
                            {result.timestamp}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        <span className="text-xs text-muted-foreground/80">{result.sender}: </span>
                        {highlightText(result.message, result.highlight)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Search your messages</p>
              <p className="text-sm mt-1">Type to find messages across all chats</p>
            </div>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="p-3 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
