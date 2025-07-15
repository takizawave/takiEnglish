"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Plus, Search, Volume2, VolumeX, Star, X, Play, Pause } from "lucide-react"

interface VocabToken {
  id: string
  word: string
  ipa: string
  definition: string
  example: string
  synonyms: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  mastery: number
  nextReview: string
  category: string
}

export function VocabularyManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentReadingWord, setCurrentReadingWord] = useState("")
  const [newToken, setNewToken] = useState({
    word: "",
    ipa: "",
    definition: "",
    example: "",
    synonyms: "",
    difficulty: "intermediate" as "beginner" | "intermediate" | "advanced",
    category: "noun"
  })

  const [tokens, setTokens] = useState<VocabToken[]>([
    {
      id: "1",
      word: "sophisticated",
      ipa: "/səˈfɪstɪkeɪtɪd/",
      definition: "Having great knowledge or experience",
      example: "She has sophisticated taste in art.",
      synonyms: ["refined", "cultured", "worldly"],
      difficulty: "advanced",
      mastery: 75,
      nextReview: "2024-01-16",
      category: "adjective",
    },
    {
      id: "2",
      word: "implement",
      ipa: "/ˈɪmpləmənt/",
      definition: "To put a decision or plan into effect",
      example: "We need to implement the new policy.",
      synonyms: ["execute", "carry out", "apply"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-01-15",
      category: "verb",
    },
    {
      id: "3",
      word: "paradigm",
      ipa: "/ˈpærədaɪm/",
      definition: "A typical example or pattern of something",
      example: "This represents a new paradigm in software development.",
      synonyms: ["model", "framework", "pattern"],
      difficulty: "advanced",
      mastery: 40,
      nextReview: "2024-01-14",
      category: "noun",
    },
    {
      id: "4",
      word: "efficiently",
      ipa: "/ɪˈfɪʃəntli/",
      definition: "In a way that achieves maximum productivity with minimum wasted effort",
      example: "The team worked efficiently to meet the deadline.",
      synonyms: ["effectively", "productively", "smoothly"],
      difficulty: "intermediate",
      mastery: 85,
      nextReview: "2024-01-17",
      category: "adverb",
    },
    {
      id: "5",
      word: "ourselves",
      ipa: "/aʊəˈselvz/",
      definition: "Used as the object of a verb or preposition when the subject is 'we'",
      example: "We need to challenge ourselves to grow.",
      synonyms: ["us", "we"],
      difficulty: "beginner",
      mastery: 90,
      nextReview: "2024-01-18",
      category: "pronoun",
    },
    {
      id: "6",
      word: "throughout",
      ipa: "/θruːˈaʊt/",
      definition: "In every part of; during the whole time of",
      example: "The theme runs throughout the entire book.",
      synonyms: ["across", "during", "over"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-01-19",
      category: "preposition",
    },
    {
      id: "7",
      word: "whereas",
      ipa: "/weərˈæz/",
      definition: "In contrast or comparison with the fact that",
      example: "He prefers tea, whereas I prefer coffee.",
      synonyms: ["while", "although", "though"],
      difficulty: "advanced",
      mastery: 55,
      nextReview: "2024-01-20",
      category: "conjunction",
    },
    {
      id: "8",
      word: "wow",
      ipa: "/waʊ/",
      definition: "Used to express surprise, admiration, or amazement",
      example: "Wow! That's an amazing result!",
      synonyms: ["amazing", "incredible", "fantastic"],
      difficulty: "beginner",
      mastery: 95,
      nextReview: "2024-01-21",
      category: "interjection",
    },
    {
      id: "9",
      word: "carry out",
      ipa: "/ˈkæri aʊt/",
      definition: "To perform or complete a task or duty",
      example: "The team carried out the research successfully.",
      synonyms: ["execute", "perform", "accomplish"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-01-22",
      category: "phrasal-verb",
    },
    {
      id: "10",
      word: "break the ice",
      ipa: "/breɪk ðə aɪs/",
      definition: "To initiate conversation in a social setting",
      example: "He told a joke to break the ice at the meeting.",
      synonyms: ["start conversation", "ease tension", "get things going"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-01-23",
      category: "idiom",
    },
    {
      id: "11",
      word: "heavy rain",
      ipa: "/ˈhevi reɪn/",
      definition: "Intense or substantial rainfall",
      example: "The heavy rain caused flooding in the area.",
      synonyms: ["downpour", "torrential rain", "pouring rain"],
      difficulty: "beginner",
      mastery: 80,
      nextReview: "2024-01-24",
      category: "collocation",
    },
    {
      id: "12",
      word: "philosophy",
      ipa: "/fɪˈlɒsəfi/",
      definition: "A theory or attitude that acts as a guiding principle for behavior",
      example: "His design philosophy emphasizes user-centered thinking.",
      synonyms: ["approach", "methodology", "principle"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-01-25",
      category: "noun",
    },
    {
      id: "13",
      word: "inherent",
      ipa: "/ɪnˈhɪərənt/",
      definition: "Existing in something as a permanent, essential, or characteristic attribute",
      example: "The inherent complexity of modern software development.",
      synonyms: ["intrinsic", "natural", "built-in"],
      difficulty: "advanced",
      mastery: 35,
      nextReview: "2024-01-26",
      category: "adjective",
    },
    {
      id: "14",
      word: "workflow",
      ipa: "/ˈwɜːkfləʊ/",
      definition: "The sequence of industrial, administrative, or other processes through which a piece of work passes",
      example: "We need to streamline our workflow to improve efficiency.",
      synonyms: ["process", "procedure", "system"],
      difficulty: "intermediate",
      mastery: 75,
      nextReview: "2024-01-27",
      category: "noun",
    },
    {
      id: "15",
      word: "iteration",
      ipa: "/ˌɪtəˈreɪʃən/",
      definition: "The repetition of a process or utterance",
      example: "Product development involves many iterations before final release.",
      synonyms: ["repetition", "cycle", "version"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-01-28",
      category: "noun",
    },
    {
      id: "16",
      word: "algorithm",
      ipa: "/ˈælɡərɪðəm/",
      definition: "A set of rules or procedures for solving a problem",
      example: "The search algorithm efficiently finds relevant results.",
      synonyms: ["procedure", "method", "process"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-01-29",
      category: "noun",
    },
    {
      id: "17",
      word: "sustainable",
      ipa: "/səˈsteɪnəbəl/",
      definition: "Able to be maintained at a certain rate or level",
      example: "We need to find sustainable solutions for energy production.",
      synonyms: ["maintainable", "enduring", "viable"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-01-30",
      category: "adjective",
    },
    {
      id: "18",
      word: "collaborate",
      ipa: "/kəˈlæbəreɪt/",
      definition: "To work jointly with others on an activity or project",
      example: "Teams collaborate effectively when communication is clear.",
      synonyms: ["cooperate", "work together", "partner"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-01-31",
      category: "verb",
    },
    {
      id: "19",
      word: "innovation",
      ipa: "/ˌɪnəˈveɪʃən/",
      definition: "A new method, idea, or product",
      example: "The company is known for its innovation in technology.",
      synonyms: ["creativity", "invention", "breakthrough"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-02-01",
      category: "noun",
    },
    {
      id: "20",
      word: "resilient",
      ipa: "/rɪˈzɪliənt/",
      definition: "Able to withstand or recover quickly from difficult conditions",
      example: "The resilient community rebuilt after the natural disaster.",
      synonyms: ["tough", "adaptable", "flexible"],
      difficulty: "advanced",
      mastery: 40,
      nextReview: "2024-02-02",
      category: "adjective",
    },
    {
      id: "21",
      word: "optimize",
      ipa: "/ˈɒptɪmaɪz/",
      definition: "To make the best or most effective use of a situation or resource",
      example: "We need to optimize our website for better performance.",
      synonyms: ["improve", "enhance", "maximize"],
      difficulty: "intermediate",
      mastery: 50,
      nextReview: "2024-02-03",
      category: "verb",
    },
    {
      id: "22",
      word: "framework",
      ipa: "/ˈfreɪmwɜːk/",
      definition: "A basic structure underlying a system or concept",
      example: "This framework provides guidelines for project management.",
      synonyms: ["structure", "system", "model"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-02-04",
      category: "noun",
    },
    {
      id: "23",
      word: "authentic",
      ipa: "/ɔːˈθentɪk/",
      definition: "Genuine or real; not false or copied",
      example: "The restaurant serves authentic Italian cuisine.",
      synonyms: ["genuine", "real", "original"],
      difficulty: "intermediate",
      mastery: 75,
      nextReview: "2024-02-05",
      category: "adjective",
    },
    {
      id: "24",
      word: "perspective",
      ipa: "/pəˈspektɪv/",
      definition: "A particular attitude towards or way of regarding something",
      example: "From my perspective, this approach makes the most sense.",
      synonyms: ["viewpoint", "outlook", "standpoint"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-02-06",
      category: "noun",
    },
    {
      id: "25",
      word: "leverage",
      ipa: "/ˈlevərɪdʒ/",
      definition: "To use something to maximum advantage",
      example: "We can leverage our existing relationships to expand the business.",
      synonyms: ["utilize", "exploit", "capitalize on"],
      difficulty: "advanced",
      mastery: 35,
      nextReview: "2024-02-07",
      category: "verb",
    },
    {
      id: "26",
      word: "synergy",
      ipa: "/ˈsɪnədʒi/",
      definition: "The interaction of elements that when combined produce a total effect greater than the sum of the individual elements",
      example: "The synergy between the two departments led to excellent results.",
      synonyms: ["collaboration", "cooperation", "partnership"],
      difficulty: "advanced",
      mastery: 30,
      nextReview: "2024-02-08",
      category: "noun",
    },
    {
      id: "27",
      word: "proactive",
      ipa: "/prəʊˈæktɪv/",
      definition: "Creating or controlling a situation rather than just responding to it",
      example: "A proactive approach to problem-solving prevents many issues.",
      synonyms: ["initiative", "forward-thinking", "preventive"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-02-09",
      category: "adjective",
    },
    {
      id: "28",
      word: "streamline",
      ipa: "/ˈstriːmlaɪn/",
      definition: "To make an organization or system more efficient by employing faster or simpler working methods",
      example: "We need to streamline our processes to reduce costs.",
      synonyms: ["simplify", "optimize", "efficientize"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-02-10",
      category: "verb",
    },
    {
      id: "29",
      word: "paradigm shift",
      ipa: "/ˈpærədaɪm ʃɪft/",
      definition: "A fundamental change in approach or underlying assumptions",
      example: "The internet caused a paradigm shift in how we communicate.",
      synonyms: ["transformation", "revolution", "breakthrough"],
      difficulty: "advanced",
      mastery: 25,
      nextReview: "2024-02-11",
      category: "collocation",
    },
    {
      id: "30",
      word: "think outside the box",
      ipa: "/θɪŋk aʊtˈsaɪd ðə bɒks/",
      definition: "To think creatively and come up with innovative solutions",
      example: "We need to think outside the box to solve this complex problem.",
      synonyms: ["be creative", "innovate", "be original"],
      difficulty: "intermediate",
      mastery: 50,
      nextReview: "2024-02-12",
      category: "idiom",
    },
    {
      id: "31",
      word: "cutting-edge",
      ipa: "/ˌkʌtɪŋ ˈedʒ/",
      definition: "The most advanced stage in the development of something",
      example: "The company uses cutting-edge technology in its products.",
      synonyms: ["advanced", "innovative", "state-of-the-art"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-02-13",
      category: "adjective",
    },
    {
      id: "32",
      word: "game-changer",
      ipa: "/ˈɡeɪm ˌtʃeɪndʒə/",
      definition: "A person, idea, or event that completely changes the way a situation develops",
      example: "The new software was a game-changer for our productivity.",
      synonyms: ["revolutionary", "breakthrough", "milestone"],
      difficulty: "intermediate",
      mastery: 40,
      nextReview: "2024-02-14",
      category: "noun",
    },
    {
      id: "33",
      word: "on the same page",
      ipa: "/ɒn ðə seɪm peɪdʒ/",
      definition: "In agreement or having the same understanding",
      example: "Let's make sure we're all on the same page before proceeding.",
      synonyms: ["in agreement", "aligned", "united"],
      difficulty: "beginner",
      mastery: 70,
      nextReview: "2024-02-15",
      category: "idiom",
    },
    {
      id: "34",
      word: "take it to the next level",
      ipa: "/teɪk ɪt tuː ðə nekst ˈlevəl/",
      definition: "To improve something or make it more advanced",
      example: "We need to take our customer service to the next level.",
      synonyms: ["improve", "enhance", "upgrade"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-02-16",
      category: "idiom",
    },
    {
      id: "35",
      word: "hit the ground running",
      ipa: "/hɪt ðə ɡraʊnd ˈrʌnɪŋ/",
      definition: "To start a project or activity immediately and with great energy",
      example: "The new team member hit the ground running and contributed immediately.",
      synonyms: ["start quickly", "begin energetically", "jump right in"],
      difficulty: "intermediate",
      mastery: 35,
      nextReview: "2024-02-17",
      category: "idiom",
    },
    {
      id: "36",
      word: "data-driven",
      ipa: "/ˈdeɪtə ˈdrɪvən/",
      definition: "Based on or guided by data analysis",
      example: "Our marketing strategy is data-driven and highly effective.",
      synonyms: ["analytical", "evidence-based", "factual"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-02-18",
      category: "adjective",
    },
    {
      id: "37",
      word: "user experience",
      ipa: "/ˈjuːzər ɪkˈspɪəriəns/",
      definition: "The overall experience of a person using a product or service",
      example: "Good user experience is crucial for app success.",
      synonyms: ["UX", "interface design", "usability"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-02-19",
      category: "collocation",
    },
    {
      id: "38",
      word: "best practices",
      ipa: "/best ˈpræktɪsɪz/",
      definition: "Methods or techniques that have consistently shown results superior to those achieved with other means",
      example: "We follow industry best practices in our development process.",
      synonyms: ["standards", "guidelines", "procedures"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-02-20",
      category: "collocation",
    },
    {
      id: "39",
      word: "scalable",
      ipa: "/ˈskeɪləbəl/",
      definition: "Able to be easily expanded or upgraded on demand",
      example: "The cloud infrastructure is highly scalable for growing businesses.",
      synonyms: ["expandable", "flexible", "adaptable"],
      difficulty: "intermediate",
      mastery: 40,
      nextReview: "2024-02-21",
      category: "adjective",
    },
    {
      id: "40",
      word: "disruptive",
      ipa: "/dɪsˈrʌptɪv/",
      definition: "Causing radical change in an existing industry or market",
      example: "The startup introduced a disruptive technology that changed the industry.",
      synonyms: ["revolutionary", "innovative", "transformative"],
      difficulty: "advanced",
      mastery: 30,
      nextReview: "2024-02-22",
      category: "adjective",
    },
    {
      id: "41",
      word: "look up",
      ipa: "/lʊk ʌp/",
      definition: "To search for information, especially in a reference book or online",
      example: "I need to look up the meaning of this word in the dictionary.",
      synonyms: ["search for", "find", "research"],
      difficulty: "beginner",
      mastery: 85,
      nextReview: "2024-02-23",
      category: "phrasal-verb",
    },
    {
      id: "42",
      word: "give up",
      ipa: "/ɡɪv ʌp/",
      definition: "To stop trying to do something; to surrender",
      example: "Don't give up on your dreams, keep working hard.",
      synonyms: ["quit", "abandon", "surrender"],
      difficulty: "beginner",
      mastery: 80,
      nextReview: "2024-02-24",
      category: "phrasal-verb",
    },
    {
      id: "43",
      word: "put off",
      ipa: "/pʊt ɒf/",
      definition: "To postpone or delay something",
      example: "I keep putting off my dentist appointment.",
      synonyms: ["postpone", "delay", "procrastinate"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-02-25",
      category: "phrasal-verb",
    },
    {
      id: "44",
      word: "get along",
      ipa: "/ɡet əˈlɒŋ/",
      definition: "To have a good relationship with someone",
      example: "My colleagues and I get along very well.",
      synonyms: ["get on", "be friendly", "have rapport"],
      difficulty: "intermediate",
      mastery: 75,
      nextReview: "2024-02-26",
      category: "phrasal-verb",
    },
    {
      id: "45",
      word: "come up with",
      ipa: "/kʌm ʌp wɪð/",
      definition: "To think of or create something, especially an idea or plan",
      example: "We need to come up with a solution to this problem.",
      synonyms: ["think of", "create", "devise"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-02-27",
      category: "phrasal-verb",
    },
    {
      id: "46",
      word: "run out of",
      ipa: "/rʌn aʊt ɒv/",
      definition: "To use all of something so that none is left",
      example: "We've run out of coffee, we need to buy more.",
      synonyms: ["exhaust", "use up", "deplete"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-02-28",
      category: "phrasal-verb",
    },
    {
      id: "47",
      word: "turn down",
      ipa: "/tɜːn daʊn/",
      definition: "To reject or refuse something",
      example: "I had to turn down the job offer because of the low salary.",
      synonyms: ["reject", "refuse", "decline"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-03-01",
      category: "phrasal-verb",
    },
    {
      id: "48",
      word: "bring up",
      ipa: "/brɪŋ ʌp/",
      definition: "To mention or introduce a topic in conversation",
      example: "She brought up an interesting point during the meeting.",
      synonyms: ["mention", "introduce", "raise"],
      difficulty: "intermediate",
      mastery: 50,
      nextReview: "2024-03-02",
      category: "phrasal-verb",
    },
    {
      id: "49",
      word: "find out",
      ipa: "/faɪnd aʊt/",
      definition: "To discover or learn something",
      example: "I need to find out what time the meeting starts.",
      synonyms: ["discover", "learn", "uncover"],
      difficulty: "beginner",
      mastery: 90,
      nextReview: "2024-03-03",
      category: "phrasal-verb",
    },
    {
      id: "50",
      word: "set up",
      ipa: "/set ʌp/",
      definition: "To establish or arrange something",
      example: "We need to set up a new office in the city center.",
      synonyms: ["establish", "arrange", "organize"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-03-04",
      category: "phrasal-verb",
    },
    {
      id: "51",
      word: "take over",
      ipa: "/teɪk ˈəʊvə/",
      definition: "To assume control or responsibility for something",
      example: "The new manager will take over the department next month.",
      synonyms: ["assume control", "take charge", "manage"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-03-05",
      category: "phrasal-verb",
    },
    {
      id: "52",
      word: "look after",
      ipa: "/lʊk ˈɑːftə/",
      definition: "To take care of someone or something",
      example: "Can you look after my plants while I'm on vacation?",
      synonyms: ["take care of", "watch over", "care for"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-03-06",
      category: "phrasal-verb",
    },
    {
      id: "53",
      word: "get over",
      ipa: "/ɡet ˈəʊvə/",
      definition: "To recover from an illness or difficult situation",
      example: "It took me a long time to get over the flu.",
      synonyms: ["recover from", "overcome", "move past"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-03-07",
      category: "phrasal-verb",
    },
    {
      id: "54",
      word: "put up with",
      ipa: "/pʊt ʌp wɪð/",
      definition: "To tolerate or accept something unpleasant",
      example: "I can't put up with this noise anymore.",
      synonyms: ["tolerate", "endure", "bear"],
      difficulty: "advanced",
      mastery: 35,
      nextReview: "2024-03-08",
      category: "phrasal-verb",
    },
    {
      id: "55",
      word: "catch up",
      ipa: "/kætʃ ʌp/",
      definition: "To reach the same level or standard as others",
      example: "I need to catch up on my reading assignments.",
      synonyms: ["reach", "overtake", "keep up"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-03-09",
      category: "phrasal-verb",
    },
    {
      id: "56",
      word: "break down",
      ipa: "/breɪk daʊn/",
      definition: "To stop working or functioning properly",
      example: "My car broke down on the way to work.",
      synonyms: ["stop working", "fail", "malfunction"],
      difficulty: "intermediate",
      mastery: 50,
      nextReview: "2024-03-10",
      category: "phrasal-verb",
    },
    {
      id: "57",
      word: "make up",
      ipa: "/meɪk ʌp/",
      definition: "To invent or create something, often a story or excuse",
      example: "Don't make up excuses for being late.",
      synonyms: ["invent", "create", "fabricate"],
      difficulty: "intermediate",
      mastery: 40,
      nextReview: "2024-03-11",
      category: "phrasal-verb",
    },
    {
      id: "58",
      word: "go through",
      ipa: "/ɡəʊ θruː/",
      definition: "To experience or endure something difficult",
      example: "She's going through a difficult time right now.",
      synonyms: ["experience", "endure", "undergo"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-03-12",
      category: "phrasal-verb",
    },
    {
      id: "59",
      word: "turn up",
      ipa: "/tɜːn ʌp/",
      definition: "To arrive or appear, often unexpectedly",
      example: "He turned up at the party without an invitation.",
      synonyms: ["arrive", "appear", "show up"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-03-13",
      category: "phrasal-verb",
    },
    {
      id: "60",
      word: "work out",
      ipa: "/wɜːk aʊt/",
      definition: "To exercise or to find a solution to a problem",
      example: "I work out at the gym three times a week.",
      synonyms: ["exercise", "solve", "resolve"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-03-14",
      category: "phrasal-verb",
    }
  ])

  const categories = [
    "all",
    "noun",
    "verb", 
    "adjective",
    "adverb",
    "pronoun",
    "preposition",
    "conjunction",
    "interjection",
    "phrasal-verb",
    "idiom",
    "collocation"
  ]

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || token.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "text-green-600"
    if (mastery >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "noun":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "verb":
        return "bg-green-100 text-green-800 border-green-200"
      case "adjective":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "adverb":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "pronoun":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "preposition":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "conjunction":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "interjection":
        return "bg-red-100 text-red-800 border-red-200"
      case "phrasal-verb":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "idiom":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "collocation":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAddToken = () => {
    if (!newToken.word || !newToken.definition) return

    const token: VocabToken = {
      id: (tokens.length + 1).toString(),
      word: newToken.word,
      ipa: newToken.ipa,
      definition: newToken.definition,
      example: newToken.example,
      synonyms: newToken.synonyms.split(',').map(s => s.trim()).filter(s => s),
      difficulty: newToken.difficulty,
      mastery: 0,
      nextReview: new Date().toISOString().split('T')[0],
      category: newToken.category
    }

    setTokens([...tokens, token])
    setNewToken({
      word: "",
      ipa: "",
      definition: "",
      example: "",
      synonyms: "",
      difficulty: "intermediate",
      category: "noun"
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteToken = (id: string) => {
    setTokens(tokens.filter(token => token.id !== id))
  }

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      // 既存の読み上げを停止
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = isMuted ? 0 : 1
      
      utterance.onstart = () => {
        setIsReading(true)
        setCurrentReadingWord(word)
      }
      
      utterance.onend = () => {
        setIsReading(false)
        setCurrentReadingWord("")
      }
      
      utterance.onpause = () => {
        setIsReading(false)
      }
      
      utterance.onresume = () => {
        setIsReading(true)
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      setCurrentReadingWord("")
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
            <span>Vocabulary Tokens</span>
            <Badge variant="secondary" className="ml-2">{tokens.length} tokens</Badge>
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Manage your vocabulary as reusable design tokens with spaced repetition</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                className={isMuted ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="ml-1">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>
              {isReading && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopReading}
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  <Pause className="w-4 h-4 mr-1" />
                  Stop All
                </Button>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search vocabulary tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "phrasal-verb" ? "Phrasal Verb" : 
                   category === "all" ? "All" : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Token
          </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Vocabulary Token</DialogTitle>
                <DialogDescription>
                  Create a new vocabulary token with pronunciation, definition, and examples.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="word">Word/Phrase *</Label>
                    <Input
                      id="word"
                      value={newToken.word}
                      onChange={(e) => setNewToken({...newToken, word: e.target.value})}
                      placeholder="Enter word or phrase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ipa">IPA Pronunciation</Label>
                    <Input
                      id="ipa"
                      value={newToken.ipa}
                      onChange={(e) => setNewToken({...newToken, ipa: e.target.value})}
                      placeholder="/prəˈnʌnsiˈeɪʃən/"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="definition">Definition *</Label>
                  <Textarea
                    id="definition"
                    value={newToken.definition}
                    onChange={(e) => setNewToken({...newToken, definition: e.target.value})}
                    placeholder="Enter the definition"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="example">Example Sentence</Label>
                  <Textarea
                    id="example"
                    value={newToken.example}
                    onChange={(e) => setNewToken({...newToken, example: e.target.value})}
                    placeholder="Enter an example sentence"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="synonyms">Synonyms (comma-separated)</Label>
                  <Input
                    id="synonyms"
                    value={newToken.synonyms}
                    onChange={(e) => setNewToken({...newToken, synonyms: e.target.value})}
                    placeholder="synonym1, synonym2, synonym3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={newToken.difficulty} onValueChange={(value) => setNewToken({...newToken, difficulty: value as "beginner" | "intermediate" | "advanced"})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newToken.category} onValueChange={(value) => setNewToken({...newToken, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="noun">Noun</SelectItem>
                        <SelectItem value="verb">Verb</SelectItem>
                        <SelectItem value="adjective">Adjective</SelectItem>
                        <SelectItem value="adverb">Adverb</SelectItem>
                        <SelectItem value="pronoun">Pronoun</SelectItem>
                        <SelectItem value="preposition">Preposition</SelectItem>
                        <SelectItem value="conjunction">Conjunction</SelectItem>
                        <SelectItem value="interjection">Interjection</SelectItem>
                        <SelectItem value="phrasal-verb">Phrasal Verb</SelectItem>
                        <SelectItem value="idiom">Idiom</SelectItem>
                        <SelectItem value="collocation">Collocation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddToken} disabled={!newToken.word || !newToken.definition}>
                  Add Token
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Tokens</p>
                <p className="text-2xl font-bold text-slate-900">{tokens.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Mastered</p>
                <p className="text-2xl font-bold text-green-600">
                  {tokens.filter(t => t.mastery >= 80).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Learning</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tokens.filter(t => t.mastery >= 20 && t.mastery < 80).length}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">New</p>
                <p className="text-2xl font-bold text-red-600">
                  {tokens.filter(t => t.mastery < 20).length}
                </p>
              </div>
              <Plus className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTokens.map((token) => (
          <Card 
            key={token.id} 
            className={`hover:shadow-md transition-shadow ${
              isReading && currentReadingWord === token.word ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{token.word}</CardTitle>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={isReading && currentReadingWord === token.word ? stopReading : () => speakWord(token.word)}
                    className={isReading && currentReadingWord === token.word ? "text-red-600 hover:text-red-700 hover:bg-red-50" : ""}
                  >
                    {isReading && currentReadingWord === token.word ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                  <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteToken(token.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">{token.ipa}</span>
                <Badge className={getDifficultyColor(token.difficulty)}>{token.difficulty}</Badge>
                <Badge className={getCategoryColor(token.category)}>
                  {token.category === "phrasal-verb" ? "Phrasal Verb" : 
                   token.category.charAt(0).toUpperCase() + token.category.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-700">{token.definition}</p>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-sm italic text-slate-600">"{token.example}"</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">Synonyms:</p>
                <div className="flex flex-wrap gap-1">
                  {token.synonyms.map((synonym) => (
                    <Badge key={synonym} variant="outline" className="text-xs">
                      {synonym}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Mastery</span>
                  <span className={`font-medium ${getMasteryColor(token.mastery)}`}>{token.mastery}%</span>
                </div>
                <Progress value={token.mastery} className="h-2" />
                <p className="text-xs text-slate-500">Next review: {new Date(token.nextReview).toLocaleDateString()}</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Star className="w-3 h-3 mr-1" />
                  Review
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
