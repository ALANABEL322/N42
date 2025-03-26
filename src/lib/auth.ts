interface AuthResult {
    success: boolean
    error?: string
    userId?: string
  }
  
  const users = new Map<string, { password: string; id: string }>()
  
  export async function authenticate(username: string, password: string): Promise<AuthResult> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const user = users.get(username)
  
    if (!user) {
      users.set(username, { password, id: generateUserId() })
      return { success: true, userId: users.get(username)?.id }
    }
  
    if (user.password !== password) {
      return { success: false, error: "Contraseña incorrecta" }
    }
  
    return { success: true, userId: user.id }
  }
  
  export async function register(username: string, password: string): Promise<AuthResult> {
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    if (users.has(username)) {
      return { success: false, error: "El nombre de usuario ya está en uso" }
    }
  
    const userId = generateUserId()
    users.set(username, { password, id: userId })
    return { success: true, userId }
  }
  function generateUserId(): string {
    return Math.random().toString(36).substring(2, 15)
  }
  
  
  export async function resetPassword(username: string, newPassword: string): Promise<AuthResult> {

    await new Promise((resolve) => setTimeout(resolve, 500))
    if (!users.has(username)) {
      return { success: false, error: "Usuario no encontrado" }
    }
    const user = users.get(username)!
    users.set(username, { ...user, password: newPassword })
  
    return { success: true }
  }
  
  