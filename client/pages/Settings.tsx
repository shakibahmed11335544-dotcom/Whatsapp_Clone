import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeftIcon, 
  BellIcon, 
  EyeIcon, 
  MoonIcon, 
  VolumeXIcon, 
  ShieldIcon,
  UserIcon,
  PaletteIcon,
  GlobeIcon,
  DownloadIcon
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [language, setLanguage] = useState("english");
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/10 rounded-xl">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-xl">
                {user?.avatar || user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">{user?.name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-online-status rounded-full"></div>
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl">
              <UserIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-xl">
                <BellIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play sound for incoming messages</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Notification Tone</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-background/60 border-white/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="whistle">Whistle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-xl">
                <ShieldIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Read Receipts</Label>
                  <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                </div>
                <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Online Status</Label>
                  <p className="text-sm text-muted-foreground">Show when you're online to other users</p>
                </div>
                <Switch checked={onlineStatus} onCheckedChange={setOnlineStatus} />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Who can message me</Label>
                <Select defaultValue="everyone">
                  <SelectTrigger className="bg-background/60 border-white/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="contacts">My contacts only</SelectItem>
                    <SelectItem value="nobody">Nobody</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-xl">
                <PaletteIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme interface</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="bg-background/60 border-white/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Chat Wallpaper</Label>
                <div className="flex gap-3">
                  <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border-2 border-primary/30 cursor-pointer"></div>
                  <div className="w-16 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-white/20 cursor-pointer"></div>
                  <div className="w-16 h-12 bg-gradient-to-br from-accent to-accent/50 rounded-lg border border-white/20 cursor-pointer"></div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Custom
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* General */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-xl">
                <GlobeIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">General</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-background/60 border-white/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                    <SelectItem value="french">Français</SelectItem>
                    <SelectItem value="german">Deutsch</SelectItem>
                    <SelectItem value="bengali">বাংলা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Auto-download Media</Label>
                  <p className="text-sm text-muted-foreground">Automatically download images and files</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Enter to Send</Label>
                  <p className="text-sm text-muted-foreground">Press Enter to send messages</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Storage & Data */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-xl">
                <DownloadIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Storage & Data</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Storage Used</Label>
                  <p className="text-sm text-muted-foreground">156 MB of 2 GB used</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Manage
                </Button>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-xl">
                  Clear Cache
                </Button>
                <Button variant="outline" className="rounded-xl">
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass rounded-2xl p-6">
            <div className="space-y-4">
              <Button 
                variant="destructive" 
                onClick={logout}
                className="w-full rounded-xl"
              >
                Sign Out
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full rounded-xl text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 mb-8">
          <p className="text-muted-foreground/60 text-sm">
            GoponKotha v1.0.0 • Professional Chat Platform
          </p>
          <p className="text-muted-foreground/40 text-xs mt-2">
            <span className="gradient-text font-semibold">Designed by Sakib</span>
          </p>
        </div>
      </div>
    </div>
  );
}
