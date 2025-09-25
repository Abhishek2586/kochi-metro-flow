import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/contexts/LanguageContext';
import { presetScenarios, WeightConfig, trainFleet } from '@/data/syntheticData';
import { 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Wrench, 
  Sparkles, 
  BarChart3,
  Brain,
  Settings,
  TrendingUp,
  Clock
} from "lucide-react";

interface SchedulingReport {
  fitnessInvalid: string[];
  scheduledMaintenance: string[];
  scheduledCleaning: string[];
  readyForService: string[];
  standbyIdle: string[];
  conflictAlerts: string[];
}

const AIInductionPlanning: React.FC = () => {
  const { t } = useLanguage();
  const [weights, setWeights] = useState<WeightConfig>(presetScenarios.balanced);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<SchedulingReport | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('balanced');

  const applyPreset = (presetName: string) => {
    setWeights(presetScenarios[presetName]);
    setSelectedPreset(presetName);
  };

  const updateWeight = (key: keyof WeightConfig, value: number[]) => {
    setWeights(prev => ({ ...prev, [key]: value[0] }));
    setSelectedPreset('custom');
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Calculate weighted scores for each train and categorize
    const scoredTrains = trainFleet.map(train => {
      // Reliability score (inverse of issues and fitness problems)
      const reliabilityScore = (
        (train.fitnessRollingStock.valid ? 1 : 0) +
        (train.fitnessSignaling.valid ? 1 : 0) + 
        (train.fitnessTelecom.valid ? 1 : 0) +
        (train.jobCards.open === 0 ? 1 : 0)
      ) / 4;

      // Branding score
      const brandingScore = train.branding.hasContract && train.branding.priority === 'high' ? 1 :
                           train.branding.hasContract && train.branding.priority === 'medium' ? 0.6 : 0.3;

      // Cleaning score
      const cleaningScore = train.cleaning.cleanlinessScore / 100;

      // Mileage balancing score (inverse of variance)
      const mileageScore = Math.max(0, 1 - Math.abs(train.mileageData.variance) / 50);

      const totalScore = 
        weights.reliability * reliabilityScore +
        weights.branding * brandingScore +
        weights.cleaning * cleaningScore +
        weights.mileageBalancing * mileageScore;

      return { ...train, score: totalScore, reliabilityScore };
    });

    // Categorize trains based on constraints
    const categorized: SchedulingReport = {
      fitnessInvalid: [],
      scheduledMaintenance: [],
      scheduledCleaning: [],
      readyForService: [],
      standbyIdle: [],
      conflictAlerts: []
    };

    scoredTrains.forEach(train => {
      // Check fitness certificates first
      if (!train.fitnessRollingStock.valid || !train.fitnessSignaling.valid || !train.fitnessTelecom.valid) {
        categorized.fitnessInvalid.push(train.id);
      }
      // Check maintenance needs
      else if (train.jobCards.open > 0 || train.status === 'maintenance') {
        categorized.scheduledMaintenance.push(train.id);
      }
      // Check cleaning needs
      else if (train.cleaning.needsCleaning || train.cleaning.cleanlinessScore < 70) {
        categorized.scheduledCleaning.push(train.id);
      }
      // High scoring trains ready for service
      else if (train.score > 0.7) {
        categorized.readyForService.push(train.id);
      }
      // Lower scoring but functional trains on standby
      else {
        categorized.standbyIdle.push(train.id);
      }
    });

    // Generate conflict alerts
    if (categorized.readyForService.length < 18) {
      categorized.conflictAlerts.push("Insufficient trains ready for service. Only " + categorized.readyForService.length + " available, need 18 minimum.");
    }
    if (categorized.scheduledMaintenance.length > 4) {
      categorized.conflictAlerts.push("High maintenance load: " + categorized.scheduledMaintenance.length + " trains require maintenance.");
    }
    
    setReport(categorized);
    setIsGenerating(false);
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-metro-blue" />
          {t('aiPlanningScheduling')}
        </CardTitle>
        <CardDescription>
          Advanced multi-objective optimization with explainable AI reasoning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preset Scenarios */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t('presetScenarios')}
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.entries(presetScenarios).map(([key, config]) => (
              <Button
                key={key}
                variant={selectedPreset === key ? "default" : "outline"}
                size="sm"
                onClick={() => applyPreset(key)}
                className="justify-start text-xs"
              >
                {t(key as any)}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Weight Adjustment Sliders */}
        <div>
          <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('weightAdjustment')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(weights).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    {t(key as any)}
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {value.toFixed(1)}
                  </Badge>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(newValue) => updateWeight(key as keyof WeightConfig, newValue)}
                  max={2.0}
                  min={0.0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Generate Plan Button */}
        <div className="flex justify-center">
          <Button
            onClick={generatePlan}
            disabled={isGenerating}
            size="lg"
            className="metro-gradient hover:opacity-90 transition-opacity shadow-lg px-8"
          >
            {isGenerating ? (
              <>
                <div className="animate-pulse mr-2">
                  <Sparkles className="h-5 w-5" />
                </div>
                Processing AI Algorithm...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                {t('generatePlan')}
              </>
            )}
          </Button>
        </div>

        {/* Progress indicator during generation */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground text-center">
              Running BLSTM, CNN, and RL algorithms...
            </div>
            <Progress value={65} className="h-2" />
          </div>
        )}

        {/* Generated Report */}
        {report && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              AI-Generated Scheduling Report
            </h4>
            
            {/* Conflict Alerts */}
            {report.conflictAlerts.length > 0 && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription>
                  <strong>{t('conflictAlerts')}:</strong>
                  <ul className="mt-2 space-y-1">
                    {report.conflictAlerts.map((alert, index) => (
                      <li key={index} className="text-sm">• {alert}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Categorized Results */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {report.fitnessInvalid.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      {t('fitnessInvalid')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {report.fitnessInvalid.map(trainId => (
                        <Badge key={trainId} variant="destructive" className="mr-1 mb-1">
                          {trainId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {report.scheduledMaintenance.length > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-orange-600" />
                      {t('scheduledMaintenance')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {report.scheduledMaintenance.map(trainId => (
                        <Badge key={trainId} className="mr-1 mb-1 bg-orange-100 text-orange-800 border-orange-300">
                          {trainId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {report.scheduledCleaning.length > 0 && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      {t('scheduledCleaning')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {report.scheduledCleaning.map(trainId => (
                        <Badge key={trainId} className="mr-1 mb-1 bg-blue-100 text-blue-800 border-blue-300">
                          {trainId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {report.readyForService.length > 0 && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {t('readyForService')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {report.readyForService.map(trainId => (
                        <Badge key={trainId} className="mr-1 mb-1 bg-green-100 text-green-800 border-green-300">
                          {trainId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {report.standbyIdle.length > 0 && (
                <Card className="border-gray-200 bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      {t('standbyIdle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {report.standbyIdle.map(trainId => (
                        <Badge key={trainId} variant="secondary" className="mr-1 mb-1">
                          {trainId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInductionPlanning;