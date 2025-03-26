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

class StorageManager {
  private static instance: StorageManager
  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager()
    }
    return StorageManager.instance
  }

  private getStorage(): Storage | null {
    return typeof window !== "undefined" ? localStorage : null
  }

  getItem(key: string): string | null {
    const storage = this.getStorage()
    return storage ? storage.getItem(key) : null
  }

  setItem(key: string, value: string): void {
    const storage = this.getStorage()
    if (storage) {
      storage.setItem(key, value)
    }
  }

  removeItem(key: string): void {
    const storage = this.getStorage()
    if (storage) {
      storage.removeItem(key)
    }
  }

  saveUser(user: User): void {
    const storage = this.getStorage()
    if (storage) {
      storage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, user, error: undefined }))
    }
  }
}

class AuthService {
  private state: AuthState
  private listeners: ((state: AuthState) => void)[] = []
  private storage: StorageManager

  constructor() {
    this.storage = StorageManager.getInstance()
    this.state = this.loadInitialState()
    this.setupWindowListener()
  }

  private loadInitialState(): AuthState {
    try {
      const savedAuth = this.storage.getItem(AUTH_KEY)
      if (savedAuth) {
        return JSON.parse(savedAuth)
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
          this.state = this.loadInitialState()
          this.notifyListeners()
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
        this.storage.saveUser(mockResponse.user)
        
        this.state = { 
          isAuthenticated: true, 
          user: mockResponse.user,
          error: undefined
        }
        
        this.dispatchAuthChange()
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
    this.state = { isAuthenticated: false, user: null, error: undefined }
    this.storage.removeItem(AUTH_KEY)
    this.dispatchAuthChange()
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
    this.storage.setItem(REMEMBERED_USER_KEY, username)
  }

  getRememberedUser(): string | null {
    return this.storage.getItem(REMEMBERED_USER_KEY)
  }

  clearRememberedUser(): void {
    this.storage.removeItem(REMEMBERED_USER_KEY)
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener)
    listener(this.state)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  getState(): AuthState {
    return {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      error: this.state.error
    }
  }
}

const authService = new AuthService()
export { authService }