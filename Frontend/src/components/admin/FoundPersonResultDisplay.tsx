import React from "react";
import {  Check, AlertTriangle, Heart, Fingerprint } from "lucide-react";
import MatchedPersonCard from "./MatchedPersonCard";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface FoundPersonResultDisplayProps {
  response: {
    message: string;
    face_id: string;
    matched_lost_count: number;
    matched_records: any[];
  };
  onReportAnother: () => void;
}

const FoundPersonResultDisplay: React.FC<FoundPersonResultDisplayProps> = ({ response, onReportAnother }) => {
  const hasMatches = response.matched_lost_count > 0;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-green-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Report Submitted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p className="mb-3 text-lg font-medium">{response.message}</p>
            
            <div className="p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-md border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Fingerprint className="h-5 w-5 text-primary" />
                <span className="font-semibold text-gray-700">Face ID</span>
              </div>
              <div className="font-mono text-sm bg-white p-3 rounded-md overflow-x-auto break-all shadow-inner border">
                {response.face_id}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge 
                variant={response.matched_lost_count > 0 ? "default" : "outline"}
                className={response.matched_lost_count > 0 
                  ? "bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1.5 text-sm font-medium" 
                  : "px-3 py-1.5 text-sm font-medium"}
              >
                <Check className="h-4 w-4 mr-1" />
                Lost Person Matches: {response.matched_lost_count}
              </Badge>
            </div>
          </div>
          
          {hasMatches ? (
            <>
              <Separator className="my-6" />
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Matched Records
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {response.matched_records.map((match) => (
                  <MatchedPersonCard key={match.match_id} match={match} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 p-8 bg-gray-50 rounded-md border border-gray-200 text-center">
              <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <p className="text-center text-gray-700 text-lg font-medium mb-2">No matches found for this person.</p>
              <p className="text-center text-muted-foreground">This found person doesn't match any reported lost persons in the system.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4 border-t">
          <Button onClick={onReportAnother} className="w-full">
            Report Another Person
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FoundPersonResultDisplay;
