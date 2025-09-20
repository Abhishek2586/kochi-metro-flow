import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  MapPin, 
  Briefcase, 
  Train,
  Moon,
  Sun,
  LogOut
} from "lucide-react";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Layout = ({ children, currentView, onViewChange }: LayoutProps) => {
  const { setTheme, theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Supervisor Dashboard", 
      icon: LayoutDashboard,
      description: "Overview & AI Planning"
    },
    {
      id: "cleaner",
      label: "Cleaner App",
      icon: Users,
      description: "Task Management"
    },
    {
      id: "mechanic", 
      label: "Mechanic App",
      icon: Wrench,
      description: "Maintenance Queue"
    },
    {
      id: "depot",
      label: "Depot Management",
      icon: MapPin,
      description: "Bay Positioning"
    },
    {
      id: "branding",
      label: "Branding Dashboard", 
      icon: Briefcase,
      description: "Contract Management"
    }
  ];

  const getCurrentUser = () => {
    const viewMap = {
      dashboard: { name: "Supervisor", role: "Operations Manager", initials: "SM" },
      cleaner: { name: "Cleaner", role: "Cleaning Team", initials: "CT" },
      mechanic: { name: "Mechanic", role: "Technical Team", initials: "MT" },
      depot: { name: "Depot Manager", role: "Depot Operations", initials: "DM" },
      branding: { name: "Brand Manager", role: "Marketing Team", initials: "BM" }
    };
    return viewMap[currentView] || viewMap.dashboard;
  };

  const user = getCurrentUser();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg metro-gradient">
                <Train className="h-6 w-6 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
                    KMRL
                  </h1>
                  <p className="text-xs text-muted-foreground">Metro Operations</p>
                </div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "metro-gradient text-white shadow-md" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => onViewChange(item.id)}
                  >
                    <item.icon className={`h-4 w-4 ${collapsed ? "" : "mr-3"}`} />
                    {!collapsed && (
                      <div className="text-left flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    )}
                  </Button>
                );
              })}
            </div>
          </SidebarContent>

          {/* User Profile Section */}
          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="metro-gradient text-white font-bold">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                </div>
              )}
            </div>
            
            {!collapsed && (
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="flex-1"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger 
                  onClick={() => setCollapsed(!collapsed)}
                  className="hover:bg-muted"
                />
                <div className="h-8 w-px bg-border" />
                <Badge variant="secondary" className="hidden md:flex">
                  Live System • Connected
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className="bg-status-active text-white">
                  25 Trains Active
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleString('en-IN', {
                    weekday: 'short',
                    day: 'numeric', 
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;