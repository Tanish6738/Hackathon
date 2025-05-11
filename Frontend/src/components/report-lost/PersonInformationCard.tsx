
import React from "react";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Label } from "../ui/label";


interface PersonInformationCardProps {
  formData: {
    name: string;
    gender: string;
    age: string;
    where_lost: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonInformationCard: React.FC<PersonInformationCardProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Person Information</CardTitle>
        <CardDescription>Provide details about the lost person</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Person's Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="where_lost">Where Lost</Label>
            <Input
              id="where_lost"
              name="where_lost"
              value={formData.where_lost}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonInformationCard;
