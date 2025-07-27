import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeftIcon, 
  SearchIcon, 
  UserPlusIcon, 
  QrCodeIcon,
  ShareIcon,
  UsersIcon,
  ContactIcon,
  PhoneIcon,
  MailIcon,
  CheckIcon,
  XIcon,
  MoreHorizontalIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "away" | "offline";
  mutualFriends?: number;
  lastSeen?: string;
  isContact?: boolean;
  requestSent?: boolean;
  requestReceived?: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@company.com",
    avatar: "AJ",
    status: "online",
    mutualFriends: 3,
    isContact: false
  },
  {
    id: "2", 
    name: "Bob Smith",
    email: "bob.smith@email.com",
    avatar: "BS",
    status: "away",
    mutualFriends: 1,
    lastSeen: "2 hours ago",
    isContact: false
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@gmail.com", 
    avatar: "CD",
    status: "online",
    mutualFriends: 5,
    isContact: false,
    requestSent: true
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@company.com",
    avatar: "DW", 
    status: "offline",
    lastSeen: "1 day ago",
    isContact: false,
    requestReceived: true
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma.brown@email.com",
    avatar: "EB",
    status: "online",
    mutualFriends: 2,
    isContact: true
  }
];

const mockPendingRequests: User[] = [
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@company.com",
    avatar: "FM",
    status: "online",
    mutualFriends: 4,
    requestReceived: true
  },
  {
    id: "7", 
    name: "Grace Lee",
    email: "grace.lee@email.com",
    avatar: "GL",
    status: "away",
    mutualFriends: 2,
    lastSeen: "1 hour ago",
    requestReceived: true
  }
];

export default function Connect() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [pendingRequests, setPendingRequests] = useState<User[]>(mockPendingRequests);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockUsers.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddContact = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, requestSent: true } : user
    ));
  };

  const handleAcceptRequest = (userId: string) => {
    const user = pendingRequests.find(u => u.id === userId);
    if (user) {
      setPendingRequests(prev => prev.filter(u => u.id !== userId));
      setUsers(prev => [...prev, { ...user, isContact: true, requestReceived: false }]);
    }
  };

  const handleDeclineRequest = (userId: string) => {
    setPendingRequests(prev => prev.filter(u => u.id !== userId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-400";
      case "away": return "bg-yellow-400";
      default: return "bg-gray-400";
    }
  };

  const UserCard = ({ user, showActions = true }: { user: User; showActions?: boolean }) => (
    <div className="glass rounded-2xl p-4 hover:bg-white/5 transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 border-2 border-background rounded-full", getStatusColor(user.status))}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          {user.mutualFriends && (
            <p className="text-xs text-muted-foreground mt-1">
              {user.mutualFriends} mutual friends
            </p>
          )}
          {user.lastSeen && user.status !== "online" && (
            <p className="text-xs text-muted-foreground">Last seen {user.lastSeen}</p>
          )}
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            {user.isContact ? (
              <Badge variant="secondary" className="rounded-xl">
                <CheckIcon className="h-3 w-3 mr-1" />
                Friends
              </Badge>
            ) : user.requestSent ? (
              <Badge variant="outline" className="rounded-xl">
                Request Sent
              </Badge>
            ) : user.requestReceived ? (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleAcceptRequest(user.id)}
                  className="rounded-xl"
                >
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeclineRequest(user.id)}
                  className="rounded-xl"
                >
                  Decline
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                onClick={() => handleAddContact(user.id)}
                className="rounded-xl"
              >
                <UserPlusIcon className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Connect with People</h1>
              <p className="text-muted-foreground">Find and connect with friends, colleagues, and new contacts</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12 bg-background/60 border-white/20 focus:border-primary/50 focus:ring-primary/25 rounded-xl"
            />
          </div>
        </div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl">
            <TabsTrigger value="discover" className="rounded-xl">
              <UsersIcon className="h-4 w-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="requests" className="rounded-xl">
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Requests
              {pendingRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="invite" className="rounded-xl">
              <ShareIcon className="h-4 w-4 mr-2" />
              Invite
            </TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-xl">
              <ContactIcon className="h-4 w-4 mr-2" />
              Import
            </TabsTrigger>
          </TabsList>

          {/* Search Results */}
          {searchQuery && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Search Results {searchResults.length > 0 && `(${searchResults.length})`}
              </h2>
              
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No users found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              )}
            </div>
          )}

          <TabsContent value="discover" className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">People You May Know</h2>
              <div className="space-y-4">
                {users.filter(u => !u.isContact).map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Friend Requests ({pendingRequests.length})
              </h2>
              
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlusIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending friend requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="invite" className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Invite Friends</h2>
              
              <div className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="w-40 h-40 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <QrCodeIcon className="h-20 w-20 text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Let others scan this code to connect with you instantly
                  </p>
                </div>

                {/* Share Link */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Share Your Profile</h3>
                  <div className="flex gap-2">
                    <Input
                      value={`https://goponkotha.app/connect/${user?.name?.toLowerCase().replace(' ', '.')}`}
                      readOnly
                      className="bg-background/60 border-white/20 rounded-xl"
                    />
                    <Button variant="outline" className="rounded-xl">
                      <ShareIcon className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Social Share */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Share via</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-xl justify-start">
                      <MailIcon className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" className="rounded-xl justify-start">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      SMS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Import Contacts</h2>
              
              <div className="space-y-6">
                <div className="text-center py-8">
                  <ContactIcon className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
                  <h3 className="font-semibold text-foreground mb-2">Find Your Friends</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Import your contacts to see who's already on GoponKotha and invite others to join
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button className="rounded-xl">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Phone Contacts
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <MailIcon className="h-4 w-4 mr-2" />
                      Email Contacts
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    Your contacts will be securely encrypted and never shared
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
