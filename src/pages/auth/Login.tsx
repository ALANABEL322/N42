import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { authService } from '../../lib/authServices'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  userType: z.enum(['admin', 'user'])
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: 'user' as const,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await authService.login(data.username, data.password, data.userType, false)
      
      if (result.success) {
        const userType = result.userType
        navigate(userType === 'admin' ? '/admin' : '/user')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6EEEE] flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#DB6A00] ">Log in to your account</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register('username')}
              className="mt-2"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="userType">User Type</Label>
            <Select
              onValueChange={(value) => setValue('userType', value as 'admin' | 'user')}
              defaultValue="user"
              value={watch('userType')}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userType.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#DB6A00] hover:bg-[#DB6A00]/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  )
}