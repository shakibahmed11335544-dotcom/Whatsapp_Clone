import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CircleIcon, 
  MoonIcon, 
  ZapIcon, 
  ClockIcon, 
  XCircleIcon,
  EditIcon,
  CheckIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusOptions = [
  {
    id: "online",
    label: "Online",
    icon: CircleIcon,
    color: "text-green-400",
    bgColor: "bg-green-400",
    description: "Available to chat"
  },
  {
    id: "away",
    label: "Away",
    icon: ClockIcon,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400",
    description: "Away from keyboard"
  },
  {
    id: "busy",
    label: "Busy",
    icon: ZapIcon,
    color: "text-red-400",
    bgColor: "bg-red-400",
    description: "Please don't disturb"
  },
  {
    id: "invisible",
    label: "Invisible",
    icon: XCircleIcon,
    color: "text-gray-400",
    bgColor: "bg-gray-400",
    description: "Appear offline to others"
  },
];

interface StatusSelectorProps {
  currentStatus?: string;
  onStatusChange?: (status: string, customMessage?: string) => void;
}

export default function StatusSelector({ currentStatus = "online", onStatusChange }: StatusSelectorProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [customMessage, setCustomMessage] = useState("");
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentStatusData = statusOptions.find(s => s.id === selectedStatus) || statusOptions[0];

  const handleStatusChange = (statusId: string) => {
    setSelectedStatus(statusId);
    onStatusChange?.(statusId, customMessage);
  };

  const handleCustomMessageSave = () => {
    setIsEditingMessage(false);
    onStatusChange?.(selectedStatus, customMessage);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-2 hover:bg-white/10 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className={cn("w-3 h-3 rounded-full", currentStatusData.bgColor)}></div>
            </div>
            <span className="text-sm text-muted-foreground">{currentStatusData.label}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 glass border-white/20" align="start">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-semibold text-foreground mb-2">Set your status</h3>
          <p className="text-sm text-muted-foreground">Let others know your availability</p>
        </div>

        <div className="p-4 space-y-3">
          {statusOptions.map((status) => (
            <div
              key={status.id}
              onClick={() => handleStatusChange(status.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5",
                selectedStatus === status.id && "bg-white/10"
              )}
            >
              <div className={cn("w-4 h-4 rounded-full", status.bgColor)}></div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{status.label}</div>
                <div className="text-xs text-muted-foreground">{status.description}</div>
              </div>
              {selectedStatus === status.id && (
                <CheckIcon className="h-4 w-4 text-primary" />
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-foreground">Custom Status Message</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditingMessage(!isEditingMessage)}
              className="h-8 w-8 hover:bg-white/10 rounded-lg"
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          </div>
          
          {isEditingMessage ? (
            <div className="space-y-2">
              <Input
                placeholder="What's your status?"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="bg-background/60 border-white/20 rounded-xl"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleCustomMessageSave}
                  className="rounded-xl flex-1"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditingMessage(false);
                    setCustomMessage("");
                  }}
                  className="rounded-xl flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground p-2 bg-background/30 rounded-xl min-h-[2.5rem] flex items-center">
              {customMessage || "No custom message set"}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-muted-foreground">
            Your status will be visible to all users in your contact list
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
