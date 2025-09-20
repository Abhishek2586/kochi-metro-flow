import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Briefcase, 
  Calendar as CalendarIcon, 
  Upload, 
  Eye, 
  Edit,
  Plus,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const BrandingDashboard = () => {
  const { toast } = useToast();
  const [newContractDialog, setNewContractDialog] = useState(false);
  const [contractForm, setContractForm] = useState({
    brandName: "",
    contactPerson: "",
    startDate: null,
    endDate: null,
    trainLines: "",
    amount: "",
    description: ""
  });

  const contracts = [
    {
      id: "BC-001",
      brandName: "Coca-Cola Kerala",
      contactPerson: "Rajesh Kumar",
      startDate: "2024-01-01",
      endDate: "2024-06-30", 
      assignedTrain: "TS-08",
      status: "active",
      amount: "₹8,50,000",
      exposureHours: "156 hrs",
      line: "Blue Line"
    },
    {
      id: "BC-002", 
      brandName: "Kerala Tourism",
      contactPerson: "Priya Nair",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      assignedTrain: "TS-15", 
      status: "active",
      amount: "₹12,00,000",
      exposureHours: "89 hrs",
      line: "Blue Line"
    },
    {
      id: "BC-003",
      brandName: "Kochi IT Park",
      contactPerson: "Suresh Menon",
      startDate: "2024-01-10",
      endDate: "2024-01-31",
      assignedTrain: "TS-22",
      status: "expired",
      amount: "₹3,50,000", 
      exposureHours: "234 hrs",
      line: "Blue Line"
    },
    {
      id: "BC-004",
      brandName: "Federal Bank",
      contactPerson: "Anita Thomas",
      startDate: "2024-03-01", 
      endDate: "2024-05-31",
      assignedTrain: "TS-12",
      status: "upcoming",
      amount: "₹9,75,000",
      exposureHours: "0 hrs",
      line: "Blue Line"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'expired': return 'status-maintenance';
      case 'upcoming': return 'status-pending';
      default: return 'status-standby';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'expired': return 'Expired';
      case 'upcoming': return 'Upcoming';
      default: return status;
    }
  };

  const handleNewContract = () => {
    if (!contractForm.brandName || !contractForm.startDate || !contractForm.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Contract Added",
      description: `New contract for ${contractForm.brandName} has been created`,
    });
    
    setNewContractDialog(false);
    setContractForm({
      brandName: "",
      contactPerson: "",
      startDate: null,
      endDate: null,
      trainLines: "",
      amount: "",
      description: ""
    });
  };

  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const expiringContracts = contracts.filter(c => {
    const endDate = new Date(c.endDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return endDate <= thirtyDaysFromNow && c.status === 'active';
  }).length;

  const totalRevenue = contracts
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + parseInt(c.amount.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-metro-blue to-metro-teal bg-clip-text text-transparent">
            Branding Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Advertising contract management and brand exposure tracking
          </p>
        </div>
        <Dialog open={newContractDialog} onOpenChange={setNewContractDialog}>
          <DialogTrigger asChild>
            <Button className="metro-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Add New Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-metro-blue" />
                New Advertising Contract
              </DialogTitle>
              <DialogDescription>
                Create a new brand partnership contract
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Brand/Company Name *</Label>
                <Input
                  id="brand-name"
                  value={contractForm.brandName}
                  onChange={(e) => setContractForm(prev => ({...prev, brandName: e.target.value}))}
                  placeholder="Enter brand name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input
                  id="contact-person"
                  value={contractForm.contactPerson}
                  onChange={(e) => setContractForm(prev => ({...prev, contactPerson: e.target.value}))}
                  placeholder="Enter contact person"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`justify-start text-left font-normal ${!contractForm.startDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {contractForm.startDate ? format(contractForm.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={contractForm.startDate}
                        onSelect={(date) => setContractForm(prev => ({...prev, startDate: date}))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`justify-start text-left font-normal ${!contractForm.endDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {contractForm.endDate ? format(contractForm.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={contractForm.endDate}
                        onSelect={(date) => setContractForm(prev => ({...prev, endDate: date}))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Contract Amount (₹)</Label>
                <Input
                  id="amount"
                  value={contractForm.amount}
                  onChange={(e) => setContractForm(prev => ({...prev, amount: e.target.value}))}
                  placeholder="Enter contract amount"
                  type="number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={contractForm.description}
                  onChange={(e) => setContractForm(prev => ({...prev, description: e.target.value}))}
                  placeholder="Contract details and requirements"
                />
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Contract Document
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewContractDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewContract} className="bg-metro-blue hover:bg-metro-blue/90">
                Create Contract
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <Briefcase className="h-4 w-4 text-metro-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
            <p className="text-xs text-muted-foreground">All partnerships</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <TrendingUp className="h-4 w-4 text-metro-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-metro-green">{activeContracts}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-metro-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-metro-orange">{expiringContracts}</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-metro-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-metro-teal">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Active contracts</p>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-metro-blue" />
            Contract Management
          </CardTitle>
          <CardDescription>
            Overview of all advertising partnerships and brand contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id} className="bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <h3 className="font-bold text-lg text-metro-blue">{contract.brandName}</h3>
                        <Badge 
                          variant="outline"
                          className={getStatusColor(contract.status)}
                        >
                          {getStatusLabel(contract.status)}
                        </Badge>
                        {contract.status === 'active' && 
                         new Date(contract.endDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                          <Badge variant="outline" className="status-maintenance">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Expiring Soon
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">Contact:</span>
                          <div>{contract.contactPerson}</div>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Duration:</span>
                          <div>{format(new Date(contract.startDate), "dd MMM")} - {format(new Date(contract.endDate), "dd MMM yy")}</div>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Train:</span>
                          <div className="font-mono">{contract.assignedTrain}</div>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Amount:</span>
                          <div className="font-bold text-metro-green">{contract.amount}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div>Exposure: <span className="font-medium">{contract.exposureHours}</span></div>
                        <div>Line: <span className="font-medium">{contract.line}</span></div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Contract
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingDashboard;