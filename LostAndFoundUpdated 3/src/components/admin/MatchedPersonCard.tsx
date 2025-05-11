
import React from "react";
import { User, MapPin, Phone, Mail, Calendar, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";


interface MatchedPersonCardProps {
  match: {
    match_id: string;
    source: any;
    matched_with: {
      face_id: string;
      name: string;
      gender?: string;
      age?: number;
      where_lost?: string;
      your_name?: string;
      relation_with_lost?: string;
      user_id?: string;
      mobile_no?: string;
      email_id?: string;
      face_blob?: string;
      face_path?: string;
      emotion?: string;
    };
    face_path?: string;
  };
}

const MatchedPersonCard: React.FC<MatchedPersonCardProps> = ({ match }) => {
  if (!match || !match.matched_with) return null;
  
  return (
    <Card className="overflow-hidden border-2 border-red-100">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-red-50 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Potential Match Found
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image */}
          <div className="md:col-span-1">
            {match.matched_with.face_blob ? (
              <img
                src={`data:image/jpeg;base64,${match.matched_with.face_blob}`}
                alt={match.matched_with.name || "Unknown"}
                className="w-full rounded-md aspect-square object-cover"
              />
            ) : (
              <div className="w-full rounded-md aspect-square bg-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {match.matched_with.emotion && (
              <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                Emotion: {match.matched_with.emotion}
              </Badge>
            )}
          </div>
          
          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="font-semibold text-xl">{match.matched_with.name || "Unknown"}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  {match.matched_with.gender || "Unknown"}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  <Calendar className="h-3 w-3 mr-1" /> {match.matched_with.age || "?"} years
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 font-medium">Lost at</div>
                  <div className="text-sm">{match.matched_with.where_lost || "Unknown"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 font-medium">Reported by</div>
                  <div className="text-sm">{match.matched_with.your_name || "Unknown"}</div>
                  <div className="text-xs text-gray-500">{match.matched_with.relation_with_lost || "Unknown relation"}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 font-medium">Contact</div>
                  <div className="text-sm">{match.matched_with.mobile_no || "Not provided"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-purple-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 font-medium">Email</div>
                  <div className="text-sm">{match.matched_with.email_id || "Not provided"}</div>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="text-xs text-gray-500 font-medium mb-1">Face ID</div>
              <code className="text-xs bg-gray-50 px-2 py-1 rounded block truncate">
                {match.matched_with.face_id || "N/A"}
              </code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchedPersonCard;
