"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Eye, CheckCircle, XCircle, Volume2, Target } from "lucide-react"

interface WordDefinition {
  word: string
  definition: string
  pronunciation: string
  example: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface ReadingPassage {
  id: string
  title: string
  content: string
  difficulty: "beginner" | "intermediate" | "advanced"
  wordCount: number
  estimatedTime: number
  vocabulary: WordDefinition[]
  comprehensionQuestions: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }[]
}

export function InteractiveReading() {
  const [selectedWord, setSelectedWord] = useState<WordDefinition | null>(null)
  const [showDefinitions, setShowDefinitions] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null)

  const samplePassage: ReadingPassage = {
    id: "1",
    title: "Yuhki Yamashita's Design Philosophy: Embracing the Mess",
    content: `Yuhki Yamashita's design philosophy centers around embracing the inherent messiness of digital products and rethinking traditional workflows. His approach challenges conventional design thinking and offers a fresh perspective on how to build better products.

Unlike linear design processes, Yamashita urges designers to "embrace the mess" of modern product development — where iteration, feedback, and rework are constant. He believes every product is perpetually a work in progress: designers should ship imperfect work, listen closely, and refine continuously.

Yamashita challenges the classic "research → sketch → prototype → test → ship" model, noting it rarely reflects real-world complexity. Instead, he encourages frequent check-ins and structured feedback rituals that bring alignment and confidence despite uncertainty. He introduces "flashtags" like #fyi, #suggestion, and #plea to signal feedback's weight—so it's respected without stalling progress.

Storytelling is central to his approach—Yamashita applies it from team briefings to career coaching. He encourages designers to think like screen-readers: if a screen reader narrates your UI, is the structure and hierarchy clear? This focus on accessibility and user empathy drives better design decisions.

As detailed by former Figma VP Sho Kuwamoto, Yamashita promotes a service mindset: treat design tooling like hospitality—prioritizing how users feel and work. It's about crafting an experience that feels polished, intuitive, and even delightful. He stresses that "feel" or polish—fluidity, responsiveness, intuitive keyboard shortcuts—can make or break adoption.

Yamashita champions the blurring of silos between design, PMs, and engineers: collaborative edits and real-time feedback enable richer cross-functional work. This fluid integration of roles empowers teams to build products that evolve naturally—and feel great while doing so.`,
    difficulty: "advanced",
    wordCount: 245,
    estimatedTime: 8,
    vocabulary: [
      {
        word: "philosophy",
        definition: "A theory or attitude that acts as a guiding principle for behavior",
        pronunciation: "/fɪˈlɒsəfi/",
        example: "His design philosophy emphasizes user-centered thinking.",
        difficulty: "intermediate"
      },
      {
        word: "inherent",
        definition: "Existing in something as a permanent, essential, or characteristic attribute",
        pronunciation: "/ɪnˈhɪərənt/",
        example: "The inherent complexity of modern software development.",
        difficulty: "advanced"
      },
      {
        word: "workflow",
        definition: "The sequence of industrial, administrative, or other processes through which a piece of work passes",
        pronunciation: "/ˈwɜːkfləʊ/",
        example: "We need to streamline our workflow to improve efficiency.",
        difficulty: "intermediate"
      },
      {
        word: "iteration",
        definition: "The repetition of a process or utterance",
        pronunciation: "/ˌɪtəˈreɪʃən/",
        example: "Product development involves many iterations before final release.",
        difficulty: "intermediate"
      },
      {
        word: "perpetually",
        definition: "In a way that never ends or changes; constantly",
        pronunciation: "/pəˈpetʃuəli/",
        example: "Technology is perpetually evolving.",
        difficulty: "advanced"
      },
      {
        word: "silos",
        definition: "Isolated departments within an organization",
        pronunciation: "/ˈsaɪləʊz/",
        example: "Breaking down silos between teams improves collaboration.",
        difficulty: "intermediate"
      },
      {
        word: "accessibility",
        definition: "The quality of being easily reached, entered, or used by people with disabilities",
        pronunciation: "/əkˌsesəˈbɪləti/",
        example: "Web accessibility is crucial for inclusive design.",
        difficulty: "intermediate"
      },
      {
        word: "hierarchy",
        definition: "A system or organization in which people or groups are ranked one above the other",
        pronunciation: "/ˈhaɪərɑːki/",
        example: "Clear information hierarchy helps users navigate websites.",
        difficulty: "intermediate"
      },
      {
        word: "empathy",
        definition: "The ability to understand and share the feelings of another",
        pronunciation: "/ˈempəθi/",
        example: "Designers need empathy to create user-centered solutions.",
        difficulty: "intermediate"
      },
      {
        word: "collaboration",
        definition: "The action of working with someone to produce something",
        pronunciation: "/kəˌlæbəˈreɪʃən/",
        example: "Effective collaboration between designers and developers is essential.",
        difficulty: "intermediate"
      },
      {
        word: "innovation",
        definition: "A new method, idea, or product",
        pronunciation: "/ˌɪnəˈveɪʃən/",
        example: "The company is known for its culture of innovation.",
        difficulty: "intermediate"
      },
      {
        word: "prototype",
        definition: "A first or preliminary version of a device or vehicle",
        pronunciation: "/ˈprəʊtətaɪp/",
        example: "We built a prototype to test our design concept.",
        difficulty: "intermediate"
      },
      {
        word: "usability",
        definition: "The degree to which something is able or fit to be used",
        pronunciation: "/ˌjuːzəˈbɪləti/",
        example: "Usability testing revealed several issues with the interface.",
        difficulty: "intermediate"
      },
      {
        word: "interface",
        definition: "A point where two systems, subjects, organizations, etc. meet and interact",
        pronunciation: "/ˈɪntəfeɪs/",
        example: "The user interface needs to be more intuitive.",
        difficulty: "intermediate"
      },
      {
        word: "intuitive",
        definition: "Using or based on what one feels to be true even without conscious reasoning",
        pronunciation: "/ɪnˈtjuːɪtɪv/",
        example: "The app has an intuitive design that users love.",
        difficulty: "intermediate"
      },
      {
        word: "responsive",
        definition: "Reacting quickly and positively",
        pronunciation: "/rɪˈspɒnsɪv/",
        example: "The website is responsive and works well on mobile devices.",
        difficulty: "intermediate"
      },
      {
        word: "scalable",
        definition: "Able to be changed in size or scale",
        pronunciation: "/ˈskeɪləbəl/",
        example: "The solution needs to be scalable to handle future growth.",
        difficulty: "advanced"
      },
      {
        word: "optimization",
        definition: "The action of making the best or most effective use of a situation or resource",
        pronunciation: "/ˌɒptɪmaɪˈzeɪʃən/",
        example: "Performance optimization is crucial for user experience.",
        difficulty: "advanced"
      },
      {
        word: "integration",
        definition: "The action or process of integrating",
        pronunciation: "/ˌɪntɪˈɡreɪʃən/",
        example: "The integration of new features was seamless.",
        difficulty: "intermediate"
      },
      {
        word: "framework",
        definition: "An essential supporting structure of a building, vehicle, or object",
        pronunciation: "/ˈfreɪmwɜːk/",
        example: "We use a modern framework for our web applications.",
        difficulty: "intermediate"
      },
      {
        word: "algorithm",
        definition: "A process or set of rules to be followed in calculations or other problem-solving operations",
        pronunciation: "/ˈælɡərɪðəm/",
        example: "The algorithm efficiently sorts the data.",
        difficulty: "advanced"
      },
      {
        word: "database",
        definition: "A structured set of data held in a computer",
        pronunciation: "/ˈdeɪtəbeɪs/",
        example: "The database stores all user information securely.",
        difficulty: "intermediate"
      },
      {
        word: "encryption",
        definition: "The process of converting information or data into a code",
        pronunciation: "/ɪnˈkrɪpʃən/",
        example: "Data encryption ensures user privacy.",
        difficulty: "advanced"
      },
      {
        word: "authentication",
        definition: "The process or action of verifying the identity of a user or process",
        pronunciation: "/ɔːˌθentɪˈkeɪʃən/",
        example: "Two-factor authentication adds extra security.",
        difficulty: "advanced"
      },
      {
        word: "deployment",
        definition: "The action of bringing resources into effective action",
        pronunciation: "/dɪˈplɔɪmənt/",
        example: "The deployment process is fully automated.",
        difficulty: "intermediate"
      },
      {
        word: "monitoring",
        definition: "The action of observing and checking the progress or quality of something",
        pronunciation: "/ˈmɒnɪtərɪŋ/",
        example: "System monitoring helps prevent downtime.",
        difficulty: "intermediate"
      },
      {
        word: "analytics",
        definition: "The systematic computational analysis of data or statistics",
        pronunciation: "/ˌænəˈlɪtɪks/",
        example: "Analytics show that user engagement has increased.",
        difficulty: "intermediate"
      },
      {
        word: "metrics",
        definition: "A system or standard of measurement",
        pronunciation: "/ˈmetrɪks/",
        example: "We track key metrics to measure success.",
        difficulty: "intermediate"
      },
      {
        word: "benchmark",
        definition: "A standard or point of reference against which things may be compared",
        pronunciation: "/ˈbentʃmɑːk/",
        example: "We use industry benchmarks to evaluate performance.",
        difficulty: "intermediate"
      },
      {
        word: "stakeholder",
        definition: "A person with an interest or concern in something",
        pronunciation: "/ˈsteɪkhəʊldə/",
        example: "All stakeholders were consulted before the decision.",
        difficulty: "intermediate"
      },
      {
        word: "milestone",
        definition: "An action or event marking a significant change or stage in development",
        pronunciation: "/ˈmaɪlstəʊn/",
        example: "Reaching this milestone was a major achievement.",
        difficulty: "intermediate"
      },
      {
        word: "deadline",
        definition: "The latest time or date by which something should be completed",
        pronunciation: "/ˈdedlaɪn/",
        example: "We need to meet the project deadline.",
        difficulty: "beginner"
      },
      {
        word: "priority",
        definition: "A thing that is regarded as more important than others",
        pronunciation: "/praɪˈɒrəti/",
        example: "User experience is our top priority.",
        difficulty: "intermediate"
      },
      {
        word: "feedback",
        definition: "Information about reactions to a product, a person's performance of a task",
        pronunciation: "/ˈfiːdbæk/",
        example: "We received positive feedback from users.",
        difficulty: "intermediate"
      },
      {
        word: "iteration",
        definition: "The repetition of a process or utterance",
        pronunciation: "/ˌɪtəˈreɪʃən/",
        example: "Each iteration improves the product.",
        difficulty: "intermediate"
      },
      {
        word: "refinement",
        definition: "The improvement or clarification of something by the making of small changes",
        pronunciation: "/rɪˈfaɪnmənt/",
        example: "The design went through several refinements.",
        difficulty: "advanced"
      },
      {
        word: "validation",
        definition: "The action of checking or proving the validity or accuracy of something",
        pronunciation: "/ˌvælɪˈdeɪʃən/",
        example: "User validation confirmed our assumptions.",
        difficulty: "advanced"
      },
      {
        word: "hypothesis",
        definition: "A supposition or proposed explanation made on the basis of limited evidence",
        pronunciation: "/haɪˈpɒθəsɪs/",
        example: "We tested our hypothesis with user research.",
        difficulty: "advanced"
      },
      {
        word: "research",
        definition: "The systematic investigation into and study of materials and sources",
        pronunciation: "/rɪˈsɜːtʃ/",
        example: "Market research informed our product strategy.",
        difficulty: "intermediate"
      },
      {
        word: "strategy",
        definition: "A plan of action designed to achieve a long-term or overall aim",
        pronunciation: "/ˈstrætədʒi/",
        example: "Our strategy focuses on user-centered design.",
        difficulty: "intermediate"
      },
      {
        word: "tactics",
        definition: "An action or strategy carefully planned to achieve a specific end",
        pronunciation: "/ˈtæktɪks/",
        example: "We used different tactics to reach our goals.",
        difficulty: "intermediate"
      },
      {
        word: "objective",
        definition: "A thing aimed at or sought; a goal",
        pronunciation: "/əbˈdʒektɪv/",
        example: "Our objective is to improve user satisfaction.",
        difficulty: "intermediate"
      },
      {
        word: "outcome",
        definition: "A result or effect of an action or situation",
        pronunciation: "/ˈaʊtkʌm/",
        example: "The outcome exceeded our expectations.",
        difficulty: "intermediate"
      },
      {
        word: "impact",
        definition: "A marked effect or influence",
        pronunciation: "/ˈɪmpækt/",
        example: "The new feature had a positive impact on engagement.",
        difficulty: "intermediate"
      },
      {
        word: "engagement",
        definition: "The act of engaging or the state of being engaged",
        pronunciation: "/ɪnˈɡeɪdʒmənt/",
        example: "User engagement increased by 25%.",
        difficulty: "intermediate"
      },
      {
        word: "retention",
        definition: "The continued possession, use, or control of something",
        pronunciation: "/rɪˈtenʃən/",
        example: "Customer retention is crucial for business growth.",
        difficulty: "intermediate"
      },
      {
        word: "conversion",
        definition: "The process of changing or causing something to change from one form to another",
        pronunciation: "/kənˈvɜːʃən/",
        example: "The conversion rate improved after the redesign.",
        difficulty: "intermediate"
      },
      {
        word: "revenue",
        definition: "Income, especially when of a company or organization",
        pronunciation: "/ˈrevənjuː/",
        example: "Revenue increased by 30% this quarter.",
        difficulty: "intermediate"
      },
      {
        word: "profitability",
        definition: "The degree to which a business or activity yields profit or financial gain",
        pronunciation: "/ˌprɒfɪtəˈbɪləti/",
        example: "Profitability improved after cost optimization.",
        difficulty: "advanced"
      },
      {
        word: "efficiency",
        definition: "The state or quality of being efficient",
        pronunciation: "/ɪˈfɪʃənsi/",
        example: "The new process improved efficiency by 40%.",
        difficulty: "intermediate"
      },
      {
        word: "productivity",
        definition: "The effectiveness of productive effort",
        pronunciation: "/ˌprɒdʌkˈtɪvəti/",
        example: "Productivity tools help teams work better.",
        difficulty: "intermediate"
      },
      {
        word: "workflow",
        definition: "The sequence of industrial, administrative, or other processes",
        pronunciation: "/ˈwɜːkfləʊ/",
        example: "We streamlined the workflow to save time.",
        difficulty: "intermediate"
      },
      {
        word: "automation",
        definition: "The use of largely automatic equipment in a system of operation",
        pronunciation: "/ˌɔːtəˈmeɪʃən/",
        example: "Automation reduced manual errors significantly.",
        difficulty: "intermediate"
      },
      {
        word: "streamline",
        definition: "Design or provide with a form that presents very little resistance to a flow of air or water",
        pronunciation: "/ˈstriːmlaɪn/",
        example: "We streamlined the user interface for better usability.",
        difficulty: "intermediate"
      },
      {
        word: "optimize",
        definition: "Make the best or most effective use of a situation or resource",
        pronunciation: "/ˈɒptɪmaɪz/",
        example: "We optimized the code for better performance.",
        difficulty: "advanced"
      },
      {
        word: "leverage",
        definition: "Use something to maximum advantage",
        pronunciation: "/ˈliːvərɪdʒ/",
        example: "We leverage data to make better decisions.",
        difficulty: "advanced"
      },
      {
        word: "synergy",
        definition: "The interaction of elements that when combined produce a total effect",
        pronunciation: "/ˈsɪnədʒi/",
        example: "The synergy between design and engineering created excellent results.",
        difficulty: "advanced"
      },
      {
        word: "collaborative",
        definition: "Produced by or involving two or more parties working together",
        pronunciation: "/kəˈlæbərətɪv/",
        example: "The collaborative approach led to better solutions.",
        difficulty: "intermediate"
      },
      {
        word: "innovative",
        definition: "Featuring new methods or ideas",
        pronunciation: "/ˈɪnəveɪtɪv/",
        example: "The innovative design won several awards.",
        difficulty: "intermediate"
      },
      {
        word: "disruptive",
        definition: "Causing or tending to cause disruption",
        pronunciation: "/dɪsˈrʌptɪv/",
        example: "Disruptive technology changed the industry.",
        difficulty: "advanced"
      },
      {
        word: "sustainable",
        definition: "Able to be maintained at a certain rate or level",
        pronunciation: "/səˈsteɪnəbəl/",
        example: "We focus on sustainable business practices.",
        difficulty: "intermediate"
      },
      {
        word: "scalable",
        definition: "Able to be changed in size or scale",
        pronunciation: "/ˈskeɪləbəl/",
        example: "The solution is scalable for future growth.",
        difficulty: "advanced"
      },
      {
        word: "robust",
        definition: "Strong and healthy; vigorous",
        pronunciation: "/rəʊˈbʌst/",
        example: "The robust system handles high traffic well.",
        difficulty: "intermediate"
      },
      {
        word: "reliable",
        definition: "Consistently good in quality or performance",
        pronunciation: "/rɪˈlaɪəbəl/",
        example: "The reliable service has 99.9% uptime.",
        difficulty: "intermediate"
      },
      {
        word: "secure",
        definition: "Protected against or not exposed to danger or risk",
        pronunciation: "/sɪˈkjʊə/",
        example: "The secure platform protects user data.",
        difficulty: "intermediate"
      },
      {
        word: "transparent",
        definition: "Easy to perceive or detect",
        pronunciation: "/trænsˈpærənt/",
        example: "We maintain transparent communication with clients.",
        difficulty: "intermediate"
      },
      {
        word: "accountable",
        definition: "Required or expected to justify actions or decisions",
        pronunciation: "/əˈkaʊntəbəl/",
        example: "Everyone is accountable for their contributions.",
        difficulty: "intermediate"
      },
      {
        word: "proactive",
        definition: "Creating or controlling a situation rather than just responding to it",
        pronunciation: "/prəʊˈæktɪv/",
        example: "We take a proactive approach to problem-solving.",
        difficulty: "advanced"
      },
      {
        word: "adaptive",
        definition: "Able to adjust to new conditions",
        pronunciation: "/əˈdæptɪv/",
        example: "The adaptive interface responds to user needs.",
        difficulty: "intermediate"
      },
      {
        word: "flexible",
        definition: "Able to bend easily without breaking",
        pronunciation: "/ˈfleksəbəl/",
        example: "The flexible system accommodates various requirements.",
        difficulty: "intermediate"
      },
      {
        word: "modular",
        definition: "Employing or involving a module or modules as the basis of design or construction",
        pronunciation: "/ˈmɒdjʊlə/",
        example: "The modular architecture allows easy customization.",
        difficulty: "advanced"
      },
      {
        word: "comprehensive",
        definition: "Complete; including all or nearly all elements or aspects of something",
        pronunciation: "/ˌkɒmprɪˈhensɪv/",
        example: "The comprehensive solution addresses all user needs.",
        difficulty: "intermediate"
      },
      {
        word: "holistic",
        definition: "Characterized by comprehension of the parts of something as intimately interconnected",
        pronunciation: "/həʊˈlɪstɪk/",
        example: "We take a holistic approach to user experience.",
        difficulty: "advanced"
      }
    ],
    comprehensionQuestions: [
      {
        question: "What is the main principle of Yamashita's design philosophy?",
        options: [
          "Following strict design processes",
          "Embracing the messiness of digital products",
          "Avoiding iteration and feedback",
          "Working in isolation from other teams"
        ],
        correct: 1,
        explanation: "Yamashita's philosophy centers around embracing the inherent messiness of digital products and rethinking traditional workflows."
      },
      {
        question: "What does Yamashita suggest about the traditional design process?",
        options: [
          "It should be followed strictly",
          "It rarely reflects real-world complexity",
          "It's perfect for modern development",
          "It eliminates the need for feedback"
        ],
        correct: 1,
        explanation: "He challenges the classic 'research → sketch → prototype → test → ship' model, noting it rarely reflects real-world complexity."
      },
      {
        question: "What are 'flashtags' used for in Yamashita's approach?",
        options: [
          "Social media marketing",
          "Signaling the weight of feedback",
          "Organizing design files",
          "Tracking project progress"
        ],
        correct: 1,
        explanation: "He introduces 'flashtags' like #fyi, #suggestion, and #plea to signal feedback's weight—so it's respected without stalling progress."
      }
    ]
  }

  const readingPassages: ReadingPassage[] = [samplePassage]

  // Set initial passage when component mounts
  useEffect(() => {
    if (!selectedPassage && readingPassages.length > 0) {
      setSelectedPassage(readingPassages[0])
    }
  }, [readingPassages])

  const handleWordClick = (word: string) => {
    if (!selectedPassage) return
    const definition = selectedPassage.vocabulary.find(v => v.word.toLowerCase() === word.toLowerCase())
    if (definition) {
      setSelectedWord(definition)
    }
  }

  const highlightVocabulary = (text: string) => {
    if (!selectedPassage) return text
    const words = text.split(' ')
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '')
      const isVocabulary = selectedPassage.vocabulary.some(v => 
        v.word.toLowerCase() === cleanWord.toLowerCase()
      )
      
      if (isVocabulary) {
        return (
          <span
            key={index}
            className="cursor-pointer text-blue-600 hover:text-blue-800 underline decoration-dotted"
            onClick={() => handleWordClick(cleanWord)}
          >
            {word}{' '}
          </span>
        )
      }
      return <span key={index}>{word} </span>
    })
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)
  }

  const calculateScore = () => {
    if (!selectedPassage) return 0
    const correct = userAnswers.filter((answer, index) => 
      answer === selectedPassage.comprehensionQuestions[index].correct
    ).length
    return Math.round((correct / selectedPassage.comprehensionQuestions.length) * 100)
  }

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

  if (!selectedPassage) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading reading materials...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Interactive Reading</span>
          </CardTitle>
          <CardDescription>
            Click on highlighted words to see definitions and test your comprehension
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(selectedPassage.difficulty)}>
                  {selectedPassage.difficulty}
                </Badge>
                <span className="text-sm text-slate-600">
                  {selectedPassage.wordCount} words • {selectedPassage.estimatedTime} min read
                </span>
              </div>
              <Select value={selectedPassage.id} onValueChange={(value) => {
                const passage = readingPassages.find(p => p.id === value)
                if (passage) {
                  setSelectedPassage(passage)
                  setCurrentQuestion(0)
                  setUserAnswers([])
                  setShowResults(false)
                }
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select article" />
                </SelectTrigger>
                <SelectContent>
                  {readingPassages.map((passage) => (
                    <SelectItem key={passage.id} value={passage.id}>
                      {passage.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={showResults ? "quiz" : "reading"} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="quiz">Comprehension Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="reading" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedPassage.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDefinitions(!showDefinitions)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showDefinitions ? "Hide" : "Show"} Definitions
                    </Button>
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Read Aloud
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="text-lg leading-relaxed space-y-4">
                      {highlightVocabulary(selectedPassage.content)}
                    </div>
                  </div>
                  
                  {showDefinitions && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium mb-3">Vocabulary</h4>
                      <div className="space-y-2">
                        {selectedPassage.vocabulary.map((vocab, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {vocab.difficulty}
                            </Badge>
                            <div>
                              <span className="font-medium">{vocab.word}</span>
                              <span className="text-sm text-slate-600 ml-2">[{vocab.pronunciation}]</span>
                              <p className="text-sm text-slate-700">{vocab.definition}</p>
                              <p className="text-sm italic text-slate-600">"{vocab.example}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comprehension Quiz</CardTitle>
                  <CardDescription>
                    Test your understanding of the passage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showResults ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Question {currentQuestion + 1} of {selectedPassage.comprehensionQuestions.length}
                        </span>
                        <Progress 
                          value={((currentQuestion + 1) / selectedPassage.comprehensionQuestions.length) * 100} 
                          className="w-32"
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          {selectedPassage.comprehensionQuestions[currentQuestion].question}
                        </h3>
                        
                        <div className="space-y-2">
                          {selectedPassage.comprehensionQuestions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant={userAnswers[currentQuestion] === index ? "default" : "outline"}
                              className="w-full justify-start text-left h-auto p-4"
                              onClick={() => handleAnswerSelect(index)}
                            >
                              <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </Button>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            disabled={currentQuestion === 0}
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                          >
                            Previous
                          </Button>
                          
                          {currentQuestion < selectedPassage.comprehensionQuestions.length - 1 ? (
                            <Button
                              onClick={() => setCurrentQuestion(currentQuestion + 1)}
                              disabled={userAnswers[currentQuestion] === undefined}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setShowResults(true)}
                              disabled={userAnswers[currentQuestion] === undefined}
                            >
                              See Results
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {calculateScore()}%
                        </div>
                        <p className="text-slate-600">
                          You got {userAnswers.filter((answer, index) => 
                            answer === selectedPassage.comprehensionQuestions[index].correct
                          ).length} out of {selectedPassage.comprehensionQuestions.length} questions correct
                        </p>
                      </div>

                      <div className="space-y-4">
                        {selectedPassage.comprehensionQuestions.map((question, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start space-x-2 mb-2">
                              {userAnswers[index] === question.correct ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{question.question}</p>
                                <p className="text-sm text-slate-600 mt-1">
                                  Your answer: {question.options[userAnswers[index]]}
                                </p>
                                {userAnswers[index] !== question.correct && (
                                  <p className="text-sm text-green-600 mt-1">
                                    Correct: {question.options[question.correct]}
                                  </p>
                                )}
                                <p className="text-sm text-slate-500 mt-2">{question.explanation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setShowResults(false)
                          setCurrentQuestion(0)
                          setUserAnswers([])
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          {selectedWord && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedWord.word}</CardTitle>
                <CardDescription>[{selectedWord.pronunciation}]</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700">{selectedWord.definition}</p>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm italic text-slate-600">"{selectedWord.example}"</p>
                </div>
                <Badge className={getDifficultyColor(selectedWord.difficulty)}>
                  {selectedWord.difficulty}
                </Badge>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Reading Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Reading</span>
                  <span>15/20 min</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Articles</span>
                  <span>3/5 articles</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Comprehension</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
