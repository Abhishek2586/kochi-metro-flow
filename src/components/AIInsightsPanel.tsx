import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

const AIInsightsPanel = () => {
  const insights = [
    {
      type: 'optimization',
      title: 'Schedule Optimization',
      description: 'AI suggests moving TS-08 to Bay A-03 for 15% efficiency gain',
      confidence: 92,
      impact: 'high',
      icon: Target
    },
    {
      type: 'prediction',
      title: 'Maintenance Forecast',
      description: 'TS-15 brake system likely to need service in 72 hours',
      confidence: 87,
      impact: 'medium',
      icon: Clock
    },
    {
      type: 'alert',
      title: 'Energy Anomaly',
      description: 'TS-22 consuming 18% more power than baseline',
      confidence: 95,
      impact: 'high',
      icon: AlertTriangle
    },
    {
      type: 'success',
      title: 'Route Optimization',
      description: 'Yesterday\'s AI plan improved punctuality by 2.3%',
      confidence: 100,
      impact: 'high',
      icon: CheckCircle
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'prediction': return <Clock className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'metro-gradient';
      case 'prediction': return 'metro-gradient-secondary';
      case 'alert': return 'metro-gradient-accent';
      case 'success': return 'metro-gradient-success';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg metro-gradient text-white">
                <Brain className="h-5 w-5" />
              </div>
              AI Insights & Recommendations
            </CardTitle>
            <CardDescription>
              Machine learning powered operational intelligence
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-lg ${getInsightColor(insight.type)} text-white flex-shrink-0`}>
              {getInsightIcon(insight.type)}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{insight.title}</h4>
                <Badge 
                  variant={insight.impact === 'high' ? 'destructive' : 
                          insight.impact === 'medium' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {insight.impact.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {insight.description}
              </p>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Confidence:</span>
                  <Progress value={insight.confidence} className="w-16 h-1" />
                  <span className="font-medium">{insight.confidence}%</span>
                </div>
                
                {insight.type === 'optimization' && (
                  <Button variant="outline" size="sm" className="ml-auto">
                    Apply
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button className="w-full metro-gradient">
            <Zap className="h-4 w-4 mr-2" />
            Generate New AI Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;