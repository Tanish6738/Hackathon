import React, { useEffect, useState } from "react";
import ReportDetailsModal from "./ReportDetailsModal";
import { Loader2, User, File } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { getRecordsByUser } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface UserReportsProps {
  userId: string;
}

const UserReports: React.FC<UserReportsProps> = ({ userId }) => {
  const [lostRecords, setLostRecords] = useState<any[]>([]);
  const [foundRecords, setFoundRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const data = await getRecordsByUser(userId);
        if (Array.isArray(data.records)) {
          const lost: any[] = [];
          const found: any[] = [];
          data.records.forEach((rec: any) => {
            if (rec.source === 'lost_people' && rec.data) {
              lost.push(rec.data);
            } else if (rec.source === 'found_people' && rec.data) {
              found.push(rec.data);
            }
          });
          setLostRecords(lost);
          setFoundRecords(found);
        } else {
          setLostRecords([]);
          setFoundRecords([]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch your reports",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [userId, toast]);

  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (lostRecords.length === 0 && foundRecords.length === 0) {
    return (
      <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No reports found</h3>
        <p className="text-muted-foreground">You haven't submitted any reports yet.</p>
      </div>
    );
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "UN";
    return name
      .split(' ')
      .map(word => word[0] || '')
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Render a card for a lost record
  const renderLostCard = (meta: any) => {
    if (!meta) return null;
    return (
      <Card key={meta.face_id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
        <CardHeader className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {meta.name || "Unknown"}
          </CardTitle>
          <Badge className="bg-red-500 hover:bg-red-600 ml-2">Lost</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden relative">
            {meta.face_blob ? (
              <img 
                src={`data:image/jpeg;base64,${meta.face_blob}`} 
                alt={meta.name || "Unknown"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>{getInitials(meta.name)}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div><b>Name:</b> {meta.name}</div>
            <div><b>Age:</b> {meta.age}</div>
            <div><b>Gender:</b> {meta.gender}</div>
            <div><b>Face ID:</b> {meta.face_id}</div>
          </div>
        </CardContent>
        <CardFooter className="p-3 bg-gray-50 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => handleViewDetails(meta)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // Render a card for a found record
  const renderFoundCard = (meta: any) => {
    if (!meta) return null;
    return (
      <Card key={meta.face_id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
        <CardHeader className="p-4 bg-gradient-to-r from-gray-50 to-green-50 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {meta.name || "Unknown"}
          </CardTitle>
          <Badge className="bg-green-500 hover:bg-green-600 ml-2">Found</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden relative">
            {meta.face_blob ? (
              <img 
                src={`data:image/jpeg;base64,${meta.face_blob}`} 
                alt={meta.name || "Unknown"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>{getInitials(meta.name)}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div><b>Name:</b> {meta.name}</div>
            <div><b>Age:</b> {meta.age}</div>
            <div><b>Gender:</b> {meta.gender}</div>
            <div><b>Face ID:</b> {meta.face_id}</div>
          </div>
        </CardContent>
        <CardFooter className="p-3 bg-gray-50 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => handleViewDetails(meta)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Reports</h2>
        <Badge variant="outline" className="text-sm py-1.5">
          Total: {lostRecords.length + foundRecords.length}
        </Badge>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Lost Reports</h3>
        {lostRecords.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm mb-6">
            <File className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">No lost reports found.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {lostRecords.map((rec) => renderLostCard(rec))}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Found Reports</h3>
        {foundRecords.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <File className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">No found reports found.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundRecords.map((rec) => renderFoundCard(rec))}
          </div>
        )}
      </div>
      <ReportDetailsModal 
        record={selectedRecord} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default UserReports;
