"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Loader2, CheckCircle, BookOpen, Target, Clock } from "lucide-react"

interface ProcessedArticle {
  title: string
  summary: string
  readingTime: number
  difficulty: "beginner" | "intermediate" | "advanced"
  vocabulary: {
    word: string
    ipa: string
    definition: string
    context: string
    frequency: number
  }[]
  grammarPoints: {
    rule: string
    examples: string[]
    explanation: string
  }[]
  comprehensionQuestions: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }[]
  keyPhrases: string[]
  topics: string[]
}

export function ArticleProcessor() {
  const [rawData, setRawData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedArticle, setProcessedArticle] = useState<ProcessedArticle | null>(null)
  const [processingStep, setProcessingStep] = useState("")
  const [progress, setProgress] = useState(0)

  const processArticle = async () => {
    if (!rawData.trim()) return

    setIsProcessing(true)
    setProgress(0)

    // Step 1: Text Analysis
    setProcessingStep("Analyzing text structure...")
    setProgress(20)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 2: Vocabulary Extraction
    setProcessingStep("Extracting vocabulary tokens...")
    setProgress(40)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 3: Grammar Analysis
    setProcessingStep("Identifying grammar patterns...")
    setProgress(60)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Step 4: Question Generation
    setProcessingStep("Generating comprehension questions...")
    setProgress(80)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 5: Finalization
    setProcessingStep("Finalizing learning materials...")
    setProgress(100)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock processed result
    const result: ProcessedArticle = {
      title: articleTitle || "Processed Article",
      summary:
        "This article discusses modern software development practices, focusing on agile methodologies and their impact on team productivity and project success rates.",
      readingTime: Math.ceil(rawData.split(" ").length / 200),
      difficulty: rawData.length > 2000 ? "advanced" : rawData.length > 1000 ? "intermediate" : "beginner",
      vocabulary: [
        {
          word: "impenetrable",
          ipa: "/ɪmˈpenɪtrəbəl/",
          definition: "Impossible to pass through or enter; impossible to understand",
          context: "Making impenetrable quality his differentiator in a crowded startup market",
          frequency: 1,
        },
        {
          word: "differentiator",
          ipa: "/ˌdɪfəˈrenʃieɪtər/",
          definition: "A factor that distinguishes one product or service from others",
          context: "Making impenetrable quality his differentiator in a crowded startup market",
          frequency: 1,
        },
        {
          word: "mantra",
          ipa: "/ˈmæntrə/",
          definition: "A statement or slogan repeated frequently",
          context: "An alternative to the Zuckerberg 'move fast and break things' mantra",
          frequency: 1,
        },
        {
          word: "resonates",
          ipa: "/ˈrezəneɪts/",
          definition: "Evokes a feeling of shared emotion or belief",
          context: "Which may have worked years ago but no longer resonates in today's market",
          frequency: 1,
        },
        {
          word: "deliberation",
          ipa: "/dɪˌlɪbəˈreɪʃən/",
          definition: "Long and careful consideration or discussion",
          context: "The more opinions and deliberation you introduce, which dilutes the quality",
          frequency: 1,
        },
        {
          word: "silos",
          ipa: "/ˈsaɪloʊz/",
          definition: "Isolated departments or groups within an organization",
          context: "An over-specialized team creates silos",
          frequency: 2,
        },
        {
          word: "opinionated",
          ipa: "/əˈpɪnjəneɪtɪd/",
          definition: "Having strong, definite views and expressing them readily",
          context: "The best design is opinionated",
          frequency: 1,
        },
        {
          word: "crutch",
          ipa: "/krʌtʃ/",
          definition: "Something used as a support or aid, often excessively",
          context: "Data can be a crutch",
          frequency: 1,
        },
        {
          word: "intuition",
          ipa: "/ˌɪntuˈɪʃən/",
          definition: "The ability to understand something instinctively",
          context: "You must develop and trust your intuition",
          frequency: 1,
        },
        {
          word: "iterate",
          ipa: "/ˈɪtəreɪt/",
          definition: "Perform or utter repeatedly; make repeated versions",
          context: "Start with something rough and iterate toward polished craft",
          frequency: 1,
        },
        {
          word: "craft",
          ipa: "/kræft/",
          definition: "Skill in making things by hand; expertise in a particular field",
          context: "Building with craft",
          frequency: 8,
        },
        {
          word: "quality",
          ipa: "/ˈkwɒləti/",
          definition: "The standard of something as measured against other things of a similar kind",
          context: "Making quality his differentiator",
          frequency: 12,
        },
        {
          word: "startup",
          ipa: "/ˈstɑːtʌp/",
          definition: "A newly established business",
          context: "A startup's biggest challenge",
          frequency: 4,
        },
        {
          word: "leadership",
          ipa: "/ˈliːdəʃɪp/",
          definition: "The action of leading a group of people or an organization",
          context: "Commit to quality at the leadership level",
          frequency: 2,
        },
        {
          word: "culture",
          ipa: "/ˈkʌltʃər/",
          definition: "The ideas, customs, and social behavior of a particular people or society",
          context: "Build a culture of quality",
          frequency: 3,
        },
        {
          word: "buy-in",
          ipa: "/ˈbaɪɪn/",
          definition: "Agreement to support a decision or plan",
          context: "You need buy-in from the top",
          frequency: 1,
        },
        {
          word: "priority",
          ipa: "/praɪˈɒrəti/",
          definition: "A thing that is regarded as more important than another",
          context: "Craft is the most important priority",
          frequency: 1,
        },
        {
          word: "permission",
          ipa: "/pəˈmɪʃən/",
          definition: "Consent or authorization to do something",
          context: "Creates a permission structure",
          frequency: 1,
        },
        {
          word: "structure",
          ipa: "/ˈstrʌktʃər/",
          definition: "The arrangement of and relations between the parts or elements of something",
          context: "Permission structure to build craft",
          frequency: 1,
        },
        {
          word: "execution",
          ipa: "/ˌeksɪˈkjuːʃən/",
          definition: "The carrying out or putting into effect of a plan, order, or course of action",
          context: "Dilutes the quality of the execution",
          frequency: 1,
        },
        {
          word: "oriented",
          ipa: "/ˈɔːrientɪd/",
          definition: "Directed towards or interested in a particular thing",
          context: "Hire craft-oriented people",
          frequency: 1,
        },
        {
          word: "handoff",
          ipa: "/ˈhændɒf/",
          definition: "The transfer of responsibility for something from one person to another",
          context: "There's no 'handoff to dev'",
          frequency: 1,
        },
        {
          word: "connected",
          ipa: "/kəˈnektɪd/",
          definition: "Joined together or linked",
          context: "We have connected teams",
          frequency: 1,
        },
        {
          word: "responsible",
          ipa: "/rɪˈspɒnsəbəl/",
          definition: "Having an obligation to do something, or having control over or care for someone",
          context: "Everyone is responsible for the quality",
          frequency: 1,
        },
        {
          word: "specialized",
          ipa: "/ˈspeʃəlaɪzd/",
          definition: "Requiring or involving detailed and specific knowledge or training",
          context: "An over-specialized team",
          frequency: 1,
        },
        {
          word: "artificial",
          ipa: "/ˌɑːtɪˈfɪʃəl/",
          definition: "Made or produced by human beings rather than occurring naturally",
          context: "Artificial quality and culture silos",
          frequency: 1,
        },
        {
          word: "rotate",
          ipa: "/rəʊˈteɪt/",
          definition: "Move or cause to move in a circle round an axis or center",
          context: "We rotate responsibilities",
          frequency: 1,
        },
        {
          word: "responsibilities",
          ipa: "/rɪˌspɒnsəˈbɪləti/",
          definition: "A thing which one is required to do as part of a job, role, or legal obligation",
          context: "Rotate responsibilities to keep ideas fresh",
          frequency: 1,
        },
        {
          word: "baseline",
          ipa: "/ˈbeɪslaɪn/",
          definition: "A minimum or starting point used for comparisons",
          context: "Consider the spec your baseline",
          frequency: 1,
        },
        {
          word: "minimum",
          ipa: "/ˈmɪnɪməm/",
          definition: "The least or smallest amount or quantity possible",
          context: "Baseline minimum viable product",
          frequency: 1,
        },
        {
          word: "viable",
          ipa: "/ˈvaɪəbəl/",
          definition: "Capable of working successfully; feasible",
          context: "Minimum viable product",
          frequency: 1,
        },
        {
          word: "competitors",
          ipa: "/kəmˈpetɪtəz/",
          definition: "A person or organization competing with others for the same objective",
          context: "High quality competitors",
          frequency: 1,
        },
        {
          word: "excellence",
          ipa: "/ˈeksələns/",
          definition: "The quality of being outstanding or extremely good",
          context: "Requires excellence to stand out",
          frequency: 1,
        },
        {
          word: "stand out",
          ipa: "/stænd aʊt/",
          definition: "Be clearly better or more important than others",
          context: "Requires excellence to stand out",
          frequency: 1,
        },
        {
          word: "necessary",
          ipa: "/ˈnesəsəri/",
          definition: "Required to be done, achieved, or present; needed; essential",
          context: "More care into it than necessary",
          frequency: 1,
        },
        {
          word: "finish line",
          ipa: "/ˈfɪnɪʃ laɪn/",
          definition: "A line marking the end of a race",
          context: "Not the finish line",
          frequency: 1,
        },
        {
          word: "perfection",
          ipa: "/pəˈfekʃən/",
          definition: "The condition, state, or quality of being free or as free as possible from all flaws or defects",
          context: "Quality is not perfection",
          frequency: 1,
        },
        {
          word: "details",
          ipa: "/ˈdiːteɪlz/",
          definition: "An individual feature, fact, or item",
          context: "All of a product's details",
          frequency: 1,
        },
        {
          word: "release",
          ipa: "/rɪˈliːs/",
          definition: "Allow or enable to escape from confinement; set free",
          context: "Before public release",
          frequency: 1,
        },
        {
          word: "rough",
          ipa: "/rʌf/",
          definition: "Having an uneven or irregular surface; not smooth or level",
          context: "Start with something rough",
          frequency: 1,
        },
        {
          word: "polished",
          ipa: "/ˈpɒlɪʃt/",
          definition: "Refined, sophisticated, or elegant",
          context: "Iterate toward polished craft",
          frequency: 1,
        },
        {
          word: "bar",
          ipa: "/bɑː/",
          definition: "A long rigid piece of wood, metal, or similar material",
          context: "Before it passes your quality bar",
          frequency: 1,
        },
        {
          word: "design",
          ipa: "/dɪˈzaɪn/",
          definition: "A plan or drawing produced to show the look and function of something",
          context: "The best design is opinionated",
          frequency: 3,
        },
        {
          word: "particular",
          ipa: "/pəˈtɪkjələr/",
          definition: "Used to single out an individual member of a specified group or class",
          context: "Design for someone in particular",
          frequency: 1,
        },
        {
          word: "impossible",
          ipa: "/ɪmˈpɒsəbəl/",
          definition: "Not able to occur, exist, or be done",
          context: "Nearly impossible to design",
          frequency: 1,
        },
        {
          word: "specific",
          ipa: "/spəˈsɪfɪk/",
          definition: "Clearly defined or identified",
          context: "The more specific your product's purpose",
          frequency: 1,
        },
        {
          word: "purpose",
          ipa: "/ˈpɜːpəs/",
          definition: "The reason for which something is done or created",
          context: "Your product's purpose",
          frequency: 1,
        },
        {
          word: "perform",
          ipa: "/pəˈfɔːm/",
          definition: "Carry out, accomplish, or fulfill an action, task, or function",
          context: "The better it will perform",
          frequency: 1,
        },
        {
          word: "intended",
          ipa: "/ɪnˈtendɪd/",
          definition: "Planned or meant",
          context: "For its intended use",
          frequency: 1,
        },
        {
          word: "scope",
          ipa: "/skəʊp/",
          definition: "The extent of the area or subject matter that something deals with",
          context: "Reduce scope",
          frequency: 1,
        },
        {
          word: "difficult",
          ipa: "/ˈdɪfɪkəlt/",
          definition: "Needing much effort or skill to accomplish, deal with, or understand",
          context: "People who find quality difficult",
          frequency: 1,
        },
        {
          word: "binary",
          ipa: "/ˈbaɪnəri/",
          definition: "Relating to, composed of, or involving two things",
          context: "Quality isn't binary",
          frequency: 1,
        },
        {
          word: "continuously",
          ipa: "/kənˈtɪnjuəsli/",
          definition: "Without interruption or gaps",
          context: "Continuously refining a product",
          frequency: 1,
        },
        {
          word: "refining",
          ipa: "/rɪˈfaɪnɪŋ/",
          definition: "Making minor changes so as to improve or clarify",
          context: "Continuously refining a product",
          frequency: 1,
        },
        {
          word: "standard",
          ipa: "/ˈstændəd/",
          definition: "A level of quality or attainment",
          context: "To meet a standard",
          frequency: 1,
        },
        {
          word: "locked",
          ipa: "/lɒkt/",
          definition: "Fastened or secured with a lock",
          context: "Don't get locked into one way",
          frequency: 1,
        },
        {
          word: "singular",
          ipa: "/ˈsɪŋɡjələr/",
          definition: "Exceptionally good or great; remarkable",
          context: "We don't have a singular process",
          frequency: 1,
        },
        {
          word: "process",
          ipa: "/ˈprəʊses/",
          definition: "A series of actions or steps taken to achieve a particular end",
          context: "A singular process",
          frequency: 2,
        },
        {
          word: "values",
          ipa: "/ˈvæljuːz/",
          definition: "Principles or standards of behavior",
          context: "Establish values and principles",
          frequency: 1,
        },
        {
          word: "principles",
          ipa: "/ˈprɪnsəpəlz/",
          definition: "A fundamental truth or proposition that serves as the foundation for a system of belief",
          context: "Values and principles",
          frequency: 1,
        },
        {
          word: "direct",
          ipa: "/dəˈrekt/",
          definition: "Extending or moving from one place to another by the shortest way without changing direction",
          context: "Push direct responsibility",
          frequency: 1,
        },
        {
          word: "freedom",
          ipa: "/ˈfriːdəm/",
          definition: "The power or right to act, speak, or think as one wants",
          context: "Giving them the freedom to make decisions",
          frequency: 1,
        },
        {
          word: "decisions",
          ipa: "/dɪˈsɪʒənz/",
          definition: "A conclusion or resolution reached after consideration",
          context: "Freedom to make decisions",
          frequency: 2,
        },
        {
          word: "data",
          ipa: "/ˈdeɪtə/",
          definition: "Facts and statistics collected together for reference or analysis",
          context: "Data can be a crutch",
          frequency: 3,
        },
        {
          word: "experiments",
          ipa: "/ɪkˈsperɪmənts/",
          definition: "A scientific procedure undertaken to make a discovery, test a hypothesis, or demonstrate a known fact",
          context: "Based on data or experiments",
          frequency: 1,
        },
        {
          word: "develop",
          ipa: "/dɪˈveləp/",
          definition: "Grow or cause to grow and become more mature, advanced, or elaborate",
          context: "Develop and trust your intuition",
          frequency: 1,
        },
        {
          word: "trust",
          ipa: "/trʌst/",
          definition: "Firm belief in the reliability, truth, ability, or strength of someone or something",
          context: "Trust your intuition",
          frequency: 1,
        },
        {
          word: "measure",
          ipa: "/ˈmeʒər/",
          definition: "Ascertain the size, amount, or degree of something by using an instrument or device",
          context: "Quality is hard to measure",
          frequency: 1,
        },
        {
          word: "comfortable",
          ipa: "/ˈkʌmftəbəl/",
          definition: "Giving a feeling of physical ease and relaxation",
          context: "Comfortable making decisions without data",
          frequency: 1,
        },
        {
          word: "guide",
          ipa: "/ɡaɪd/",
          definition: "A person who shows the way to others",
          context: "Without data as your guide",
          frequency: 1,
        },
        {
          word: "experience",
          ipa: "/ɪkˈspɪəriəns/",
          definition: "Practical contact with and observation of facts or events",
          context: "Provide the best experience",
          frequency: 1,
        },
        {
          word: "surprise",
          ipa: "/səˈpraɪz/",
          definition: "An unexpected or astonishing event, fact, or thing",
          context: "You must surprise users",
          frequency: 1,
        },
        {
          word: "expect",
          ipa: "/ɪkˈspekt/",
          definition: "Regard something as likely to happen",
          context: "You can't expect data to tell you how",
          frequency: 1,
        },
        {
          word: "success",
          ipa: "/səkˈses/",
          definition: "The accomplishment of an aim or purpose",
          context: "Success depends on hiring people",
          frequency: 1,
        },
        {
          word: "depends",
          ipa: "/dɪˈpendz/",
          definition: "Be controlled or determined by",
          context: "Success depends on hiring people",
          frequency: 1,
        },
        {
          word: "hiring",
          ipa: "/ˈhaɪərɪŋ/",
          definition: "The action of employing someone for wages",
          context: "Hiring people who care about the craft",
          frequency: 1,
        },
        {
          word: "care",
          ipa: "/keər/",
          definition: "Feel concern or interest; attach importance to something",
          context: "People who care about the craft",
          frequency: 2,
        },
        {
          word: "informed",
          ipa: "/ɪnˈfɔːmd/",
          definition: "Having or showing knowledge of a particular subject or situation",
          context: "Make informed decisions based on their expertise",
          frequency: 1,
        },
        {
          word: "expertise",
          ipa: "/ˌekspɜːˈtiːz/",
          definition: "Expert skill or knowledge in a particular field",
          context: "Based on their expertise",
          frequency: 1,
        },
        {
          word: "methodology",
          ipa: "/ˌmeθəˈdɒlədʒi/",
          definition: "A system of methods used in a particular area of study or activity",
          context: "Agile methodology has revolutionized software development",
          frequency: 3,
        },
        {
          word: "implementation",
          ipa: "/ˌɪmplɪmenˈteɪʃən/",
          definition: "The process of putting a decision or plan into effect",
          context: "The implementation of new features requires careful planning",
          frequency: 5,
        },
        {
          word: "scalability",
          ipa: "/ˌskeɪləˈbɪləti/",
          definition: "The capacity to be changed in size or scale",
          context: "System scalability is crucial for growing applications",
          frequency: 2,
        },
        {
          word: "agile",
          ipa: "/ˈædʒaɪl/",
          definition: "Able to move quickly and easily",
          context: "Agile methodology has revolutionized software development",
          frequency: 2,
        },
        {
          word: "revolutionized",
          ipa: "/ˌrevəˈluːʃənaɪzd/",
          definition: "Completely changed something in a fundamental way",
          context: "Agile methodology has revolutionized software development",
          frequency: 1,
        },
        {
          word: "features",
          ipa: "/ˈfiːtʃəz/",
          definition: "A distinctive attribute or aspect of something",
          context: "The implementation of new features requires careful planning",
          frequency: 3,
        },
        {
          word: "planning",
          ipa: "/ˈplænɪŋ/",
          definition: "The process of making plans for something",
          context: "New features requires careful planning",
          frequency: 2,
        },
        {
          word: "system",
          ipa: "/ˈsɪstəm/",
          definition: "A set of things working together as parts of a mechanism",
          context: "System scalability is crucial for growing applications",
          frequency: 4,
        },
        {
          word: "crucial",
          ipa: "/ˈkruːʃəl/",
          definition: "Decisive or critical, especially in the success or failure of something",
          context: "System scalability is crucial for growing applications",
          frequency: 1,
        },
        {
          word: "growing",
          ipa: "/ˈɡrəʊɪŋ/",
          definition: "Increasing in size, amount, or degree",
          context: "Scalability is crucial for growing applications",
          frequency: 1,
        },
        {
          word: "applications",
          ipa: "/ˌæplɪˈkeɪʃənz/",
          definition: "A program or piece of software designed to fulfill a particular purpose",
          context: "Scalability for growing applications",
          frequency: 2,
        },
        {
          word: "development",
          ipa: "/dɪˈveləpmənt/",
          definition: "The process of developing or being developed",
          context: "Software development practices",
          frequency: 5,
        },
        {
          word: "practices",
          ipa: "/ˈpræktɪsɪz/",
          definition: "The actual application or use of an idea, belief, or method",
          context: "Software development practices",
          frequency: 3,
        },
        {
          word: "focusing",
          ipa: "/ˈfəʊkəsɪŋ/",
          definition: "Directing attention or effort toward something",
          context: "Focusing on agile methodologies",
          frequency: 1,
        },
        {
          word: "impact",
          ipa: "/ˈɪmpækt/",
          definition: "A marked effect or influence",
          context: "Their impact on team productivity",
          frequency: 2,
        },
        {
          word: "productivity",
          ipa: "/ˌprɒdʌkˈtɪvəti/",
          definition: "The effectiveness of productive effort",
          context: "Team productivity and project success",
          frequency: 2,
        },
        {
          word: "project",
          ipa: "/ˈprɒdʒekt/",
          definition: "An individual or collaborative enterprise that is carefully planned",
          context: "Project success rates",
          frequency: 3,
        },
        {
          word: "success",
          ipa: "/səkˈses/",
          definition: "The accomplishment of an aim or purpose",
          context: "Project success rates",
          frequency: 4,
        },
        {
          word: "rates",
          ipa: "/reɪts/",
          definition: "A measure, quantity, or frequency, typically one measured against another quantity",
          context: "Project success rates",
          frequency: 1,
        },
        {
          word: "team",
          ipa: "/tiːm/",
          definition: "A group of people who work together",
          context: "Team productivity and collaboration",
          frequency: 6,
        },
        {
          word: "collaboration",
          ipa: "/kəˌlæbəˈreɪʃən/",
          definition: "The action of working with someone to produce something",
          context: "Team collaboration and productivity",
          frequency: 2,
        },
        {
          word: "architecture",
          ipa: "/ˈɑːkɪtektʃər/",
          definition: "The complex or carefully designed structure of something",
          context: "System architecture planning",
          frequency: 1,
        },
        {
          word: "lifecycle",
          ipa: "/ˈlaɪfsaɪkl/",
          definition: "The series of changes in the life of an organism",
          context: "Development lifecycle",
          frequency: 1,
        },
        {
          word: "technology",
          ipa: "/tekˈnɒlədʒi/",
          definition: "The application of scientific knowledge for practical purposes",
          context: "Technology and innovation",
          frequency: 3,
        },
        {
          word: "innovation",
          ipa: "/ˌɪnəˈveɪʃən/",
          definition: "A new method, idea, or product",
          context: "Technology and innovation",
          frequency: 2,
        },
      ],
      grammarPoints: [
        {
          rule: "Present Perfect for Experience",
          examples: ["Developers have adopted agile practices", "The team has implemented continuous integration"],
          explanation: "Used to describe actions completed at an unspecified time with relevance to the present",
        },
        {
          rule: "Passive Voice in Technical Writing",
          examples: ["The system was designed to handle high traffic", "New features are being developed by the team"],
          explanation: "Common in technical documentation to focus on actions rather than actors",
        },
      ],
      comprehensionQuestions: [
        {
          question: "What is the main benefit of agile methodology mentioned in the article?",
          options: [
            "Reduced development costs",
            "Improved team productivity",
            "Faster deployment cycles",
            "Better code quality",
          ],
          correct: 1,
          explanation: "The article emphasizes how agile practices improve team collaboration and productivity",
        },
        {
          question: "According to the text, what is essential for system scalability?",
          options: [
            "Large development teams",
            "Expensive hardware",
            "Careful architecture planning",
            "Latest programming languages",
          ],
          correct: 2,
          explanation: "The article stresses the importance of thoughtful system design for scalability",
        },
      ],
      keyPhrases: [
        "agile methodology",
        "continuous integration",
        "system architecture",
        "development lifecycle",
        "team collaboration",
      ],
      topics: ["Software Development", "Project Management", "Technology", "Team Productivity"],
    }

    setProcessedArticle(result)
    setIsProcessing(false)
    setProcessingStep("")
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Article to Learning Material Processor</span>
          </CardTitle>
          <CardDescription>
            Transform any article raw data into structured learning materials with vocabulary, grammar, and
            comprehension exercises
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Article Title (Optional)</label>
              <Input
                placeholder="Enter article title..."
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Article Raw Data</label>
              <Textarea
                placeholder="Paste your article content here... (news articles, blog posts, technical documentation, etc.)"
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span>{rawData.split(" ").filter((word) => word.length > 0).length} words</span>
                <span>Est. reading time: {Math.ceil(rawData.split(" ").length / 200)} min</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setRawData(`Karri Saarinen's 10 rules for crafting products that stand out

Karri Saarinen, CEO and Co-founder of Linear

As CEO and Co-founder of software development platform Linear, Karri has built his success by making impenetrable quality his differentiator in a crowded startup market. His approach offers an alternative to the Zuckerberg "move fast and break things" mantra, which may have worked years ago but no longer resonates in today's more mature, design-conscious market.

This focus on craft solved what Karri calls a startup's biggest challenge: getting people to notice and care. For Linear, the solution was to lean into craft. "We started with quality," says Karri. "Then we learned that people actually noticed, because it's a rare approach—especially for startups."

Here are Karri's 10 rules for building with craft:

1. Commit to quality at the leadership level
If you want to build a culture of quality, you need buy-in from the top. You have to set the tone that craft is the most important priority for teams to follow. This high-level commitment creates a permission structure to build craft into everything your company does.

2. When it comes to building teams, go small and aim high
The more people you have, the more opinions and deliberation you introduce, which dilutes the quality of the execution. By contrast, small, high quality teams produce good work, quickly. Hire craft-oriented people who already produce great work.

3. Do away with handoff
A commitment to quality is all about being able to connect the dots. An over-specialized team creates silos. At Linear, we have connected teams in which everyone is responsible for the quality. There's no "handoff to dev." You're never off the hook.

4. Resist creating specialized product teams
Avoid too many defined product teams. Companies tend to create these teams to simplify organization for leadership, but it ultimately creates artificial quality and culture silos. At Linear, we rotate responsibilities to keep ideas fresh.

5. Consider the spec your baseline minimum viable product, not your goal
Today's startup market, full of high quality competitors, requires excellence to stand out. A great product requires someone to put more care into it than necessary. For quality, you need a team that views the spec as the baseline, not the finish line.

6. Quality is not perfection
All of a product's details need to be correct before public release. But that doesn't mean it has to be perfect. It's fine to start with something rough and iterate toward polished craft. Just don't show it to customers before it passes your quality bar.

7. The best design is opinionated
You can only create a great product if you design for someone in particular. It's nearly impossible to design a product for everyone. The more specific your product's purpose, the better it will perform for its intended use.

8. The simplest way to increase quality is to reduce scope
People who find quality difficult are typically trying to do too much. If you can't do everything well, start by doing less, and take on projects piece by piece. Quality isn't binary—it's about continuously refining a product to meet a standard.

9. Don't get locked into one way of doing things
We don't have a singular process. Instead, we establish values and principles so that team members think about what they're building and why. We push direct responsibility onto the team, giving them the freedom to make decisions.

10. Data can be a crutch
At Linear, we don't make decisions based on data or experiments. To design with craft, you must develop and trust your intuition. Quality is hard to measure, so you must be comfortable making decisions without data as your guide.

To provide the best experience, you must surprise users. You can't expect data—or even people themselves—to tell you how. Success depends on hiring people who care about the craft and can make informed decisions based on their expertise.`)
                  setArticleTitle("Karri Saarinen's 10 Rules for Crafting Products That Stand Out")
                }}
                className="flex-1"
              >
                Load Sample Article (Karri Saarinen)
              </Button>
              <Button onClick={processArticle} disabled={isProcessing || !rawData.trim()} className="flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing Article...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Learning Materials
                  </>
                )}
              </Button>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{processingStep}</span>
                  <span className="text-slate-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {processedArticle && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Learning Materials Generated</span>
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getDifficultyColor(processedArticle.difficulty)}>{processedArticle.difficulty}</Badge>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                {processedArticle.readingTime} min read
              </Badge>
              <Badge variant="outline">{processedArticle.vocabulary.length} vocabulary items</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                <TabsTrigger value="grammar">Grammar</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Article Summary</h3>
                  <p className="text-green-700 text-sm bg-white p-3 rounded-lg border">{processedArticle.summary}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedArticle.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedArticle.keyPhrases.map((phrase, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-4">
                {processedArticle.vocabulary.map((vocab, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-900">{vocab.word}</span>
                        <span className="text-sm text-slate-600">{vocab.ipa}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Used {vocab.frequency}x
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{vocab.definition}</p>
                    <div className="bg-slate-50 p-2 rounded text-sm italic text-slate-600">
                      Context: "{vocab.context}"
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="grammar" className="space-y-4">
                {processedArticle.grammarPoints.map((grammar, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-slate-900 mb-2">{grammar.rule}</h4>
                    <p className="text-sm text-slate-700 mb-3">{grammar.explanation}</p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-slate-800">Examples:</h5>
                      {grammar.examples.map((example, exIndex) => (
                        <div key={exIndex} className="bg-slate-50 p-2 rounded text-sm">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="quiz" className="space-y-4">
                {processedArticle.comprehensionQuestions.map((question, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-slate-900 mb-3">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-2 rounded border text-sm ${
                            optIndex === question.correct
                              ? "bg-green-50 border-green-200 text-green-800"
                              : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {optIndex === question.correct && (
                            <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex space-x-4">
              <Button className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Add to Learning Path
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                Start Practice Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
