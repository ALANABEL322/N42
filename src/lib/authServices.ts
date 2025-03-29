/// <reference types="vite/client" />

interface User {
  username: string
  userType: "admin" | "user"
  createdAt?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  error?: string
}

interface AuthResult {
  success: boolean
  userType: "admin" | "user" | null
  error?: string
  user?: User
}

const AUTH_KEY = "authData"
const REMEMBERED_USER_KEY = "rememberedUser"
const AUTH_CHANGE_EVENT = "auth-change"

const storageManager = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(key)
  },

  setItem(key: string, value: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(key, value)
  },

  removeItem(key: string): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  saveUser(user: User): void {
    if (typeof window === "undefined") return
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, user, error: undefined }))
  },

  clearAllUserData(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(REMEMBERED_USER_KEY)
    const keysToRemove = [
      'sessionToken',
      'userSession',
      'authToken',
      'userProfile',
      'sessionData'
    ]
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }
}

class AuthService {
  private state: AuthState
  private listeners: ((state: AuthState) => void)[] = []

  constructor() {
    this.state = this.loadInitialState()
    this.setupWindowListener()
  }

  private loadInitialState(): AuthState {
    try {
      const savedAuth = storageManager.getItem(AUTH_KEY)
      if (savedAuth) {
        const parsedState = JSON.parse(savedAuth)
        if (parsedState && typeof parsedState === 'object') {
          return parsedState
        }
      }
    } catch (e) {
      console.error("Error loading auth state", e)
    }
    return { isAuthenticated: false, user: null }
  }

  private setupWindowListener() {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === AUTH_KEY) {
          const newState = this.loadInitialState()
          if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
            this.state = newState
            this.notifyListeners()
          }
        }
      })

      window.addEventListener(AUTH_CHANGE_EVENT, () => {
        this.notifyListeners()
      })
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state))
  }

  private dispatchAuthChange() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT))
    }
  }

  async login(username: string, password: string, userType: "admin" | "user", rememberMe: boolean): Promise<AuthResult> {
    try {
      if (!username || !password) {
        return {
          success: false,
          userType: null,
          error: "Username and password are required",
          user: undefined
        }
      }

      const mockResponse = {
        success: true,
        userType: userType,
        user: {
          username,
          userType,
          createdAt: new Date().toISOString()
        }
      }

      if (mockResponse.success) {
        storageManager.saveUser(mockResponse.user)
        
        const newState = { 
          isAuthenticated: true, 
          user: mockResponse.user,
          error: undefined
        }
        
        if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
          this.state = newState
          this.dispatchAuthChange()
        }
      }

      return {
        success: mockResponse.success,
        userType: mockResponse.userType,
        error: undefined,
        user: mockResponse.user
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        userType: null,
        error: "An unexpected error occurred",
        user: undefined
      }
    }
  }

  logout(): void {
    storageManager.clearAllUserData()
    
    const newState = { 
      isAuthenticated: false, 
      user: null, 
      error: undefined 
    }
    
    if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
      this.state = newState
      this.dispatchAuthChange()
    }
    this.notifyListeners()
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated
  }

  getUserType(): "admin" | "user" | null {
    return this.state.user?.userType ?? null
  }

  getCurrentUser(): User | null {
    return this.state.user
  }

  rememberUser(username: string): void {
    storageManager.setItem(REMEMBERED_USER_KEY, username)
  }

  getRememberedUser(): string | null {
    return storageManager.getItem(REMEMBERED_USER_KEY)
  }

  clearRememberedUser(): void {
    storageManager.removeItem(REMEMBERED_USER_KEY)
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener)
    listener(this.state)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  getState(): AuthState {
    return this.state
  }
}

const authService = new AuthService()
export { authService }