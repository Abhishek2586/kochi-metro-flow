// Synthetic data for comprehensive testing of all platform features
export interface Train {
  id: string;
  status: 'active' | 'maintenance' | 'cleaning' | 'standby';
  location: string;
  mileage: number;
  batteryLevel: number;
  temperature: number;
  lastService: string;
  nextService: string;
  issues?: number;
  
  // Fitness Certificates
  fitnessRollingStock: {
    valid: boolean;
    expiryDate: string;
    daysRemaining: number;
  };
  fitnessSignaling: {
    valid: boolean;
    expiryDate: string;
    daysRemaining: number;
  };
  fitnessTelecom: {
    valid: boolean;
    expiryDate: string; 
    daysRemaining: number;
  };
  
  // Job Card Status (IBM Maximo)
  jobCards: {
    open: number;
    closed: number;
    pendingTasks: string[];
  };
  
  // Branding
  branding: {
    hasContract: boolean;
    company?: string;
    contractHours: number;
    currentExposure: number;
    priority: 'high' | 'medium' | 'low';
  };
  
  // Cleaning Status
  cleaning: {
    cleanlinessScore: number; // 0-100
    lastDeepClean: string;
    nextScheduled: string;
    needsCleaning: boolean;
  };
  
  // Mileage Balancing
  mileageData: {
    totalKm: number;
    dailyTarget: number;
    variance: number; // vs fleet average
    wearLevel: number; // 0-100
  };
  
  // Stabling Geometry
  stabling: {
    currentBay: string;
    preferredBay: string;
    shuntCost: number; // energy cost to move
  };
  
  // IoT Sensor Data
  iotData: {
    brakeSystemPressure: number;
    hvacTemperature: number;
    doorSensorStatus: boolean;
    vibrationLevel: number;
    lastUpdated: string;
  };
}

export interface DepotBay {
  id: string;
  occupied: boolean;
  trainId?: string;
  type: 'service' | 'maintenance' | 'cleaning' | 'parking';
  capacity: number;
}

export interface MaintenanceJob {
  id: string;
  trainId: string;
  issueType: string;
  priority: 'High' | 'Medium' | 'Low';
  reportedDate: string;
  assignee: string;
  status: 'New' | 'In Progress' | 'Waiting for Parts' | 'Done';
  description: string;
  reportedBy: string;
  estimatedHours: number;
}

export interface CleaningTask {
  id: string;
  trainId: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTeam: string;
  scheduledTime: string;
  estimatedDuration: number;
  cleaningType: 'Regular' | 'Deep' | 'Exterior';
}

export interface BrandingContract {
  id: string;
  brandName: string;
  trainId: string;
  startDate: string;
  endDate: string;
  contractedHours: number;
  currentExposure: number;
  status: 'Active' | 'Expired' | 'Pending';
  revenue: number;
}

