"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Leaf, TreePine, Flower, Bird } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating leaves */}
        <div className="absolute top-20 left-10 animate-float">
          <Leaf className="w-8 h-8 text-green-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <Leaf className="w-6 h-6 text-emerald-400 opacity-50" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: "2s" }}>
          <Leaf className="w-10 h-10 text-green-500 opacity-40" />
        </div>

        {/* Swaying trees */}
        <div className="absolute bottom-0 left-0 animate-sway">
          <TreePine className="w-24 h-32 text-green-600 opacity-30" />
        </div>
        <div className="absolute bottom-0 right-0 animate-sway" style={{ animationDelay: "1.5s" }}>
          <TreePine className="w-20 h-28 text-emerald-600 opacity-25" />
        </div>

        {/* Floating flowers */}
        <div className="absolute top-60 left-1/4 animate-bounce-gentle">
          <Flower className="w-6 h-6 text-yellow-400 opacity-70" />
        </div>
        <div className="absolute top-80 right-1/3 animate-bounce-gentle" style={{ animationDelay: "0.5s" }}>
          <Flower className="w-5 h-5 text-pink-400 opacity-60" />
        </div>

        {/* Flying birds */}
        <div className="absolute top-32 right-1/4 animate-flutter">
          <Bird className="w-5 h-5 text-blue-400 opacity-50" />
        </div>
        <div className="absolute top-24 left-1/3 animate-flutter" style={{ animationDelay: "3s" }}>
          <Bird className="w-4 h-4 text-teal-400 opacity-40" />
        </div>

        {/* Decorative bushes */}
        <div className="absolute bottom-10 left-1/4 w-16 h-8 bg-green-400 opacity-20 rounded-full animate-sway"></div>
        <div
          className="absolute bottom-5 right-1/4 w-12 h-6 bg-emerald-400 opacity-15 rounded-full animate-sway"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-8 left-1/2 w-20 h-10 bg-green-500 opacity-10 rounded-full animate-sway"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-2 border-green-200 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-bounce-gentle">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to continue your eco-learning journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border focus:border-accent focus:ring-accent transition-all duration-200 hover:border-green-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input border-border focus:border-accent focus:ring-accent transition-all duration-200 hover:border-green-300 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-accent" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:text-accent transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-primary hover:bg-green-700 text-primary-foreground font-semibold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                size="lg"
              >
                Sign In
              </Button>

              <Link href="/register" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full border-2 border-green-200 hover:bg-green-50 text-green-700 font-semibold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
                  size="lg"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:text-accent transition-colors font-medium">
                <Button variant="link" className="p-0 h-auto font-medium text-primary hover:text-accent">
                  Create one here
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-100/50 to-transparent pointer-events-none"></div>
    </div>
  )
}
