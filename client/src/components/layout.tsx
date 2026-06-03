import DashboardSidebar from "./dashboard-sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">

      <DashboardSidebar />

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}