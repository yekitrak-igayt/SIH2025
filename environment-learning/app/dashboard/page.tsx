"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Coins,
  User,
  LogOut,
  Gamepad2,
  BarChart3,
  Home,
} from "lucide-react";
import Link from "next/link";

const quizQuestions = [
  {
    id: 1,
    question: "What percentage of the Earth's surface is covered by oceans?",
    options: ["61%", "71%", "81%", "91%"],
    correct: 1,
    points: 20,
  },
  {
    id: 2,
    question: "Which greenhouse gas has the highest warming potential?",
    options: [
      "Carbon Dioxide",
      "Methane",
      "Nitrous Oxide",
      "Fluorinated Gases",
    ],
    correct: 3,
    points: 20,
  },
  {
    id: 3,
    question:
      "How many trees does it take to produce enough oxygen for one person per year?",
    options: ["1 tree", "2 trees", "5 trees", "10 trees"],
    correct: 1,
    points: 20,
  },
  {
    id: 4,
    question: "What is the largest source of plastic pollution in oceans?",
    options: [
      "Plastic bags",
      "Fishing nets",
      "Plastic bottles",
      "Food packaging",
    ],
    correct: 1,
    points: 20,
  },
  {
    id: 5,
    question:
      "Which renewable energy source generates the most electricity globally?",
    options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
    correct: 2,
    points: 20,
  },
  {
    id: 6,
    question:
      "What percentage of global carbon emissions come from transportation?",
    options: ["14%", "24%", "34%", "44%"],
    correct: 0,
    points: 20,
  },
  {
    id: 7,
    question: "How much of the world's freshwater is used for agriculture?",
    options: ["50%", "60%", "70%", "80%"],
    correct: 2,
    points: 20,
  },
  {
    id: 8,
    question: "Which country produces the most renewable energy?",
    options: ["United States", "Germany", "China", "Brazil"],
    correct: 2,
    points: 20,
  },
  {
    id: 9,
    question: "What is the main cause of coral reef bleaching?",
    options: [
      "Ocean acidification",
      "Rising sea temperatures",
      "Pollution",
      "Overfishing",
    ],
    correct: 1,
    points: 20,
  },
  {
    id: 10,
    question: "How long does it take for an aluminum can to decompose?",
    options: ["50 years", "100 years", "200 years", "500+ years"],
    correct: 3,
    points: 20,
  },
  {
    id: 11,
    question: "Which ecosystem stores the most carbon per hectare?",
    options: [
      "Tropical rainforests",
      "Peatlands",
      "Grasslands",
      "Temperate forests",
    ],
    correct: 1,
    points: 20,
  },
  {
    id: 12,
    question: "What percentage of global electricity comes from fossil fuels?",
    options: ["45%", "55%", "65%", "75%"],
    correct: 2,
    points: 20,
  },
  {
    id: 13,
    question: "Which activity produces the most methane emissions?",
    options: ["Transportation", "Agriculture", "Industry", "Energy production"],
    correct: 1,
    points: 20,
  },
  {
    id: 14,
    question: "How much of the Amazon rainforest has been deforested?",
    options: ["10%", "17%", "25%", "33%"],
    correct: 1,
    points: 20,
  },
  {
    id: 15,
    question:
      "What is the most effective way to reduce personal carbon footprint?",
    options: [
      "Recycling more",
      "Using LED bulbs",
      "Reducing meat consumption",
      "Taking shorter showers",
    ],
    correct: 2,
    points: 20,
  },
];

const leaderboardData = [
  {
    name: "Rishank Semalti",
    points: 2450,
    badge: "🌟 Eco Champion",
  },
  {
    name: "Priya Patel",
    points: 2380,
    badge: "🌱 Green Guardian",
  },
  {
    name: "Rahul Kumar",
    points: 2290,
    badge: "🌿 Nature Protector",
  },
  {
    name: "Sneha Singh",
    points: 2150,
    badge: "♻️ Recycling Hero",
  },
  {
    name: "Vikram Reddy",
    points: 2080,
    badge: "🌍 Planet Saver",
  },
];