// Generate synthetic data
const generateTrain = (index: number): Train => {
  const trainId = `TS-${String(index + 1).padStart(2, '0')}`;
  const statuses: Train['status'][] = ['active', 'maintenance', 'cleaning', 'standby'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Randomize fitness certificate expiry dates to include valid, soon-to-expire, and expired
  const today = new Date();
  const generateExpiry = () => {
    const daysOffset = Math.floor(Math.random() * 60) - 15; // -15 to +45 days from today
    const expiryDate = new Date(today.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    return {
      valid: daysRemaining > 0,
      expiryDate: expiryDate.toISOString().split('T')[0],
      daysRemaining
    };
  };

  return {
    id: trainId,
    status,
    location: status === 'active' ? `Line 1 - ${['Aluva', 'Pulinchodu', 'Companypady', 'Ambattukavu'][index % 4]}` :
              status === 'maintenance' ? `IBL Bay ${Math.floor(index / 5) + 1}` :
              status === 'cleaning' ? 'Cleaning Bay' :
              `Depot ${['A', 'B', 'C'][Math.floor(index / 8)]}-${String((index % 8) + 1).padStart(2, '0')}`,
    mileage: 50000 + Math.floor(Math.random() * 50000),
    batteryLevel: status === 'maintenance' ? 0 : 70 + Math.floor(Math.random() * 30),
    temperature: 20 + Math.floor(Math.random() * 15),
    lastService: `${Math.floor(Math.random() * 10) + 1} days ago`,
    nextService: status === 'maintenance' ? 'In progress' : `In ${Math.floor(Math.random() * 10) + 1} days`,
    issues: status === 'maintenance' ? Math.floor(Math.random() * 3) + 1 : undefined,
    
    fitnessRollingStock: generateExpiry(),
    fitnessSignaling: generateExpiry(),
    fitnessTelecom: generateExpiry(),
    
    jobCards: {
      open: status === 'maintenance' ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2),
      closed: Math.floor(Math.random() * 20) + 10,
      pendingTasks: status === 'maintenance' ? 
        ['Brake System Check', 'HVAC Calibration', 'Door Sensor Repair'].slice(0, Math.floor(Math.random() * 3) + 1) :
        []
    },
    
    branding: {
      hasContract: Math.random() > 0.4,
      company: ['Coca-Cola', 'Samsung', 'Airtel', 'BSNL', 'Indian Oil'][Math.floor(Math.random() * 5)],
      contractHours: Math.floor(Math.random() * 40) + 10,
      currentExposure: Math.floor(Math.random() * 35),
      priority: (['high', 'medium', 'low'] as const)[Math.floor(Math.random() * 3)]
    },
    
    cleaning: {
      cleanlinessScore: Math.floor(Math.random() * 40) + 60,
      lastDeepClean: `${Math.floor(Math.random() * 7) + 1} days ago`,
      nextScheduled: `In ${Math.floor(Math.random() * 5) + 1} days`,
      needsCleaning: Math.random() > 0.6
    },
    
    mileageData: {
      totalKm: 50000 + Math.floor(Math.random() * 50000),
      dailyTarget: 150 + Math.floor(Math.random() * 100),
      variance: Math.floor(Math.random() * 40) - 20, // -20 to +20
      wearLevel: Math.floor(Math.random() * 30) + 40
    },
    
    stabling: {
      currentBay: `${['A', 'B', 'C'][Math.floor(index / 8)]}-${String((index % 8) + 1).padStart(2, '0')}`,
      preferredBay: `${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}-${String(Math.floor(Math.random() * 8) + 1).padStart(2, '0')}`,
      shuntCost: Math.floor(Math.random() * 50) + 10
    },
    
    iotData: {
      brakeSystemPressure: 4.5 + Math.random() * 1.5, // 4.5-6.0 bar
      hvacTemperature: 22 + Math.random() * 6, // 22-28°C
      doorSensorStatus: Math.random() > 0.1, // 90% working
      vibrationLevel: Math.random() * 5, // 0-5 units
      lastUpdated: new Date().toISOString()
    }
  };
};

// Generate fleet data
export const trainFleet: Train[] = Array.from({ length: 25 }, (_, i) => generateTrain(i));

// Generate depot bays
export const depotBays: DepotBay[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `A-${String(i + 1).padStart(2, '0')}`,
    occupied: i < 6,
    trainId: i < 6 ? `TS-${String(i + 1).padStart(2, '0')}` : undefined,
    type: 'parking' as const,
    capacity: 1
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `B-${String(i + 1).padStart(2, '0')}`,
    occupied: i < 5,
    trainId: i < 5 ? `TS-${String(i + 9).padStart(2, '0')}` : undefined,
    type: 'parking' as const,
    capacity: 1
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `IBL-${i + 1}`,
    occupied: i < 3,
    trainId: i < 3 ? `TS-${String(i + 17).padStart(2, '0')}` : undefined,
    type: 'maintenance' as const,
    capacity: 1
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `CLEAN-${i + 1}`,
    occupied: i < 1,
    trainId: i < 1 ? 'TS-20' : undefined,
    type: 'cleaning' as const,
    capacity: 1
  }))
];

