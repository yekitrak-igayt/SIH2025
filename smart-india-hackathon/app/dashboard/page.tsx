"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Trophy,
  Users,
  Target,
  BookOpen,
  Award,
  Globe,
  Recycle,
  Play,
  Star,
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    question: "What percentage of the Earth's water is freshwater?",
    options: ["3%", "10%", "25%", "50%"],
    correct: 0,
    points: 10,
  },
  {
    id: 2,
    question: "Which gas is primarily responsible for global warming?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2,
    points: 10,
  },
  {
    id: 3,
    question: "How long does it take for a plastic bottle to decompose?",
    options: ["10 years", "50 years", "100 years", "450+ years"],
    correct: 3,
    points: 15,
  },
  {
    id: 4,
    question: "What is the most renewable source of energy?",
    options: ["Coal", "Solar", "Natural Gas", "Nuclear"],
    correct: 1,
    points: 10,
  },
  {
    id: 5,
    question: "Which ecosystem produces the most oxygen?",
    options: ["Rainforests", "Oceans", "Grasslands", "Deserts"],
    correct: 1,
    points: 15,
  },
]

const leaderboardData = [
  { name: "Arjun Sharma", points: 2450, school: "Delhi Public School", badge: "🌟 Eco Champion" },
  { name: "Priya Patel", points: 2380, school: "Kendriya Vidyalaya", badge: "🌱 Green Guardian" },
  { name: "Rahul Kumar", points: 2290, school: "St. Xavier's School", badge: "🌿 Nature Protector" },
  { name: "Sneha Singh", points: 2150, school: "DAV Public School", badge: "♻️ Recycling Hero" },
  { name: "Vikram Reddy", points: 2080, school: "Narayana School", badge: "🌍 Planet Saver" },
]

const flashcardsData = [
  {
    id: 1,
    title: "Floods",
    disaster: "Heavy rainfall causing water overflow in rivers, lakes, and urban areas",
    prevention:
      "Build proper drainage systems, avoid construction in flood-prone areas, plant trees to prevent soil erosion, and create early warning systems",
    icon: "💧",
  },
  {
    id: 2,
    title: "Earthquakes",
    disaster: "Ground shaking caused by tectonic plate movements beneath Earth's surface",
    prevention:
      "Construct earthquake-resistant buildings, avoid building on fault lines, conduct regular drills, and keep emergency kits ready",
    icon: "🌍",
  },
  {
    id: 3,
    title: "Droughts",
    disaster: "Extended periods of water scarcity affecting agriculture and daily life",
    prevention:
      "Practice water conservation, use drought-resistant crops, build water storage systems, and implement rainwater harvesting",
    icon: "🏜️",
  },
  {
    id: 4,
    title: "Forest Fires",
    disaster: "Uncontrolled fires spreading through forests and grasslands",
    prevention:
      "Create firebreaks, remove dry vegetation, ban open fires during dry seasons, and maintain forest monitoring systems",
    icon: "🔥",
  },
  {
    id: 5,
    title: "Cyclones",
    disaster: "Powerful rotating storms with high winds and heavy rainfall",
    prevention:
      "Build storm shelters, strengthen coastal defenses, plant mangrove forests, and develop evacuation plans",
    icon: "🌪️",
  },
  {
    id: 6,
    title: "Landslides",
    disaster: "Downward movement of rock, soil, and debris on slopes",
    prevention:
      "Avoid construction on steep slopes, plant vegetation to stabilize soil, build retaining walls, and monitor slope stability",
    icon: "⛰️",
  },
  {
    id: 7,
    title: "Air Pollution",
    disaster: "Contamination of air with harmful substances affecting health and environment",
    prevention:
      "Use public transport, plant trees, reduce industrial emissions, switch to renewable energy, and avoid burning waste",
    icon: "💨",
  },
  {
    id: 8,
    title: "Water Pollution",
    disaster: "Contamination of water bodies with chemicals, waste, and harmful substances",
    prevention:
      "Treat sewage properly, avoid dumping waste in water bodies, use eco-friendly products, and implement strict industrial regulations",
    icon: "🌊",
  },
  {
    id: 9,
    title: "Soil Erosion",
    disaster: "Loss of fertile topsoil due to wind, water, and human activities",
    prevention:
      "Practice contour farming, plant cover crops, build terraces, avoid overgrazing, and maintain forest cover",
    icon: "🌱",
  },
  {
    id: 10,
    title: "Deforestation",
    disaster: "Large-scale removal of forests leading to habitat loss and climate change",
    prevention:
      "Promote reforestation, use sustainable logging practices, protect forest reserves, and support eco-friendly alternatives",
    icon: "🌳",
  },
  {
    id: 11,
    title: "Acid Rain",
    disaster: "Precipitation with high acidity levels damaging plants, buildings, and water bodies",
    prevention:
      "Reduce sulfur dioxide emissions, use clean energy sources, implement emission controls in industries, and promote electric vehicles",
    icon: "☔",
  },
  {
    id: 12,
    title: "Ozone Depletion",
    disaster: "Thinning of the ozone layer allowing harmful UV radiation to reach Earth",
    prevention:
      "Ban ozone-depleting substances, use ozone-friendly alternatives, support international protocols, and raise awareness",
    icon: "☀️",
  },
  {
    id: 13,
    title: "Global Warming",
    disaster: "Increase in Earth's average temperature due to greenhouse gas emissions",
    prevention:
      "Reduce carbon footprint, use renewable energy, improve energy efficiency, plant trees, and adopt sustainable practices",
    icon: "🌡️",
  },
  {
    id: 14,
    title: "Plastic Pollution",
    disaster: "Accumulation of plastic waste in environment harming wildlife and ecosystems",
    prevention:
      "Reduce single-use plastics, recycle properly, use biodegradable alternatives, support plastic bans, and clean up campaigns",
    icon: "♻️",
  },
  {
    id: 15,
    title: "Noise Pollution",
    disaster: "Excessive noise levels affecting human health and wildlife behavior",
    prevention:
      "Use sound barriers, regulate vehicle emissions, limit construction hours, plant trees as sound buffers, and enforce noise limits",
    icon: "🔊",
  },
]

