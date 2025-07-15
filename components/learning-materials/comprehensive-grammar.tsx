"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Target,
  Play,
  Pause,
  RotateCcw,
  Eye,
  PenTool,
  MessageSquare,
  Clock,
  TrendingUp,
  Award,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Bookmark,
  Share2
} from "lucide-react"

interface GrammarModule {
  id: string
  title: string
  subtitle: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  egInUseUnits: string
  keyActivity: string
  japanesePainPoint: string
  estimatedTime: number
  lessons: GrammarLesson[]
  completed: boolean
  progress: number
}

interface GrammarLesson {
  id: string
  title: string
  type: "preview" | "lecture" | "practice" | "task" | "reflection"
  content: string
  exercises: GrammarExercise[]
  completed: boolean
}

interface GrammarExercise {
  id: string
  type: "cloze" | "multiple-choice" | "transformation" | "error-correction" | "translation"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  completed: boolean
  userAnswer?: string
}

const grammarModules: GrammarModule[] = [
  {
    id: "articles-countability",
    title: "Articles & Countability",
    subtitle: "Master a/an/the and singular/plural distinctions",
    description: "Learn the English article system and countability rules that don't exist in Japanese. This module focuses on the three main article types and how they interact with countable/uncountable nouns.",
    difficulty: "intermediate",
    egInUseUnits: "67-78",
    keyActivity: "Write a Tokyo Airbnb listing; peers hunt for missing a/an/the",
    japanesePainPoint: "No article system in Japanese, singular/plural confusions",
    estimatedTime: 120,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-1",
        title: "Preview Quiz: Articles & Countability",
        type: "preview",
        content: "Test your current knowledge of articles and countability with real-world examples",
        exercises: [
          {
            id: "preview-1-1",
            type: "cloze",
            question: "I bought ___ apple and ___ orange at ___ store near ___ station.",
            correctAnswer: "an, an, the, the",
            explanation: "Use 'an' before vowel sounds, 'the' for specific locations",
            completed: false
          },
          {
            id: "preview-1-2",
            type: "multiple-choice",
            question: "Which sentence is correct?",
            options: [
              "I need informations about the project",
              "I need information about the project",
              "I need an information about the project",
              "I need some informations about the project"
            ],
            correctAnswer: "I need information about the project",
            explanation: "Information is uncountable, so no article needed",
            completed: false
          },
          {
            id: "preview-1-3",
            type: "error-correction",
            question: "Correct the article errors: 'I went to university to study economics. University was very expensive.'",
            correctAnswer: "I went to university to study economics. The university was very expensive.",
            explanation: "First mention uses zero article, second mention uses 'the' for specific university",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-1",
        title: "Mini-Lecture: Articles in Context",
        type: "lecture",
        content: "Learn the three main article rules: indefinite (a/an), definite (the), and zero article. Understand when to use each type and how they interact with countable and uncountable nouns.",
        exercises: [
          {
            id: "lecture-1-1",
            type: "multiple-choice",
            question: "When do we use 'the'?",
            options: [
              "For any specific noun",
              "For first mention of countable nouns",
              "For previously mentioned or unique items",
              "For all plural nouns"
            ],
            correctAnswer: "For previously mentioned or unique items",
            explanation: "The definite article 'the' is used for specific, known items",
            completed: false
          },
          {
            id: "lecture-1-2",
            type: "multiple-choice",
            question: "When do we use 'a' vs 'an'?",
            options: [
              "Use 'a' before consonants, 'an' before vowels",
              "Use 'a' before consonant sounds, 'an' before vowel sounds",
              "Use 'a' for singular, 'an' for plural",
              "Use 'a' for countable, 'an' for uncountable"
            ],
            correctAnswer: "Use 'a' before consonant sounds, 'an' before vowel sounds",
            explanation: "It's about sound, not spelling. 'An hour' (silent h), 'a university' (y sound)",
            completed: false
          },
          {
            id: "lecture-1-3",
            type: "multiple-choice",
            question: "Which nouns are typically uncountable?",
            options: [
              "Information, advice, furniture",
              "Book, car, house",
              "Person, animal, plant",
              "All of the above"
            ],
            correctAnswer: "Information, advice, furniture",
            explanation: "Abstract concepts and mass nouns are usually uncountable",
            completed: false
          },
          {
            id: "lecture-1-4",
            type: "multiple-choice",
            question: "When do we use zero article?",
            options: [
              "With all plural nouns",
              "With uncountable nouns in general statements",
              "With proper nouns",
              "All of the above"
            ],
            correctAnswer: "All of the above",
            explanation: "Zero article is used in many contexts where no article is needed",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-1",
        title: "Guided Practice: Article Usage",
        type: "practice",
        content: "Practice with real-world examples and get instant feedback on article usage",
        exercises: [
          {
            id: "practice-1-1",
            type: "transformation",
            question: "Transform: 'I saw movie yesterday' (add appropriate articles)",
            correctAnswer: "I saw a movie yesterday",
            explanation: "Use 'a' for first mention of countable nouns",
            completed: false
          },
          {
            id: "practice-1-2",
            type: "cloze",
            question: "___ sun rises in ___ east and sets in ___ west.",
            correctAnswer: "The, the, the",
            explanation: "Use 'the' for unique natural phenomena and directions",
            completed: false
          },
          {
            id: "practice-1-3",
            type: "translation",
            question: "Translate: '私は大学で経済学を勉強しています' (I study economics at university)",
            correctAnswer: "I study economics at university",
            explanation: "No article needed for general institutions",
            completed: false
          },
          {
            id: "practice-1-4",
            type: "cloze",
            question: "I bought ___ umbrella because ___ weather was bad. ___ umbrella was expensive.",
            correctAnswer: "an, the, The",
            explanation: "Use 'an' before vowel sound, 'the' for specific weather and previously mentioned item",
            completed: false
          },
          {
            id: "practice-1-5",
            type: "error-correction",
            question: "Correct: 'I need an advice about the job. Can you give me the information?'",
            correctAnswer: "I need advice about the job. Can you give me the information?",
            explanation: "Advice is uncountable, so no article. Information can be used with 'the' when specific",
            completed: false
          },
          {
            id: "practice-1-6",
            type: "multiple-choice",
            question: "Which sentence is correct?",
            options: [
              "I went to the school to pick up my child",
              "I went to school to pick up my child",
              "I went to a school to pick up my child",
              "All are correct"
            ],
            correctAnswer: "I went to school to pick up my child",
            explanation: "Use zero article for general institutions when referring to the activity",
            completed: false
          },
          {
            id: "practice-1-7",
            type: "cloze",
            question: "___ United States is ___ country in ___ North America. ___ country has ___ population of over 300 million.",
            correctAnswer: "The, a, -, The, a",
            explanation: "Use 'the' for country names with 'United', 'a' for general reference, zero article for continents",
            completed: false
          },
          {
            id: "practice-1-8",
            type: "transformation",
            question: "Add appropriate articles: 'I have meeting at office tomorrow'",
            correctAnswer: "I have a meeting at the office tomorrow",
            explanation: "Use 'a' for first mention of countable noun, 'the' for specific office",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-1",
        title: "Real-life Task: Airbnb Listing",
        type: "task",
        content: "Write a Tokyo Airbnb listing using proper articles. Include descriptions of the apartment, nearby attractions, and house rules.",
        exercises: [
          {
            id: "task-1-1",
            type: "transformation",
            question: "Write 3 sentences about your ideal apartment using correct articles",
            correctAnswer: "Sample: I want an apartment near the station. The apartment should have a balcony. There should be a supermarket within walking distance.",
            explanation: "Practice using articles in real-world context",
            completed: false
          },
          {
            id: "task-1-2",
            type: "transformation",
            question: "Write a description of a restaurant using articles correctly",
            correctAnswer: "Sample: The restaurant is located in the heart of the city. It serves an excellent variety of dishes. The chef is famous for the pasta dishes.",
            explanation: "Practice using definite and indefinite articles in descriptions",
            completed: false
          },
          {
            id: "task-1-3",
            type: "transformation",
            question: "Write 2 sentences about transportation using articles",
            correctAnswer: "Sample: I take the train to work every day. The train is usually crowded during rush hour.",
            explanation: "Practice using articles with transportation",
            completed: false
          },
          {
            id: "task-1-4",
            type: "transformation",
            question: "Write a sentence about education using zero article",
            correctAnswer: "Sample: I went to university to study engineering. Education is important for career success.",
            explanation: "Practice using zero article with institutions and abstract concepts",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "reflection-1",
        title: "Reflection Journal: Articles",
        type: "reflection",
        content: "Reflect on your learning and identify areas for improvement. What was most challenging about articles?",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "present-past",
    title: "Present vs Past",
    subtitle: "Distinguish between present and past forms",
    description: "Master the difference between present and past tenses that Japanese combines. Learn to express time accurately in English.",
    difficulty: "beginner",
    egInUseUnits: "1-5, 13",
    keyActivity: "Two-timeline diary; feedback on aspect choice",
    japanesePainPoint: "Japanese '-ta' covers both present and past",
    estimatedTime: 90,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-2",
        title: "Preview Quiz: Present vs Past",
        type: "preview",
        content: "Test your understanding of present vs past forms",
        exercises: [
          {
            id: "preview-2-1",
            type: "multiple-choice",
            question: "Which form is correct for a current habit?",
            options: [
              "I am working here for 5 years",
              "I work here for 5 years",
              "I have been working here for 5 years",
              "I worked here for 5 years"
            ],
            correctAnswer: "I have been working here for 5 years",
            explanation: "Present perfect continuous for ongoing actions",
            completed: false
          },
          {
            id: "preview-2-2",
            type: "multiple-choice",
            question: "Which sentence describes a completed action?",
            options: [
              "I am reading a book",
              "I read books every day",
              "I have read this book",
              "I will read this book"
            ],
            correctAnswer: "I have read this book",
            explanation: "Present perfect for completed actions with present relevance",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-2",
        title: "Mini-Lecture: Time Expressions",
        type: "lecture",
        content: "Learn how to express different time periods and states in English",
        exercises: [
          {
            id: "lecture-2-1",
            type: "multiple-choice",
            question: "Which tense is used for current habits?",
            options: [
              "Present simple",
              "Present continuous",
              "Present perfect",
              "Past simple"
            ],
            correctAnswer: "Present simple",
            explanation: "Present simple is used for regular habits and routines",
            completed: false
          },
          {
            id: "lecture-2-2",
            type: "multiple-choice",
            question: "When do we use present continuous?",
            options: [
              "For completed actions",
              "For actions happening now",
              "For future plans",
              "Both B and C"
            ],
            correctAnswer: "Both B and C",
            explanation: "Present continuous is used for current actions and arranged future plans",
            completed: false
          },
          {
            id: "lecture-2-3",
            type: "multiple-choice",
            question: "Which tense connects past to present?",
            options: [
              "Past simple",
              "Present perfect",
              "Present simple",
              "Past continuous"
            ],
            correctAnswer: "Present perfect",
            explanation: "Present perfect connects past actions to present relevance",
            completed: false
          },
          {
            id: "lecture-2-4",
            type: "multiple-choice",
            question: "When do we use past simple?",
            options: [
              "For actions happening now",
              "For completed actions at specific times",
              "For future plans",
              "For ongoing past actions"
            ],
            correctAnswer: "For completed actions at specific times",
            explanation: "Past simple is used for finished actions with specific time references",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-2",
        title: "Guided Practice: Tense Selection",
        type: "practice",
        content: "Practice choosing the correct tense for different situations",
        exercises: [
          {
            id: "practice-2-1",
            type: "transformation",
            question: "Change to past tense: 'I work in Tokyo'",
            correctAnswer: "I worked in Tokyo",
            explanation: "Simple past for completed actions",
            completed: false
          },
          {
            id: "practice-2-2",
            type: "cloze",
            question: "I ___ (live) in Tokyo for 5 years. I ___ (move) here in 2019.",
            correctAnswer: "have lived, moved",
            explanation: "Present perfect for duration, past simple for specific time",
            completed: false
          },
          {
            id: "practice-2-3",
            type: "multiple-choice",
            question: "Which sentence is correct for a current action?",
            options: [
              "I am studying English now",
              "I study English now",
              "I studied English now",
              "I have studied English now"
            ],
            correctAnswer: "I am studying English now",
            explanation: "Present continuous for actions happening now",
            completed: false
          },
          {
            id: "practice-2-4",
            type: "transformation",
            question: "Express as a habit: 'I am reading a book'",
            correctAnswer: "I read books",
            explanation: "Present simple for regular habits",
            completed: false
          },
          {
            id: "practice-2-5",
            type: "cloze",
            question: "She ___ (work) as a teacher. She ___ (start) this job last year.",
            correctAnswer: "works, started",
            explanation: "Present simple for current job, past simple for when it began",
            completed: false
          },
          {
            id: "practice-2-6",
            type: "error-correction",
            question: "Correct: 'I am working here since 2020'",
            correctAnswer: "I have been working here since 2020",
            explanation: "Use present perfect continuous for actions that started in the past and continue now",
            completed: false
          },
          {
            id: "practice-2-7",
            type: "translation",
            question: "Translate: '私は昨日映画を見ました' (I watched a movie yesterday)",
            correctAnswer: "I watched a movie yesterday",
            explanation: "Past simple for completed action with specific time",
            completed: false
          },
          {
            id: "practice-2-8",
            type: "cloze",
            question: "Look! It ___ (rain). It ___ (rain) since morning.",
            correctAnswer: "is raining, has been raining",
            explanation: "Present continuous for current action, present perfect continuous for duration",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-2",
        title: "Real-life Task: Two-timeline Diary",
        type: "task",
        content: "Create a diary entry with two timelines: what you did yesterday and what you're doing today. Use appropriate tenses for each timeline.",
        exercises: [
          {
            id: "task-2-1",
            type: "transformation",
            question: "Write 3 sentences about yesterday using past tense",
            correctAnswer: "Sample: I went to the gym yesterday. I had dinner with friends. I watched a movie before bed.",
            explanation: "Use past simple for completed actions in the past",
            completed: false
          },
          {
            id: "task-2-2",
            type: "transformation",
            question: "Write 3 sentences about today using present tense",
            correctAnswer: "Sample: I am working from home today. I have a meeting at 3 PM. I usually take a break at noon.",
            explanation: "Use present continuous for current actions, present simple for schedules",
            completed: false
          },
          {
            id: "task-2-3",
            type: "transformation",
            question: "Write a sentence connecting past to present",
            correctAnswer: "Sample: I have lived in this city for 10 years. I have been working at this company since 2018.",
            explanation: "Use present perfect to connect past actions to present",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "reflection-2",
        title: "Reflection Journal: Present vs Past",
        type: "reflection",
        content: "Reflect on your learning and identify areas for improvement. What was most challenging about distinguishing between present and past forms?",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "present-perfect-past-simple",
    title: "Present Perfect vs Past Simple",
    subtitle: "Master 'I've been' vs 'I went'",
    description: "Learn when to use present perfect vs past simple. Understand the difference between completed actions with present relevance and simple past events.",
    difficulty: "intermediate",
    egInUseUnits: "15-20",
    keyActivity: "Record a podcast recap using time markers",
    japanesePainPoint: "Confusion between 'I've been' and 'I went'",
    estimatedTime: 100,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-3",
        title: "Preview Quiz: Present Perfect vs Past Simple",
        type: "preview",
        content: "Test your understanding of when to use present perfect vs past simple",
        exercises: [
          {
            id: "preview-3-1",
            type: "multiple-choice",
            question: "Which sentence is correct for a recent experience?",
            options: [
              "I went to Paris last year",
              "I have been to Paris last year",
              "I have been to Paris",
              "I go to Paris"
            ],
            correctAnswer: "I have been to Paris",
            explanation: "Present perfect for experiences without specific time",
            completed: false
          },
          {
            id: "preview-3-2",
            type: "multiple-choice",
            question: "Which sentence describes a completed action at a specific time?",
            options: [
              "I have finished my homework",
              "I finished my homework at 10 PM",
              "I am finishing my homework",
              "I finish my homework"
            ],
            correctAnswer: "I finished my homework at 10 PM",
            explanation: "Past simple for completed actions with specific time",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-3",
        title: "Mini-Lecture: Time Markers",
        type: "lecture",
        content: "Learn the key time markers that determine whether to use present perfect or past simple",
        exercises: [
          {
            id: "lecture-3-1",
            type: "multiple-choice",
            question: "Which time marker goes with present perfect?",
            options: [
              "yesterday",
              "last week",
              "ever",
              "in 2020"
            ],
            correctAnswer: "ever",
            explanation: "Present perfect with indefinite time markers",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-3",
        title: "Guided Practice: Tense Selection",
        type: "practice",
        content: "Practice choosing between present perfect and past simple",
        exercises: [
          {
            id: "practice-3-1",
            type: "transformation",
            question: "Change to present perfect: 'I visited Tokyo in 2019'",
            correctAnswer: "I have visited Tokyo",
            explanation: "Remove specific time for present perfect",
            completed: false
          },
          {
            id: "practice-3-2",
            type: "cloze",
            question: "I ___ (never/be) to New York, but I ___ (go) to Los Angeles last summer.",
            correctAnswer: "have never been, went",
            explanation: "Present perfect for experience, past simple for specific time",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-3",
        title: "Real-life Task: Podcast Recap",
        type: "task",
        content: "Record a podcast recap using both present perfect and past simple appropriately",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "future-forms",
    title: "Future Forms",
    subtitle: "Will / Going to / Present Continuous",
    description: "Master the different ways to express future in English. Learn when to use will, going to, and present continuous for future plans.",
    difficulty: "intermediate",
    egInUseUnits: "21-24",
    keyActivity: "Plan a trip in chat; negotiate schedules",
    japanesePainPoint: "Japanese has simpler future expression",
    estimatedTime: 110,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-4",
        title: "Preview Quiz: Future Forms",
        type: "preview",
        content: "Test your understanding of different future forms",
        exercises: [
          {
            id: "preview-4-1",
            type: "multiple-choice",
            question: "Which form expresses a spontaneous decision?",
            options: [
              "I am going to help you",
              "I will help you",
              "I am helping you tomorrow",
              "I help you"
            ],
            correctAnswer: "I will help you",
            explanation: "Will for spontaneous decisions",
            completed: false
          },
          {
            id: "preview-4-2",
            type: "multiple-choice",
            question: "Which form expresses a planned future action?",
            options: [
              "I will meet my friend",
              "I am going to meet my friend",
              "I meet my friend",
              "I am meeting my friend"
            ],
            correctAnswer: "I am going to meet my friend",
            explanation: "Going to for planned actions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-4",
        title: "Mini-Lecture: Future Form Usage",
        type: "lecture",
        content: "Learn the three main ways to express future: will (spontaneous), going to (planned), present continuous (arranged)",
        exercises: [
          {
            id: "lecture-4-1",
            type: "multiple-choice",
            question: "When do we use present continuous for future?",
            options: [
              "For any future action",
              "For arranged future events",
              "For spontaneous decisions",
              "For general plans"
            ],
            correctAnswer: "For arranged future events",
            explanation: "Present continuous for arranged future events",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-4",
        title: "Guided Practice: Future Form Selection",
        type: "practice",
        content: "Practice choosing the correct future form for different situations",
        exercises: [
          {
            id: "practice-4-1",
            type: "transformation",
            question: "Express as spontaneous decision: 'I help you with your homework'",
            correctAnswer: "I will help you with your homework",
            explanation: "Use will for spontaneous decisions",
            completed: false
          },
          {
            id: "practice-4-2",
            type: "cloze",
            question: "I ___ (go) to the movies tomorrow. I ___ (meet) my friend at 7 PM.",
            correctAnswer: "am going, am meeting",
            explanation: "Going to for plan, present continuous for arrangement",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-4",
        title: "Real-life Task: Trip Planning",
        type: "task",
        content: "Plan a trip using different future forms appropriately",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses & Pronouns",
    subtitle: "Master restrictive and non-restrictive clauses",
    description: "Learn to use relative clauses effectively",
    difficulty: "advanced",
    egInUseUnits: "92-97",
    keyActivity: "Mystery object guessing game with restrictive clauses",
    japanesePainPoint: "Japanese modifier order differs from English",
    estimatedTime: 130,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "gerunds-infinitives",
    title: "Gerunds vs Infinitives",
    subtitle: "Avoid verb-pattern mix-ups",
    description: "Learn when to use gerunds vs infinitives. Master the verb patterns that cause common errors for Japanese learners.",
    difficulty: "intermediate",
    egInUseUnits: "53-57",
    keyActivity: "Live product-pitch fix-up session",
    japanesePainPoint: "Common errors like 'enjoy to' instead of 'enjoy -ing'",
    estimatedTime: 120,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-6",
        title: "Preview Quiz: Gerunds vs Infinitives",
        type: "preview",
        content: "Test your understanding of gerund and infinitive usage",
        exercises: [
          {
            id: "preview-6-1",
            type: "multiple-choice",
            question: "Which is correct after 'enjoy'?",
            options: [
              "I enjoy to read books",
              "I enjoy reading books",
              "I enjoy read books",
              "I enjoy reads books"
            ],
            correctAnswer: "I enjoy reading books",
            explanation: "Enjoy takes gerund (-ing form)",
            completed: false
          },
          {
            id: "preview-6-2",
            type: "multiple-choice",
            question: "Which is correct after 'want'?",
            options: [
              "I want going home",
              "I want to go home",
              "I want go home",
              "I want goes home"
            ],
            correctAnswer: "I want to go home",
            explanation: "Want takes infinitive (to + base form)",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-6",
        title: "Mini-Lecture: Verb Patterns",
        type: "lecture",
        content: "Learn which verbs take gerunds, which take infinitives, and which can take both",
        exercises: [
          {
            id: "lecture-6-1",
            type: "multiple-choice",
            question: "Which verb can take both gerund and infinitive?",
            options: [
              "enjoy",
              "want",
              "start",
              "finish"
            ],
            correctAnswer: "start",
            explanation: "Start can take both forms with similar meaning",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-6",
        title: "Guided Practice: Pattern Recognition",
        type: "practice",
        content: "Practice recognizing and using correct verb patterns",
        exercises: [
          {
            id: "practice-6-1",
            type: "transformation",
            question: "Correct: 'I suggest to go to the movies'",
            correctAnswer: "I suggest going to the movies",
            explanation: "Suggest takes gerund, not infinitive",
            completed: false
          },
          {
            id: "practice-6-2",
            type: "cloze",
            question: "I decided ___ (study) abroad. I'm looking forward to ___ (meet) new people.",
            correctAnswer: "to study, meeting",
            explanation: "Decide takes infinitive, look forward to takes gerund",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-6",
        title: "Real-life Task: Product Pitch",
        type: "task",
        content: "Create and present a product pitch using correct gerund/infinitive patterns",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "modals-politeness",
    title: "Modals & Politeness",
    subtitle: "Master keigo vs modal politeness",
    description: "Learn to use modals for politeness and formality",
    difficulty: "intermediate",
    egInUseUnits: "24, 31-36",
    keyActivity: "Customer-support email role-play graded on tone ladder",
    japanesePainPoint: "Overuse of 'can', confusion with keigo system",
    estimatedTime: 140,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "conditionals",
    title: "Conditionals",
    subtitle: "Master all conditional types (0, 1, 2, 3, mixed)",
    description: "Learn to use conditionals effectively in real situations. Master the five main conditional types and their specific uses.",
    difficulty: "advanced",
    egInUseUnits: "37-40",
    keyActivity: "Video replies: 'If I were CEO…' brainstorm",
    japanesePainPoint: "Japanese conditional system differs significantly",
    estimatedTime: 150,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-8",
        title: "Preview Quiz: Conditionals",
        type: "preview",
        content: "Test your understanding of different conditional types",
        exercises: [
          {
            id: "preview-8-1",
            type: "multiple-choice",
            question: "Which conditional type is this: 'If you heat water to 100°C, it boils'?",
            options: [
              "Zero conditional",
              "First conditional",
              "Second conditional",
              "Third conditional"
            ],
            correctAnswer: "Zero conditional",
            explanation: "Zero conditional for general truths",
            completed: false
          },
          {
            id: "preview-8-2",
            type: "multiple-choice",
            question: "Which conditional expresses a hypothetical situation?",
            options: [
              "If it rains, I will stay home",
              "If it rained, I would stay home",
              "If it had rained, I would have stayed home",
              "If it rains, I stay home"
            ],
            correctAnswer: "If it rained, I would stay home",
            explanation: "Second conditional for hypothetical present/future",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-8",
        title: "Mini-Lecture: Conditional Types",
        type: "lecture",
        content: "Learn the five conditional types: 0 (general truths), 1 (real future), 2 (hypothetical), 3 (past hypothetical), mixed",
        exercises: [
          {
            id: "lecture-8-1",
            type: "multiple-choice",
            question: "What tense is used in the if-clause of a second conditional?",
            options: [
              "Present simple",
              "Past simple",
              "Present perfect",
              "Future simple"
            ],
            correctAnswer: "Past simple",
            explanation: "Second conditional uses past simple in if-clause",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-8",
        title: "Guided Practice: Conditional Construction",
        type: "practice",
        content: "Practice constructing different types of conditionals",
        exercises: [
          {
            id: "practice-8-1",
            type: "transformation",
            question: "Transform to second conditional: 'If I have money, I will buy a car'",
            correctAnswer: "If I had money, I would buy a car",
            explanation: "Use past simple and would for hypothetical",
            completed: false
          },
          {
            id: "practice-8-2",
            type: "cloze",
            question: "If I ___ (be) you, I ___ (study) harder for the exam.",
            correctAnswer: "were, would study",
            explanation: "Second conditional with 'were' for all persons",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-8",
        title: "Real-life Task: CEO Scenario",
        type: "task",
        content: "Create video replies imagining 'If I were CEO...' scenarios",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "prepositions-phrasal-verbs",
    title: "Prepositions & Phrasal Verbs",
    subtitle: "Master spatial metaphors and phrasal verbs",
    description: "Learn prepositions and phrasal verbs in context",
    difficulty: "advanced",
    egInUseUnits: "120-136",
    keyActivity: "AR city-navigation task choosing correct preps/phrasals",
    japanesePainPoint: "Spatial metaphors differ between languages",
    estimatedTime: 160,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "discourse-grammar",
    title: "Discourse Grammar",
    subtitle: "Master linkers, ellipsis, and spoken chunks",
    description: "Learn to connect ideas and use natural spoken English",
    difficulty: "advanced",
    egInUseUnits: "113-118, 145",
    keyActivity: "Record & transcribe café chat; self-analyze discourse markers",
    japanesePainPoint: "Different discourse patterns between languages",
    estimatedTime: 140,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    subtitle: "Master active vs passive constructions",
    description: "Learn when and how to use passive voice effectively. Understand the difference between active and passive voice and when each is appropriate.",
    difficulty: "intermediate",
    egInUseUnits: "42-46",
    keyActivity: "News article analysis and rewriting",
    japanesePainPoint: "Japanese passive construction differs from English",
    estimatedTime: 120,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-9",
        title: "Preview Quiz: Passive Voice",
        type: "preview",
        content: "Test your understanding of active vs passive voice",
        exercises: [
          {
            id: "preview-9-1",
            type: "multiple-choice",
            question: "Which sentence is in passive voice?",
            options: [
              "The cat chased the mouse",
              "The mouse was chased by the cat",
              "The cat is chasing the mouse",
              "The mouse chases the cat"
            ],
            correctAnswer: "The mouse was chased by the cat",
            explanation: "Passive voice focuses on the receiver of the action",
            completed: false
          },
          {
            id: "preview-9-2",
            type: "multiple-choice",
            question: "When is passive voice most appropriate?",
            options: [
              "When the doer is important",
              "When the action is more important than the doer",
              "When you want to emphasize who did something",
              "When the subject is active"
            ],
            correctAnswer: "When the action is more important than the doer",
            explanation: "Passive voice emphasizes the action or result",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-9",
        title: "Mini-Lecture: Passive Voice Usage",
        type: "lecture",
        content: "Learn when to use passive voice and how to form it correctly",
        exercises: [
          {
            id: "lecture-9-1",
            type: "multiple-choice",
            question: "What is the passive form of 'They built this house'?",
            options: [
              "This house was built by them",
              "This house is built by them",
              "This house builds by them",
              "This house built by them"
            ],
            correctAnswer: "This house was built by them",
            explanation: "Use past simple passive for completed actions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-9",
        title: "Guided Practice: Active to Passive",
        type: "practice",
        content: "Practice converting active voice to passive voice",
        exercises: [
          {
            id: "practice-9-1",
            type: "transformation",
            question: "Convert to passive: 'The company will launch the product next month'",
            correctAnswer: "The product will be launched by the company next month",
            explanation: "Future passive uses 'will be + past participle'",
            completed: false
          },
          {
            id: "practice-9-2",
            type: "cloze",
            question: "The book ___ (write) by a famous author. It ___ (publish) last year.",
            correctAnswer: "was written, was published",
            explanation: "Past simple passive for completed actions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-9",
        title: "Real-life Task: News Analysis",
        type: "task",
        content: "Analyze news articles and identify active vs passive voice usage",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    subtitle: "Master indirect speech and tense changes",
    description: "Learn to report what others have said accurately. Master the tense changes and time expressions used in reported speech.",
    difficulty: "intermediate",
    egInUseUnits: "47-52",
    keyActivity: "Interview transcription and reporting",
    japanesePainPoint: "Japanese reported speech structure differs significantly",
    estimatedTime: 130,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-10",
        title: "Preview Quiz: Reported Speech",
        type: "preview",
        content: "Test your understanding of direct vs reported speech",
        exercises: [
          {
            id: "preview-10-1",
            type: "multiple-choice",
            question: "What is the reported form of 'I am happy'?",
            options: [
              "He said I am happy",
              "He said he is happy",
              "He said he was happy",
              "He said he will be happy"
            ],
            correctAnswer: "He said he was happy",
            explanation: "Present simple becomes past simple in reported speech",
            completed: false
          },
          {
            id: "preview-10-2",
            type: "multiple-choice",
            question: "Which time expression changes in reported speech?",
            options: [
              "today",
              "yesterday",
              "tomorrow",
              "All of the above"
            ],
            correctAnswer: "All of the above",
            explanation: "Time expressions shift back in reported speech",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-10",
        title: "Mini-Lecture: Tense Changes",
        type: "lecture",
        content: "Learn the systematic tense changes in reported speech",
        exercises: [
          {
            id: "lecture-10-1",
            type: "multiple-choice",
            question: "What does 'will' become in reported speech?",
            options: [
              "will",
              "would",
              "would have",
              "had"
            ],
            correctAnswer: "would",
            explanation: "Will becomes would in reported speech",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-10",
        title: "Guided Practice: Speech Reporting",
        type: "practice",
        content: "Practice converting direct speech to reported speech",
        exercises: [
          {
            id: "practice-10-1",
            type: "transformation",
            question: "Report: 'I will help you tomorrow'",
            correctAnswer: "He said he would help me the next day",
            explanation: "Will becomes would, tomorrow becomes the next day",
            completed: false
          },
          {
            id: "practice-10-2",
            type: "cloze",
            question: "She said, 'I ___ (work) here for 5 years.' → She said she ___ (work) there for 5 years.",
            correctAnswer: "have worked, had worked",
            explanation: "Present perfect becomes past perfect in reported speech",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-10",
        title: "Real-life Task: Interview Reporting",
        type: "task",
        content: "Conduct and report on interviews using reported speech",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "subjunctive-mood",
    title: "Subjunctive Mood",
    subtitle: "Master hypothetical and formal expressions",
    description: "Learn to use subjunctive mood for hypothetical situations, wishes, and formal expressions. Understand when and how to use 'were', 'be', and other subjunctive forms.",
    difficulty: "advanced",
    egInUseUnits: "38-40",
    keyActivity: "Formal proposal writing with subjunctive expressions",
    japanesePainPoint: "Japanese doesn't have equivalent subjunctive system",
    estimatedTime: 140,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-11",
        title: "Preview Quiz: Subjunctive Mood",
        type: "preview",
        content: "Test your understanding of subjunctive mood usage",
        exercises: [
          {
            id: "preview-11-1",
            type: "multiple-choice",
            question: "Which sentence uses subjunctive mood?",
            options: [
              "If I am rich, I will buy a house",
              "If I were rich, I would buy a house",
              "If I was rich, I would buy a house",
              "If I will be rich, I will buy a house"
            ],
            correctAnswer: "If I were rich, I would buy a house",
            explanation: "Subjunctive uses 'were' for all persons in hypothetical situations",
            completed: false
          },
          {
            id: "preview-11-2",
            type: "multiple-choice",
            question: "Which expression requires subjunctive?",
            options: [
              "I suggest that you go",
              "I suggest that you goes",
              "I suggest that you went",
              "I suggest that you will go"
            ],
            correctAnswer: "I suggest that you go",
            explanation: "Subjunctive uses base form after certain expressions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-11",
        title: "Mini-Lecture: Subjunctive Forms",
        type: "lecture",
        content: "Learn the different forms and uses of subjunctive mood",
        exercises: [
          {
            id: "lecture-11-1",
            type: "multiple-choice",
            question: "What form is used in 'It's important that he be on time'?",
            options: [
              "Present simple",
              "Base form",
              "Past simple",
              "Infinitive"
            ],
            correctAnswer: "Base form",
            explanation: "Subjunctive uses base form after expressions of importance",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-11",
        title: "Guided Practice: Subjunctive Usage",
        type: "practice",
        content: "Practice using subjunctive mood in various contexts",
        exercises: [
          {
            id: "practice-11-1",
            type: "transformation",
            question: "Use subjunctive: 'I wish I (have) more time'",
            correctAnswer: "I wish I had more time",
            explanation: "Wish + past simple for present wishes",
            completed: false
          },
          {
            id: "practice-11-2",
            type: "cloze",
            question: "It's essential that she ___ (attend) the meeting. I suggest that he ___ (be) more careful.",
            correctAnswer: "attend, be",
            explanation: "Subjunctive uses base form after essential/suggest",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-11",
        title: "Real-life Task: Formal Proposal",
        type: "task",
        content: "Write a formal proposal using subjunctive expressions",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "inversion",
    title: "Inversion",
    subtitle: "Master formal and emphatic sentence structures",
    description: "Learn to use inversion for emphasis and formal writing. Master negative inversion, conditional inversion, and other advanced sentence structures.",
    difficulty: "advanced",
    egInUseUnits: "118-120",
    keyActivity: "Academic writing with inversion patterns",
    japanesePainPoint: "Japanese word order differs significantly from English inversion",
    estimatedTime: 150,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-12",
        title: "Preview Quiz: Inversion",
        type: "preview",
        content: "Test your understanding of inversion patterns",
        exercises: [
          {
            id: "preview-12-1",
            type: "multiple-choice",
            question: "Which sentence uses inversion?",
            options: [
              "I have never seen such beauty",
              "Never have I seen such beauty",
              "I never have seen such beauty",
              "Never I have seen such beauty"
            ],
            correctAnswer: "Never have I seen such beauty",
            explanation: "Negative inversion for emphasis",
            completed: false
          },
          {
            id: "preview-12-2",
            type: "multiple-choice",
            question: "What type of inversion is 'Had I known, I would have helped'?",
            options: [
              "Negative inversion",
              "Conditional inversion",
              "Question inversion",
              "Emphatic inversion"
            ],
            correctAnswer: "Conditional inversion",
            explanation: "Inverted conditional without 'if'",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-12",
        title: "Mini-Lecture: Inversion Types",
        type: "lecture",
        content: "Learn the different types of inversion and when to use them",
        exercises: [
          {
            id: "lecture-12-1",
            type: "multiple-choice",
            question: "When do we use negative inversion?",
            options: [
              "For questions only",
              "For emphasis with negative expressions",
              "For formal writing only",
              "For conditional sentences only"
            ],
            correctAnswer: "For emphasis with negative expressions",
            explanation: "Negative inversion emphasizes negative expressions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-12",
        title: "Guided Practice: Inversion Construction",
        type: "practice",
        content: "Practice constructing sentences with inversion",
        exercises: [
          {
            id: "practice-12-1",
            type: "transformation",
            question: "Use inversion: 'I rarely go to the cinema'",
            correctAnswer: "Rarely do I go to the cinema",
            explanation: "Negative inversion with 'rarely'",
            completed: false
          },
          {
            id: "practice-12-2",
            type: "cloze",
            question: "___ (be) it not for your help, I ___ (fail) the exam.",
            correctAnswer: "Were, would have failed",
            explanation: "Inverted conditional with 'were it not for'",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-12",
        title: "Real-life Task: Academic Writing",
        type: "task",
        content: "Write academic paragraphs using various inversion patterns",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "ellipsis-substitution",
    title: "Ellipsis & Substitution",
    subtitle: "Master natural spoken English patterns",
    description: "Learn to use ellipsis and substitution to make your English sound more natural. Understand when to omit words and how to substitute for previously mentioned items.",
    difficulty: "advanced",
    egInUseUnits: "145-150",
    keyActivity: "Natural conversation recording and analysis",
    japanesePainPoint: "Japanese ellipsis patterns differ from English",
    estimatedTime: 120,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-13",
        title: "Preview Quiz: Ellipsis & Substitution",
        type: "preview",
        content: "Test your understanding of ellipsis and substitution",
        exercises: [
          {
            id: "preview-13-1",
            type: "multiple-choice",
            question: "What is omitted in 'I can speak French, but she can't'?",
            options: [
              "speak French",
              "can speak",
              "speak",
              "French"
            ],
            correctAnswer: "speak French",
            explanation: "Ellipsis omits repeated information",
            completed: false
          },
          {
            id: "preview-13-2",
            type: "multiple-choice",
            question: "What does 'one' substitute for in 'I like the red car, but she likes the blue one'?",
            options: [
              "car",
              "red car",
              "blue car",
              "color"
            ],
            correctAnswer: "car",
            explanation: "One substitutes for countable nouns",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-13",
        title: "Mini-Lecture: Natural Speech Patterns",
        type: "lecture",
        content: "Learn how ellipsis and substitution make speech more natural",
        exercises: [
          {
            id: "lecture-13-1",
            type: "multiple-choice",
            question: "When can we omit the subject and auxiliary verb?",
            options: [
              "In formal writing",
              "In informal speech",
              "In questions only",
              "Never"
            ],
            correctAnswer: "In informal speech",
            explanation: "Ellipsis is common in informal spoken English",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-13",
        title: "Guided Practice: Natural Speech",
        type: "practice",
        content: "Practice using ellipsis and substitution in conversation",
        exercises: [
          {
            id: "practice-13-1",
            type: "transformation",
            question: "Make more natural: 'I am going to the store, and she is going to the store too'",
            correctAnswer: "I'm going to the store, and she is too",
            explanation: "Use ellipsis to avoid repetition",
            completed: false
          },
          {
            id: "practice-13-2",
            type: "cloze",
            question: "I like this book, but I don't like that ___ (one). She can speak French, but I ___ (can't).",
            correctAnswer: "one, can't",
            explanation: "Use substitution and ellipsis for natural speech",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-13",
        title: "Real-life Task: Natural Conversation",
        type: "task",
        content: "Record and analyze natural conversation using ellipsis and substitution",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "collocations",
    title: "Collocations",
    subtitle: "Master natural word combinations",
    description: "Learn common word combinations that sound natural to native speakers. Understand which words go together and avoid unnatural combinations.",
    difficulty: "intermediate",
    egInUseUnits: "150-160",
    keyActivity: "Collocation matching game and creative writing",
    japanesePainPoint: "Direct translation often creates unnatural combinations",
    estimatedTime: 110,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-14",
        title: "Preview Quiz: Collocations",
        type: "preview",
        content: "Test your knowledge of common collocations",
        exercises: [
          {
            id: "preview-14-1",
            type: "multiple-choice",
            question: "Which collocation is correct?",
            options: [
              "make a mistake",
              "do a mistake",
              "have a mistake",
              "take a mistake"
            ],
            correctAnswer: "make a mistake",
            explanation: "Make is the correct verb for mistake",
            completed: false
          },
          {
            id: "preview-14-2",
            type: "multiple-choice",
            question: "Which adjective goes with 'opportunity'?",
            options: [
              "big opportunity",
              "large opportunity",
              "great opportunity",
              "All of the above"
            ],
            correctAnswer: "All of the above",
            explanation: "All these adjectives can collocate with opportunity",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-14",
        title: "Mini-Lecture: Collocation Types",
        type: "lecture",
        content: "Learn different types of collocations and how to use them",
        exercises: [
          {
            id: "lecture-14-1",
            type: "multiple-choice",
            question: "What type of collocation is 'heavy rain'?",
            options: [
              "Verb + noun",
              "Adjective + noun",
              "Adverb + adjective",
              "Noun + noun"
            ],
            correctAnswer: "Adjective + noun",
            explanation: "Heavy rain is an adjective + noun collocation",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-14",
        title: "Guided Practice: Collocation Usage",
        type: "practice",
        content: "Practice using common collocations correctly",
        exercises: [
          {
            id: "practice-14-1",
            type: "transformation",
            question: "Correct: 'I did a big mistake'",
            correctAnswer: "I made a big mistake",
            explanation: "Use make with mistake, not do",
            completed: false
          },
          {
            id: "practice-14-2",
            type: "cloze",
            question: "I ___ (take) a decision. She ___ (pay) attention to the details.",
            correctAnswer: "made, paid",
            explanation: "Make a decision, pay attention are correct collocations",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-14",
        title: "Real-life Task: Creative Writing",
        type: "task",
        content: "Write creative pieces using rich collocations",
        exercises: [],
        completed: false
      }
    ]
  }
]

export function ComprehensiveGrammar() {
  const [selectedModule, setSelectedModule] = useState<GrammarModule | null>(null)
  const [currentLesson, setCurrentLesson] = useState<GrammarLesson | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [exerciseResults, setExerciseResults] = useState<Record<string, { isCorrect: boolean; showExplanation: boolean }>>({})
  const [showResults, setShowResults] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const calculateOverallProgress = () => {
    const totalModules = grammarModules.length
    const completedModules = grammarModules.filter(m => m.completed).length
    return Math.round((completedModules / totalModules) * 100)
  }

  const handleModuleSelect = (module: GrammarModule) => {
    setSelectedModule(module)
    setCurrentLesson(null)
    setActiveTab("module")
  }

  const handleLessonSelect = (lesson: GrammarLesson) => {
    setCurrentLesson(lesson)
    setActiveTab("lesson")
  }

  const handleAnswerSubmit = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }))
  }

  const checkAnswer = (exerciseId: string) => {
    const exercise = currentLesson?.exercises.find(ex => ex.id === exerciseId)
    const userAnswer = userAnswers[exerciseId]
    
    if (!exercise || !userAnswer) return
    
    let isCorrect = false
    
    // 正解判定ロジック
    if (exercise.type === 'multiple-choice') {
      isCorrect = userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase()
    } else if (exercise.type === 'cloze') {
      // 複数の正解がある場合（カンマ区切り）
      const correctAnswers = exercise.correctAnswer.split(',').map(ans => ans.trim().toLowerCase())
      isCorrect = correctAnswers.some(correct => 
        userAnswer.trim().toLowerCase().includes(correct) || 
        correct.includes(userAnswer.trim().toLowerCase())
      )
    } else if (exercise.type === 'transformation' || exercise.type === 'error-correction' || exercise.type === 'translation') {
      // 部分一致で判定（キーワードベース）
      const userWords = userAnswer.trim().toLowerCase().split(/\s+/)
      const correctWords = exercise.correctAnswer.trim().toLowerCase().split(/\s+/)
      const matchingWords = userWords.filter(word => correctWords.includes(word))
      isCorrect = matchingWords.length >= Math.min(userWords.length, correctWords.length) * 0.7 // 70%以上一致
    }
    
    setExerciseResults(prev => ({
      ...prev,
      [exerciseId]: { isCorrect, showExplanation: true }
    }))

    // 演習の完了状態を更新
    if (currentLesson) {
      const updatedExercises = currentLesson.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      )
      
      // レッスンの完了状態をチェック
      const allCompleted = updatedExercises.every(ex => ex.completed)
      if (allCompleted && !currentLesson.completed) {
        // レッスン完了時の処理
        console.log(`Lesson ${currentLesson.id} completed!`)
      }
    }
  }

  const resetExercise = (exerciseId: string) => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[exerciseId]
      return newAnswers
    })
    setExerciseResults(prev => {
      const newResults = { ...prev }
      delete newResults[exerciseId]
      return newResults
    })
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = isMuted ? 0 : 1
      
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Comprehensive Grammar Course</span>
          </CardTitle>
          <CardDescription>
            Master English grammar through interactive lessons based on English Grammar in Use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Course Overview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Course Progress</h3>
                <Badge variant="outline">{calculateOverallProgress()}% Complete</Badge>
              </div>
              <Progress value={calculateOverallProgress()} className="w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{grammarModules.length}</div>
                  <div className="text-sm text-slate-600">Total Modules</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {grammarModules.filter(m => m.completed).length}
                  </div>
                  <div className="text-sm text-slate-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {grammarModules.filter(m => m.progress > 0 && !m.completed).length}
                  </div>
                  <div className="text-sm text-slate-600">In Progress</div>
                </div>
              </div>
            </div>

            {/* Module Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Grammar Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grammarModules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedModule?.id === module.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleModuleSelect(module)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-slate-900 line-clamp-2">{module.title}</h4>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{module.subtitle}</p>
                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="flex items-center space-x-4">
                        <span>EG Units: {module.egInUseUnits}</span>
                        <span>•</span>
                        <span>{module.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3" />
                        <span className="line-clamp-1">{module.japanesePainPoint}</span>
                      </div>
                    </div>
                    {module.progress > 0 && (
                      <div className="mt-3">
                        <Progress value={module.progress} className="h-2" />
                        <div className="text-xs text-slate-500 mt-1">{module.progress}% complete</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Module Details */}
            {selectedModule && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{selectedModule.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedModule(null)}
                  >
                    ← Back to Modules
                  </Button>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Activity</h4>
                  <p className="text-sm text-slate-600 mb-3">{selectedModule.keyActivity}</p>
                  
                  <h4 className="font-semibold mb-2">Japanese Pain Point</h4>
                  <p className="text-sm text-slate-600 mb-3">{selectedModule.japanesePainPoint}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>English Grammar in Use Units: {selectedModule.egInUseUnits}</span>
                    <span>•</span>
                    <span>Estimated Time: {selectedModule.estimatedTime} minutes</span>
                  </div>
                </div>

                {/* Lessons */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Lessons</h4>
                  {selectedModule.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        currentLesson?.id === lesson.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {lesson.completed ? <CheckCircle className="w-4 h-4" /> : 
                             lesson.type === 'preview' ? <Eye className="w-4 h-4" /> :
                             lesson.type === 'lecture' ? <BookOpen className="w-4 h-4" /> :
                             lesson.type === 'practice' ? <PenTool className="w-4 h-4" /> :
                             lesson.type === 'task' ? <MessageSquare className="w-4 h-4" /> :
                             <Clock className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{lesson.title}</div>
                            <div className="text-xs text-slate-500 capitalize">{lesson.type}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Lesson */}
            {currentLesson && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{currentLesson.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentLesson(null)}
                  >
                    ← Back to Module
                  </Button>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">{currentLesson.content}</p>
                </div>

                {/* Exercises */}
                {currentLesson.exercises.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Exercises</h4>
                    {currentLesson.exercises.map((exercise) => {
                      const result = exerciseResults[exercise.id]
                      const userAnswer = userAnswers[exercise.id]
                      
                      return (
                        <Card key={exercise.id}>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">{exercise.question}</Label>
                                
                                {exercise.type === 'multiple-choice' && exercise.options && (
                                  <div className="space-y-2 mt-2">
                                    {exercise.options.map((option, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <input
                                          type="radio"
                                          name={exercise.id}
                                          value={option}
                                          onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                          className="w-4 h-4"
                                          disabled={result?.showExplanation}
                                        />
                                        <Label className={`text-sm ${result?.showExplanation && option === exercise.correctAnswer ? 'font-bold text-green-600' : ''}`}>
                                          {option}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {exercise.type === 'cloze' && (
                                  <Input
                                    placeholder="Enter your answer"
                                    value={userAnswer || ''}
                                    onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                    className={`mt-2 ${result?.showExplanation ? (result.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}`}
                                    disabled={result?.showExplanation}
                                  />
                                )}
                                
                                {exercise.type === 'transformation' && (
                                  <Textarea
                                    placeholder="Enter your transformed sentence"
                                    value={userAnswer || ''}
                                    onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                    className={`mt-2 ${result?.showExplanation ? (result.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}`}
                                    disabled={result?.showExplanation}
                                  />
                                )}

                                {exercise.type === 'error-correction' && (
                                  <Textarea
                                    placeholder="Enter your corrected sentence"
                                    value={userAnswer || ''}
                                    onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                    className={`mt-2 ${result?.showExplanation ? (result.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}`}
                                    disabled={result?.showExplanation}
                                  />
                                )}

                                {exercise.type === 'translation' && (
                                  <Textarea
                                    placeholder="Enter your translation"
                                    value={userAnswer || ''}
                                    onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                    className={`mt-2 ${result?.showExplanation ? (result.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}`}
                                    disabled={result?.showExplanation}
                                  />
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2">
                                {!result?.showExplanation && userAnswer && (
                                  <Button
                                    size="sm"
                                    onClick={() => checkAnswer(exercise.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Check Answer
                                  </Button>
                                )}
                                
                                {result?.showExplanation && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => resetExercise(exercise.id)}
                                  >
                                    Try Again
                                  </Button>
                                )}
                              </div>
                              
                              {/* Result Display */}
                              {result?.showExplanation && (
                                <div className={`p-4 rounded-lg border-2 ${
                                  result.isCorrect 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-red-50 border-red-200'
                                }`}>
                                  <div className="flex items-center space-x-2 mb-3">
                                    {result.isCorrect ? (
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                      <XCircle className="w-5 h-5 text-red-600" />
                                    )}
                                    <span className={`font-medium ${
                                      result.isCorrect ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                      {result.isCorrect ? 'Correct!' : 'Incorrect'}
                                    </span>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div>
                                      <span className="text-sm font-medium text-slate-700">Your answer:</span>
                                      <p className="text-sm text-slate-600 mt-1">{userAnswer}</p>
                                    </div>
                                    
                                    <div>
                                      <span className="text-sm font-medium text-slate-700">Correct answer:</span>
                                      <p className="text-sm text-slate-600 mt-1">{exercise.correctAnswer}</p>
                                    </div>
                                    
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Lightbulb className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">Explanation</span>
                                      </div>
                                      <p className="text-sm text-blue-800">{exercise.explanation}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speakText(currentLesson.content)}
                      disabled={isReading}
                    >
                      {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {isReading ? 'Stop' : 'Listen'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Bookmark
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 