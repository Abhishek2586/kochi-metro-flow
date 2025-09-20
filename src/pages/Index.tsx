import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "./Dashboard";
import CleanerApp from "./CleanerApp";
import MechanicApp from "./MechanicApp";
import DepotView from "./DepotView";
import BrandingDashboard from "./BrandingDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "cleaner":
        return <CleanerApp />;
      case "mechanic":
        return <MechanicApp />;
      case "depot":
        return <DepotView />;
      case "branding":
        return <BrandingDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </Layout>
  );
};

export default Index;
