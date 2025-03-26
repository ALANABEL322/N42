export interface MonthlyUsersData {
  data: number[]
  labels: string[]
  colors: string[]
}

export interface UserRole {
  name: string
  value: number
  color: string
}

export interface UserData {
  name: string
  email: string
  role: string
  phone: string
}

// Mock data for users
export const mockUsers: UserData[] = [
  {
    name: "Gregory House",
    email: "Gregory@example.com",
    role: "admin",
    phone: "123-456-7890"
  },
  {
    name: "james wilson",
    email: "james@example.com",
    role: "collaborator",
    phone: "987-654-3210"
  },
  {
    name: "Lisa Cuddy",
    email: "Lisa@example.com",
    role: "admin",
    phone: "555-123-4567"
  },
  {
    name: "Allison Cameron",
    email: "Allison@example.com",
    role: "editor",
    phone: "555-123-4567"
  },
  {
    name: "Eric Foreman",
    email: "Eric@example.com",
    role: "collaborator",
    phone: "555-123-4567"
  }
]

// Function to get mock users
export function getMockUsers(): UserData[] {
  return mockUsers
}