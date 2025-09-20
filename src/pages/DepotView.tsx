import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Train, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Navigation,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DepotView = () => {
  const { toast } = useToast();
  const [selectedBay, setSelectedBay] = useState(null);

  const depotBays = [
    { id: "A-01", trainId: "TS-03", status: "in-service", type: "revenue" },
    { id: "A-02", trainId: "TS-08", status: "maintenance", type: "maintenance" },
    { id: "A-03", trainId: "TS-12", status: "cleaning", type: "cleaning" },
    { id: "A-04", trainId: "TS-15", status: "standby", type: "standby" },
    { id: "A-05", trainId: null, status: "empty", type: "empty" },
    { id: "B-01", trainId: "TS-22", status: "in-service", type: "revenue" },
    { id: "B-02", trainId: "TS-07", status: "preparation", type: "preparation" },
    { id: "B-03", trainId: null, status: "empty", type: "empty" },
    { id: "B-04", trainId: "TS-19", status: "standby", type: "standby" },
    { id: "B-05", trainId: "TS-11", status: "maintenance", type: "maintenance" },
    { id: "C-01", trainId: "TS-16", status: "cleaning", type: "cleaning" },
    { id: "C-02", trainId: null, status: "empty", type: "empty" },
    { id: "C-03", trainId: "TS-25", status: "in-service", type: "revenue" },
    { id: "C-04", trainId: "TS-09", status: "preparation", type: "preparation" },
    { id: "C-05", trainId: "TS-14", status: "standby", type: "standby" }
  ];

  const movementInstructions = [
    {
      id: "MOVE-001",
      trainId: "TS-08",
      from: "A-02",
      to: "Preparation Bay 1",
      priority: "High",
      reason: "Maintenance Complete",
      status: "pending"
    },
    {
      id: "MOVE-002", 
      trainId: "TS-25",
      from: "C-03",
      to: "Platform 1",
      priority: "Medium",
      reason: "Revenue Service",
      status: "in-progress"
    },
    {
      id: "MOVE-003",
      trainId: "TS-11",
      from: "B-05",
      to: "Cleaning Bay 2", 
      priority: "Low",
      reason: "Scheduled Cleaning",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-service': return 'bg-status-active';
      case 'maintenance': return 'bg-status-maintenance';
      case 'cleaning': return 'bg-metro-teal';
      case 'preparation': return 'bg-status-pending';
      case 'standby': return 'bg-status-standby';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-service': return 'In Service';
      case 'maintenance': return 'Maintenance';
      case 'cleaning': return 'Cleaning';
      case 'preparation': return 'Preparation';
      case 'standby': return 'Standby';
      default: return 'Empty';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'status-maintenance';
      case 'Medium': return 'status-pending';
      default: return 'status-standby';
    }
  };

  const handleMoveAction = (instructionId: string, action: string) => {
    toast({
      title: "Movement Updated",
      description: `Movement ${instructionId} has been ${action}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
            Depot Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Interactive depot view and train positioning
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">25 Total Trains</Badge>
          <Badge className="bg-status-active text-white">18 Active</Badge>
        </div>
      </div>

      {/* Depot Map */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-metro-orange" />
                Depot Layout
              </CardTitle>
              <CardDescription>
                Current train positioning and bay status
              </CardDescription>
            </div>
            <Button className="metro-gradient">
              <Zap className="mr-2 h-4 w-4" />
              Auto-Optimize Layout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-status-active"></div>
              <span className="text-sm">In Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-status-maintenance"></div>
              <span className="text-sm">Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-metro-teal"></div>
              <span className="text-sm">Cleaning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-status-pending"></div>
              <span className="text-sm">Preparation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-status-standby"></div>
              <span className="text-sm">Standby</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted"></div>
              <span className="text-sm">Empty</span>
            </div>
          </div>

          {/* Depot Grid */}
          <div className="space-y-8">
            {['A', 'B', 'C'].map((section) => (
              <div key={section}>
                <h3 className="text-lg font-semibold mb-4 text-metro-blue">Section {section}</h3>
                <div className="grid grid-cols-5 gap-4">
                  {depotBays
                    .filter(bay => bay.id.startsWith(section))
                    .map((bay) => (
                      <Dialog key={bay.id}>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer group">
                            <div className="p-4 rounded-lg border-2 hover:border-metro-teal transition-colors">
                              <div className="text-xs font-medium text-center mb-2 text-muted-foreground">
                                Bay {bay.id}
                              </div>
                              <div className={`w-full h-16 rounded ${getStatusColor(bay.status)} flex items-center justify-center transition-all group-hover:scale-105`}>
                                {bay.trainId ? (
                                  <div className="text-center">
                                    <Train className="h-4 w-4 mx-auto mb-1 text-white" />
                                    <div className="text-xs font-bold text-white">{bay.trainId}</div>
                                  </div>
                                ) : (
                                  <div className="text-xs text-muted-foreground">Empty</div>
                                )}
                              </div>
                              <div className="text-xs text-center mt-2 capitalize text-muted-foreground">
                                {getStatusLabel(bay.status)}
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-metro-orange" />
                              Bay {bay.id}
                            </DialogTitle>
                            <DialogDescription>
                              {bay.trainId ? `Train ${bay.trainId} details` : 'Empty bay information'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {bay.trainId ? (
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="font-medium">Train ID:</span>
                                    <span className="ml-2">{bay.trainId}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Status:</span>
                                    <Badge 
                                      variant="outline" 
                                      className={`ml-2 ${bay.status === 'in-service' ? 'status-active' : 
                                        bay.status === 'maintenance' ? 'status-maintenance' :
                                        bay.status === 'cleaning' ? 'bg-metro-teal text-white' : 'status-standby'}`}
                                    >
                                      {getStatusLabel(bay.status)}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button className="flex-1 bg-metro-teal hover:bg-metro-teal/90">
                                    <Navigation className="mr-2 h-4 w-4" />
                                    Move Train
                                  </Button>
                                  <Button variant="outline" className="flex-1">
                                    View Details
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-8">
                                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">This bay is currently empty</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Movement Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-metro-teal" />
            Movement Instructions
          </CardTitle>
          <CardDescription>
            Planned train movements and positioning changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {movementInstructions.map((instruction) => (
            <Card key={instruction.id} className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-bold text-metro-blue">{instruction.trainId}</span>
                      <Badge 
                        variant="outline"
                        className={getPriorityColor(instruction.priority)}
                      >
                        {instruction.priority} Priority
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={
                          instruction.status === 'completed' ? 'status-active' :
                          instruction.status === 'in-progress' ? 'status-pending' :
                          'border-border'
                        }
                      >
                        {instruction.status === 'completed' ? 'Completed' :
                         instruction.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{instruction.from}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{instruction.to}</span>
                      <span className="text-muted-foreground">• {instruction.reason}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {instruction.status === 'pending' && (
                      <Button 
                        onClick={() => handleMoveAction(instruction.id, 'started')}
                        className="bg-metro-teal hover:bg-metro-teal/90"
                      >
                        Start Move
                      </Button>
                    )}
                    {instruction.status === 'in-progress' && (
                      <Button 
                        onClick={() => handleMoveAction(instruction.id, 'completed')}
                        className="bg-metro-green hover:bg-metro-green/90"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirm Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

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

export default DepotView;