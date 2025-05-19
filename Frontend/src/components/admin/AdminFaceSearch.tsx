import React, { useState } from "react";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import ReportDetailsModal from "../ReportDetailsModal"
import { searchFaceById } from "../../services/api";


const AdminFaceSearch: React.FC = () => {
  const { toast } = useToast();
  const [faceId, setFaceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faceId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Face ID",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      setSearchResults(null);
      const response = await searchFaceById(faceId);
      // Normalize backend response: always expect 'records' array
      let normalizedResponse: any = { message: response?.message || '', records: [] };
      if (Array.isArray((response as any).records)) {
        normalizedResponse.records = (response as any).records;
      } else if (response && response.record) {
        normalizedResponse.records = [{ folder: 'unknown', metadata: response.record }];
      }
      setSearchResults(normalizedResponse);
      if (!normalizedResponse || !Array.isArray(normalizedResponse.records)) {
        setError("Unexpected response from server.");
        setSearchResults(null);
        return;
      }
      if (normalizedResponse.records.length === 0) {
        setError("No records found for this Face ID.");
      } else {
        setError(null);
      }
    } catch (error: any) {
      let msg = error?.message || "Failed to search for face";
      if (error?.response?.data?.detail) {
        msg = error.response.data.detail;
      }
      setError(msg);
      setSearchResults(null);
      console.error("[AdminFaceSearch] Error during search:", error);
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordClick = (record: any) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const getFolderBadge = (folder: string) => {
    if (folder === "db/lost") {
      return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Lost</span>;
    }
    if (folder === "db/found") {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Found</span>;
    }
    if (folder === "db/live_feed") {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Live Feed</span>;
    }
    return null;
  };

  // Helper to normalize record structure for rendering
  const normalizeRecord = (rec: any) => {
    if (rec.folder && rec.metadata) return rec;
    if (rec.record && rec.source) return { folder: `db/${rec.source}`, metadata: rec.record };
    return null;
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search by Face ID</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter Face ID"
                value={faceId}
                onChange={(e) => setFaceId(e.target.value)}
              />
            </div>
            <Button type="submit"
            className="bg-black text-white hover:bg-gray-800 transition-colors hover:cursor-pointer"
            disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Searching...</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex items-center justify-center py-8 text-red-500">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {searchResults && Array.isArray(searchResults.records) && searchResults.records.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.records.map((rec: any, index: number) => {
              const record = normalizeRecord(rec);
              if (!record) return null;
              return (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleRecordClick(record)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      {record.metadata && record.metadata.face_blob && (
                        <img
                          src={`data:image/jpeg;base64,${record.metadata.face_blob}`}
                          alt={record.metadata.name || "Unknown person"}
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
                          {record.metadata?.name || "Unknown"}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {record.folder === "db/lost" ? "Lost at: " : record.folder === "db/found" ? "Found at: " : "Seen at: "}
                          {record.metadata?.where_lost || record.metadata?.where_found || record.metadata?.location || "Unknown location"}
                        </p>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        Click to view full details
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <ReportDetailsModal
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminFaceSearch;