const flashcardsData = [
  {
    id: 1,
    title: "Drought",
    disaster:
      "Extended periods of abnormally low rainfall leading to water scarcity and crop failure",
    prevention:
      "• Implement water conservation techniques\n• Build rainwater harvesting systems\n• Use drought-resistant crop varieties\n• Create water storage reservoirs\n• Develop efficient irrigation systems\n• Monitor weather patterns for early warning",
    icon: "☀️",
  },
  {
    id: 2,
    title: "Floods",
    disaster:
      "Overflow of water onto normally dry land causing property damage and displacement",
    prevention:
      "• Build flood barriers and levees\n• Create natural floodplains and wetlands\n• Improve drainage systems in urban areas\n• Implement early warning systems\n• Avoid construction in flood-prone areas\n• Plant vegetation to absorb excess water",
    icon: "🌊",
  },
  {
    id: 3,
    title: "Hurricanes",
    disaster:
      "Powerful tropical storms with high winds and heavy rainfall causing widespread destruction",
    prevention:
      "• Build hurricane-resistant structures\n• Develop evacuation plans and routes\n• Install storm shutters and reinforcements\n• Create emergency supply kits\n• Monitor weather forecasts closely\n• Strengthen building codes in coastal areas",
    icon: "🌀",
  },
  {
    id: 4,
    title: "Wildfires",
    disaster:
      "Uncontrolled fires spreading rapidly through vegetation and threatening communities",
    prevention:
      "• Create firebreaks and defensible spaces\n• Remove dry vegetation and debris\n• Use fire-resistant building materials\n• Implement controlled burning practices\n• Install early detection systems\n• Educate communities about fire safety",
    icon: "🔥",
  },
  {
    id: 5,
    title: "Earthquakes",
    disaster:
      "Sudden ground shaking caused by tectonic plate movement leading to structural collapse",
    prevention:
      "• Build earthquake-resistant structures\n• Secure heavy furniture and appliances\n• Develop emergency response plans\n• Conduct regular earthquake drills\n• Retrofit older buildings for safety\n• Create emergency supply kits",
    icon: "🏗️",
  },
  {
    id: 6,
    title: "Tsunamis",
    disaster:
      "Large ocean waves caused by underwater earthquakes threatening coastal communities",
    prevention:
      "• Install tsunami warning systems\n• Build sea walls and barriers\n• Create evacuation routes to higher ground\n• Educate coastal communities about risks\n• Develop early warning networks\n• Restrict development in tsunami zones",
    icon: "🌊",
  },
  {
    id: 7,
    title: "Landslides",
    disaster:
      "Movement of rock, earth, or debris down slopes threatening lives and property",
    prevention:
      "• Stabilize slopes with retaining walls\n• Plant vegetation to prevent soil erosion\n• Improve drainage on hillsides\n• Monitor slope stability regularly\n• Avoid construction on unstable slopes\n• Install early warning systems",
    icon: "⛰️",
  },
  {
    id: 8,
    title: "Tornadoes",
    disaster:
      "Violently rotating columns of air causing severe damage along their path",
    prevention:
      "• Build storm shelters and safe rooms\n• Install weather monitoring systems\n• Develop tornado emergency plans\n• Strengthen building construction standards\n• Create community warning systems\n• Conduct regular tornado drills",
    icon: "🌪️",
  },
  {
    id: 9,
    title: "Volcanic Eruptions",
    disaster:
      "Explosive release of magma, ash, and gases from volcanoes affecting large areas",
    prevention:
      "• Monitor volcanic activity continuously\n• Create evacuation plans for nearby areas\n• Build ash-resistant structures\n• Develop air filtration systems\n• Establish exclusion zones around volcanoes\n• Educate communities about volcanic hazards",
    icon: "🌋",
  },
  {
    id: 10,
    title: "Heatwaves",
    disaster:
      "Prolonged periods of excessively hot weather causing health risks and infrastructure stress",
    prevention:
      "• Create cooling centers in communities\n• Plant trees for natural shade and cooling\n• Improve building insulation and ventilation\n• Develop heat emergency response plans\n• Install reflective roofing materials\n• Educate about heat-related health risks",
    icon: "🌡️",
  },
  {
    id: 11,
    title: "Blizzards",
    disaster:
      "Severe snowstorms with high winds and heavy snowfall disrupting transportation and power",
    prevention:
      "• Maintain emergency heating systems\n• Stock food and water supplies\n• Keep snow removal equipment ready\n• Insulate pipes to prevent freezing\n• Install backup power generators\n• Create winter emergency kits",
    icon: "❄️",
  },
  {
    id: 12,
    title: "Ice Storms",
    disaster:
      "Freezing rain creating ice accumulation that damages power lines and trees",
    prevention:
      "• Trim trees near power lines regularly\n• Install underground power cables\n• Use ice-resistant building materials\n• Maintain backup heating sources\n• Create emergency communication plans\n• Stock de-icing materials and supplies",
    icon: "🧊",
  },
  {
    id: 13,
    title: "Dust Storms",
    disaster:
      "Large clouds of dust and sand reducing visibility and causing respiratory problems",
    prevention:
      "• Plant vegetation to prevent soil erosion\n• Use sustainable farming practices\n• Create windbreaks with trees and shrubs\n• Implement dust suppression techniques\n• Monitor air quality regularly\n• Develop respiratory protection protocols",
    icon: "💨",
  },
  {
    id: 14,
    title: "Avalanches",
    disaster:
      "Rapid flow of snow down mountainsides threatening skiers and mountain communities",
    prevention:
      "• Install avalanche barriers and deflectors\n• Monitor snow conditions and weather\n• Create avalanche warning systems\n• Educate about avalanche safety\n• Use controlled explosives for prevention\n• Establish safe travel routes",
    icon: "🏔️",
  },
  {
    id: 15,
    title: "Coastal Erosion",
    disaster:
      "Gradual wearing away of coastlines threatening coastal communities and infrastructure",
    prevention:
      "• Build sea walls and breakwaters\n• Restore natural coastal barriers\n• Limit coastal development\n• Use beach nourishment techniques\n• Plant coastal vegetation\n• Implement managed retreat strategies",
    icon: "🏖️",
  },
];

