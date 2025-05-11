import React, { useState } from "react";
import {
  User,
  MapPin,
  Building,
  Mail,
  Fingerprint,
  AlertCircle,
  CheckCircle,
  Clock,
  UserCircle,
  Copy as CopyIcon,
  Check as CheckIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { RecordItem } from "../services/api";

interface ReportDetailsModalProps {
  record: RecordItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const copyToClipboard = async (text: string, setCopied: (v: boolean) => void) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  } catch {}
};

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const [copiedFaceId, setCopiedFaceId] = useState(false);

  if (!record || !record.metadata) return null;
  
  const metadata = record.metadata;
  const folder = record.folder || "";
  const isLost = folder === "db/lost";
  const isFound = folder === "db/found";
  const isLiveFeed = folder === "db/live_feed";

  const getFolderBadge = (folder: string) => {
    if (folder === "db/lost") {
      return <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1 text-white text-xs px-2 py-1 rounded-full shadow-sm"><AlertCircle className="h-3 w-3" /> Lost</Badge>;
    }
    if (folder === "db/found") {
      return <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1 text-white text-xs px-2 py-1 rounded-full shadow-sm"><CheckCircle className="h-3 w-3" /> Found</Badge>;
    }
    if (folder === "db/live_feed") {
      return <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1 text-white text-xs px-2 py-1 rounded-full shadow-sm"><Clock className="h-3 w-3" /> Live Feed</Badge>;
    }
    return null;
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "UN";
    return name
      .split(' ')
      .map(word => word[0] || '')
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border-0 bg-white">
        <DialogHeader>
          <div className="flex justify-between items-center mb-2">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              <User className="h-6 w-6 text-primary" />
              {metadata.name || "Unknown"}
            </DialogTitle>
            {getFolderBadge(folder)}
          </div>
          <DialogDescription className="flex items-center gap-2 text-gray-500 text-sm">
            <Fingerprint className="h-4 w-4 text-primary" />
            Face ID:
            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded select-all">{metadata.face_id || "Unknown"}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 ml-1"
              title={copiedFaceId ? 'Copied!' : 'Copy Face ID'}
              onClick={() => copyToClipboard(metadata.face_id || '', setCopiedFaceId)}
            >
              {copiedFaceId ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-gray-400" />}
            </Button>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          <div className="aspect-square relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border shadow-sm">
            {metadata.face_blob ? (
              <img 
                src={`data:image/jpeg;base64,${metadata.face_blob}`} 
                alt={metadata.name || "Unknown"} 
                className="w-full h-full object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>{getInitials(metadata.name)}</AvatarFallback>
                </Avatar>
              </div>
            )}
            {metadata.emotion && (
              <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs shadow border font-medium text-gray-700 flex items-center gap-1">
                <span className="capitalize">{metadata.emotion}</span>
              </div>
            )}
          </div>
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-gray-50 p-4 rounded-xl border flex flex-col gap-2 shadow-sm">
              <div className="flex items-center gap-2 mb-1 text-gray-700">
                <Fingerprint className="h-5 w-5 text-primary" />
                <span className="font-semibold">Face ID</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-white p-2 rounded border select-all break-all">{metadata.face_id || "N/A"}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0"
                  title={copiedFaceId ? 'Copied!' : 'Copy Face ID'}
                  onClick={() => copyToClipboard(metadata.face_id || '', setCopiedFaceId)}
                >
                  {copiedFaceId ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Gender & Age</div>
                    <div className="flex items-center gap-3 text-base font-medium text-gray-800">
                      <span className="capitalize">{metadata.gender || "Unknown"}</span>
                      <span className="w-0.5 h-4 bg-gray-300"></span>
                      <span>{metadata.age || "?"} years</span>
                    </div>
                  </div>
                </div>
                {isLost && metadata.where_lost && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500 font-semibold">Lost at</div>
                      <div className="break-words text-base text-gray-800">{metadata.where_lost}</div>
                    </div>
                  </div>
                )}
                {(isFound || isLiveFeed) && metadata.where_found && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500 font-semibold">Found at</div>
                      <div className="break-words text-base text-gray-800">{metadata.where_found}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Reported by</div>
                    <div className="break-words text-base text-gray-800">{metadata.your_name || "Unknown"}</div>
                  </div>
                </div>
                {isLost && metadata.relation_with_lost && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500 font-semibold">Relation</div>
                      <div className="break-words text-base text-gray-800">{metadata.relation_with_lost}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Contact</div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="break-all text-base text-gray-800">{metadata.mobile_no || "N/A"}</span>
                        {metadata.mobile_no && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            title={copiedFaceId ? 'Copied!' : 'Copy Mobile'}
                            onClick={() => copyToClipboard(metadata.mobile_no, setCopiedFaceId)}
                          >
                            {copiedFaceId ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-gray-400" />}
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="break-all text-base text-gray-800">{metadata.email_id || "N/A"}</span>
                        {metadata.email_id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            title={copiedFaceId ? 'Copied!' : 'Copy Email'}
                            onClick={() => copyToClipboard(metadata.email_id, setCopiedFaceId)}
                          >
                            {copiedFaceId ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-gray-400" />}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {(metadata.organization || metadata.designation) && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metadata.organization && (
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-600 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 font-semibold">Organization</div>
                        <div className="break-words text-base text-gray-800">{metadata.organization}</div>
                      </div>
                    </div>
                  )}
                  {metadata.designation && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-600 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 font-semibold">Designation</div>
                        <div className="break-words text-base text-gray-800">{metadata.designation}</div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <DialogFooter className="pt-4">
          <Button onClick={onClose} className="w-full font-semibold text-base py-2 rounded-lg">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;
