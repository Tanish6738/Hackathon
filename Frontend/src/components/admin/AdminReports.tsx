import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import ReportDetailsModal from "../ReportDetailsModal";
import { getRecordsByUser } from "../../services/api";
import { Card, CardContent } from "../ui/card";
import { Eye, Loader2, AlertCircle } from "lucide-react";
import {useQuery } from "@tanstack/react-query";


interface AdminReportsProps {
  userId: string;
}

const AdminReports: React.FC<AdminReportsProps> = ({ userId }) => {
  const { toast } = useToast();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminRecords', userId],
    queryFn: () => getRecordsByUser(userId),
    meta: {
      onError: (err: any) => {
        toast({
          title: "Error",
          description: "Failed to load records: " + err.message,
          variant: "destructive",
        });
      }
    }
  });

  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getFolderBadge = (folder: string | undefined) => {
    if (!folder) return null;
    
    if (folder === "db/lost") {
      return <Badge className="bg-red-500 hover:bg-red-600">Lost</Badge>;
    }
    if (folder === "db/found") {
      return <Badge className="bg-green-500 hover:bg-green-600">Found</Badge>;
    }
    if (folder === "db/live_feed") {
      return <Badge className="bg-blue-500 hover:bg-blue-600">Live Feed</Badge>;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>Error loading records. Please try again.</span>
      </div>
    );
  }

  if (!data || !data.records || data.records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No records found.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Reports in System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.records.map((record: any, index: number) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                {record.metadata && record.metadata.face_blob && (
                  <img
                    src={`data:image/jpeg;base64,${record.metadata.face_blob}`}
                    alt={(record.metadata && record.metadata.name) || "Unknown person"}
                    className="w-full h-48 object-cover object-center"
                  />
                )}
                <div className="absolute top-2 right-2">
                  {getFolderBadge(record.folder)}
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-bold truncate">
                    {(record.metadata && record.metadata.name) || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {record.folder === "db/lost" ? "Lost at: " : record.folder === "db/found" ? "Found at: " : "Seen at: "}
                    {(record.metadata && (record.metadata.where_lost || record.metadata.where_found)) || "Unknown location"}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500 truncate max-w-[70%]">
                    ID: {record.metadata && record.metadata.face_id ? record.metadata.face_id.substring(0, 8) + "..." : "N/A"}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(record)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ReportDetailsModal 
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default AdminReports;
