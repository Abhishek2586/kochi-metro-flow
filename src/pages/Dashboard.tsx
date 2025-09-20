import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Zap
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Trains",
      value: "25",
      description: "Four-car trainsets",
      icon: Train,
      color: "bg-metro-blue text-white"
    },
    {
      title: "In Service",
      value: "18",
      description: "Currently active",
      icon: CheckCircle,
      color: "bg-status-active text-white"
    },
    {
      title: "Maintenance",
      value: "4",
      description: "In IBL bay",
      icon: Wrench,
      color: "bg-status-maintenance text-white"
    },
    {
      title: "Standby",
      value: "3",
      description: "Ready for service",
      icon: Clock,
      color: "bg-status-standby text-white"
    }
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
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
            KMRL Supervisor Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-Driven Train Induction Planning & Scheduling
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="metro-gradient hover:opacity-90 transition-opacity">
            <Zap className="mr-2 h-4 w-4" />
            Generate Plan
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            AI Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Maintenance Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-metro-blue" />
                  Maintenance Queue
                </CardTitle>
                <CardDescription>
                  Active maintenance jobs and priorities
                </CardDescription>
              </div>
              <Badge variant="secondary">3 Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {maintenanceQueue.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-metro-blue">{job.id}</span>
                    <Badge 
                      variant="outline" 
                      className={
                        job.priority === "High" ? "status-maintenance" :
                        job.priority === "Medium" ? "status-pending" :
                        "status-standby"
                      }
                    >
                      {job.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.issue}</p>
                  <p className="text-xs text-muted-foreground">{job.assignee}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cleaning Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-metro-teal" />
                  Cleaning Status
                </CardTitle>
                <CardDescription>
                  Current cleaning operations
                </CardDescription>
              </div>
              <Badge variant="secondary">6 Teams</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {cleaningStatus.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-metro-teal">{task.id}</span>
                    <Badge 
                      variant="outline"
                      className={
                        task.status === "Completed" ? "status-active" :
                        task.status === "In Progress" ? "status-pending" :
                        "status-standby"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.cleaner}</p>
                  <p className="text-xs text-muted-foreground">{task.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

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