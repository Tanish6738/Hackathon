
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Dashboard from "../components/Dashboard";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Face Find & Trace</h1>
          <Button variant="outline" asChild>
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </header>
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
