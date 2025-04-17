import { useState, useEffect } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Search, Trash2, UserX } from "lucide-react";
import { api } from "../../../lib/api";
import { Loader2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar: string;
  location: string;
}

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getUsers();
      if (response.success) {
        setUsers(response.users);
      } else {
        setError(response.error || "Error al cargar usuarios");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "text-rose-500";
      case "user":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 ml-0 xl:ml-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-rose-500" />
          <p className="text-lg text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 ml-0 xl:ml-64">
        <div className="flex flex-col items-center gap-4 text-center">
          <UserX className="h-16 w-16 text-rose-500" />
          <p className="text-lg text-gray-600">{error}</p>
          <button
            onClick={loadUsers}
            className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[120vh] flex flex-col items-center p-4 space-y-6 ml-0 xl:ml-64">
      <h1 className="text-5xl font-bold text-center mt-20">User Management</h1>

      <Card className="bg-rose-50 w-full max-w-4xl h-[65vh] overflow-y-auto">
        <CardContent className="pt-6">
          <div className="relative mb-6">
            <Input
              placeholder="Search users..."
              className="bg-rose-50 border-rose-100 pl-3 pr-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 bg-rose-100 text-sm font-medium">
              <div className="p-3">Name</div>
              <div className="p-3">Email</div>
              <div className="p-3">Role</div>
              <div className="p-3">Phone</div>
              <div className="p-3">Location</div>
            </div>

            <div className="divide-y divide-rose-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-5 text-sm bg-white hover:bg-rose-50 transition-colors"
                  >
                    <div className="p-3 flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {user.name}
                    </div>
                    <div className="p-3">{user.email}</div>
                    <div className={`p-3 ${getRoleColor(user.role)}`}>
                      {user.role}
                    </div>
                    <div className="p-3">{user.phone}</div>
                    <div className="p-3">{user.location}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 bg-white">
                  No users found matching your search criteria
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserManagement;
