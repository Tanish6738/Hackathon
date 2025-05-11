import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import AdminReports from "../components/admin/AdminReports";
import LiveFeed from "../components/admin/LiveFeed";
import AdminFaceSearch from "../components/admin/AdminFaceSearch";
import AdminManagement from "../components/admin/AdminManagement";
import { useUser } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import FoundPersonForm from "../components/admin/FoundPersonForm";
import FoundPersonResultDisplay from "../components/admin/FoundPersonResultDisplay";

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id || "";
  const [isHeadAdmin, setIsHeadAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("reports");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [foundPersonResponse, setFoundPersonResponse] = useState<any>(null);

  // Check if the user is a HeadAdmin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8000/check_admin_status/${userId}`);
        const data = await response.json();
        setIsHeadAdmin(data.is_admin && data.role === "HeadAdmin");
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };
    
    if (userId) {
      checkAdminStatus();
    }
  }, [userId]);

  const handleFoundPersonSubmitSuccess = (data: any) => {
    setFoundPersonResponse(data);
  };

  const handleReportAnotherFoundPerson = () => {
    setFoundPersonResponse(null);
  };

  return (
    <div className="container mx-auto p-4 pt-20 md:pt-44">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl md:text-2xl">Face Find & Trace Admin Dashboard</CardTitle>
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="reports" 
            className="w-full"
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            {/* Desktop tabs */}
            <TabsList className="hidden md:grid w-full grid-cols-2 lg:grid-cols-5 mb-4">
              <TabsTrigger value="reports">All Reports</TabsTrigger>
              <TabsTrigger value="upload-found">Upload Found</TabsTrigger>
              <TabsTrigger value="live-feed">Live Feed</TabsTrigger>
              <TabsTrigger value="face-search">Face ID Search</TabsTrigger>
              {isHeadAdmin && <TabsTrigger value="admin-management">Admin Management</TabsTrigger>}
            </TabsList>

            {/* Mobile dropdown menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mb-4`}>
              <div className="flex flex-col space-y-2 p-2 bg-gray-50 rounded-md">
                <button 
                  className={`text-left px-3 py-2 rounded-md ${activeTab === "reports" ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab("reports");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  All Reports
                </button>
                <button 
                  className={`text-left px-3 py-2 rounded-md ${activeTab === "upload-found" ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab("upload-found");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Upload Found Person
                </button>
                <button 
                  className={`text-left px-3 py-2 rounded-md ${activeTab === "live-feed" ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab("live-feed");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Live Feed
                </button>
                <button 
                  className={`text-left px-3 py-2 rounded-md ${activeTab === "face-search" ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab("face-search");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Face ID Search
                </button>
                {isHeadAdmin && (
                  <button 
                    className={`text-left px-3 py-2 rounded-md ${activeTab === "admin-management" ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                      setActiveTab("admin-management");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Admin Management
                  </button>
                )}
              </div>
            </div>

            {/* Tab content */}
            <div className="p-1">
              <TabsContent value="reports">
                <AdminReports userId={userId} />
              </TabsContent>
              <TabsContent value="upload-found">
                {foundPersonResponse ? (
                  <FoundPersonResultDisplay response={foundPersonResponse} onReportAnother={handleReportAnotherFoundPerson} />
                ) : (
                  <FoundPersonForm userId={userId} onSubmitSuccess={handleFoundPersonSubmitSuccess} />
                )}
              </TabsContent>
              <TabsContent value="live-feed">
                <LiveFeed userId={userId} />
              </TabsContent>
              <TabsContent value="face-search">
                <AdminFaceSearch />
              </TabsContent>
              {isHeadAdmin && (
                <TabsContent value="admin-management">
                  <AdminManagement userId={userId} />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
