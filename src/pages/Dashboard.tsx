import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainStatusCard from "@/components/TrainStatusCard";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import { 
  Train, 
  Users, 
  Wrench, 
  MapPin, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Calendar,
  Activity,
  Bell,
  Settings,
  Download,
  Filter,
  RefreshCw,
  Eye,
  ChevronRight,
  Gauge,
  Battery,
  Thermometer
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Trains",
      value: "25",
      change: "+0%",
      description: "Four-car trainsets",
      icon: Train,
      color: "metro-gradient",
      trend: "stable"
    },
    {
      title: "In Service",
      value: "18",
      change: "+12%",
      description: "Currently active",
      icon: CheckCircle,
      color: "metro-gradient-success",
      trend: "up"
    },
    {
      title: "Maintenance",
      value: "4",
      change: "-8%",
      description: "In IBL bay",
      icon: Wrench,
      color: "metro-gradient-accent",
      trend: "down"
    },
    {
      title: "Fleet Efficiency",
      value: "94.2%",
      change: "+2.1%",
      description: "Operational KPI",
      icon: Gauge,
      color: "metro-gradient-secondary",
      trend: "up"
    }
  ];

  const kpiMetrics = [
    { label: "Punctuality", value: "99.7%", target: "99.5%", status: "excellent" },
    { label: "Energy Efficiency", value: "2.1 kWh/km", target: "2.3 kWh/km", status: "good" },
    { label: "Passenger Load", value: "67%", target: "70%", status: "normal" },
    { label: "System Uptime", value: "99.94%", target: "99.9%", status: "excellent" }
  ];

  const maintenanceQueue = [
    { id: "TS-08", issue: "Brake System Check", priority: "High", assignee: "Tech Team A" },
    { id: "TS-15", issue: "HVAC Calibration", priority: "Medium", assignee: "Tech Team B" },
    { id: "TS-22", issue: "Door Sensor", priority: "Low", assignee: "Tech Team C" }
  ];

  const cleaningStatus = [
    { id: "TS-03", status: "Completed", cleaner: "Team Alpha", time: "2h ago" },
    { id: "TS-12", status: "In Progress", cleaner: "Team Beta", time: "30m" },
    { id: "TS-19", status: "Pending", cleaner: "Team Gamma", time: "Scheduled" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header with Live Status */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
              KMRL Supervisor Dashboard
            </h1>
            <Badge className="bg-status-active text-white pulse-ring">
              <Activity className="mr-1 h-3 w-3" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            AI-Driven Train Induction Planning & Scheduling
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="metro-gradient hover:opacity-90 transition-opacity shadow-lg">
            <Zap className="mr-2 h-4 w-4" />
            Generate AI Plan
          </Button>
          <Button variant="outline" className="border-metro-blue text-metro-blue hover:bg-metro-blue hover:text-white">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <div>
            <p className="font-medium text-orange-800">System Alert</p>
            <p className="text-sm text-orange-600">TS-12 requires brake system inspection before next service</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            View Details
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden card-hover">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-10 rounded-full -translate-y-16 translate-x-16`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.color} text-white shadow-lg`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <Badge variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Dashboard */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-metro-blue" />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>Real-time system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiMetrics.map((kpi) => (
              <div key={kpi.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{kpi.label}</span>
                  <span className="font-medium">{kpi.value}</span>
                </div>
                <Progress 
                  value={parseFloat(kpi.value)} 
                  className={`h-2 ${
                    kpi.status === 'excellent' ? '[&>div]:bg-green-500' :
                    kpi.status === 'good' ? '[&>div]:bg-blue-500' :
                    '[&>div]:bg-orange-500'
                  }`}
                />
                <div className="text-xs text-muted-foreground">Target: {kpi.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content View */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Fleet Status Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
              { id: "TS-01", status: "active" as const, location: "Line 1 - Aluva", mileage: 87420, batteryLevel: 95, temperature: 24, lastService: "2 days ago", nextService: "In 5 days" },
              { id: "TS-08", status: "maintenance" as const, location: "IBL Bay 2", mileage: 92150, batteryLevel: 0, temperature: 28, lastService: "Today", nextService: "In progress", issues: 2 },
              { id: "TS-15", status: "cleaning" as const, location: "Cleaning Bay", mileage: 78900, batteryLevel: 85, temperature: 22, lastService: "1 day ago", nextService: "In 3 days" },
              { id: "TS-22", status: "standby" as const, location: "Depot A-05", mileage: 65400, batteryLevel: 100, temperature: 23, lastService: "5 hours ago", nextService: "In 7 days" }
            ].map((train) => (
              <TrainStatusCard key={train.id} train={train} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Maintenance Queue */}
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-metro-blue" />
                      Active Jobs
                    </CardTitle>
                    <CardDescription>Priority maintenance queue</CardDescription>
                  </div>
                  <Badge variant="secondary">3 Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {maintenanceQueue.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-metro-blue">{job.id}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            job.priority === "High" ? "border-red-500 text-red-700 bg-red-50" :
                            job.priority === "Medium" ? "border-orange-500 text-orange-700 bg-orange-50" :
                            "border-blue-500 text-blue-700 bg-blue-50"
                          }
                        >
                          {job.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium">{job.issue}</p>
                      <p className="text-xs text-muted-foreground">{job.assignee}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cleaning Status */}
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-metro-teal" />
                      Cleaning Operations
                    </CardTitle>
                    <CardDescription>Current cleaning status</CardDescription>
                  </div>
                  <Badge variant="secondary">6 Teams</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cleaningStatus.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-metro-teal">{task.id}</span>
                        <Badge 
                          variant="outline"
                          className={
                            task.status === "Completed" ? "border-green-500 text-green-700 bg-green-50" :
                            task.status === "In Progress" ? "border-orange-500 text-orange-700 bg-orange-50" :
                            "border-gray-500 text-gray-700 bg-gray-50"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium">{task.cleaner}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Track
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          {/* Depot Overview */}
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-metro-orange" />
                    Depot Overview
                  </CardTitle>
                  <CardDescription>Real-time train positioning and bay status</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Full Depot View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {["A-01", "A-02", "A-03", "A-04", "A-05"].map((bay, index) => (
                  <div key={bay} className="p-4 rounded-lg bg-muted/30 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Bay {bay}</div>
                    <div className={`w-full h-8 rounded-md flex items-center justify-center text-xs font-medium text-white ${
                      index % 3 === 0 ? "bg-status-active" :
                      index % 3 === 1 ? "bg-status-pending" : 
                      "bg-muted border-2 border-dashed border-muted-foreground"
                    }`}>
                      {index % 3 !== 2 ? `TS-${String(index + 1).padStart(2, '0')}` : "Empty"}
                    </div>
                    {index % 3 !== 2 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {index % 3 === 0 ? "In Service" : "Maintenance"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIInsightsPanel />
        </TabsContent>
      </Tabs>

      {/* Depot Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-metro-orange" />
            Depot Overview
          </CardTitle>
          <CardDescription>
            Current train positioning and bay status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["A-01", "A-02", "A-03", "A-04", "A-05"].map((bay, index) => (
              <div key={bay} className="p-4 rounded-lg bg-muted/30 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">Bay {bay}</div>
                <div className={`w-full h-6 rounded ${
                  index % 3 === 0 ? "bg-status-active" :
                  index % 3 === 1 ? "bg-status-pending" : 
                  "bg-muted"
                }`}>
                  {index % 3 !== 2 && (
                    <div className="text-xs text-white flex items-center justify-center h-full">
                      TS-{String(index + 1).padStart(2, '0')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;