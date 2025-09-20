import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  AlertTriangle, 
  Clock, 
  User, 
  Calendar,
  Camera,
  Package,
  CheckCircle,
  Play,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MechanicApp = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const maintenanceJobs = [
    {
      id: "MJ-001",
      trainId: "TS-08",
      issueType: "Brake System Check",
      priority: "High",
      reportedDate: "2024-01-15",
      reportedBy: "Cleaner Team Alpha",
      status: "new",
      description: "Brake pads showing unusual wear patterns. Requires immediate inspection.",
      hasPhoto: true,
      estimatedTime: "4 hours"
    },
    {
      id: "MJ-002",
      trainId: "TS-15",
      issueType: "HVAC Calibration",
      priority: "Medium",
      reportedDate: "2024-01-14",
      reportedBy: "System Monitor",
      status: "in-progress",
      description: "Temperature inconsistency in car 2. Requires sensor calibration.",
      hasPhoto: false,
      estimatedTime: "2 hours"
    },
    {
      id: "MJ-003",
      trainId: "TS-22",
      issueType: "Door Sensor",
      priority: "Low",
      reportedDate: "2024-01-13",
      reportedBy: "Operator Singh",
      status: "waiting-parts",
      description: "Door sensor malfunction on platform side doors.",
      hasPhoto: true,
      estimatedTime: "1 hour"
    },
    {
      id: "MJ-004",
      trainId: "TS-11",
      issueType: "Lighting System",
      priority: "Medium",
      reportedDate: "2024-01-12",
      reportedBy: "Cleaner Team Beta",
      status: "done",
      description: "LED panel replacement in car 3 completed successfully.",
      hasPhoto: true,
      estimatedTime: "1.5 hours"
    }
  ];

  const filteredJobs = maintenanceJobs.filter(job => 
    activeFilter === "all" || job.status === activeFilter
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'status-maintenance';
      case 'Medium': return 'status-pending';
      default: return 'status-standby';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'status-active';
      case 'in-progress': return 'status-pending';
      case 'waiting-parts': return 'status-standby';
      default: return 'border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'in-progress': return 'In Progress';
      case 'waiting-parts': return 'Waiting for Parts';
      case 'done': return 'Done';
      default: return status;
    }
  };

  const handleJobAction = (jobId: string, action: string) => {
    toast({
      title: "Job Updated",
      description: `Job ${jobId} has been ${action}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
            Maintenance Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Technical maintenance queue and job management
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {filteredJobs.length} Jobs
        </Badge>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({maintenanceJobs.length})</TabsTrigger>
          <TabsTrigger value="new">New ({maintenanceJobs.filter(j => j.status === 'new').length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({maintenanceJobs.filter(j => j.status === 'in-progress').length})</TabsTrigger>
          <TabsTrigger value="waiting-parts">Waiting ({maintenanceJobs.filter(j => j.status === 'waiting-parts').length})</TabsTrigger>
          <TabsTrigger value="done">Done ({maintenanceJobs.filter(j => j.status === 'done').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-metro-blue" />
                          <span className="font-bold text-lg">{job.trainId}</span>
                          <span className="text-muted-foreground">({job.id})</span>
                        </div>
                        <Badge 
                          variant="outline"
                          className={getPriorityColor(job.priority)}
                        >
                          {job.priority} Priority
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={getStatusColor(job.status)}
                        >
                          {getStatusLabel(job.status)}
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-metro-blue">{job.issueType}</h3>
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {job.reportedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {job.reportedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.estimatedTime}
                        </div>
                        {job.hasPhoto && (
                          <div className="flex items-center gap-1 text-metro-teal">
                            <Camera className="h-4 w-4" />
                            Photo attached
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Wrench className="h-5 w-5 text-metro-blue" />
                              {job.trainId} - {job.issueType}
                            </DialogTitle>
                            <DialogDescription>
                              Job ID: {job.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Priority:</span>
                                <Badge 
                                  variant="outline" 
                                  className={`ml-2 ${getPriorityColor(job.priority)}`}
                                >
                                  {job.priority}
                                </Badge>
                              </div>
                              <div>
                                <span className="font-medium">Status:</span>
                                <Badge 
                                  variant="outline" 
                                  className={`ml-2 ${getStatusColor(job.status)}`}
                                >
                                  {getStatusLabel(job.status)}
                                </Badge>
                              </div>
                              <div>
                                <span className="font-medium">Reported By:</span>
                                <span className="ml-2">{job.reportedBy}</span>
                              </div>
                              <div>
                                <span className="font-medium">Estimated Time:</span>
                                <span className="ml-2">{job.estimatedTime}</span>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Description:</span>
                              <p className="mt-1 text-muted-foreground">{job.description}</p>
                            </div>
                            {job.hasPhoto && (
                              <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                                <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Photo evidence attached</p>
                              </div>
                            )}
                            <div className="flex gap-2">
                              {job.status === 'new' && (
                                <Button 
                                  onClick={() => handleJobAction(job.id, 'started')}
                                  className="flex-1 bg-metro-teal hover:bg-metro-teal/90"
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Start Job
                                </Button>
                              )}
                              {job.status === 'in-progress' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleJobAction(job.id, 'parts requested')}
                                    className="flex-1"
                                  >
                                    <Package className="mr-2 h-4 w-4" />
                                    Request Parts
                                  </Button>
                                  <Button 
                                    onClick={() => handleJobAction(job.id, 'completed')}
                                    className="flex-1 bg-metro-green hover:bg-metro-green/90"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark Done
                                  </Button>
                                </>
                              )}
                              {job.status === 'waiting-parts' && (
                                <Button 
                                  onClick={() => handleJobAction(job.id, 'resumed')}
                                  className="flex-1 bg-metro-teal hover:bg-metro-teal/90"
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume Job
                                </Button>
                              )}
                              <Button variant="outline" className="flex-1">
                                <Camera className="mr-2 h-4 w-4" />
                                Upload Evidence
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Report Issue Button */}
      <Button 
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg metro-gradient hover:shadow-xl transition-all"
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MechanicApp;