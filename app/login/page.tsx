'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("Attempting to sign in with:", email, password) 
      
      // Correct provider name 'credentials'
      const result = await signIn('credentials', {
        redirect: false, // Don't automatically redirect
        email,
        password,
        callbackUrl: '/dashboard', // Define the desired redirect URL after login
      })
      
      console.log("SignIn Result:", result) // Debug log
    
     
if (result?.error) {
  console.error('Error:', result.error);
  setError(result.error);
} else if (result?.ok) {
  console.log('Sign-in successful:', result);
  router.push(result.url || '/dashboard');
} else {
  console.error('Unexpected error:', result);
  setError('Unexpected error occurred.');
}
    } catch (error) {
      setError('An error occurred. Please try again.')
      console.error("Error during login:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
            Sign in to your account
          </h2>
          <p className="text-center text-sm text-gray-500">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4"> {/* Added space-y-4 for space between inputs */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ease-in-out duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
