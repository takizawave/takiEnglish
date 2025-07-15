// Types and data for interactive reading passages

export interface WordDefinition {
  word: string
  definition: string
  pronunciation: string
  example: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface ReadingPassage {
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
    }
  ],
  comprehensionQuestions: [
    {
      question: "What is the main theme of Yamashita's design philosophy?",
      options: [
        "Following strict design processes",
        "Embracing the messiness of digital products",
        "Avoiding iteration and feedback",
        "Focusing only on visual design"
      ],
      correct: 1,
      explanation: "Yamashita's philosophy centers around embracing the inherent messiness of digital products and rethinking traditional workflows."
    },
    {
      question: "What does Yamashita believe about products?",
      options: [
        "They should be perfect before shipping",
        "They are perpetually works in progress",
        "They should follow linear processes",
        "They should avoid user feedback"
      ],
      correct: 1,
      explanation: "He believes every product is perpetually a work in progress and designers should ship imperfect work."
    }
  ]
}

const beginnerPassage: ReadingPassage = {
  id: "2",
  title: "The Future of Remote Work",
  content: `Remote work has become a major trend in the modern workplace. Companies around the world are adopting flexible work arrangements that allow employees to work from anywhere. This shift has brought both opportunities and challenges.

One of the biggest benefits of remote work is increased flexibility. Employees can work from home, coffee shops, or anywhere with an internet connection. This flexibility often leads to better work-life balance and reduced commuting time.

However, remote work also presents challenges. Communication can be more difficult when team members are not in the same physical space. Companies need to invest in good technology and communication tools to keep teams connected.

Video conferencing tools like Zoom and Microsoft Teams have become essential for remote collaboration. These platforms allow teams to hold meetings, share screens, and work together in real-time, even when they are miles apart.

The future of work will likely be a hybrid model, combining the best of both remote and office work. This approach gives employees the flexibility they want while maintaining the social connections that are important for team building and collaboration.`,
  difficulty: "beginner",
  wordCount: 150,
  estimatedTime: 5,
  vocabulary: [
    {
      word: "remote",
      definition: "Working from a distance, not in the office",
      pronunciation: "/rɪˈməʊt/",
      example: "Many people now work remotely from home.",
      difficulty: "beginner"
    },
    {
      word: "flexible",
      definition: "Able to change or adapt easily",
      pronunciation: "/ˈfleksəbəl/",
      example: "The company offers flexible working hours.",
      difficulty: "beginner"
    },
    {
      word: "collaboration",
      definition: "Working together with others",
      pronunciation: "/kəˌlæbəˈreɪʃən/",
      example: "Good collaboration is essential for project success.",
      difficulty: "intermediate"
    },
    {
      word: "hybrid",
      definition: "Combining two different things",
      pronunciation: "/ˈhaɪbrɪd/",
      example: "A hybrid work model combines office and remote work.",
      difficulty: "intermediate"
    }
  ],
  comprehensionQuestions: [
    {
      question: "What is one benefit of remote work?",
      options: [
        "More commuting time",
        "Increased flexibility",
        "Better office space",
        "More meetings"
      ],
      correct: 1,
      explanation: "Remote work provides increased flexibility for employees."
    },
    {
      question: "What tools are essential for remote collaboration?",
      options: [
        "Video conferencing tools",
        "Office furniture",
        "Commuting apps",
        "Paper documents"
      ],
      correct: 0,
      explanation: "Video conferencing tools like Zoom and Microsoft Teams are essential for remote collaboration."
    }
  ]
}

export const readingPassages: ReadingPassage[] = [beginnerPassage, samplePassage] 