export default function HomePage() {
  const [userPoints, setUserPoints] = useState(1250);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleHomeClick = () => {
    setShowQuiz(false);
    setShowFlashcards(false);
    setShowLeaderboard(false);
    // Reset to dashboard view
  };

  const handleQuizClick = () => {
    setShowFlashcards(false);
    setShowLeaderboard(false);
    setShowQuiz(true);
    // Smooth scroll to quiz section after a brief delay to ensure it's rendered
    setTimeout(() => {
      document.getElementById("quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleFlashcardsClick = () => {
    setShowQuiz(false);
    setShowLeaderboard(false);
    setShowFlashcards(true);
    // Smooth scroll to flashcards section after a brief delay to ensure it's rendered
    setTimeout(() => {
      document.getElementById("flashcards")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleLeaderboardClick = () => {
    setShowQuiz(false);
    setShowFlashcards(false);
    setShowLeaderboard(true);
    // Smooth scroll to leaderboard section after a brief delay to ensure it's rendered
    setTimeout(() => {
      document.getElementById("leaderboard")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const question = quizQuestions[currentQuiz];
    const isCorrect = selectedAnswer === question.correct;

    if (isCorrect) {
      setUserPoints((prev) => prev + question.points);
    }

    setShowResult(true);

    setTimeout(() => {
      setQuizCompleted((prev) => [...prev, question.id]);
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz((prev) => prev + 1);
      }
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted([]);
  };

  const nextFlashcard = () => {
    setCurrentFlashcard((prev) => (prev + 1) % flashcardsData.length);
    setIsFlipped(false);
  };

  const prevFlashcard = () => {
    setCurrentFlashcard(
      (prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length
    );
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const currentQuestion = quizQuestions[currentQuiz];
  const isQuizComplete = quizCompleted.length === quizQuestions.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 hover:bg-green-50 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <Home className="h-8 w-8 text-green-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold text-foreground">
              TerraLearn
            </span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            {[
              { name: "Quiz", icon: Brain, action: handleQuizClick },
              {
                name: "Flashcards",
                icon: BookOpen,
                action: handleFlashcardsClick,
              },
              {
                name: "Leaderboard",
                icon: Trophy,
                action: handleLeaderboardClick,
              },
              {
                name: "Game",
                icon: Gamepad2,
                action: () =>
                  document
                    .getElementById("games")
                    ?.scrollIntoView({ behavior: "smooth" }),
              },
              {
                name: "Impact",
                icon: BarChart3,
                action: () =>
                  document
                    .getElementById("impact")
                    ?.scrollIntoView({ behavior: "smooth" }),
              },
            ].map((item, index) => (
              <button
                key={item.name}
                onClick={item.action}
                className="group relative px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-green-50 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-green-100 opacity-0 transition-opacity duration-300 group-hover:opacity-20 -z-10"></div>
              </button>
            ))}
          </div>

          {/* Points and Profile Section */}
          <div className="flex items-center gap-4">
            {/* Points Display with Animation */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Coins className="h-5 w-5 text-green-600 animate-spin-slow" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <span className="font-bold text-green-800 text-lg">
                {userPoints.toLocaleString()}
              </span>
              <span className="text-green-600 text-sm font-medium">Points</span>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative group">
                  <div className="flex items-center gap-3 p-2 rounded-full hover:bg-green-50 transition-all duration-300 hover:shadow-lg">
                    <Avatar className="h-10 w-10 border-2 border-green-200 group-hover:border-green-400 transition-colors duration-300">
                      <AvatarImage src="/student-avatar.png" alt="Profile" />
                      <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                        AS
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-semibold text-foreground">
                        Alex Student
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Level 12 Eco Warrior
                      </div>
                    </div>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full animate-pulse"></div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuLabel className="flex items-center gap-3 p-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/student-avatar.png" alt="Profile" />
                    <AvatarFallback className="bg-green-100 text-green-700 font-semibold text-lg">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Alex Student</div>
                    <div className="text-sm text-muted-foreground">
                      alex.student@school.edu
                    </div>
                    <Badge
                      variant="outline"
                      className="mt-1 bg-green-50 text-green-700 border-green-200"
                    >
                      🌟 Eco Warrior
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer hover:bg-green-50">
                  <User className="h-4 w-4 text-green-600" />
                  <Link href="/profile" className="w-full">
                    <span>View Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer hover:bg-green-50">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span>My Achievements</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer hover:bg-red-50 text-red-600">
                  <LogOut className="h-4 w-4" />
                  <Link href="/" className="w-full">
                    <span>Sign Out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {showQuiz && (
        <section id="quiz" className="py-8 px-4 bg-green-50/30">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-green-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-800 flex items-center justify-center gap-2">
                  <Brain className="h-6 w-6" />
                  Environmental Quiz Challenge
                </CardTitle>
                <CardDescription>
                  Test your environmental knowledge and earn eco-points!
                </CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700"
                  >
                    Question {currentQuiz + 1} of {quizQuestions.length}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-700"
                  >
                    Completed: {quizCompleted.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {!isQuizComplete ? (
                  <div className="space-y-6">
                    <Progress
                      value={
                        (quizCompleted.length / quizQuestions.length) * 100
                      }
                      className="w-full"
                    />

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-green-800">
                        {currentQuestion.question}
                      </h3>
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
                            } ${
                              showResult && index === currentQuestion.correct
                                ? "border-green-500 bg-green-100"
                                : ""
                            }
                            ${
                              showResult &&
                              selectedAnswer === index &&
                              index !== currentQuestion.correct
                                ? "border-red-500 bg-red-100"
                                : ""
                            }`}
                          >
                            {option}
                            {showResult &&
                              index === currentQuestion.correct && (
                                <CheckCircle className="inline ml-2 h-5 w-5 text-green-600" />
                              )}
                            {showResult &&
                              selectedAnswer === index &&
                              index !== currentQuestion.correct && (
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
                            <p className="font-semibold">
                              Correct! +{currentQuestion.points} points
                            </p>
                          </div>
                        ) : (
                          <div>
                            <XCircle className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-semibold">
                              Incorrect. The correct answer was:{" "}
                              {currentQuestion.options[currentQuestion.correct]}
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
                    <h3 className="text-2xl font-bold text-green-800">
                      Quiz Completed!
                    </h3>
                    <p className="text-muted-foreground">
                      Great job! You've completed all questions and earned
                      valuable eco-points.
                    </p>
                    <Button
                      onClick={resetQuiz}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
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
        <section
          id="flashcards"
          className="py-8 px-4 bg-gradient-to-r from-emerald-50 to-green-50"
        >
          <div className="container mx-auto max-w-4xl">
            <Card className="border-emerald-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-emerald-800 flex items-center justify-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Environmental Disaster Flashcards
                </CardTitle>
                <CardDescription>
                  Learn about environmental disasters and their prevention
                  methods
                </CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge
                    variant="outline"
                    className="bg-emerald-100 text-emerald-700"
                  >
                    Card {currentFlashcard + 1} of {flashcardsData.length}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700"
                  >
                    {flashcardsData[currentFlashcard].icon}{" "}
                    {flashcardsData[currentFlashcard].title}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto">
                  <div
                    className={`relative h-80 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    onClick={flipCard}
                  >
                    {/* Front of card */}
                    <div
                      className={`absolute inset-0 backface-hidden ${
                        isFlipped ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-300`}
                    >
                      <div className="h-full bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl border-2 border-emerald-200 p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4">
                          {flashcardsData[currentFlashcard].icon}
                        </div>
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
                      className={`absolute inset-0 backface-hidden rotate-y-180 ${
                        isFlipped ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300`}
                    >
                      <div className="h-full bg-gradient-to-br from-green-100 to-teal-100 rounded-xl border-2 border-green-200 p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="text-xl font-bold text-green-800 mb-4">
                          Prevention Methods
                        </h3>
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
                            index === currentFlashcard
                              ? "bg-emerald-600"
                              : "bg-emerald-200"
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
                      Study all {flashcardsData.length} disaster types to become
                      an environmental expert!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {showLeaderboard && (
        <section
          id="leaderboard"
          className="py-8 px-4 bg-gradient-to-r from-yellow-50 to-orange-50"
        >
          <div className="container mx-auto max-w-4xl">
            <Card className="border-yellow-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-yellow-800 flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Eco Champions Leaderboard
                </CardTitle>
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
                          <p className="text-sm text-muted-foreground">
                            {user.school}
                          </p>
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
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{userPoints}</div>
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-200 text-green-800"
                        >
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
            Empowering students to learn sustainability through interactive
            challenges, real-world tasks, and community competitions. Building
            eco-conscious leaders for tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => handleQuizClick()}
            >
              <Brain className="mr-2 h-5 w-5" />
              Take Quiz Challenge
            </Button>
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => handleFlashcardsClick()}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Study Flashcards
            </Button>
            <Button
              size="lg"
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => handleLeaderboardClick()}
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Games Section - NEW MAIN ATTRACTION */}
      <section
        id="games"
        className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Main Attraction
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              Interactive Eco Game
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Learn environmental concepts through engaging game that make
              sustainability fun and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">


            <Card className="border-green-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105"></Card>

            <Card className="border-green-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="bg-teal-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-10 w-10 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-green-800">
                  Climate Hero
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Battle climate change through strategic decisions, renewable
                  energy, and sustainable practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="about" className="py-16 px-4 bg-green-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Challenge We're Solving
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Environmental education in India remains largely theoretical,
              lacking engagement and real-world application. Students need
              innovative tools to develop sustainable habits and environmental
              literacy.
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
                  Traditional textbook-based environmental education lacks
                  practical application and fails to inspire action.
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
                  Students show minimal participation in environmental
                  initiatives due to lack of motivation and awareness.
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
                  Without practical tools, we risk raising a generation unaware
                  of sustainability challenges and solutions.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Solution: TerraLearn Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              A comprehensive gamified platform that transforms environmental
              education through interactive learning, real-world challenges, and
              community engagement.
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
                  Interactive lessons, quizzes, and challenges with eco-points
                  and digital badges
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
                  Tree planting, waste segregation, and community environmental
                  projects
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
                  Inter-school challenges and leaderboards to foster healthy
                  competition
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
                  Digital certificates, eco-points, and rewards for sustainable
                  practices
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expected Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our platform creates lasting behavioral change in environmental
              consciousness through engaging, interactive learning experiences
              that inspire real-world action.
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
                    70% increase in environmental awareness and participation
                    through gamified learning
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
                    Ripple effect across families and communities through
                    student-led initiatives
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
                    Building eco-conscious leaders for India's sustainable
                    development goals
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
                  <p className="text-sm text-muted-foreground">
                    Increase in retention with gamified learning
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">1M+</div>
                  <p className="text-sm text-muted-foreground">
                    Students to be impacted nationwide
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">500+</div>
                  <p className="text-sm text-muted-foreground">
                    Schools ready for pilot program
                  </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Collaborating with key stakeholders to create a comprehensive
              environmental education ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-card text-center p-6">
              <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Educational Institutions</CardTitle>
              <CardDescription>
                Schools, colleges, teachers, and eco-club coordinators
                implementing sustainable curricula
              </CardDescription>
            </Card>

            <Card className="border-green-200 bg-card text-center p-6">
              <Globe className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <CardTitle className="mb-2">
                Environmental Organizations
              </CardTitle>
              <CardDescription>
                NGOs and government departments driving environmental policy and
                awareness initiatives
              </CardDescription>
            </Card>

            <Card className="border-green-200 bg-card text-center p-6">
              <Users className="h-16 w-16 text-teal-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Student Community</CardTitle>
              <CardDescription>
                Young changemakers from schools and colleges across India
                leading environmental action
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Environmental Revolution
          </h2>
          <p className="text-lg mb-8 opacity-90 text-pretty">
            Be part of the future of environmental education. Together, we can
            create a generation of eco-conscious leaders through engaging game
            and interactive learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => handleQuizClick()}
            >
              <Brain className="mr-2 h-5 w-5" />
              Take Quiz Challenge
            </Button>
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => handleFlashcardsClick()}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Study Flashcards
            </Button>
            <Button
              size="lg"
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => handleLeaderboardClick()}
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="flex items-center justify-around px-2 py-3">
          {[
            {
              name: "Quiz",
              icon: Brain,
              action: () => {
                if (!showQuiz) handleQuizClick();
                setTimeout(
                  () =>
                    document
                      .getElementById("quiz")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100
                );
              },
            },
            {
              name: "Cards",
              icon: BookOpen,
              action: () => {
                if (!showFlashcards) handleFlashcardsClick();
                setTimeout(
                  () =>
                    document
                      .getElementById("flashcards")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100
                );
              },
            },
            {
              name: "Game",
              icon: Gamepad2,
              action: () =>
                document
                  .getElementById("games")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
            {
              name: "Impact",
              icon: BarChart3,
              action: () =>
                document
                  .getElementById("impact")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
            {
              name: "Board",
              icon: Trophy,
              action: () => {
                if (!showLeaderboard) handleLeaderboardClick();
                setTimeout(
                  () =>
                    document
                      .getElementById("leaderboard")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100
                );
              },
            },
          ].map((item, index) => (
            <button
              key={item.name}
              onClick={item.action}
              className="group flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-green-50 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                {/* Active indicator */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </div>
              <span className="text-xs font-medium">{item.name}</span>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-green-100 opacity-0 transition-opacity duration-300 group-hover:opacity-20 -z-10"></div>
            </button>
          ))}
        </div>
      </nav>

      <div className="md:hidden h-20"></div>
    </div>
  );
}
// rishank over and out