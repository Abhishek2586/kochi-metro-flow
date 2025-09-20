import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle2, 
  Clock, 
  Play,
  Camera,
  AlertTriangle,
  MapPin,
  Timer,
  Star,
  Trophy,
  TrendingUp,
  Plus
} from "lucide-react";

const EnhancedCleanerApp = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { id: "TS-03", status: "pending", priority: "high", estimatedTime: "45 min", location: "Bay A-01", timeRemaining: 0 },
    { id: "TS-12", status: "in-progress", priority: "medium", estimatedTime: "30 min", location: "Bay A-02", timeRemaining: 18 },
    { id: "TS-19", status: "completed", priority: "low", estimatedTime: "25 min", location: "Bay A-03", timeRemaining: 0 },
    { id: "TS-08", status: "pending", priority: "high", estimatedTime: "60 min", location: "Bay A-04", timeRemaining: 0 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-pending';
      case 'pending': return 'status-standby';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 text-red-700 bg-red-50';
      case 'medium': return 'border-orange-500 text-orange-700 bg-orange-50';
      case 'low': return 'border-blue-500 text-blue-700 bg-blue-50';
      default: return '';
    }
  };

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Statistics */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-teal to-metro-green bg-clip-text text-transparent">
            Cleaner Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Today's cleaning assignments and progress</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="metro-gradient-accent hover:opacity-90 transition-opacity shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Report an Issue</DialogTitle>
              <DialogDescription>
                Report any maintenance or cleanliness issues found during cleaning
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="train-select">Train ID</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select train" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map(task => (
                      <SelectItem key={task.id} value={task.id}>{task.id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broken-seat">Broken Seat</SelectItem>
                    <SelectItem value="stains">Stains</SelectItem>
                    <SelectItem value="leak">Leak</SelectItem>
                    <SelectItem value="smell">Bad Smell</SelectItem>
                    <SelectItem value="electrical">Electrical Problem</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe the issue..." />
              </div>
              <Button className="w-full" variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Add Photo Evidence
              </Button>
              <Button className="w-full metro-gradient">
                Submit Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <div className="p-2 rounded-lg metro-gradient text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">Assigned today</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="p-2 rounded-lg metro-gradient-success text-white">
              <Trophy className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasksCount}</div>
            <Progress value={(completedTasksCount / totalTasks) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <div className="p-2 rounded-lg metro-gradient-accent text-white">
              <Timer className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">Active cleaning</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <div className="p-2 rounded-lg metro-gradient-secondary text-white">
              <Star className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +5% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-metro-teal" />
            Today's Cleaning Tasks
          </CardTitle>
          <CardDescription>
            Manage your assigned train cleaning tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getStatusColor(task.status)} text-white`}>
                    {task.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> :
                     task.status === 'in-progress' ? <Timer className="h-5 w-5" /> :
                     <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{task.id}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {task.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary">
                    {task.estimatedTime}
                  </Badge>
                </div>
              </div>

              {task.status === 'in-progress' && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{task.timeRemaining} min remaining</span>
                  </div>
                  <Progress 
                    value={((45 - task.timeRemaining) / 45) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              <div className="flex gap-2">
                {task.status === 'pending' && (
                  <Button 
                    className="flex-1 metro-gradient-success"
                    onClick={() => setSelectedTask(task.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Cleaning
                  </Button>
                )}
                {task.status === 'in-progress' && (
                  <>
                    <Button variant="outline" className="flex-1">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Report Issue
                    </Button>
                    <Button className="flex-1 metro-gradient-success">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Mark Complete
                    </Button>
                  </>
                )}
                {task.status === 'completed' && (
                  <Button variant="outline" className="flex-1" disabled>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Completed
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCleanerApp;