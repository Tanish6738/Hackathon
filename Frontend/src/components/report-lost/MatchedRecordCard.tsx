
import React from "react";
import { 
  Smile, Frown, Meh, Info, User, MapPin, Building, Phone, Mail, UserCheck, UserCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { MatchedRecord } from "../../services/api";

interface MatchedRecordCardProps {
  match: MatchedRecord;
}

const MatchedRecordCard: React.FC<MatchedRecordCardProps> = ({ match }) => {
  if (!match || !match.matched_with) return null;
  
  // Function to get emotion icon based on the emotion value
  const getEmotionIcon = (emotion: string | undefined) => {
    if (!emotion) return <Meh className="h-6 w-6 text-gray-500" aria-label="Unknown emotion" />;
    
    switch (emotion.toLowerCase()) {
      case "happy":
        return <Smile className="h-6 w-6 text-green-500" aria-label="Happy" />;
      case "sad":
        return <Frown className="h-6 w-6 text-blue-500" aria-label="Sad" />;
      case "angry":
        return <Frown className="h-6 w-6 text-red-500" aria-label="Angry" />;
      case "neutral":
        return <Meh className="h-6 w-6 text-gray-500" aria-label="Neutral" />;
      default:
        return <Meh className="h-6 w-6 text-gray-500" aria-label="Unknown emotion" />;
    }
  };

  // Function to get gender icon
  const getGenderIcon = (gender: string | undefined) => {
    if (!gender) return <UserCircle className="h-5 w-5 text-gray-500" />;
    
    return gender.toLowerCase() === "female" ? 
      <UserCircle className="h-5 w-5 text-pink-500" /> : 
      <UserCircle className="h-5 w-5 text-blue-500" />;
  };

  return (
    <Card key={match.match_id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            {match.matched_with.name || "Unknown"}
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="relative w-full aspect-square max-w-[200px] overflow-hidden rounded-md border-2 border-gray-200">
              {match.matched_with.face_blob ? (
                <img 
                  src={`data:image/jpeg;base64,${match.matched_with.face_blob}`} 
                  alt={match.matched_with.name || "Unknown"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
              {match.matched_with.emotion && (
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-md border border-gray-100">
                  {getEmotionIcon(match.matched_with.emotion)}
                </div>
              )}
            </div>
            {match.matched_with.emotion && (
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                {getEmotionIcon(match.matched_with.emotion)}
                <span className="capitalize">{match.matched_with.emotion}</span>
              </div>
            )}
          </div>
          <div className="space-y-4 flex-grow">
            <div className="bg-gray-50 p-3 rounded-md border">
              <h4 className="font-medium text-sm text-gray-500 mb-1">Face ID</h4>
              <div className="font-mono text-xs bg-white p-2 rounded overflow-x-auto break-all max-h-20 overflow-y-auto scrollbar-thin">
                {match.matched_with.face_id || "N/A"}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                {getGenderIcon(match.matched_with.gender)}
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Gender</div>
                  <div className="capitalize text-sm font-medium truncate">{match.matched_with.gender || "Unknown"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <User className="h-5 w-5 text-gray-500" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Age</div>
                  <div className="text-sm font-medium truncate">{match.matched_with.age || "Unknown"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <MapPin className="h-5 w-5 text-red-500" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Where Found</div>
                  <div className="text-sm font-medium break-words line-clamp-2">{match.matched_with.where_found || "Unknown"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <User className="h-5 w-5 text-blue-500" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Founder</div>
                  <div className="text-sm font-medium break-words line-clamp-2">{match.matched_with.reporter_name || "Unknown"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <Building className="h-5 w-5 text-gray-600" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Organization</div>
                  <div className="text-sm font-medium break-words line-clamp-2">{match.matched_with.organization || "Not specified"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <Info className="h-5 w-5 text-gray-600" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Designation</div>
                  <div className="text-sm font-medium break-words line-clamp-2">{match.matched_with.designation || "Not specified"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <Phone className="h-5 w-5 text-green-600" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="text-sm font-medium break-words line-clamp-2">{match.matched_with.contact_details?.mobile_no || "Not provided"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <Mail className="h-5 w-5 text-blue-600" />
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-medium break-all line-clamp-2">{match.matched_with.contact_details?.email_id || "Not provided"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchedRecordCard;