// Generate maintenance jobs
export const maintenanceJobs: MaintenanceJob[] = [
  {
    id: "MJ-001",
    trainId: "TS-08",
    issueType: "Brake System Check",
    priority: "High",
    reportedDate: "2024-01-15",
    assignee: "Tech Team A",
    status: "In Progress",
    description: "Regular brake system inspection and calibration required",
    reportedBy: "Daily Inspection Team",
    estimatedHours: 4
  },
  {
    id: "MJ-002", 
    trainId: "TS-15",
    issueType: "HVAC Calibration",
    priority: "Medium",
    reportedDate: "2024-01-14",
    assignee: "Tech Team B",
    status: "New",
    description: "HVAC system temperature control needs recalibration",
    reportedBy: "Cleaner Team Alpha",
    estimatedHours: 2
  },
  {
    id: "MJ-003",
    trainId: "TS-22",
    issueType: "Door Sensor Malfunction",
    priority: "Low", 
    reportedDate: "2024-01-13",
    assignee: "Tech Team C",
    status: "Waiting for Parts",
    description: "Door sensor occasionally fails to detect obstruction",
    reportedBy: "Train Operator",
    estimatedHours: 3
  }
];

// Generate cleaning tasks
export const cleaningTasks: CleaningTask[] = [
  {
    id: "CT-001",
    trainId: "TS-03",
    status: "Completed",
    assignedTeam: "Team Alpha",
    scheduledTime: "2024-01-15T02:00:00",
    estimatedDuration: 120,
    cleaningType: "Deep"
  },
  {
    id: "CT-002",
    trainId: "TS-12", 
    status: "In Progress",
    assignedTeam: "Team Beta",
    scheduledTime: "2024-01-15T04:00:00",
    estimatedDuration: 90,
    cleaningType: "Regular"
  },
  {
    id: "CT-003",
    trainId: "TS-19",
    status: "Pending",
    assignedTeam: "Team Gamma",
    scheduledTime: "2024-01-15T06:00:00",
    estimatedDuration: 60,
    cleaningType: "Exterior"
  }
];

// Generate branding contracts
export const brandingContracts: BrandingContract[] = [
  {
    id: "BC-001",
    brandName: "Coca-Cola India",
    trainId: "TS-05",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    contractedHours: 2000,
    currentExposure: 1250,
    status: "Active",
    revenue: 850000
  },
  {
    id: "BC-002",
    brandName: "Samsung Electronics",
    trainId: "TS-11", 
    startDate: "2023-12-01",
    endDate: "2024-05-31",
    contractedHours: 1800,
    currentExposure: 1650,
    status: "Active",
    revenue: 720000
  },
  {
    id: "BC-003",
    brandName: "Airtel Kerala",
    trainId: "TS-18",
    startDate: "2023-11-15",
    endDate: "2024-02-15",
    contractedHours: 1200,
    currentExposure: 1180,
    status: "Active",
    revenue: 450000
  }
];

// Algorithm weights and scenarios
export interface WeightConfig {
  reliability: number;
  branding: number;
  cleaning: number;
  mileageBalancing: number;
}

export const presetScenarios: Record<string, WeightConfig> = {
  balanced: { reliability: 1.0, branding: 0.4, cleaning: 0.2, mileageBalancing: 0.8 },
  prioritiseBranding: { reliability: 1.0, branding: 1.5, cleaning: 0.2, mileageBalancing: 0.4 },
  prioritiseCleanliness: { reliability: 1.0, branding: 0.2, cleaning: 1.5, mileageBalancing: 0.4 },
  costSavings: { reliability: 1.0, branding: 0.1, cleaning: 0.2, mileageBalancing: 1.5 }
};