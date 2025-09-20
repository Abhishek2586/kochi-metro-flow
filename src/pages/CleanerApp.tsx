import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Train, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Play,
  Plus,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CleanerApp = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([
    { id: "TS-08", status: "not-started", assignedTime: "08:00", estimatedDuration: "45 min" },
    { id: "TS-15", status: "in-progress", assignedTime: "07:30", estimatedDuration: "45 min" },
    { id: "TS-03", status: "completed", assignedTime: "07:00", estimatedDuration: "45 min" },
    { id: "TS-22", status: "not-started", assignedTime: "09:00", estimatedDuration: "45 min" },
    { id: "TS-12", status: "not-started", assignedTime: "09:30", estimatedDuration: "45 min" },
  ]);

  const [issueDialog, setIssueDialog] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [issueType, setIssueType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleTaskAction = (trainId: string, action: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === trainId) {
        if (action === 'start') {
          toast({
            title: "Task Started",
            description: `Cleaning started for ${trainId}`,
          });
          return { ...task, status: 'in-progress' };
        } else if (action === 'complete') {
          toast({
            title: "Task Completed",
            description: `Cleaning completed for ${trainId}`,
          });
          return { ...task, status: 'completed' };
        }
      }
      return task;
    }));
  };

  const handleReportIssue = () => {
    if (!issueType || !issueDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Issue Reported",
      description: `Issue reported for ${selectedTrain || "train"}`,
    });
    
    setIssueDialog(false);
    setSelectedTrain("");
    setIssueType("");
    setIssueDescription("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-active';
      case 'in-progress': return 'status-pending';
      default: return 'status-standby';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      default: return Train;
    }
  };

  const issueTypes = [
    "Broken Seat",
    "Stains",
    "Leak",
    "Bad Smell",
    "Electrical Problem",
    "Graffiti",
    "Missing Equipment",
    "Other"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
            Cleaner Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Today's cleaning assignments
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          5 Tasks Assigned
        </Badge>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status);
          return (
            <Card key={task.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${getStatusColor(task.status)}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-metro-blue">{task.id}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Assigned: {task.assignedTime}</span>
                        <span>Duration: {task.estimatedDuration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline"
                      className={getStatusColor(task.status)}
                    >
                      {task.status === 'not-started' ? 'Not Started' : 
                       task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </Badge>
                    {task.status === 'not-started' && (
                      <Button 
                        onClick={() => handleTaskAction(task.id, 'start')}
                        className="bg-metro-teal hover:bg-metro-teal/90"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Cleaning
                      </Button>
                    )}
                    {task.status === 'in-progress' && (
                      <Button 
                        onClick={() => handleTaskAction(task.id, 'complete')}
                        className="bg-metro-green hover:bg-metro-green/90"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Done
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Floating Report Issue Button */}
      <Dialog open={issueDialog} onOpenChange={setIssueDialog}>
        <DialogTrigger asChild>
          <Button 
            size="lg"
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg metro-gradient hover:shadow-xl transition-all"
          >
            <AlertTriangle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-metro-orange" />
              Report an Issue
            </DialogTitle>
            <DialogDescription>
              Report any problems you encounter during cleaning
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="train">Train ID</Label>
              <Select value={selectedTrain} onValueChange={setSelectedTrain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select train" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issue-type">Issue Type</Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Add Photo Evidence
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIssueDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportIssue} className="bg-metro-orange hover:bg-metro-orange/90">
              <Plus className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CleanerApp;