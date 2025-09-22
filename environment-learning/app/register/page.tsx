"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Leaf } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateAccount = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // 1️⃣ Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      })

      if (authError) {
        setErrors({ general: authError.message })
        return
      }

      if (!authData.user) {
        setErrors({ general: "Signup failed, no user returned." })
        return
      }

      // 2️⃣ Insert into profiles table with same UUID
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
          }
        ])

      if (profileError) {
        setErrors({ general: "Failed to save profile data" })
        console.error("Profile insert error:", profileError)
        return
      }

      router.push("/dashboard") // go to dashboard after signup
    } catch (err) {
      console.error(err)
      setErrors({ general: "Something went wrong" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
     <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 relative overflow-hidden">
      {/* Animated Nature Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Clouds */}
        <div className="absolute top-10 left-0 w-20 h-12 bg-white/70 rounded-full animate-drift-cloud"></div>
        <div className="absolute top-16 left-32 w-16 h-8 bg-white/60 rounded-full animate-drift-cloud delay-2000"></div>
        <div className="absolute top-8 right-20 w-24 h-14 bg-white/80 rounded-full animate-drift-cloud-reverse delay-4000"></div>
        <div className="absolute top-20 right-0 w-18 h-10 bg-white/65 rounded-full animate-drift-cloud-reverse delay-1000"></div>

        {/* Sun with rays */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-400 rounded-full animate-pulse-sun">
          <div className="absolute -top-2 left-1/2 w-1 h-6 bg-yellow-400 animate-rotate-ray"></div>
          <div className="absolute -right-2 top-1/2 w-6 h-1 bg-yellow-400 animate-rotate-ray delay-500"></div>
          <div className="absolute -bottom-2 left-1/2 w-1 h-6 bg-yellow-400 animate-rotate-ray delay-1000"></div>
          <div className="absolute -left-2 top-1/2 w-6 h-1 bg-yellow-400 animate-rotate-ray delay-1500"></div>
        </div>

        {/* Flying Insects */}
        <div className="absolute top-1/4 left-1/4 w-2 h-1 bg-yellow-600 rounded-full animate-buzz-bee"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-black rounded-full animate-buzz-fly delay-1000"></div>
        <div className="absolute top-2/5 left-3/5 w-2 h-1 bg-yellow-500 rounded-full animate-buzz-bee delay-2000"></div>
        <div className="absolute top-1/2 right-2/5 w-1 h-1 bg-gray-800 rounded-full animate-buzz-fly delay-3000"></div>

        {/* Fireflies */}
        <div className="absolute top-3/5 left-1/5 w-1 h-1 bg-yellow-300 rounded-full animate-glow-firefly"></div>
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-green-300 rounded-full animate-glow-firefly delay-1500"></div>
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-blue-300 rounded-full animate-glow-firefly delay-3000"></div>

        {/* Falling Petals */}
        <div className="absolute top-0 left-1/6 w-2 h-3 bg-pink-300 rounded-full animate-fall-petal"></div>
        <div className="absolute top-0 left-1/3 w-2 h-3 bg-purple-300 rounded-full animate-fall-petal delay-2000"></div>
        <div className="absolute top-0 right-1/4 w-2 h-3 bg-yellow-300 rounded-full animate-fall-petal delay-4000"></div>
        <div className="absolute top-0 right-1/6 w-2 h-3 bg-orange-300 rounded-full animate-fall-petal delay-1000"></div>

        {/* Mushrooms */}
        <div className="absolute bottom-12 left-1/5 w-6 h-8 bg-red-400 rounded-t-full animate-grow-mushroom">
          <div className="absolute bottom-0 left-1/2 w-2 h-4 bg-white transform -translate-x-1/2"></div>
        </div>
        <div className="absolute bottom-8 right-1/5 w-4 h-6 bg-brown-400 rounded-t-full animate-grow-mushroom delay-2000">
          <div className="absolute bottom-0 left-1/2 w-1 h-3 bg-tan-200 transform -translate-x-1/2"></div>
        </div>

        {/* Dewdrops */}
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-blue-200 rounded-full animate-sparkle-dew"></div>
        <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-sparkle-dew delay-1000"></div>
        <div className="absolute bottom-18 right-1/3 w-2 h-2 bg-blue-100 rounded-full animate-sparkle-dew delay-2000"></div>

        {/* Wind Effect Lines */}
        <div className="absolute top-1/4 left-0 w-32 h-0.5 bg-white/30 animate-wind-line"></div>
        <div className="absolute top-1/3 left-0 w-24 h-0.5 bg-white/20 animate-wind-line delay-1000"></div>
        <div className="absolute top-2/5 left-0 w-28 h-0.5 bg-white/25 animate-wind-line delay-2000"></div>

        {/* More Animals */}
        <div className="absolute bottom-16 left-2/3 w-4 h-3 bg-orange-400 rounded-full animate-scurry-squirrel">
          <div className="absolute -top-1 -right-1 w-3 h-4 bg-orange-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-4 right-1/3 w-8 h-2 bg-green-600 rounded-full animate-slither-snake"></div>
        <div className="absolute bottom-12 left-1/6 w-3 h-2 bg-brown-500 rounded-full animate-hop-frog"></div>

        {/* Ripple Effects */}
        <div className="absolute bottom-1/4 left-1/2 w-8 h-8 border-2 border-blue-300/50 rounded-full animate-ripple"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 border-2 border-cyan-300/40 rounded-full animate-ripple delay-2000"></div>

        {/* Large Trees */}
        <div className="absolute bottom-0 left-10 w-32 h-48 bg-gradient-to-t from-green-800 to-green-600 rounded-t-full animate-sway-slow transform origin-bottom"></div>
        <div className="absolute bottom-0 left-20 w-24 h-40 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full animate-sway-gentle transform origin-bottom delay-1000"></div>
        <div className="absolute bottom-0 right-10 w-28 h-44 bg-gradient-to-t from-green-800 to-green-600 rounded-t-full animate-sway-slow transform origin-bottom delay-2000"></div>
        <div className="absolute bottom-0 right-24 w-20 h-36 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full animate-sway-gentle transform origin-bottom delay-500"></div>

        {/* Tree Trunks */}
        <div className="absolute bottom-0 left-16 w-6 h-20 bg-gradient-to-t from-amber-800 to-amber-600 animate-sway-trunk"></div>
        <div className="absolute bottom-0 left-26 w-4 h-16 bg-gradient-to-t from-amber-700 to-amber-500 animate-sway-trunk delay-1000"></div>
        <div className="absolute bottom-0 right-16 w-5 h-18 bg-gradient-to-t from-amber-800 to-amber-600 animate-sway-trunk delay-2000"></div>
        <div className="absolute bottom-0 right-28 w-3 h-14 bg-gradient-to-t from-amber-700 to-amber-500 animate-sway-trunk delay-500"></div>

        {/* Bushes */}
        <div className="absolute bottom-0 left-0 w-20 h-12 bg-gradient-to-t from-green-600 to-green-400 rounded-full animate-pulse-gentle"></div>
        <div className="absolute bottom-0 left-32 w-16 h-10 bg-gradient-to-t from-green-700 to-green-500 rounded-full animate-pulse-gentle delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-24 h-14 bg-gradient-to-t from-green-600 to-green-400 rounded-full animate-pulse-gentle delay-2000"></div>
        <div className="absolute bottom-0 right-40 w-18 h-8 bg-gradient-to-t from-green-700 to-green-500 rounded-full animate-pulse-gentle delay-1500"></div>

        {/* Animated Flowers */}
        <div className="absolute bottom-16 left-8 w-4 h-4 bg-pink-400 rounded-full animate-bounce-flower"></div>
        <div className="absolute bottom-20 left-12 w-3 h-3 bg-yellow-400 rounded-full animate-bounce-flower delay-500"></div>
        <div className="absolute bottom-18 left-16 w-4 h-4 bg-purple-400 rounded-full animate-bounce-flower delay-1000"></div>
        <div className="absolute bottom-14 right-8 w-4 h-4 bg-pink-500 rounded-full animate-bounce-flower delay-1500"></div>
        <div className="absolute bottom-22 right-12 w-3 h-3 bg-orange-400 rounded-full animate-bounce-flower delay-2000"></div>
        <div className="absolute bottom-16 right-16 w-4 h-4 bg-red-400 rounded-full animate-bounce-flower delay-2500"></div>

        {/* Flower Stems */}
        <div className="absolute bottom-0 left-10 w-1 h-16 bg-green-500 animate-sway-stem"></div>
        <div className="absolute bottom-0 left-14 w-1 h-20 bg-green-500 animate-sway-stem delay-500"></div>
        <div className="absolute bottom-0 left-18 w-1 h-18 bg-green-500 animate-sway-stem delay-1000"></div>
        <div className="absolute bottom-0 right-10 w-1 h-14 bg-green-500 animate-sway-stem delay-1500"></div>
        <div className="absolute bottom-0 right-14 w-1 h-22 bg-green-500 animate-sway-stem delay-2000"></div>
        <div className="absolute bottom-0 right-18 w-1 h-16 bg-green-500 animate-sway-stem delay-2500"></div>

        {/* Flying Birds */}
        <div className="absolute top-20 left-1/4 w-2 h-1 bg-gray-600 rounded-full animate-fly-bird"></div>
        <div className="absolute top-24 left-1/3 w-2 h-1 bg-gray-700 rounded-full animate-fly-bird delay-1000"></div>
        <div className="absolute top-16 right-1/4 w-2 h-1 bg-gray-600 rounded-full animate-fly-bird-reverse delay-2000"></div>
        <div className="absolute top-28 right-1/3 w-2 h-1 bg-gray-700 rounded-full animate-fly-bird-reverse delay-3000"></div>

        {/* Butterflies */}
        <div className="absolute top-1/3 left-1/5 w-3 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-flutter"></div>
        <div className="absolute top-2/5 right-1/5 w-3 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-flutter delay-1500"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-flutter delay-3000"></div>

        {/* Floating Leaves */}
        <div className="absolute top-1/4 left-1/6 w-4 h-3 bg-green-400 rounded-full animate-float-leaf"></div>
        <div className="absolute top-1/3 right-1/6 w-3 h-2 bg-green-500 rounded-full animate-float-leaf delay-2000"></div>
        <div className="absolute top-2/5 left-2/3 w-4 h-3 bg-green-600 rounded-full animate-float-leaf delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-2 bg-green-400 rounded-full animate-float-leaf delay-1000"></div>

        {/* Grass Blades */}
        <div className="absolute bottom-0 left-1/4 w-1 h-8 bg-green-500 animate-sway-grass"></div>
        <div className="absolute bottom-0 left-1/3 w-1 h-6 bg-green-600 animate-sway-grass delay-500"></div>
        <div className="absolute bottom-0 left-2/5 w-1 h-10 bg-green-500 animate-sway-grass delay-1000"></div>
        <div className="absolute bottom-0 right-1/4 w-1 h-7 bg-green-600 animate-sway-grass delay-1500"></div>
        <div className="absolute bottom-0 right-1/3 w-1 h-9 bg-green-500 animate-sway-grass delay-2000"></div>
        <div className="absolute bottom-0 right-2/5 w-1 h-5 bg-green-600 animate-sway-grass delay-2500"></div>

        {/* Small Animals - Rabbits */}
        <div className="absolute bottom-8 left-1/2 w-6 h-4 bg-gray-300 rounded-full animate-hop-rabbit"></div>
        <div className="absolute bottom-6 right-1/2 w-5 h-3 bg-brown-300 rounded-full animate-hop-rabbit delay-3000"></div>
      </div>
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Join TerraLearn</CardTitle>
          <CardDescription className="text-green-600">Create your account and start your eco-learning adventure</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {errors.general && <div className="p-2 bg-red-50 text-red-600 rounded">{errors.general}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-green-700">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-400" : ""}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName" className="text-green-700">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-400" : ""}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-green-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-400" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="text-green-700">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={errors.password ? "border-red-400 pr-10" : "pr-10"}
              />
              <Button type="button" variant="ghost" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4 text-green-600" /> : <Eye className="h-4 w-4 text-green-600" />}
              </Button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-green-700">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={errors.confirmPassword ? "border-red-400 pr-10" : "pr-10"}
              />
              <Button type="button" variant="ghost" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-green-600" /> : <Eye className="h-4 w-4 text-green-600" />}
              </Button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <Button onClick={handleCreateAccount} disabled={isLoading} className="w-full bg-green-600 text-white py-3 mt-2">
            {isLoading ? "Creating Account..." : "🌱 Create Account & Start Learning!"}
          </Button>

          <div className="text-center text-sm text-green-600 mt-2">
            Already have an account? <Link href="/" className="text-green-700 underline">Sign in here!</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  
      <style jsx>{`
        @keyframes sway-slow {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes sway-gentle {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes sway-trunk {
          0%, 100% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
        }
        @keyframes sway-stem {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes sway-grass {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bounce-flower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fly-bird {
          0% { transform: translateX(-20px) translateY(0px); }
          25% { transform: translateX(100px) translateY(-10px); }
          50% { transform: translateX(200px) translateY(0px); }
          75% { transform: translateX(300px) translateY(-5px); }
          100% { transform: translateX(400px) translateY(0px); }
        }
        @keyframes fly-bird-reverse {
          0% { transform: translateX(20px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(-100px) translateY(-8px) rotate(90deg); }
          50% { transform: translateX(-200px) translateY(0px) rotate(180deg); }
          75% { transform: translateX(-100px) translateY(8px) rotate(270deg); }
          100% { transform: translateX(-20px) translateY(0px) rotate(360deg); }
        }
        @keyframes flutter {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(5deg); }
          50% { transform: translateY(-4px) rotate(-3deg); }
          75% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float-leaf {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(90deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
          75% { transform: translateY(-20px) rotate(270deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        @keyframes hop-rabbit {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(20px) translateY(-8px); }
          50% { transform: translateX(40px) translateY(0px); }
          75% { transform: translateX(60px) translateY(-6px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes drift-cloud {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(100vw); }
        }
        @keyframes drift-cloud-reverse {
          0% { transform: translateX(50px); }
          100% { transform: translateX(-100vw); }
        }
        @keyframes pulse-sun {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 0, 0.5); }
          50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 0, 0.8); }
        }
        @keyframes rotate-ray {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes buzz-bee {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(10px) translateY(-5px); }
          50% { transform: translateX(20px) translateY(0px); }
          75% { transform: translateX(10px) translateY(5px); }
        }
        @keyframes buzz-fly {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(15px) translateY(-8px) rotate(90deg); }
          50% { transform: translateX(30px) translateY(0px) rotate(180deg); }
          75% { transform: translateX(15px) translateY(8px) rotate(270deg); }
        }
        @keyframes glow-firefly {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px currentColor; }
        }
        @keyframes fall-petal {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes grow-mushroom {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.1); }
        }
        @keyframes sparkle-dew {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 8px rgba(59, 130, 246, 0.8); }
        }
        @keyframes wind-line {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes scurry-squirrel {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(50px); }
        }
        @keyframes slither-snake {
          0%, 100% { transform: translateX(0px) scaleX(1); }
          50% { transform: translateX(30px) scaleX(1.2); }
        }
        @keyframes hop-frog {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(-10px) scaleY(0.8); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes card-entrance {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
          50% { text-shadow: 0 0 15px rgba(34, 197, 94, 0.6); }
        }
        @keyframes input-focus {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1); }
        }
        @keyframes button-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
        }
        
        .animate-sway-slow { animation: sway-slow 4s ease-in-out infinite; }
        .animate-sway-gentle { animation: sway-gentle 3s ease-in-out infinite; }
        .animate-sway-trunk { animation: sway-trunk 4s ease-in-out infinite; }
        .animate-sway-stem { animation: sway-stem 2s ease-in-out infinite; }
        .animate-sway-grass { animation: sway-grass 1.5s ease-in-out infinite; }
        .animate-bounce-flower { animation: bounce-flower 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 4s ease-in-out infinite; }
        .animate-fly-bird { animation: fly-bird 15s linear infinite; }
        .animate-fly-bird-reverse { animation: fly-bird-reverse 18s linear infinite; }
        .animate-flutter { animation: flutter 3s ease-in-out infinite; }
        .animate-float-leaf { animation: float-leaf 8s ease-in-out infinite; }
        .animate-hop-rabbit { animation: hop-rabbit 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-drift-cloud { animation: drift-cloud 20s linear infinite; }
        .animate-drift-cloud-reverse { animation: drift-cloud-reverse 25s linear infinite; }
        .animate-pulse-sun { animation: pulse-sun 4s ease-in-out infinite; }
        .animate-rotate-ray { animation: rotate-ray 10s linear infinite; }
        .animate-buzz-bee { animation: buzz-bee 3s ease-in-out infinite; }
        .animate-buzz-fly { animation: buzz-fly 2s ease-in-out infinite; }
        .animate-glow-firefly { animation: glow-firefly 2s ease-in-out infinite; }
        .animate-fall-petal { animation: fall-petal 8s linear infinite; }
        .animate-grow-mushroom { animation: grow-mushroom 5s ease-in-out infinite; }
        .animate-sparkle-dew { animation: sparkle-dew 3s ease-in-out infinite; }
        .animate-wind-line { animation: wind-line 6s linear infinite; }
        .animate-scurry-squirrel { animation: scurry-squirrel 4s ease-in-out infinite; }
        .animate-slither-snake { animation: slither-snake 6s ease-in-out infinite; }
        .animate-hop-frog { animation: hop-frog 2s ease-in-out infinite; }
        .animate-ripple { animation: ripple 3s ease-out infinite; }
        .animate-card-entrance { animation: card-entrance 1s ease-out; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        .animate-input-focus { animation: input-focus 0.3s ease-out; }
        .animate-button-pulse { animation: button-pulse 2s infinite; }
      `}</style>
    </div>
  
  )

}