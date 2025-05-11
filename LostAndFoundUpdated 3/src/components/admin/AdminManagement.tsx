import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from '../ui/use-toast';

interface Admin {
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

interface AdminManagementProps {
  userId: string;
}

const AdminManagement: React.FC<AdminManagementProps> = ({ userId }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isHeadAdmin, setIsHeadAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    user_id: '',
    full_name: '',
    email: '',
    role: 'admin'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if the current user is a HeadAdmin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8000/check_admin_status/${userId}`);
        const data = await response.json();
        setIsHeadAdmin(data.is_admin && data.role === 'HeadAdmin');

        if (data.is_admin) {
          fetchAdmins();
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    if (userId) {
      checkAdminStatus();
    }
  }, [userId]);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const response = await fetch(`http://localhost:8000/list_admins?creator_id=${userId}`);
      const data = await response.json();
      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  // Create a new admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHeadAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only HeadAdmin users can create new admins",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {      const formData = new FormData();
      formData.append('user_id', newAdmin.user_id);
      formData.append('full_name', newAdmin.full_name);
      formData.append('email', newAdmin.email);
      formData.append('role', newAdmin.role);
      formData.append('creator_id', userId);

      console.log('Sending admin data:', Object.fromEntries(formData));
      
      const response = await fetch('http://localhost:8000/create_admin', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Admin created successfully",
        });
        // Reset the form with only the fields we need
        setNewAdmin({
          user_id: '',
          full_name: '',
          email: '',
          role: 'admin'
        });
        fetchAdmins();      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        toast({
          title: "Error",
          description: errorData.detail || errorData.error || "Failed to create admin",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an admin
  const handleDeleteAdmin = async (adminId: string) => {
    if (!isHeadAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only HeadAdmin users can delete admins",
        variant: "destructive"
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this admin?")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('creator_id', userId);

      const response = await fetch(`http://localhost:8000/delete_admin/${adminId}`, {
        method: 'DELETE',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Admin deleted successfully",
        });
        fetchAdmins();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to delete admin",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  if (!userId) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>You need to be logged in to access admin management.</p>
        </CardContent>
      </Card>
    );
  }

  if (!isHeadAdmin) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Only HeadAdmin users can manage administrators.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Admin Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_id">User ID</Label>
                <Input
                  id="user_id"
                  value={newAdmin.user_id}
                  onChange={(e) => setNewAdmin({ ...newAdmin, user_id: e.target.value })}
                  placeholder="User ID from Clerk"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={newAdmin.full_name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, full_name: e.target.value })}
                  placeholder="Admin's full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="Admin's email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newAdmin.role} 
                  onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="HeadAdmin">Head Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:cursor-pointer hover:bg-gray-800 hover:text-white"
             disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Admin List */}
      <Card>
        <CardHeader>
          <CardTitle>All Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No admins found.</TableCell>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <TableRow key={admin.user_id}>
                    <TableCell>{admin.full_name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.role}</TableCell>
                    <TableCell>{new Date(admin.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteAdmin(admin.user_id)}
                        disabled={admin.role === 'HeadAdmin'}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;
