import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Train, 
  MapPin, 
  Clock, 
  Battery,
  Thermometer,
  Gauge,
  Eye,
  Settings,
  AlertCircle
} from "lucide-react";

interface TrainStatusCardProps {
  train: {
    id: string;
    status: 'active' | 'maintenance' | 'standby' | 'cleaning';
    location: string;
    mileage: number;
    batteryLevel: number;
    temperature: number;
    lastService: string;
    nextService: string;
    issues?: number;
  };
}

const TrainStatusCard = ({ train }: TrainStatusCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-status-active';
      case 'maintenance': return 'bg-status-maintenance';
      case 'cleaning': return 'bg-status-pending';
      case 'standby': return 'bg-status-standby';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Train className="h-4 w-4" />;
      case 'maintenance': return <Settings className="h-4 w-4" />;
      case 'cleaning': return <Clock className="h-4 w-4" />;
      case 'standby': return <Battery className="h-4 w-4" />;
      default: return <Train className="h-4 w-4" />;
    }
  };

  return (
    <Card className="card-hover">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${getStatusColor(train.status)} text-white`}>
              {getStatusIcon(train.status)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{train.id}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {train.location}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {train.issues && train.issues > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {train.issues}
              </Badge>
            )}
            <Badge className={getStatusColor(train.status)} variant="secondary">
              {train.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Gauge className="h-4 w-4 text-metro-blue" />
              <span className="text-sm font-medium">{train.mileage.toLocaleString()} km</span>
            </div>
            <p className="text-xs text-muted-foreground">Mileage</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Battery className="h-4 w-4 text-metro-green" />
              <span className="text-sm font-medium">{train.batteryLevel}%</span>
            </div>
            <Progress value={train.batteryLevel} className="h-1" />
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Thermometer className="h-4 w-4 text-metro-orange" />
              <span className="text-sm font-medium">{train.temperature}°C</span>
            </div>
            <p className="text-xs text-muted-foreground">Temp</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mb-3">
          <p>Last Service: {train.lastService}</p>
          <p>Next Service: {train.nextService}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
          {train.status === 'active' && (
            <Button size="sm" className="flex-1 metro-gradient">
              Track Live
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainStatusCard;