import { useSelector } from "react-redux";
import StatsCards from "../Components/StateCards";
import RecentActivity from "../Components/RecentActivity";
import DataRiskScore from "../Components/RiskScore";
import QuickActions from "../Components/QuickActitonPanel";

 

const Dashboard = () => {
    const theme = useSelector((state) => state.theme.theme); // FIX: Access `theme` property

  return (
    <div className="p-6 flex gap-5 flex-col"> 
      <StatsCards /> 
 
      <DataRiskScore/>
      <QuickActions/>
      
      <RecentActivity/> 
    </div>
  );
};

export default Dashboard;
