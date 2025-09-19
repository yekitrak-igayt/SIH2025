"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Camera, Save, User, Mail, MapPin, Calendar, Award, Leaf } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Student",
    email: "alex.student@school.edu",
    bio: "Passionate about environmental conservation and sustainable living. Love learning about climate change solutions!",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    level: "Level 12 Eco Warrior",
    points: 2450,
    achievements: 15,
  })

  const handleSave = () => {
    // Here you would typically save to a database
    setIsEditing(false)
    // Show success message
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Leaves */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <Leaf className="h-6 w-6 text-green-400 transform rotate-12" />
          </div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="hover:bg-green-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-green-800">My Profile</h1>
            <p className="text-green-600">Manage your account information and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-32 w-32 border-4 border-green-200">
                    <AvatarImage src="/student-avatar.png" alt="Profile" />
                    <AvatarFallback className="bg-green-100 text-green-700 text-2xl font-bold">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10 bg-green-600 hover:bg-green-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl text-green-800">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <CardDescription className="text-green-600">{profileData.email}</CardDescription>
                <Badge className="bg-green-100 text-green-700 border-green-200 mt-2">
                  <Award className="h-3 w-3 mr-1" />
                  {profileData.level}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-700">Total Points</span>
                  <span className="text-lg font-bold text-green-800">{profileData.points.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm font-medium text-emerald-700">Achievements</span>
                  <span className="text-lg font-bold text-emerald-800">{profileData.achievements}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Calendar className="h-4 w-4" />
                  Joined {profileData.joinDate}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-green-800">Profile Information</CardTitle>
                  <CardDescription>Update your personal information and bio</CardDescription>
                </div>
                <Button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-green-700">
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="border-green-200 focus:border-green-400"
                      />
                    ) : (
                      <div className="p-3 bg-green-50 rounded-md text-green-800">{profileData.firstName}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-green-700">
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="border-green-200 focus:border-green-400"
                      />
                    ) : (
                      <div className="p-3 bg-green-50 rounded-md text-green-800">{profileData.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-green-200 focus:border-green-400"
                    />
                  ) : (
                    <div className="p-3 bg-green-50 rounded-md text-green-800">{profileData.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-green-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-green-200 focus:border-green-400"
                    />
                  ) : (
                    <div className="p-3 bg-green-50 rounded-md text-green-800">{profileData.location}</div>
                  )}
                </div>

                <Separator className="bg-green-200" />

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-green-700">
                    Bio
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="border-green-200 focus:border-green-400 min-h-[100px]"
                      placeholder="Tell us about yourself and your environmental interests..."
                    />
                  ) : (
                    <div className="p-3 bg-green-50 rounded-md text-green-800 min-h-[100px]">{profileData.bio}</div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