export default function HomePage() {
  const [userPoints, setUserPoints] = useState(1850)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState<number[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const question = quizQuestions[currentQuiz]
    const isCorrect = selectedAnswer === question.correct

    if (isCorrect) {
      setUserPoints((prev) => prev + question.points)
    }

    setShowResult(true)

    setTimeout(() => {
      setQuizCompleted((prev) => [...prev, question.id])
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz((prev) => prev + 1)
      }
      setSelectedAnswer(null)
      setShowResult(false)
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizCompleted([])
  }

  const nextFlashcard = () => {
    setCurrentFlashcard((prev) => (prev + 1) % flashcardsData.length)
    setIsFlipped(false)
  }

  const prevFlashcard = () => {
    setCurrentFlashcard((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length)
    setIsFlipped(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const currentQuestion = quizQuestions[currentQuiz]
  const isQuizComplete = quizCompleted.length === quizQuestions.length

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-foreground">EcoLearn</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setShowQuiz(!showQuiz)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Quiz
            </button>
            <button
              onClick={() => setShowFlashcards(!showFlashcards)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Flashcards
            </button>
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboard
            </button>
            <a href="#games" className="text-muted-foreground hover:text-foreground transition-colors">
              Games
            </a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground transition-colors">
              Impact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-800">{userPoints} Points</span>
            </div>
            <Button className="bg-green-600 text-white hover:bg-green-700">Join Challenge</Button>
          </div>
        </div>
      </nav>

      {showQuiz && (
        <section className="py-8 px-4 bg-green-50/30">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-green-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-800 flex items-center justify-center gap-2">
                  <Brain className="h-6 w-6" />
                  Environmental Quiz Challenge
                </CardTitle>
                <CardDescription>Test your environmental knowledge and earn eco-points!</CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    Question {currentQuiz + 1} of {quizQuestions.length}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">
                    Completed: {quizCompleted.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {!isQuizComplete ? (
                  <div className="space-y-6">
                    <Progress value={(quizCompleted.length / quizQuestions.length) * 100} className="w-full" />

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-green-800">{currentQuestion.question}</h3>
                      <div className="grid gap-3">
                        {currentQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            className={`p-3 text-left rounded-lg border-2 transition-all ${
                              selectedAnswer === index
                                ? "border-green-500 bg-green-100"
                                : "border-gray-200 bg-white hover:border-green-300"
                            } ${showResult && index === currentQuestion.correct ? "border-green-500 bg-green-100" : ""}
                            ${showResult && selectedAnswer === index && index !== currentQuestion.correct ? "border-red-500 bg-red-100" : ""}`}
                          >
                            {option}
                            {showResult && index === currentQuestion.correct && (
                              <CheckCircle className="inline ml-2 h-5 w-5 text-green-600" />
                            )}
                            {showResult && selectedAnswer === index && index !== currentQuestion.correct && (
                              <XCircle className="inline ml-2 h-5 w-5 text-red-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {showResult && (
                      <div
                        className={`p-4 rounded-lg text-center ${
                          selectedAnswer === currentQuestion.correct
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedAnswer === currentQuestion.correct ? (
                          <div>
                            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-semibold">Correct! +{currentQuestion.points} points</p>
                          </div>
                        ) : (
                          <div>
                            <XCircle className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-semibold">
                              Incorrect. The correct answer was: {currentQuestion.options[currentQuestion.correct]}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null || showResult}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h3 className="text-2xl font-bold text-green-800">Quiz Completed!</h3>
                    <p className="text-muted-foreground">
                      Great job! You've completed all questions and earned valuable eco-points.
                    </p>
                    <Button onClick={resetQuiz} className="bg-green-600 text-white hover:bg-green-700">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {showFlashcards && (
        <section className="py-8 px-4 bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-emerald-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-emerald-800 flex items-center justify-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Environmental Disaster Flashcards
                </CardTitle>
                <CardDescription>Learn about environmental disasters and their prevention methods</CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700">
                    Card {currentFlashcard + 1} of {flashcardsData.length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    {flashcardsData[currentFlashcard].icon} {flashcardsData[currentFlashcard].title}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto">
                  <div
                    className={`relative h-80 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                    onClick={flipCard}
                  >
                    {/* Front of card */}
                    <div
                      className={`absolute inset-0 backface-hidden ${isFlipped ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                    >
                      <div className="h-full bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl border-2 border-emerald-200 p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4">{flashcardsData[currentFlashcard].icon}</div>
                        <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                          {flashcardsData[currentFlashcard].title}
                        </h3>
                        <p className="text-emerald-700 text-lg leading-relaxed">
                          {flashcardsData[currentFlashcard].disaster}
                        </p>
                        <div className="mt-6 text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                          Click to see prevention methods
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                    >
                      <div className="h-full bg-gradient-to-br from-green-100 to-teal-100 rounded-xl border-2 border-green-200 p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="text-xl font-bold text-green-800 mb-4">Prevention Methods</h3>
                        <p className="text-green-700 text-base leading-relaxed">
                          {flashcardsData[currentFlashcard].prevention}
                        </p>
                        <div className="mt-6 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full">
                          Click to flip back
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={prevFlashcard}
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                    >
                      ← Previous
                    </Button>

                    <div className="flex gap-2">
                      {flashcardsData.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentFlashcard ? "bg-emerald-600" : "bg-emerald-200"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={nextFlashcard}
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                    >
                      Next →
                    </Button>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                      Study all {flashcardsData.length} disaster types to become an environmental expert!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {showLeaderboard && (
        <section className="py-8 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-yellow-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-yellow-800 flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Eco Champions Leaderboard
                </CardTitle>
                <CardDescription>Top environmental champions across all schools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                        index === 0
                          ? "border-yellow-300 bg-yellow-50"
                          : index === 1
                            ? "border-gray-300 bg-gray-50"
                            : index === 2
                              ? "border-orange-300 bg-orange-50"
                              : "border-green-200 bg-green-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                                ? "bg-gray-500 text-white"
                                : index === 2
                                  ? "bg-orange-500 text-white"
                                  : "bg-green-500 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.school}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{user.points}</div>
                        <Badge variant="outline" className="text-xs">
                          {user.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  <div className="border-t-2 border-green-200 pt-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border-2 border-green-400 bg-green-100">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                          6
                        </div>
                        <div>
                          <h4 className="font-semibold">You</h4>
                          <p className="text-sm text-muted-foreground">Your School</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{userPoints}</div>
                        <Badge variant="outline" className="text-xs bg-green-200 text-green-800">
                          🌱 Rising Star
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-green-50/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Gamified Environmental Education for the
            <span className="text-green-600"> Future Generation</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Empowering students to learn sustainability through interactive challenges, real-world tasks, and community
            competitions. Building eco-conscious leaders for tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 text-white hover:bg-green-700" onClick={() => setShowQuiz(true)}>
              <Brain className="mr-2 h-5 w-5" />
              Take Quiz Challenge
            </Button>
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => setShowFlashcards(true)}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Study Flashcards
            </Button>
            <Button
              size="lg"
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => setShowLeaderboard(true)}
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Games Section - NEW MAIN ATTRACTION */}
      <section id="games" className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Main Attraction</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">Interactive Eco Games</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Learn environmental concepts through engaging games that make sustainability fun and memorable. Three
              exciting games coming soon to transform how you learn about our planet!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-green-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Recycle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Eco Recycler</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Coming Soon
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Sort waste correctly, learn recycling processes, and build sustainable cities in this engaging
                  simulation game.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="bg-emerald-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-emerald-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Forest Guardian</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Coming Soon
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Protect ecosystems, plant trees, and manage wildlife habitats while learning about biodiversity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="bg-teal-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-10 w-10 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Climate Hero</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Coming Soon
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Battle climate change through strategic decisions, renewable energy, and sustainable practices.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
            >
              <Play className="mr-2 h-5 w-5" />
              Get Notified When Games Launch
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="about" className="py-16 px-4 bg-green-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Challenge We're Solving</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Environmental education in India remains largely theoretical, lacking engagement and real-world
              application. Students need innovative tools to develop sustainable habits and environmental literacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-card">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Theoretical Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Traditional textbook-based environmental education lacks practical application and fails to inspire
                  action.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-card">
              <CardHeader>
                <Users className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Low Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Students show minimal participation in environmental initiatives due to lack of motivation and
                  awareness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-card">
              <CardHeader>
                <Target className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Missing Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Without practical tools, we risk raising a generation unaware of sustainability challenges and
                  solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solution: EcoLearn Platform</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              A comprehensive gamified platform that transforms environmental education through interactive learning,
              real-world challenges, and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-200 bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Gamified Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Interactive lessons, quizzes, and challenges with eco-points and digital badges
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Recycle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Real-World Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Tree planting, waste segregation, and community environmental projects
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle className="text-lg">School Competitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Inter-school challenges and leaderboards to foster healthy competition
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Recognition System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Digital certificates, badges, and rewards for sustainable practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 px-4 bg-green-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expected Impact</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our platform creates lasting behavioral change in environmental consciousness through engaging,
              interactive learning experiences that inspire real-world action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Student Engagement</h3>
                  <p className="text-muted-foreground text-sm">
                    70% increase in environmental awareness and participation through gamified learning
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community Impact</h3>
                  <p className="text-muted-foreground text-sm">
                    Ripple effect across families and communities through student-led initiatives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sustainable Future</h3>
                  <p className="text-muted-foreground text-sm">
                    Building eco-conscious leaders for India's sustainable development goals
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-green-200 bg-card p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Key Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">70%</div>
                  <p className="text-sm text-muted-foreground">Increase in retention with gamified learning</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">1M+</div>
                  <p className="text-sm text-muted-foreground">Students to be impacted nationwide</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">500+</div>
                  <p className="text-sm text-muted-foreground">Schools ready for pilot program</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Collaborating with key stakeholders to create a comprehensive environmental education ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-card text-center p-6">
              <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Educational Institutions</CardTitle>
              <CardDescription>
                Schools, colleges, teachers, and eco-club coordinators implementing sustainable curricula
              </CardDescription>
            </Card>

            <Card className="border-green-200 bg-card text-center p-6">
              <Globe className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Environmental Organizations</CardTitle>
              <CardDescription>
                NGOs and government departments driving environmental policy and awareness initiatives
              </CardDescription>
            </Card>

            <Card className="border-green-200 bg-card text-center p-6">
              <Users className="h-16 w-16 text-teal-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Student Community</CardTitle>
              <CardDescription>
                Young changemakers from schools and colleges across India leading environmental action
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Environmental Revolution</h2>
          <p className="text-lg mb-8 opacity-90 text-pretty">
            Be part of the future of environmental education. Together, we can create a generation of eco-conscious
            leaders through engaging games and interactive learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 text-white hover:bg-green-700" onClick={() => setShowQuiz(true)}>
              <Brain className="mr-2 h-5 w-5" />
              Take Quiz Challenge
            </Button>
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => setShowFlashcards(true)}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Study Flashcards
            </Button>
            <Button
              size="lg"
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => setShowLeaderboard(true)}
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-green-50/30 border-t border-green-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold">EcoLearn</span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>Environmental Education Platform</p>
              <p className="mt-1">Empowering sustainable futures through gamified learning</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
