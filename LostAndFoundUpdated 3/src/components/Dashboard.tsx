import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import UserReports from "./UserReports";
import ReportLost from "./ReportLost";
import FaceSearch from "./FaceSearch";
import { useUser } from "@clerk/clerk-react";
import { Menu } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id || "";
  const [activeTab, setActiveTab] = useState("reports");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 pt-20 sm:pt-28 max-w-full">
      <Card className="mb-4 sm:mb-6 overflow-hidden shadow-lg w-full mx-auto">
        <CardHeader className="p-3 sm:p-6 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold">
              Face Find & Trace
            </CardTitle>
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-1 xs:p-2 sm:p-6">
          <Tabs
            defaultValue="reports"
            className="w-full"
            value={activeTab}
            onValueChange={handleTabChange}
          >
            {/* Desktop navigation */}
            <TabsList className="hidden md:flex px-0 sm:px-4 w-full mb-4 items-center justify-between border-b bg-transparent">
              <TabsTrigger className="bg-black text-white hover:cursor-pointer w-1/3 text-center rounded-none py-2" value="reports">Your Reports</TabsTrigger>
              <TabsTrigger className="bg-black text-white hover:cursor-pointer w-1/3 text-center rounded-none py-2" value="report-lost">Report Lost Person</TabsTrigger>
              <TabsTrigger className="bg-black text-white hover:cursor-pointer w-1/3 text-center rounded-none py-2" value="face-search">Search by Face ID</TabsTrigger>
            </TabsList>

            {/* Mobile navigation */}
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} mb-4 z-20`}> 
              <div className="flex flex-col space-y-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
                <button
                  className={`w-full text-left px-3 py-3 rounded-md font-medium text-base transition-colors border-2 ${activeTab === "reports" ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-blue-700 shadow-md' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-transparent hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                  onClick={() => handleTabChange("reports")}
                >
                  Your Reports
                </button>
                <button
                  className={`w-full text-left px-3 py-3 rounded-md font-medium text-base transition-colors border-2 ${activeTab === "report-lost" ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-blue-700 shadow-md' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-transparent hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                  onClick={() => handleTabChange("report-lost")}
                >
                  Report Lost Person
                </button>
                <button
                  className={`w-full text-left px-3 py-3 rounded-md font-medium text-base transition-colors border-2 ${activeTab === "face-search" ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-blue-700 shadow-md' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-transparent hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                  onClick={() => handleTabChange("face-search")}
                >
                  Search by Face ID
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-2 sm:mt-4 min-h-[300px] xs:min-h-[350px]">
              <TabsContent value="reports">
                <UserReports userId={userId} />
              </TabsContent>
              <TabsContent value="report-lost">
                <ReportLost userId={userId} />
              </TabsContent>
              <TabsContent value="face-search">
                <FaceSearch />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
