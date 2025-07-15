"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Eye, CheckCircle, XCircle, Volume2, VolumeX, Target } from "lucide-react"

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
  const [isReading, setIsReading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState("reading")

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

  const karriPassage: ReadingPassage = {
    id: "2",
    title: "Karri Saarinen's 10 Rules for Crafting Products That Stand Out",
    content: `Karri Saarinen, CEO and Co-founder of Linear

As CEO and Co-founder of software development platform Linear, Karri has built his success by making impenetrable quality his differentiator in a crowded startup market. His approach offers an alternative to the Zuckerberg "move fast and break things" mantra, which may have worked years ago but no longer resonates in today's more mature, design-conscious market.

This focus on craft solved what Karri calls a startup's biggest challenge: getting people to notice and care. For Linear, the solution was to lean into craft. "We started with quality," says Karri. "Then we learned that people actually noticed, because it's a rare approach—especially for startups."

Here are Karri's 10 rules for building with craft:

1. Commit to quality at the leadership level
2. When it comes to building teams, go small and aim high
3. Do away with handoff
4. Resist creating specialized product teams
5. Consider the spec your baseline minimum viable product, not your goal
6. Quality is not perfection
7. The best design is opinionated
8. The simplest way to increase quality is to reduce scope
9. Don't get locked into one way of doing things
10. Data can be a crutch

To provide the best experience, you must surprise users. You can't expect data—or even people themselves—to tell you how. Success depends on hiring people who care about the craft and can make informed decisions based on their expertise.`,
    difficulty: "advanced",
    wordCount: 420,
    estimatedTime: 12,
    vocabulary: [
        {
          word: "impenetrable",
          definition: "Impossible to pass through or enter; impossible to understand",
          pronunciation: "/ɪmˈpenɪtrəbəl/",
          example: "Making impenetrable quality his differentiator in a crowded startup market",
          difficulty: "advanced"
        },
        {
          word: "differentiator",
          definition: "A factor that distinguishes one product or service from others",
          pronunciation: "/ˌdɪfəˈrenʃieɪtər/",
          example: "Making impenetrable quality his differentiator in a crowded startup market",
          difficulty: "advanced"
        },
        {
          word: "mantra",
          definition: "A statement or slogan repeated frequently",
          pronunciation: "/ˈmæntrə/",
          example: "An alternative to the Zuckerberg 'move fast and break things' mantra",
          difficulty: "intermediate"
        },
        {
          word: "resonates",
          definition: "Evokes a feeling of shared emotion or belief",
          pronunciation: "/ˈrezəneɪts/",
          example: "Which may have worked years ago but no longer resonates in today's market",
          difficulty: "intermediate"
        },
        {
          word: "deliberation",
          definition: "Long and careful consideration or discussion",
          pronunciation: "/dɪˌlɪbəˈreɪʃən/",
          example: "The more opinions and deliberation you introduce, which dilutes the quality",
          difficulty: "advanced"
        },
        {
          word: "silos",
          definition: "Isolated departments or groups within an organization",
          pronunciation: "/ˈsaɪloʊz/",
          example: "An over-specialized team creates silos",
          difficulty: "intermediate"
        },
        {
          word: "opinionated",
          definition: "Having strong, definite views and expressing them readily",
          pronunciation: "/əˈpɪnjəneɪtɪd/",
          example: "The best design is opinionated",
          difficulty: "advanced"
        },
        {
          word: "crutch",
          definition: "Something used as a support or aid, often excessively",
          pronunciation: "/krʌtʃ/",
          example: "Data can be a crutch",
          difficulty: "intermediate"
        },
        {
          word: "intuition",
          definition: "The ability to understand something instinctively",
          pronunciation: "/ˌɪntuˈɪʃən/",
          example: "You must develop and trust your intuition",
          difficulty: "advanced"
        },
        {
          word: "iterate",
          definition: "Perform or utter repeatedly; make repeated versions",
          pronunciation: "/ˈɪtəreɪt/",
          example: "Start with something rough and iterate toward polished craft",
          difficulty: "intermediate"
        },
        {
          word: "craft",
          definition: "Skill in making things by hand; expertise in a particular field",
          pronunciation: "/kræft/",
          example: "Building with craft",
          difficulty: "intermediate"
        },
        {
          word: "quality",
          definition: "The standard of something as measured against other things of a similar kind",
          pronunciation: "/ˈkwɒləti/",
          example: "Making quality his differentiator",
          difficulty: "intermediate"
        },
        {
          word: "startup",
          definition: "A newly established business",
          pronunciation: "/ˈstɑːtʌp/",
          example: "A startup's biggest challenge",
          difficulty: "intermediate"
        },
        {
          word: "leadership",
          definition: "The action of leading a group of people or an organization",
          pronunciation: "/ˈliːdəʃɪp/",
          example: "Commit to quality at the leadership level",
          difficulty: "intermediate"
        },
        {
          word: "culture",
          definition: "The ideas, customs, and social behavior of a particular people or society",
          pronunciation: "/ˈkʌltʃər/",
          example: "Build a culture of quality",
          difficulty: "intermediate"
        },
        {
          word: "buy-in",
          definition: "Agreement to support a decision or plan",
          pronunciation: "/ˈbaɪɪn/",
          example: "You need buy-in from the top",
          difficulty: "intermediate"
        },
        {
          word: "priority",
          definition: "A thing that is regarded as more important than another",
          pronunciation: "/praɪˈɒrəti/",
          example: "Craft is the most important priority",
          difficulty: "intermediate"
        },
        {
          word: "permission",
          definition: "Consent or authorization to do something",
          pronunciation: "/pəˈmɪʃən/",
          example: "Creates a permission structure",
          difficulty: "intermediate"
        },
        {
          word: "structure",
          definition: "The arrangement of and relations between the parts or elements of something",
          pronunciation: "/ˈstrʌktʃər/",
          example: "Permission structure to build craft",
          difficulty: "intermediate"
        },
        {
          word: "execution",
          definition: "The carrying out or putting into effect of a plan, order, or course of action",
          pronunciation: "/ˌeksɪˈkjuːʃən/",
          example: "Dilutes the quality of the execution",
          difficulty: "intermediate"
        },
        {
          word: "oriented",
          definition: "Directed towards or interested in a particular thing",
          pronunciation: "/ˈɔːrientɪd/",
          example: "Hire craft-oriented people",
          difficulty: "intermediate"
        },
        {
          word: "handoff",
          definition: "The transfer of responsibility for something from one person to another",
          pronunciation: "/ˈhændɒf/",
          example: "There's no 'handoff to dev'",
          difficulty: "intermediate"
        },
        {
          word: "connected",
          definition: "Joined together or linked",
          pronunciation: "/kəˈnektɪd/",
          example: "We have connected teams",
          difficulty: "intermediate"
        },
        {
          word: "responsible",
          definition: "Having an obligation to do something, or having control over or care for someone",
          pronunciation: "/rɪˈspɒnsəbəl/",
          example: "Everyone is responsible for the quality",
          difficulty: "intermediate"
        },
        {
          word: "specialized",
          definition: "Requiring or involving detailed and specific knowledge or training",
          pronunciation: "/ˈspeʃəlaɪzd/",
          example: "An over-specialized team",
          difficulty: "intermediate"
        },
        {
          word: "artificial",
          definition: "Made or produced by human beings rather than occurring naturally",
          pronunciation: "/ˌɑːtɪˈfɪʃəl/",
          example: "Artificial quality and culture silos",
          difficulty: "intermediate"
        },
        {
          word: "rotate",
          definition: "Move or cause to move in a circle round an axis or center",
          pronunciation: "/rəʊˈteɪt/",
          example: "We rotate responsibilities",
          difficulty: "intermediate"
        },
        {
          word: "responsibilities",
          definition: "A thing which one is required to do as part of a job, role, or legal obligation",
          pronunciation: "/rɪˌspɒnsəˈbɪləti/",
          example: "Rotate responsibilities to keep ideas fresh",
          difficulty: "intermediate"
        },
        {
          word: "baseline",
          definition: "A minimum or starting point used for comparisons",
          pronunciation: "/ˈbeɪslaɪn/",
          example: "Consider the spec your baseline",
          difficulty: "intermediate"
        },
        {
          word: "minimum",
          definition: "The least or smallest amount or quantity possible",
          pronunciation: "/ˈmɪnɪməm/",
          example: "Baseline minimum viable product",
          difficulty: "intermediate"
        },
        {
          word: "viable",
          definition: "Capable of working successfully; feasible",
          pronunciation: "/ˈvaɪəbəl/",
          example: "Minimum viable product",
          difficulty: "intermediate"
        },
        {
          word: "competitors",
          definition: "A person or organization competing with others for the same objective",
          pronunciation: "/kəmˈpetɪtəz/",
          example: "High quality competitors",
          difficulty: "intermediate"
        },
        {
          word: "excellence",
          definition: "The quality of being outstanding or extremely good",
          pronunciation: "/ˈeksələns/",
          example: "Requires excellence to stand out",
          difficulty: "intermediate"
        },
        {
          word: "stand out",
          definition: "Be clearly better or more important than others",
          pronunciation: "/stænd aʊt/",
          example: "Requires excellence to stand out",
          difficulty: "intermediate"
        },
        {
          word: "necessary",
          definition: "Required to be done, achieved, or present; needed; essential",
          pronunciation: "/ˈnesəsəri/",
          example: "More care into it than necessary",
          difficulty: "intermediate"
        },
        {
          word: "finish line",
          definition: "A line marking the end of a race",
          pronunciation: "/ˈfɪnɪʃ laɪn/",
          example: "Not the finish line",
          difficulty: "intermediate"
        },
        {
          word: "perfection",
          definition: "The condition, state, or quality of being free or as free as possible from all flaws or defects",
          pronunciation: "/pəˈfekʃən/",
          example: "Quality is not perfection",
          difficulty: "intermediate"
        },
        {
          word: "details",
          definition: "An individual feature, fact, or item",
          pronunciation: "/ˈdiːteɪlz/",
          example: "All of a product's details",
          difficulty: "intermediate"
        },
        {
          word: "release",
          definition: "Allow or enable to escape from confinement; set free",
          pronunciation: "/rɪˈliːs/",
          example: "Before public release",
          difficulty: "intermediate"
        },
        {
          word: "rough",
          definition: "Having an uneven or irregular surface; not smooth or level",
          pronunciation: "/rʌf/",
          example: "Start with something rough",
          difficulty: "intermediate"
        },
        {
          word: "polished",
          definition: "Refined, sophisticated, or elegant",
          pronunciation: "/ˈpɒlɪʃt/",
          example: "Iterate toward polished craft",
          difficulty: "intermediate"
        },
        {
          word: "bar",
          definition: "A long rigid piece of wood, metal, or similar material",
          pronunciation: "/bɑː/",
          example: "Before it passes your quality bar",
          difficulty: "intermediate"
        },
        {
          word: "design",
          definition: "A plan or drawing produced to show the look and function of something",
          pronunciation: "/dɪˈzaɪn/",
          example: "The best design is opinionated",
          difficulty: "intermediate"
        },
        {
          word: "particular",
          definition: "Used to single out an individual member of a specified group or class",
          pronunciation: "/pəˈtɪkjələr/",
          example: "Design for someone in particular",
          difficulty: "intermediate"
        },
        {
          word: "impossible",
          definition: "Not able to occur, exist, or be done",
          pronunciation: "/ɪmˈpɒsəbəl/",
          example: "Nearly impossible to design",
          difficulty: "intermediate"
        },
        {
          word: "specific",
          definition: "Clearly defined or identified",
          pronunciation: "/spəˈsɪfɪk/",
          example: "The more specific your product's purpose",
          difficulty: "intermediate"
        },
        {
          word: "purpose",
          definition: "The reason for which something is done or created",
          pronunciation: "/ˈpɜːpəs/",
          example: "Your product's purpose",
          difficulty: "intermediate"
        },
        {
          word: "perform",
          definition: "Carry out, accomplish, or fulfill an action, task, or function",
          pronunciation: "/pəˈfɔːm/",
          example: "The better it will perform",
          difficulty: "intermediate"
        },
        {
          word: "intended",
          definition: "Planned or meant",
          pronunciation: "/ɪnˈtendɪd/",
          example: "For its intended use",
          difficulty: "intermediate"
        },
        {
          word: "scope",
          definition: "The extent of the area or subject matter that something deals with",
          pronunciation: "/skəʊp/",
          example: "Reduce scope",
          difficulty: "intermediate"
        },
        {
          word: "difficult",
          definition: "Needing much effort or skill to accomplish, deal with, or understand",
          pronunciation: "/ˈdɪfɪkəlt/",
          example: "People who find quality difficult",
          difficulty: "intermediate"
        },
        {
          word: "binary",
          definition: "Relating to, composed of, or involving two things",
          pronunciation: "/ˈbaɪnəri/",
          example: "Quality isn't binary",
          difficulty: "intermediate"
        },
        {
          word: "continuously",
          definition: "Without interruption or gaps",
          pronunciation: "/kənˈtɪnjuəsli/",
          example: "Continuously refining a product",
          difficulty: "intermediate"
        },
        {
          word: "refining",
          definition: "Making minor changes so as to improve or clarify",
          pronunciation: "/rɪˈfaɪnɪŋ/",
          example: "Continuously refining a product",
          difficulty: "intermediate"
        },
        {
          word: "standard",
          definition: "A level of quality or attainment",
          pronunciation: "/ˈstændəd/",
          example: "To meet a standard",
          difficulty: "intermediate"
        },
        {
          word: "locked",
          definition: "Fastened or secured with a lock",
          pronunciation: "/lɒkt/",
          example: "Don't get locked into one way",
          difficulty: "intermediate"
        },
        {
          word: "singular",
          definition: "Exceptionally good or great; remarkable",
          pronunciation: "/ˈsɪŋɡjələr/",
          example: "We don't have a singular process",
          difficulty: "intermediate"
        },
        {
          word: "process",
          definition: "A series of actions or steps taken to achieve a particular end",
          pronunciation: "/ˈprəʊses/",
          example: "A singular process",
          difficulty: "intermediate"
        },
        {
          word: "values",
          definition: "Principles or standards of behavior",
          pronunciation: "/ˈvæljuːz/",
          example: "Establish values and principles",
          difficulty: "intermediate"
        },
        {
          word: "principles",
          definition: "A fundamental truth or proposition that serves as the foundation for a system of belief",
          pronunciation: "/ˈprɪnsəpəlz/",
          example: "Values and principles",
          difficulty: "intermediate"
        },
        {
          word: "direct",
          definition: "Extending or moving from one place to another by the shortest way without changing direction",
          pronunciation: "/dəˈrekt/",
          example: "Push direct responsibility",
          difficulty: "intermediate"
        },
        {
          word: "freedom",
          definition: "The power or right to act, speak, or think as one wants",
          pronunciation: "/ˈfriːdəm/",
          example: "Giving them the freedom to make decisions",
          difficulty: "intermediate"
        },
        {
          word: "decisions",
          definition: "A conclusion or resolution reached after consideration",
          pronunciation: "/dɪˈsɪʒənz/",
          example: "Freedom to make decisions",
          difficulty: "intermediate"
        },
        {
          word: "data",
          definition: "Facts and statistics collected together for reference or analysis",
          pronunciation: "/ˈdeɪtə/",
          example: "Data can be a crutch",
          difficulty: "intermediate"
        },
        {
          word: "experiments",
          definition: "A scientific procedure undertaken to make a discovery, test a hypothesis, or demonstrate a known fact",
          pronunciation: "/ɪkˈsperɪmənts/",
          example: "Based on data or experiments",
          difficulty: "intermediate"
        },
        {
          word: "develop",
          definition: "Grow or cause to grow and become more mature, advanced, or elaborate",
          pronunciation: "/dɪˈveləp/",
          example: "Develop and trust your intuition",
          difficulty: "intermediate"
        },
        {
          word: "trust",
          definition: "Firm belief in the reliability, truth, ability, or strength of someone or something",
          pronunciation: "/trʌst/",
          example: "Trust your intuition",
          difficulty: "intermediate"
        },
        {
          word: "measure",
          definition: "Ascertain the size, amount, or degree of something by using an instrument or device",
          pronunciation: "/ˈmeʒər/",
          example: "Quality is hard to measure",
          difficulty: "intermediate"
        },
        {
          word: "comfortable",
          definition: "Giving a feeling of physical ease and relaxation",
          pronunciation: "/ˈkʌmftəbəl/",
          example: "Comfortable making decisions without data",
          difficulty: "intermediate"
        },
        {
          word: "guide",
          definition: "A person who shows the way to others",
          pronunciation: "/ɡaɪd/",
          example: "Without data as your guide",
          difficulty: "intermediate"
        },
        {
          word: "experience",
          definition: "Practical contact with and observation of facts or events",
          pronunciation: "/ɪkˈspɪəriəns/",
          example: "Provide the best experience",
          difficulty: "intermediate"
        },
        {
          word: "surprise",
          definition: "An unexpected or astonishing event, fact, or thing",
          pronunciation: "/səˈpraɪz/",
          example: "You must surprise users",
          difficulty: "intermediate"
        },
        {
          word: "expect",
          definition: "Regard something as likely to happen",
          pronunciation: "/ɪkˈspekt/",
          example: "You can't expect data to tell you how",
          difficulty: "intermediate"
        },
        {
          word: "success",
          definition: "The accomplishment of an aim or purpose",
          pronunciation: "/səkˈses/",
          example: "Success depends on hiring people",
          difficulty: "intermediate"
        },
        {
          word: "depends",
          definition: "Be controlled or determined by",
          pronunciation: "/dɪˈpendz/",
          example: "Success depends on hiring people",
          difficulty: "intermediate"
        },
        {
          word: "hiring",
          definition: "The action of employing someone for wages",
          pronunciation: "/ˈhaɪərɪŋ/",
          example: "Hiring people who care about the craft",
          difficulty: "intermediate"
        },
        {
          word: "care",
          definition: "Feel concern or interest; attach importance to something",
          pronunciation: "/keər/",
          example: "People who care about the craft",
          difficulty: "intermediate"
        },
        {
          word: "informed",
          definition: "Having or showing knowledge of a particular subject or situation",
          pronunciation: "/ɪnˈfɔːmd/",
          example: "Make informed decisions based on their expertise",
          difficulty: "intermediate"
        },
        {
          word: "expertise",
          definition: "Expert skill or knowledge in a particular field",
          pronunciation: "/ˌekspɜːˈtiːz/",
          example: "Based on their expertise",
          difficulty: "intermediate"
        },
        {
          word: "methodology",
          definition: "A system of methods used in a particular area of study or activity",
          pronunciation: "/ˌmeθəˈdɒlədʒi/",
          example: "Agile methodology has revolutionized software development",
          difficulty: "intermediate"
        },
        {
          word: "implementation",
          definition: "The process of putting a decision or plan into effect",
          pronunciation: "/ˌɪmplɪmenˈteɪʃən/",
          example: "The implementation of new features requires careful planning",
          difficulty: "intermediate"
        },
        {
          word: "scalability",
          definition: "The capacity to be changed in size or scale",
          pronunciation: "/ˌskeɪləˈbɪləti/",
          example: "System scalability is crucial for growing applications",
          difficulty: "intermediate"
        },
        {
          word: "agile",
          definition: "Able to move quickly and easily",
          pronunciation: "/ˈædʒaɪl/",
          example: "Agile methodology has revolutionized software development",
          difficulty: "intermediate"
        },
        {
          word: "revolutionized",
          definition: "Completely changed something in a fundamental way",
          pronunciation: "/ˌrevəˈluːʃənaɪzd/",
          example: "Agile methodology has revolutionized software development",
          difficulty: "intermediate"
        },
        {
          word: "features",
          definition: "A distinctive attribute or aspect of something",
          pronunciation: "/ˈfiːtʃəz/",
          example: "The implementation of new features requires careful planning",
          difficulty: "intermediate"
        },
        {
          word: "planning",
          definition: "The process of making plans for something",
          pronunciation: "/ˈplænɪŋ/",
          example: "New features requires careful planning",
          difficulty: "intermediate"
        },
        {
          word: "system",
          definition: "A set of things working together as parts of a mechanism",
          pronunciation: "/ˈsɪstəm/",
          example: "System scalability is crucial for growing applications",
          difficulty: "intermediate"
        },
        {
          word: "crucial",
          definition: "Decisive or critical, especially in the success or failure of something",
          pronunciation: "/ˈkruːʃəl/",
          example: "System scalability is crucial for growing applications",
          difficulty: "intermediate"
        },
        {
          word: "growing",
          definition: "Increasing in size, amount, or degree",
          pronunciation: "/ˈɡrəʊɪŋ/",
          example: "Scalability is crucial for growing applications",
          difficulty: "intermediate"
        },
        {
          word: "applications",
          definition: "A program or piece of software designed to fulfill a particular purpose",
          pronunciation: "/ˌæplɪˈkeɪʃənz/",
          example: "Scalability for growing applications",
          difficulty: "intermediate"
        },
        {
          word: "development",
          definition: "The process of developing or being developed",
          pronunciation: "/dɪˈveləpmənt/",
          example: "Software development practices",
          difficulty: "intermediate"
        },
        {
          word: "practices",
          definition: "The actual application or use of an idea, belief, or method",
          pronunciation: "/ˈpræktɪsɪz/",
          example: "Software development practices",
          difficulty: "intermediate"
        },
        {
          word: "focusing",
          definition: "Directing attention or effort toward something",
          pronunciation: "/ˈfəʊkəsɪŋ/",
          example: "Focusing on agile methodologies",
          difficulty: "intermediate"
        },
        {
          word: "impact",
          definition: "A marked effect or influence",
          pronunciation: "/ˈɪmpækt/",
          example: "Their impact on team productivity",
          difficulty: "intermediate"
        },
        {
          word: "productivity",
          definition: "The effectiveness of productive effort",
          pronunciation: "/ˌprɒdʌkˈtɪvəti/",
          example: "Team productivity and project success",
          difficulty: "intermediate"
        },
        {
          word: "project",
          definition: "An individual or collaborative enterprise that is carefully planned",
          pronunciation: "/ˈprɒdʒekt/",
          example: "Project success rates",
          difficulty: "intermediate"
        },
        {
          word: "success",
          definition: "The accomplishment of an aim or purpose",
          pronunciation: "/səkˈses/",
          example: "Project success rates",
          difficulty: "intermediate"
        },
        {
          word: "rates",
          definition: "A measure, quantity, or frequency, typically one measured against another quantity",
          pronunciation: "/reɪts/",
          example: "Project success rates",
          difficulty: "intermediate"
        },
        {
          word: "team",
          definition: "A group of people who work together",
          pronunciation: "/tiːm/",
          example: "Team productivity and collaboration",
          difficulty: "intermediate"
        },
        {
          word: "collaboration",
          definition: "The action of working with someone to produce something",
          pronunciation: "/kəˌlæbəˈreɪʃən/",
          example: "Team collaboration and productivity",
          difficulty: "intermediate"
        },
        {
          word: "architecture",
          definition: "The complex or carefully designed structure of something",
          pronunciation: "/ˈɑːkɪtektʃər/",
          example: "System architecture planning",
          difficulty: "intermediate"
        },
        {
          word: "lifecycle",
          definition: "The series of changes in the life of an organism",
          pronunciation: "/ˈlaɪfsaɪkl/",
          example: "Development lifecycle",
          difficulty: "intermediate"
        },
        {
          word: "technology",
          definition: "The application of scientific knowledge for practical purposes",
          pronunciation: "/tekˈnɒlədʒi/",
          example: "Technology and innovation",
          difficulty: "intermediate"
        },
        {
          word: "innovation",
          definition: "A new method, idea, or product",
          pronunciation: "/ˌɪnəˈveɪʃən/",
          example: "Technology and innovation",
          difficulty: "intermediate"
        },
    ],
    comprehensionQuestions: [
      {
        question: "What is Karri Saarinen's main differentiator for Linear?",
        options: [
          "Low prices",
          "Impenetrable quality",
          "Aggressive marketing",
          "Large teams"
        ],
        correct: 1,
        explanation: "Karri's main differentiator is making impenetrable quality his differentiator in a crowded startup market."
      },
      {
        question: "According to Karri, what is a startup's biggest challenge?",
        options: [
          "Raising funds",
          "Getting people to notice and care",
          "Hiring engineers",
          "Building fast"
        ],
        correct: 1,
        explanation: "Karri says the biggest challenge is getting people to notice and care."
      },
      {
        question: "What does Karri say about data in product design?",
        options: [
          "Data is always necessary",
          "Data can be a crutch",
          "Data guarantees success",
          "Data should be ignored"
        ],
        correct: 1,
        explanation: "Karri says that data can be a crutch and you must develop and trust your intuition."
      }
    ]
  }

  const beginnerPassage: ReadingPassage = {
    id: "3",
    title: "The Future of Remote Work",
    content: `Remote work has become a major trend in the modern workplace. Many companies now offer flexible work arrangements that allow employees to work from home or anywhere they choose. This shift has changed how we think about productivity and work-life balance.

Technology plays a crucial role in making remote work possible. Video conferencing tools, project management software, and cloud-based platforms help teams stay connected and organized. These tools make it easier for people to collaborate even when they're not in the same physical location.

However, remote work also presents challenges. Some people find it difficult to separate work from personal life when working from home. Others miss the social interaction that comes with working in an office. Companies need to find ways to maintain team culture and ensure everyone feels included.

The benefits of remote work are clear for many people. It saves time on commuting, reduces stress, and allows for more flexible schedules. Parents can better balance work and family responsibilities. People can work from anywhere, which opens up opportunities for those who live in areas with limited job options.

As we look to the future, it's likely that remote work will continue to grow. Companies are learning how to manage remote teams effectively, and employees are developing new skills to work independently. The key is finding the right balance between flexibility and structure.`,
    difficulty: "beginner",
    wordCount: 180,
    estimatedTime: 6,
    vocabulary: [
      {
        word: "remote",
        definition: "Located far away; distant",
        pronunciation: "/rɪˈməʊt/",
        example: "Remote work allows people to work from anywhere.",
        difficulty: "beginner"
      },
      {
        word: "trend",
        definition: "A general direction in which something is developing or changing",
        pronunciation: "/trend/",
        example: "Remote work has become a major trend in business.",
        difficulty: "beginner"
      },
      {
        word: "flexible",
        definition: "Able to bend easily without breaking; adaptable",
        pronunciation: "/ˈfleksəbəl/",
        example: "Flexible work arrangements help employees balance work and life.",
        difficulty: "beginner"
      },
      {
        word: "productivity",
        definition: "The effectiveness of productive effort",
        pronunciation: "/ˌprɒdʌkˈtɪvəti/",
        example: "Many people find their productivity increases when working remotely.",
        difficulty: "intermediate"
      },
      {
        word: "collaborate",
        definition: "Work jointly on an activity or project",
        pronunciation: "/kəˈlæbəreɪt/",
        example: "Teams need to collaborate effectively even when working remotely.",
        difficulty: "intermediate"
      },
      {
        word: "challenge",
        definition: "A difficult task or problem",
        pronunciation: "/ˈtʃælɪndʒ/",
        example: "Remote work presents new challenges for managers.",
        difficulty: "beginner"
      },
      {
        word: "commuting",
        definition: "Travel some distance between one's home and place of work",
        pronunciation: "/kəˈmjuːtɪŋ/",
        example: "Remote work eliminates the need for daily commuting.",
        difficulty: "intermediate"
      },
      {
        word: "opportunity",
        definition: "A time or set of circumstances that makes it possible to do something",
        pronunciation: "/ˌɒpəˈtjuːnəti/",
        example: "Remote work creates opportunities for people in rural areas.",
        difficulty: "intermediate"
      }
    ],
    comprehensionQuestions: [
      {
        question: "What is one benefit of remote work mentioned in the article?",
        options: [
          "It always increases productivity",
          "It saves time on commuting",
          "It eliminates all workplace challenges",
          "It requires no technology"
        ],
        correct: 1,
        explanation: "The article mentions that remote work saves time on commuting as one of its benefits."
      },
      {
        question: "What technology is mentioned as important for remote work?",
        options: [
          "Social media platforms",
          "Video conferencing tools",
          "Gaming consoles",
          "Smart home devices"
        ],
        correct: 1,
        explanation: "The article specifically mentions video conferencing tools as important for remote work."
      }
    ]
  }

  const readingPassages: ReadingPassage[] = [beginnerPassage, samplePassage, karriPassage];

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
            {word}
          </span>
        )
      }
      return <span key={index}>{word}</span>
    }).reduce((prev, curr, index) => {
      // 単語間にスペースを追加（最後の単語以外）
      return index < words.length - 1 ? [prev, curr, ' '] : [prev, curr]
    }, [] as React.ReactNode[])
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

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // 既存の読み上げを停止
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = isMuted ? 0 : 1
      
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onpause = () => setIsReading(false)
      utterance.onresume = () => setIsReading(true)
      
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
          <div className="space-y-6">
            {/* Article Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Choose an Article</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readingPassages.map((passage) => (
                  <div
                    key={passage.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedPassage.id === passage.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => {
                      setSelectedPassage(passage)
                      setCurrentQuestion(0)
                      setUserAnswers([])
                      setShowResults(false)
                      setActiveTab("reading")
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-slate-900 line-clamp-2">{passage.title}</h4>
                      <Badge className={getDifficultyColor(passage.difficulty)}>
                        {passage.difficulty}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center space-x-4">
                        <span>{passage.wordCount} words</span>
                        <span>•</span>
                        <span>{passage.estimatedTime} min read</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{passage.vocabulary.length} vocabulary words</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-500 line-clamp-2">
                      {passage.content.substring(0, 120)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Article Info */}
            {selectedPassage && (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className={getDifficultyColor(selectedPassage.difficulty)}>
                    {selectedPassage.difficulty}
                  </Badge>
                  <span className="text-sm text-slate-600">
                    {selectedPassage.wordCount} words • {selectedPassage.estimatedTime} min read
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-slate-500">
                    Article {readingPassages.findIndex(p => p.id === selectedPassage.id) + 1} of {readingPassages.length}
                  </div>
                  <div className="flex space-x-2">
              <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentIndex = readingPassages.findIndex(p => p.id === selectedPassage.id)
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : readingPassages.length - 1
                        const prevPassage = readingPassages[prevIndex]
                        setSelectedPassage(prevPassage)
                        setCurrentQuestion(0)
                        setUserAnswers([])
                        setShowResults(false)
                        setActiveTab("reading")
                      }}
                      disabled={readingPassages.length <= 1}
                    >
                      ← Previous
              </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentIndex = readingPassages.findIndex(p => p.id === selectedPassage.id)
                        const nextIndex = currentIndex < readingPassages.length - 1 ? currentIndex + 1 : 0
                        const nextPassage = readingPassages[nextIndex]
                        setSelectedPassage(nextPassage)
                        setCurrentQuestion(0)
                        setUserAnswers([])
                        setShowResults(false)
                        setActiveTab("reading")
                      }}
                      disabled={readingPassages.length <= 1}
                    >
                      Next →
              </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="quiz">Vocabulary Review</TabsTrigger>
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={isReading ? stopReading : () => speakText(selectedPassage.content)}
                      className={isReading ? "bg-red-50 text-red-700 border-red-200" : ""}
                    >
                      {isReading ? (
                        <>
                          <VolumeX className="w-4 h-4 mr-2" />
                          Stop Reading
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Read Aloud
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleMute}
                      className={isMuted ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Vocabulary Review</span>
                  </CardTitle>
          <CardDescription>
                    Review all vocabulary from this passage. Click on words to hear pronunciation.
          </CardDescription>
        </CardHeader>
        <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedPassage.vocabulary.map((vocab, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedWord(vocab)
                          speakText(vocab.word)
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-lg text-slate-900">{vocab.word}</span>
                          <Badge className={getDifficultyColor(vocab.difficulty)}>
                            {vocab.difficulty}
                          </Badge>
                  </div>
                        <p className="text-sm text-slate-600 mb-2">[{vocab.pronunciation}]</p>
                        <p className="text-sm text-slate-700 mb-2">{vocab.definition}</p>
                        <div className="bg-slate-50 p-2 rounded text-sm italic text-slate-600">
                          "{vocab.example}"
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Study Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Click on any word to hear its pronunciation</li>
                      <li>• Review difficult words more frequently</li>
                      <li>• Practice using these words in your own sentences</li>
                      <li>• Return to the reading to see words in context</li>
                    </ul>
                </div>
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
