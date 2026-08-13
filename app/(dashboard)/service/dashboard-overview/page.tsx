
import DashboardCharts from "./_components/dashboard-charts";
import ServiceDashboardHeader from "./_components/dashboard-header";
import RecentEnquiriesAndServices from "./_components/recent-enquiries-and-services";

export default function Page() {
  return (
    <div className="p-6 space-y-4">
      <ServiceDashboardHeader/>
      <DashboardCharts/>
      <RecentEnquiriesAndServices/>
    </div>
  );
}
