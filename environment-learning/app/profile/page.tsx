"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // Get session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !session?.user) {
          setError("User not logged in")
          setLoading(false)
          return
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          setError("Failed to fetch profile data")
        } else {
          setProfile(profileData)
        }
      } catch (err) {
        console.error(err)
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login") // redirect to login after logout
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-green-50">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-bounce">
            <Leaf className="w-8 h-8 text-white animate-spin-slow" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Your Profile</CardTitle>
          <CardDescription className="text-green-600">View your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>

          <Button onClick={handleLogout} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
