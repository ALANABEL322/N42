import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Search, Trash2 } from "lucide-react"
import { getMockUsers } from "../../../types/user"

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const users = getMockUsers()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "editor":
        return "text-green-500"
      case "admin":
        return "text-rose-500"
      case "colaborador":
      case "collaborator":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="bg-rose-50 w-full max-w-4xl h-[65vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Input
              placeholder="Search"
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
              <div className="p-3"></div>
            </div>

            <div className="divide-y divide-rose-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div key={index} className="grid grid-cols-5 text-sm bg-white">
                    <div className="p-3">{user.name}</div>
                    <div className="p-3">{user.email}</div>
                    <div className={`p-3 ${getRoleColor(user.role)}`}>{user.role}</div>
                    <div className="p-3">{user.phone}</div>
                    <div className="p-3 flex justify-center">
                      <button className="text-rose-500 hover:text-rose-700 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 bg-white">No users found matching your search criteria</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagement
