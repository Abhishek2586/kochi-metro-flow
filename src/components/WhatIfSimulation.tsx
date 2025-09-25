import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from '@/contexts/LanguageContext';
import { trainFleet, depotBays } from '@/data/syntheticData';
import { 
  Zap, 
  Brain, 
  Settings2, 
  MapPin, 
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  TrendingUp
} from "lucide-react";

interface SimulationResult {
  scenario: string;
  impactedTrains: string[];
  recommendations: string[];
  kpiChanges: {
    efficiency: number;
    cost: number;
    availability: number;
  };
}

const WhatIfSimulation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTrain, setSelectedTrain] = useState<string>('');
  const [selectedBay, setSelectedBay] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const runSimulation = async (scenario: string, params: any) => {
    setIsRunning(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock simulation results based on scenario
    let result: SimulationResult;
    
    switch (scenario) {
      case 'priority':
        result = {
          scenario: `Prioritize Train ${params.trainId}`,
          impactedTrains: [params.trainId, 'TS-05', 'TS-12'],
          recommendations: [
            `Move ${params.trainId} to priority service queue`,
            'Delay routine maintenance for TS-05 by 1 day',
            'Reschedule cleaning for TS-12 to non-peak hours'
          ],
          kpiChanges: {
            efficiency: 2.3,
            cost: -1.8,
            availability: 1.2
          }
        };
        break;
        
      case 'closure':
        result = {
          scenario: `Close Bay ${params.bayId}`,
          impactedTrains: depotBays.filter(bay => bay.id === params.bayId && bay.trainId)[0]?.trainId ? 
            [depotBays.find(bay => bay.id === params.bayId)?.trainId!, 'TS-08', 'TS-15'] : 
            ['TS-08', 'TS-15'],
          recommendations: [
            `Relocate affected trains to alternative bays`,
            'Increase shunting operations by 15%',
            'Extend overnight preparation time by 30 minutes'
          ],
          kpiChanges: {
            efficiency: -3.5,
            cost: 4.2,
            availability: -2.1
          }
        };
        break;
        
      default:
        result = {
          scenario: 'Custom Scenario',
          impactedTrains: ['TS-01', 'TS-03'],
          recommendations: ['No significant impact detected'],
          kpiChanges: {
            efficiency: 0.0,
            cost: 0.0,
            availability: 0.0
          }
        };
    }
    
    setResults(prev => [result, ...prev.slice(0, 4)]);
    setIsRunning(false);
  };

  const resetSimulations = () => {
    setResults([]);
    setSelectedTrain('');
    setSelectedBay('');
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-600" />
          What-If Simulation & Digital Twin
        </CardTitle>
        <CardDescription>
          Test scenarios without affecting live operations using AI-powered digital twin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="priority" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="priority">Train Priority</TabsTrigger>
            <TabsTrigger value="closure">Bay Closure</TabsTrigger>
            <TabsTrigger value="weights">Weight Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="priority" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="train-select">Select Train to Prioritize</Label>
                <Select value={selectedTrain} onValueChange={setSelectedTrain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a train..." />
                  </SelectTrigger>
                  <SelectContent>
                    {trainFleet.slice(0, 10).map(train => (
                      <SelectItem key={train.id} value={train.id}>
                        {train.id} - {train.status} ({train.location})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => runSimulation('priority', { trainId: selectedTrain })}
                disabled={!selectedTrain || isRunning}
                className="w-full"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                {isRunning ? "Running Simulation..." : "Simulate Priority Assignment"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="closure" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bay-select">Select Bay to Close</Label>
                <Select value={selectedBay} onValueChange={setSelectedBay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a bay..." />
                  </SelectTrigger>
                  <SelectContent>
                    {depotBays.slice(0, 12).map(bay => (
                      <SelectItem key={bay.id} value={bay.id}>
                        {bay.id} - {bay.type} {bay.occupied ? `(${bay.trainId})` : '(Empty)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => runSimulation('closure', { bayId: selectedBay })}
                disabled={!selectedBay || isRunning}
                className="w-full"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {isRunning ? "Running Simulation..." : "Simulate Bay Closure"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="weights" className="space-y-4">
            <Alert>
              <Settings2 className="h-4 w-4" />
              <AlertDescription>
                Test different weight configurations before applying them to the main AI planning algorithm.
                This helps predict the impact of parameter changes on train scheduling outcomes.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => runSimulation('weights', {})}
              disabled={isRunning}
              className="w-full"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              {isRunning ? "Running Simulation..." : "Test Current Weight Configuration"}
            </Button>
          </TabsContent>
        </Tabs>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Simulation Results</h4>
              <Button variant="outline" size="sm" onClick={resetSimulations}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
            
            <div className="space-y-3">
              {results.map((result, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      {result.scenario}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        IMPACTED TRAINS
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.impactedTrains.map(trainId => (
                          <Badge key={trainId} variant="outline" className="text-xs">
                            {trainId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        AI RECOMMENDATIONS
                      </Label>
                      <ul className="text-xs space-y-1 mt-1">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        KPI IMPACT
                      </Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="text-center">
                          <div className={`text-xs font-medium ${result.kpiChanges.efficiency >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.kpiChanges.efficiency >= 0 ? '+' : ''}{result.kpiChanges.efficiency}%
                          </div>
                          <div className="text-xs text-muted-foreground">Efficiency</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xs font-medium ${result.kpiChanges.cost <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.kpiChanges.cost >= 0 ? '+' : ''}{result.kpiChanges.cost}%
                          </div>
                          <div className="text-xs text-muted-foreground">Cost</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xs font-medium ${result.kpiChanges.availability >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.kpiChanges.availability >= 0 ? '+' : ''}{result.kpiChanges.availability}%
                          </div>
                          <div className="text-xs text-muted-foreground">Availability</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatIfSimulation;