"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import { TextToSpeech } from "@/components/ui/text-to-speech"
import { Repeat } from "lucide-react"
import { Check } from "lucide-react"

interface PhonemePractice {
  symbol: string
  jaDescription: string
  practiceWords: string[]
  practiceSentences: string[]
  practiceTips?: string
  category: "vowel" | "diphthong" | "consonant" | "other"
}

const PHONEME_PRACTICES: PhonemePractice[] = [
  {
    symbol: "/ɪ/",
    jaDescription: "短い『イ』。日本語の『エ』と『イ』の間の音。口をあまり開けない。",
    practiceWords: ["city", "it", "busy", "system", "women", "business", "build"],
    practiceSentences: [
      "This is a big city.",
      "I think he's busy.",
      "Women in business are building systems."
    ],
    practiceTips: "『エ』で言い過ぎないよう、リラックスした音を意識する",
    category: "vowel"
  },
  {
    symbol: "/iː/",
    jaDescription: "長い『イー』。日本語の『イ』より口が横に引っ張られる。",
    practiceWords: ["green", "meet", "beach", "see", "team", "teacher"],
    practiceSentences: [
      "I can see the green trees.",
      "The teacher will meet the team.",
      "We reached the beach by three."
    ],
    category: "vowel"
  },
  {
    symbol: "/æ/",
    jaDescription: "エとアの間。口を大きく横に開く『ア』の音。",
    practiceWords: ["cat", "man", "bad", "happy", "travel", "pattern"],
    practiceSentences: [
      "The cat sat on the mat.",
      "A happy man travels fast.",
      "That's a bad pattern."
    ],
    practiceTips: "M, N, Gの前では /e/ に変化することがある (hand→/hend/, family→/femɪli/, can→/ken/) ",
    category: "vowel"
  },
  {
    symbol: "/ɑ/",
    jaDescription: "口を大きく開けた『ア』。日本語の『オ』ではなく、大きく口を開けた『ア』。",
    practiceWords: ["body", "box", "follow", "god", "hot", "job", "watch", "wash"],
    practiceSentences: [
      "John's job involves watching the clock.",
      "The hot coffee was in a small box.",
      "Follow the doctor's advice about your body."
    ],
    category: "vowel"
  },
  {
    symbol: "/ɔː/",
    jaDescription: "オー音。アメリカ英語では /ɑ/ と同じ音になる地域が多い。Rが続く場合はしっかり『オー』音。",
    practiceWords: ["call", "all", "talk", "walk", "small", "ball", "door", "four", "more"],
    practiceSentences: [
      "Call me when you walk to the mall.",
      "We talked about the small ball.",
      "All the students walked to the hall."
    ],
    category: "vowel"
  },
  {
    symbol: "/e/",
    jaDescription: "エ。日本語の『エ』より若干横に大きく口を開く。",
    practiceWords: ["get", "pen", "red", "men", "desk", "send"],
    practiceSentences: [
      "Get the red pen from the desk.",
      "Ten men sent letters.",
      "When did you get the message?"
    ],
    category: "vowel"
  },
  {
    symbol: "/ə/ (または /ʌ/)",
    jaDescription: "曖昧母音。最も重要な母音。弱い音節で使われる。弱く読む部分はこの音になることが多い。",
    practiceWords: ["about", "from", "want", "butter", "number", "under"],
    practiceSentences: [
      "I want to talk about the number.",
      "The butter is under the cover.",
      "Come from another country."
    ],
    category: "vowel"
  },
  {
    symbol: "/ʊ/",
    jaDescription: "短い『ウ』。『ウ』と『オ』の間のリラックスした音。",
    practiceWords: ["book", "good", "could", "should", "look", "put"],
    practiceSentences: [
      "I could look at the good book.",
      "You should put it where you could look.",
      "The cook took a good look."
    ],
    category: "vowel"
  },
  {
    symbol: "/uː/",
    jaDescription: "長い『ウー』。唇をすぼめ、舌を後ろに引く緊張感のある音。",
    practiceWords: ["do", "you", "new", "blue", "food", "school"],
    practiceSentences: [
      "You can do it at the new school.",
      "The blue food looks good to you.",
      "Who knew you could move so smoothly?"
    ],
    practiceTips: "『ドー』よりも『ドゥー』と徐々に唇をすぼめる",
    category: "vowel"
  },
  {
    symbol: "/ər/",
    jaDescription: "アメリカのR音。舌を後ろに引き、喉の方に意識を向ける。",
    practiceWords: ["her", "first", "bird", "work", "turn", "learn"],
    practiceSentences: [
      "Her first word was 'bird.'",
      "We learned to work hard.",
      "Turn left at the third corner."
    ],
    practiceTips: "自分のベロで窒息させようとする感覚で舌を後ろに",
    category: "vowel"
  },
  {
    symbol: "/ɒ/",
    jaDescription: "短い『オ』。イギリス英語でよく使われる。口を丸く開ける。アメリカ英語では /ɑ/ で代用されることが多い。",
    practiceWords: ["hot", "not", "dog", "clock", "cot"],
    practiceSentences: [
      "The dog is not hot.",
      "Check the clock on the wall.",
      "He got a lot of hot dogs."
    ],
    category: "vowel"
  },
  {
    symbol: "/ɜː/",
    jaDescription: "長い曖昧母音。舌を中央に置き、口をあまり動かさない。アメリカ英語では /ɜr/（/ɝ/）で表される。",
    practiceWords: ["bird", "girl", "word", "learn", "her"],
    practiceSentences: [
      "The bird learned a word.",
      "Her girl heard the word.",
      "Learn the first word."
    ],
    category: "vowel"
  },
  // --- 二重母音 ---
  {
    symbol: "/eɪ/",
    jaDescription: "エイ。『エ』が長く『イ』に滑る。",
    practiceWords: ["day", "make", "take", "wait", "great", "eight"],
    practiceSentences: [
      "Wait for me to make the cake.",
      "Take the train on a great day.",
      "Eight students came late today."
    ],
    category: "diphthong"
  },
  {
    symbol: "/aɪ/",
    jaDescription: "アイ。『ア』が長く『イ』に滑る。",
    practiceWords: ["I", "my", "right", "time", "drive", "night"],
    practiceSentences: [
      "I drive at night time.",
      "My right eye is fine.",
      "Try to arrive on time."
    ],
    category: "diphthong"
  },
  {
    symbol: "/ɔɪ/",
    jaDescription: "オイ。『オ』が長く『イ』に滑る。",
    practiceWords: ["boy", "toy", "enjoy", "voice", "choice", "point"],
    practiceSentences: [
      "The boy enjoys his new toy.",
      "Make your choice with your voice.",
      "Point to the boy's toy."
    ],
    category: "diphthong"
  },
  {
    symbol: "/aʊ/",
    jaDescription: "アウ。『ア』が長く『ウ』に滑る。",
    practiceWords: ["now", "how", "out", "about", "down", "sound"],
    practiceSentences: [
      "How about now?",
      "Go out and look down.",
      "The sound is loud."
    ],
    category: "diphthong"
  },
  {
    symbol: "/əʊ/",
    jaDescription: "オウ。『オ』が長く『ウ』に滑る。アメリカ英語では /oʊ/。",
    practiceWords: ["go", "no", "home", "open", "show", "boat"],
    practiceSentences: [
      "Go home now.",
      "Show me the boat.",
      "Open the door slowly."
    ],
    category: "diphthong"
  },
  {
    symbol: "/ɪə/",
    jaDescription: "イア。イギリス英語でよく使われる。アメリカ英語では /ɪr/。",
    practiceWords: ["here", "ear", "near", "clear", "idea"],
    practiceSentences: [
      "Come here near the ear.",
      "The idea is clear.",
      "She is near here."
    ],
    category: "diphthong"
  },
  {
    symbol: "/eə/",
    jaDescription: "エア。イギリス英語でよく使われる。アメリカ英語では /er/。",
    practiceWords: ["air", "care", "pair", "hair", "bear"],
    practiceSentences: [
      "The air is clear.",
      "Take care of your hair.",
      "A pair of bears."
    ],
    category: "diphthong"
  },
  {
    symbol: "/ʊə/",
    jaDescription: "ウア。イギリス英語でよく使われる。アメリカ英語では /ʊr/。",
    practiceWords: ["tour", "sure", "pure", "cure", "secure"],
    practiceSentences: [
      "The tour is sure to cure.",
      "A pure and secure tour.",
      "Are you sure of the cure?"
    ],
    category: "diphthong"
  },
  // --- 子音 ---
  { symbol: "/p/", jaDescription: "無声音の『プ』。唇を閉じて一気に開放する。", practiceWords: ["pen", "apple", "happy", "cup", "paper"], practiceSentences: ["Put the pen on the paper.", "The apple is in the cup.", "She is a happy person."], category: "consonant" },
  { symbol: "/b/", jaDescription: "有声音の『ブ』。唇を閉じて一気に開放し、声帯を震わせる。", practiceWords: ["book", "baby", "job", "cab", "about"], practiceSentences: ["The baby has a book.", "He got a new job.", "Put it in the cab."], category: "consonant" },
  { symbol: "/t/", jaDescription: "無声音の『ト』。舌先を上の歯茎につけて一気に離す。", practiceWords: ["top", "time", "water", "cat", "letter"], practiceSentences: ["The cat is on top.", "Take your time.", "Drink some water."], category: "consonant" },
  { symbol: "/d/", jaDescription: "有声音の『ド』。舌先を上の歯茎につけて一気に離し、声帯を震わせる。", practiceWords: ["dog", "day", "red", "bed", "idea"], practiceSentences: ["The dog is in the bed.", "It's a red day.", "I have an idea."], category: "consonant" },
  { symbol: "/k/", jaDescription: "無声音の『ク』。舌の後ろを上あごにつけて一気に離す。", practiceWords: ["cat", "key", "back", "cake", "school"], practiceSentences: ["The cat has a key.", "Go back to school.", "Eat the cake."], category: "consonant" },
  { symbol: "/g/", jaDescription: "有声音の『グ』。舌の後ろを上あごにつけて一気に離し、声帯を震わせる。", practiceWords: ["go", "get", "big", "bag", "green"], practiceSentences: ["Go get the bag.", "The big bag is green.", "Get a big green bag."], category: "consonant" },
  { symbol: "/f/", jaDescription: "無声音の『フ』。上の歯を下唇に軽く当てて息を出す。", practiceWords: ["fish", "coffee", "life", "off", "leaf"], practiceSentences: ["The fish is in the coffee.", "Life is short.", "Turn off the light."], category: "consonant" },
  { symbol: "/v/", jaDescription: "有声音の『ヴ』。上の歯を下唇に軽く当てて声を出す。", practiceWords: ["very", "voice", "love", "move", "leave"], practiceSentences: ["I love your voice.", "Move very fast.", "Leave it here."], category: "consonant" },
  { symbol: "/θ/", jaDescription: "無声音の『ス』。舌先を上の歯に軽く当てて息を出す。", practiceWords: ["think", "bath", "both", "mouth", "thank"], practiceSentences: ["Think about the bath.", "Thank you both.", "Open your mouth."], category: "consonant" },
  { symbol: "/ð/", jaDescription: "有声音の『ズ』。舌先を上の歯に軽く当てて声を出す。", practiceWords: ["this", "that", "mother", "brother", "other"], practiceSentences: ["This is my mother.", "That is my brother.", "The other is this."], category: "consonant" },
  { symbol: "/s/", jaDescription: "無声音の『ス』。舌先を上の歯茎に近づけて息を出す。", practiceWords: ["see", "bus", "glass", "sister", "face"], practiceSentences: ["See the bus.", "The glass is clean.", "My sister has a face."], category: "consonant" },
  { symbol: "/z/", jaDescription: "有声音の『ズ』。舌先を上の歯茎に近づけて声を出す。", practiceWords: ["zoo", "zero", "music", "nose", "busy"], practiceSentences: ["Go to the zoo.", "The music is zero.", "My nose is busy."], category: "consonant" },
  { symbol: "/ʃ/", jaDescription: "無声音の『シュ』。舌を少し丸めて息を出す。", practiceWords: ["she", "shop", "fish", "wash", "shoe"], practiceSentences: ["She will shop.", "Wash the fish.", "Put on your shoe."], category: "consonant" },
  { symbol: "/ʒ/", jaDescription: "有声音の『ジュ』。舌を少し丸めて声を出す。", practiceWords: ["measure", "vision", "beige", "genre", "usual"], practiceSentences: ["Measure the vision.", "The genre is beige.", "It's the usual measure."], category: "consonant" },
  { symbol: "/h/", jaDescription: "無声音の『ハ』。息を強く出す。", practiceWords: ["he", "hi", "house", "ahead", "hope"], practiceSentences: ["He is in the house.", "Say hi ahead.", "Hope for the best."], category: "consonant" },
  { symbol: "/tʃ/", jaDescription: "無声音の『チ』。舌先を上の歯茎につけて一気に離す。", practiceWords: ["check", "church", "match", "watch", "teacher"], practiceSentences: ["Check the match.", "The church has a teacher.", "Watch the match."], category: "consonant" },
  { symbol: "/dʒ/", jaDescription: "有声音の『ヂ』。舌先を上の歯茎につけて一気に離し、声帯を震わせる。", practiceWords: ["job", "jungle", "age", "large", "judge"], practiceSentences: ["The job is large.", "Judge the age.", "Go to the jungle."], category: "consonant" },
  { symbol: "/m/", jaDescription: "有声音の『ム』。唇を閉じて鼻から声を出す。", practiceWords: ["man", "time", "home", "summer", "room"], practiceSentences: ["The man is at home.", "It's summer time.", "Clean the room."], category: "consonant" },
  { symbol: "/n/", jaDescription: "有声音の『ン』。舌先を上の歯茎につけて鼻から声を出す。", practiceWords: ["no", "nine", "name", "ten", "dinner"], practiceSentences: ["No name for dinner.", "Nine and ten.", "Say no to dinner."], category: "consonant" },
  { symbol: "/ŋ/", jaDescription: "有声音の『ング』。舌の後ろを上あごにつけて鼻から声を出す。", practiceWords: ["sing", "long", "song", "king", "ring"], practiceSentences: ["Sing a song.", "The king has a ring.", "It's a long song."], category: "consonant" },
  { symbol: "/l/", jaDescription: "有声音の『ル』。舌先を上の歯茎につけて声を出す。", practiceWords: ["let", "little", "love", "light", "yellow"], practiceSentences: ["Let the light in.", "A little love.", "The yellow light."], category: "consonant" },
  { symbol: "/r/", jaDescription: "有声音の『ラ』。舌を丸めて後ろに引く。アメリカ英語特有のR音。", practiceWords: ["red", "right", "read", "around", "car"], practiceSentences: ["Read the red car.", "Turn right around.", "The car is red."], category: "consonant" },
  { symbol: "/j/", jaDescription: "有声音の『イ』。舌を上あごに近づけて声を出す。", practiceWords: ["yes", "yellow", "yesterday", "young", "beyond"], practiceSentences: ["Yes, it's yellow.", "Yesterday was young.", "Go beyond yesterday."], category: "consonant" },
  { symbol: "/w/", jaDescription: "有声音の『ワ』。唇を丸めて声を出す。", practiceWords: ["we", "wait", "window", "water", "away"], practiceSentences: ["We wait by the window.", "Go away with water.", "Wait for the water."], category: "consonant" },
]

export function PronunciationTrainer() {
  const [selectedPhoneme, setSelectedPhoneme] = useState<PhonemePractice | null>(PHONEME_PRACTICES[0])
  const [showJapanese, setShowJapanese] = useState(true)
  const [activeTab, setActiveTab] = useState("single")

  // All Phonemesタブ用: symbolの重複を除いた最初の出現のみ抽出
  const uniquePhonemePractices = PHONEME_PRACTICES.filter(
    (p, i, arr) => arr.findIndex(x => x.symbol === p.symbol) === i
  )

  // Add state and handlers for repeat tab at the top of the component
  const [repeatText, setRepeatText] = useState("");
  const [repeatCount, setRepeatCount] = useState(5);
  const [repeatPlay, setRepeatPlay] = useState(false);
  const [repeatPlayKey, setRepeatPlayKey] = useState(0);
  // Add state for repeat progress and status
  const [repeatCurrent, setRepeatCurrent] = useState(0);
  const [repeatStatus, setRepeatStatus] = useState<'idle' | 'playing' | 'done'>('idle');

  // Update handlers for repeat play/stop/end
  const handleRepeatPlay = () => {
    setRepeatCurrent(0);
    setRepeatStatus('playing');
    setRepeatPlay(true);
    setRepeatPlayKey(prev => prev + 1);
  };
  const handleRepeatStop = () => {
    setRepeatStatus('idle');
    setRepeatPlay(false);
  };
  const handleRepeatEnd = () => {
    setRepeatStatus('done');
    setRepeatPlay(false);
  };
  // TextToSpeechの進捗を受け取るコールバック
  const handleRepeatProgress = (current: number) => {
    setRepeatCurrent(current);
    setRepeatStatus('playing');
  };

  // Update setRepeatText to reset status
  const handleSetRepeatText = (text: string) => {
    setRepeatText(text);
    if (repeatStatus !== 'playing') setRepeatStatus('idle');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>アメリカ英語発音記号別 練習例文集</span>
          </CardTitle>
          <CardDescription>
            発音記号ごとに日本語の特徴説明・練習単語・例文・ポイントを表示します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="single">個別表示</TabsTrigger>
              <TabsTrigger value="all">All Phonemes</TabsTrigger>
              <TabsTrigger value="list">発音記号一覧</TabsTrigger>
              <TabsTrigger value="guide">練習ガイド</TabsTrigger>
              <TabsTrigger value="repeat">反復練習</TabsTrigger>
            </TabsList>
            <TabsContent value="single">
              <div className="mb-4 flex flex-wrap gap-2">
                {PHONEME_PRACTICES.map((p) => (
                  <Button
                    key={p.symbol}
                    variant={selectedPhoneme?.symbol === p.symbol ? "default" : "outline"}
                    onClick={() => setSelectedPhoneme(p)}
                    className="text-base px-3 py-1"
                  >
                    {p.symbol}
                  </Button>
                ))}
              </div>
              {selectedPhoneme && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-base px-2 py-1">
                      {selectedPhoneme.symbol}
                    </Badge>
                    <span className="text-sm text-slate-600">{selectedPhoneme.category === "vowel" ? "母音" : selectedPhoneme.category === "diphthong" ? "二重母音" : selectedPhoneme.category === "consonant" ? "子音" : "その他"}</span>
                    <Button size="sm" variant="ghost" onClick={() => setShowJapanese((v) => !v)}>
                      {showJapanese ? "日本語非表示" : "日本語表示"}
                    </Button>
                  </div>
                  {showJapanese && (
                    <div className="text-slate-800 text-base font-medium mb-2">{selectedPhoneme.jaDescription}</div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">練習単語</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPhoneme.practiceWords.map((w, i) => (
                        <span key={i} className="bg-blue-50 text-blue-800 rounded px-2 py-1 text-sm border border-blue-200">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">練習例文</div>
                    <ul className="list-disc ml-6 space-y-1">
                      {selectedPhoneme.practiceSentences.map((s, i) => (
                        <li key={i} className="text-base text-slate-900">{s}</li>
                      ))}
                    </ul>
                  </div>
                  {selectedPhoneme.practiceTips && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-yellow-900 text-sm rounded">
                      <span className="font-semibold">練習のポイント: </span>{selectedPhoneme.practiceTips}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uniquePhonemePractices.map((p) => (
                  <Card key={p.symbol} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-base px-2 py-1">{p.symbol}</Badge>
                      <span className="text-xs text-slate-600">{p.category === "vowel" ? "母音" : p.category === "diphthong" ? "二重母音" : p.category === "consonant" ? "子音" : "その他"}</span>
                    </div>
                    <div className="text-slate-800 text-base font-medium mb-2">{p.jaDescription}</div>
                    <div className="mb-2">
                      <div className="font-semibold text-slate-700 mb-1">練習単語</div>
                      <div className="flex flex-wrap gap-2">
                        {p.practiceWords.map((w, i) => (
                          <span key={i} className="bg-blue-50 text-blue-800 rounded px-2 py-1 text-sm border border-blue-200">{w}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-slate-700 mb-1">練習例文</div>
                      <ul className="list-disc ml-6 space-y-1">
                        {p.practiceSentences.map((s, i) => (
                          <li key={i} className="text-base text-slate-900">{s}</li>
                        ))}
                      </ul>
                    </div>
                    {p.practiceTips && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-yellow-900 text-sm rounded">
                        <span className="font-semibold">練習のポイント: </span>{p.practiceTips}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list">
              <div className="space-y-8">
                {/* 母音 */}
                <div>
                  <div className="font-bold text-lg mb-2">母音 (Vowels)</div>
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-2 py-1">記号</th>
                        <th className="border px-2 py-1">日本語説明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uniquePhonemePractices.filter(p => p.category === "vowel").map((p) => (
                        <tr key={p.symbol}>
                          <td className="border px-2 py-1 text-center font-mono">{p.symbol}</td>
                          <td className="border px-2 py-1">{p.jaDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* 二重母音 */}
                <div>
                  <div className="font-bold text-lg mb-2">二重母音 (Diphthongs)</div>
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-2 py-1">記号</th>
                        <th className="border px-2 py-1">日本語説明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uniquePhonemePractices.filter(p => p.category === "diphthong").map((p) => (
                        <tr key={p.symbol}>
                          <td className="border px-2 py-1 text-center font-mono">{p.symbol}</td>
                          <td className="border px-2 py-1">{p.jaDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* 子音 */}
                <div>
                  <div className="font-bold text-lg mb-2">子音 (Consonants)</div>
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-2 py-1">記号</th>
                        <th className="border px-2 py-1">日本語説明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uniquePhonemePractices.filter(p => p.category === "consonant").map((p) => (
                        <tr key={p.symbol}>
                          <td className="border px-2 py-1 text-center font-mono">{p.symbol}</td>
                          <td className="border px-2 py-1">{p.jaDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="guide">
              <div className="space-y-8">
                {/* 母音セクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>母音の練習</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* /ɪ/ */}
                    <div>
                      <div className="font-bold">/ɪ/ (短い「イ」)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 日本語の「エ」と「イ」の間の音。口をあまり開けない。</div>
                      <div className="mb-1">練習単語: <span className="font-mono">city, it, busy, system, women, business, build</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>This is a big city.</li>
                        <li>I think he's busy.</li>
                        <li>Women in business are building systems.</li>
                      </ul>
                      <div className="text-xs text-slate-600">練習のポイント: 「エ」で言い過ぎないよう、リラックスした音を意識する</div>
                    </div>
                    {/* /iː/ */}
                    <div>
                      <div className="font-bold">/iː/ (長い「イー」)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 日本語の「イ」より口が横に引っ張られる</div>
                      <div className="mb-1">練習単語: <span className="font-mono">green, meet, beach, see, team, teacher</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>I can see the green trees.</li>
                        <li>The teacher will meet the team.</li>
                        <li>We reached the beach by three.</li>
                      </ul>
                    </div>
                    {/* /æ/ */}
                    <div>
                      <div className="font-bold">/æ/ (エとアの間)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 口を大きく横に開く「ア」の音</div>
                      <div className="mb-1">練習単語: <span className="font-mono">cat, man, bad, happy, travel, pattern</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>The cat sat on the mat.</li>
                        <li>A happy man travels fast.</li>
                        <li>That's a bad pattern.</li>
                      </ul>
                      <div className="text-xs text-slate-600">注意: M, N, Gの前では /e/ に変化することがある hand → /hend/ family → /femɪli/ can → /ken/</div>
                    </div>
                    {/* /ɑ/ */}
                    <div>
                      <div className="font-bold">/ɑ/ (口を大きく開けた「ア」)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 日本語の「オ」ではなく、大きく口を開けた「ア」</div>
                      <div className="mb-1">練習単語: <span className="font-mono">body, box, follow, god, hot, job, watch, wash</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>John's job involves watching the clock.</li>
                        <li>The hot coffee was in a small box.</li>
                        <li>Follow the doctor's advice about your body.</li>
                      </ul>
                    </div>
                    {/* /ɔː/ */}
                    <div>
                      <div className="font-bold">/ɔː/ (オー音)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: アメリカ英語では /ɑ/ と同じ音になる地域が多い</div>
                      <div className="mb-1">練習単語: <span className="font-mono">call, all, talk, walk, small, ball</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Call me when you walk to the mall.</li>
                        <li>We talked about the small ball.</li>
                        <li>All the students walked to the hall.</li>
                      </ul>
                      <div className="text-xs text-slate-600">注意: Rが続く場合はしっかり「オー」音 door, four, more</div>
                    </div>
                    {/* /e/ */}
                    <div>
                      <div className="font-bold">/e/ (エ)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 日本語の「エ」より若干横に大きく口を開く</div>
                      <div className="mb-1">練習単語: <span className="font-mono">get, pen, red, men, desk, send</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Get the red pen from the desk.</li>
                        <li>Ten men sent letters.</li>
                        <li>When did you get the message?</li>
                      </ul>
                    </div>
                    {/* /ə/ */}
                    <div>
                      <div className="font-bold">/ə/ (/ʌ/) (曖昧母音)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 最も重要な母音。弱い音節で使われる</div>
                      <div className="mb-1">練習単語: <span className="font-mono">about, from, want, butter, number, under</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>I want to talk about the number.</li>
                        <li>The butter is under the cover.</li>
                        <li>Come from another country.</li>
                      </ul>
                      <div className="text-xs text-slate-600">重要: 弱く読む部分はこの音になることが多い</div>
                    </div>
                    {/* /ʊ/ */}
                    <div>
                      <div className="font-bold">/ʊ/ (短い「ウ」)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 「ウ」と「オ」の間のリラックスした音</div>
                      <div className="mb-1">練習単語: <span className="font-mono">book, good, could, should, look, put</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>I could look at the good book.</li>
                        <li>You should put it where you could look.</li>
                        <li>The cook took a good look.</li>
                      </ul>
                    </div>
                    {/* /uː/ */}
                    <div>
                      <div className="font-bold">/uː/ (長い「ウー」)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 唇をすぼめ、舌を後ろに引く緊張感のある音</div>
                      <div className="mb-1">練習方法: 徐々に唇をすぼめる: ドー → ドゥー → ドゥゥー / うううう → ずーーーー（徐々に唇を丸らせていく） / do: ドゥーーーーウ（二重母音的に移動）</div>
                      <div className="mb-1">練習単語: <span className="font-mono">do, you, new, blue, food, school</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>You can do it at the new school.</li>
                        <li>The blue food looks good to you.</li>
                        <li>Who knew you could move so smoothly?</li>
                      </ul>
                    </div>
                    {/* /ər/ */}
                    <div>
                      <div className="font-bold">/ər/ (アメリカのR音)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 舌を後ろに引き、喉の方に意識を向ける</div>
                      <div className="mb-1">練習方法: 自分のベロで窒息させる感覚: 舌を後ろに引く圧力 / very: ベーーーーリー（ベーと言いながら舌をたたたたたの位置へ） / 最初に「あー」: あーーーファースト / 舌先はどこにもつけない、舌の横はべったり口の中についてもOK</div>
                      <div className="mb-1">練習単語: <span className="font-mono">her, first, bird, work, turn, learn</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Her first word was "bird."</li>
                        <li>We learned to work hard.</li>
                        <li>Turn left at the third corner.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                {/* 特別な練習法セクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>特別な練習法</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-bold">強弱リズムの練習切り替え</div>
                      <div className="text-sm">1音節: to, get, cake, man, card, she</div>
                      <div className="text-sm">2音節: about → a-BOUT（ほとんど囁くぐらい弱く + 強く）/ accept → ac-CEPT / expect → ex-PECT</div>
                      <div className="text-sm">3音節: fantastic → fan-TAS-tic（最初と最後をほとんど囁く）/ punishment → PUN-ish-ment</div>
                      <div className="text-xs text-slate-600">練習方法: パンチを打つような感覚で強弱の差を激しくつける</div>
                    </div>
                    <div>
                      <div className="font-bold">母音挿入防止の練習切り替え</div>
                      <div className="text-sm">
                        <ul>
                          <li>up → アップ（×） / アッ（○）</li>
                          <li>that → ザット（×） / ザッ（○）</li>
                          <li>make → メイク（×） / メイッ（○）</li>
                          <li>time → タイム（×） / タイッ（○）</li>
                          <li>job → ジョブ（×） / ジョッ（○）優しく終わる</li>
                        </ul>
                      </div>
                      <div className="text-xs text-slate-600">練習のコツ: 母音は長く伸ばしてもOK、でも子音の後に母音を入れない</div>
                    </div>
                    <div>
                      <div className="font-bold">気音化の練習切り替え</div>
                      <div className="text-sm">
                        <ul>
                          <li>P音: pen → ペンッ（息が漏れる）/ spin → スピン（息が漏れない、ほぼB音）</li>
                          <li>T音: top → トップッ（息が漏れる）/ stop → ストップ（息が漏れない、ほぼD音）</li>
                          <li>K音: key → キーッ（息が漏れる）/ ski → スキー（息が漏れない、ほぼG音）</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">弱形練習の切り替え</div>
                      <div className="text-sm">
                        <ul>
                          <li>can: 強形: I CAN go（アイ キャン ゴー）/ 弱形: I c'n go（アイ クン ゴー）</li>
                          <li>you: 強形: YOU are（ユー アー）/ 弱形: Y'r（ヤー）</li>
                          <li>he/him/his:
                            <ul>
                              <li>I think he can do it → I think 'e c'n do it</li>
                              <li>Give him the book → Give 'im the book</li>
                              <li>This is his car → This is 'is car</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 二重母音セクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>二重母音の練習</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-bold">/eɪ/ (エイ)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 「エ」が長く、「イ」は短く</div>
                      <div className="mb-1">練習単語: <span className="font-mono">day, make, take, wait, great, eight</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Wait for me to make the cake.</li>
                        <li>Take the train on a great day.</li>
                        <li>Eight students came late today.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold">/aɪ/ (アイ)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 「ア」が長く、「イ」は短く</div>
                      <div className="mb-1">練習単語: <span className="font-mono">I, my, right, time, drive, night</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>I drive at night time.</li>
                        <li>My right eye is fine.</li>
                        <li>Try to arrive on time.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold">/ɔɪ/ (オイ)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 「オ」が長く、「イ」は短く</div>
                      <div className="mb-1">練習単語: <span className="font-mono">boy, toy, enjoy, voice, choice, point</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>The boy enjoys his new toy.</li>
                        <li>Make your choice with your voice.</li>
                        <li>Point to your favorite toy.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold">/oʊ/ (オウ)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 唇を動かして音を変化させる</div>
                      <div className="mb-1">練習方法: 唇の動きを意識: おおおお → うううう / 脳: のーーーーうーーー（音を移動させる） / ノー、ソー、オンリー、オーバー（すべて唇を動かして）</div>
                      <div className="mb-1">練習単語: <span className="font-mono">go, no, phone, home, slow, show</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Go home and phone me.</li>
                        <li>Show me the slow motion.</li>
                        <li>No one knows the code.</li>
                      </ul>
                      <div className="text-xs text-slate-600">注意: 日本語の「オ」で終わらず、「ウ」に向かって音を移動させる</div>
                    </div>
                    <div>
                      <div className="font-bold">/aʊ/ (アウ)</div>
                      <div className="text-sm text-slate-700 mb-1">特徴: 「ア」が長く、「ウ」は短く</div>
                      <div className="mb-1">練習単語: <span className="font-mono">how, now, house, about, sound, found</span></div>
                      <div className="mb-1">練習例文:</div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>How about going to my house now?</li>
                        <li>The sound was found downtown.</li>
                        <li>Thousands of people came out.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                {/* 子音セクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>子音の練習</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-bold">R と L</div>
                      <div className="text-sm">
                        <ul>
                          <li>R音: 舌がどこにもつかない</li>
                          <li>L音: 舌先が歯の裏につく</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>R音の練習切り替え: たたたたた...rrrrr（舌を徐々に上に反らせて、どこにもつかなくなるポイントを見つける）</li>
                          <li>たたたたた → らららら → rrrrr</li>
                          <li>後ろから前に: たたたたたたた</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>L音の練習: らららら → lllll（舌先を歯の裏にしっかりつける）</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習対比: right/light, road/load, rice/lice, really, world, girl, travel, problem</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習例文: The right light is really bright. / Rice and lice are totally different. / Travel around the world carefully.</li>
                        </ul>
                      </div>
                      <div className="text-xs text-slate-600">語尾のL: school, bell, pool, people<br />The school bell rang for all people.<br />スクール（ウに近い音で舌は歯の裏に向かう感覚）</div>
                    </div>
                    <div>
                      <div className="font-bold">F と V</div>
                      <div className="text-sm">
                        <ul>
                          <li>F音: 歯と唇の摩擦音（息のみ）</li>
                          <li>V音: 歯と唇の摩擦音＋喉の振動</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習切り替え: fff...vvv...fff...vvv（基本切り替え）</li>
                          <li>ffffファイン → vvvvバイン</li>
                          <li>ffffフード → vvvvヴューティフル</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習単語: fine/vine, fan/van, safe/save, very, have, love, believe</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習例文: I have a very fine voice. / Save the file on your favorite device. / We believe in five values.</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">TH音</div>
                      <div className="text-sm">
                        <ul>
                          <li>無声TH /θ/: thing, think, three</li>
                          <li>有声TH /ð/: this, that, the</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習方法: 歯と歯の隙間に舌を近づけて空気を通す</li>
                          <li>練習切り替え: θθθ...ððð...θθθ...ððð</li>
                          <li>θθθシンク → ðððディス</li>
                          <li>θθθシング → ðððザット</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習例文: I think this thing is thick. / The three brothers came together. / That's the thing I was thinking about.</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">「ず」と「づ」の区別</div>
                      <div className="text-sm">
                        <ul>
                          <li>S系の音 /z/: cards, roads, dogs</li>
                          <li>T系の音 /dʒ/: change, choose, just</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習切り替え: zzz...dʒdʒdʒ...zzz...dʒdʒdʒ</li>
                          <li>zzzカーズ → dʒdʒdʒチェンジ</li>
                          <li>zzzローズ → dʒdʒdʒジャッジ</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習例文: Choose the right cards. / Just change the subject. / These dogs need changes.</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">H と W</div>
                      <div className="text-sm">
                        <ul>
                          <li>H音: 窓ガラスに息を吹きかける感じ</li>
                          <li>W音: 唇を強くすぼめて戻す</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>H音の練習切り替え: 日本語のハヒフヘホ → 英語のハヒフヘホ</li>
                          <li>日本語: ひひひ（ベロの根元の摩擦が強い）</li>
                          <li>英語: hhhhヘッド（窓ガラスに息を吹きかける）</li>
                          <li>息をめちゃくちゃ使う: ハヒフヘホ</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>W音の練習: 唇の先端に意識: うううう → wwww</li>
                          <li>うワーン（唇をすぼめた状態から戻ってくる）</li>
                          <li>work: ウワーク（唇をとにかくすぼめて）</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習単語: H: he, head, house, have, help / W: we, work, would, one, way</li>
                        </ul>
                      </div>
                      <div className="text-sm">
                        <ul>
                          <li>練習例文: We would help him with his work. / He went to his house one way. / What would you have for lunch?</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 音声変化セクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>音声変化の例文</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <div className="font-bold">リンキング</div>
                      <div className="text-sm">
                        <ul>
                          <li>I like it → I li-ket</li>
                          <li>When I → Whe-nI</li>
                          <li>Come on → Co-mon</li>
                          <li>Turn it off → Tur-ni-toff</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">弱形</div>
                      <div className="text-sm">
                        <ul>
                          <li>I can go → I c'n go</li>
                          <li>You are → You're / Y'r</li>
                          <li>He is → He's / E's</li>
                          <li>Do you → D'you / D'ya</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">省略</div>
                      <div className="text-sm">
                        <ul>
                          <li>Must be → Mus' be</li>
                          <li>Next door → Nex' door</li>
                          <li>Asked him → Ask'd him</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 総合練習例文セクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>総合練習例文</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <div className="font-bold">基本文</div>
                      <div className="text-sm">
                        <ul>
                          <li>"I have a dream." - キング牧師<br />強弱: I HAVE a DREAM<br />弱形活用</li>
                          <li>"You can't connect the dots." - スティーブ・ジョブス<br />音声変化: can't + connect</li>
                          <li>"We all need people who give us feedback." - ビル・ゲイツ<br />強弱とイントネーション練習</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">日常会話</div>
                      <div className="text-sm">
                        <ul>
                          <li>What's the weather like today?</li>
                          <li>I think we should go to the store.</li>
                          <li>Could you help me with this problem?</li>
                          <li>I'm really excited about the new project.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 練習のポイントセクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>練習のポイント</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal ml-6 space-y-1 text-sm">
                      <li><b>強弱リズム</b>: 大事な単語を強く、機能語は弱く</li>
                      <li><b>母音挿入禁止</b>: 子音で終わる単語に母音を入れない</li>
                      <li><b>音の連結</b>: 単語間の境界を意識せずスムーズに</li>
                      <li><b>感情を込める</b>: イントネーションで意味を変える</li>
                      <li><b>反復練習</b>: 同じ音を繰り返し練習してマッスルメモリーを作る</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="repeat">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Repeat className="w-5 h-5" />
                    <span>反復練習: 同じ音を繰り返し練習してマッスルメモリーを作る</span>
                  </CardTitle>
                  <CardDescription>
                    発音記号・単語・例文を選んで、音声で繰り返し練習しましょう。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Phoneme selection */}
                  <div className="mb-2 flex flex-wrap gap-2">
                    {uniquePhonemePractices.map((p) => (
                      <Button
                        key={p.symbol}
                        variant={selectedPhoneme?.symbol === p.symbol ? "default" : "outline"}
                        onClick={() => setSelectedPhoneme(p)}
                        className="text-base px-3 py-1"
                      >
                        {p.symbol}
                      </Button>
                    ))}
                  </div>
                  {selectedPhoneme && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-base px-2 py-1">{selectedPhoneme.symbol}</Badge>
                        <span className="text-sm text-slate-600">{selectedPhoneme.category === "vowel" ? "母音" : selectedPhoneme.category === "diphthong" ? "二重母音" : selectedPhoneme.category === "consonant" ? "子音" : "その他"}</span>
                      </div>
                      <div className="text-slate-800 text-base font-medium mb-2">{selectedPhoneme.jaDescription}</div>
                      {/* Show selected text */}
                      {repeatText && (
                        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                          <span className="font-semibold text-blue-700">選択中:</span>
                          <span className="text-base text-blue-900 font-mono">{repeatText}</span>
                        </div>
                      )}
                      {/* Word/Sentence selection */}
                      <div>
                        <div className="font-semibold text-slate-700 mb-1">練習単語</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedPhoneme.practiceWords.map((w, i) => (
                            <Button key={i} variant={repeatText === w ? "default" : "secondary"} size="sm" onClick={() => handleSetRepeatText(w)} className="flex items-center gap-1">
                              {repeatText === w && <Check className="w-4 h-4 text-green-600" />}
                              {w}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700 mb-1">練習例文</div>
                        <div className="flex flex-col gap-2">
                          {selectedPhoneme.practiceSentences.map((s, i) => (
                            <Button key={i} variant={repeatText === s ? "default" : "outline"} size="sm" onClick={() => handleSetRepeatText(s)} className="flex items-center gap-1">
                              {repeatText === s && <Check className="w-4 h-4 text-green-600" />}
                              {s}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/* Repeat controls and status */}
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm">繰り返し回数:</span>
                          <input type="number" min={1} max={20} value={repeatCount} onChange={e => setRepeatCount(Number(e.target.value))} className="w-16 border rounded px-2 py-1 text-sm" />
                          <span className="text-sm text-slate-600">進捗: {repeatStatus === 'playing' ? `${repeatCurrent + 1}/${repeatCount}` : repeatStatus === 'done' ? `${repeatCount}/${repeatCount}` : `0/${repeatCount}`}</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-slate-200 rounded">
                          <div className={`h-2 rounded bg-blue-500 transition-all`} style={{ width: `${((repeatStatus === 'done' ? repeatCount : repeatCurrent + (repeatStatus === 'playing' ? 1 : 0)) / repeatCount) * 100}%` }} />
                        </div>
                        {/* Status label */}
                        <div className="flex items-center gap-2 mt-1">
                          {repeatStatus === 'playing' && <span className="text-green-600 font-semibold">再生中...</span>}
                          {repeatStatus === 'idle' && <span className="text-slate-500">停止中</span>}
                          {repeatStatus === 'done' && <span className="text-blue-700 font-semibold">完了！</span>}
                        </div>
                        {/* Play/Stop buttons */}
                        <div className="flex gap-2 mt-1">
                          <Button onClick={handleRepeatPlay} disabled={!repeatText || repeatStatus === 'playing'} className="flex items-center gap-1"><Repeat className="w-4 h-4" />{repeatStatus === 'playing' ? '再生中...' : '再生'}</Button>
                          <Button variant="outline" onClick={handleRepeatStop} disabled={repeatStatus !== 'playing'}>停止</Button>
                        </div>
                      </div>
                      {/* TextToSpeech for repeated playback */}
                      <div className="mt-2">
                        <TextToSpeech key={repeatText + repeatCount + repeatPlayKey} text={repeatText} repeat={repeatCount} play={repeatPlay} onEnd={handleRepeatEnd} onProgress={handleRepeatProgress} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
