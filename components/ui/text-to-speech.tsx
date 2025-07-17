"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, Play, Pause, RotateCcw, Settings, Download } from "lucide-react"

interface Voice {
  name: string
  lang: string
  voiceURI: string
}

export function TextToSpeech({
  text: propText,
  repeat = 1,
  play = false,
  onEnd,
  onProgress,
}: {
  text?: string
  repeat?: number
  play?: boolean
  onEnd?: () => void
  onProgress?: (current: number) => void
} = {}) {
  const [text, setText] = useState(propText ?? "")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<Voice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")
  const [rate, setRate] = useState([1])
  const [pitch, setPitch] = useState([1])
  const [volume, setVolume] = useState([1])
  const [isMuted, setIsMuted] = useState(false)
  const [currentWord, setCurrentWord] = useState("")
  const [repeatIndex, setRepeatIndex] = useState(0)
  const [externalPlay, setExternalPlay] = useState(false)

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const isControlled = propText !== undefined

  // 既存のuseEffect（Web Speech APIの初期化とvoiceリスト取得）を修正
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis
      const loadVoices = () => {
        const availableVoices = synthesisRef.current?.getVoices() || []
        setVoices(availableVoices)
        // デフォルトで日本語または英語の音声を選択
        if (!selectedVoice && availableVoices.length > 0) {
          const defaultVoice = availableVoices.find(voice =>
            voice.lang.startsWith('ja') || voice.lang.startsWith('en')
          ) || availableVoices[0]
          if (defaultVoice) {
            setSelectedVoice(defaultVoice.voiceURI)
          }
        }
      }
      if (synthesisRef.current.onvoiceschanged !== undefined) {
        synthesisRef.current.onvoiceschanged = loadVoices
      }
      loadVoices()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // controlled再生時、voicesやselectedVoiceが未セットなら再生を遅延
  useEffect(() => {
    if (isControlled && play && propText) {
      if (!voices.length || !selectedVoice) {
        // voices/selectedVoiceが揃うまで待つ
        return
      }
      setRepeatIndex(0)
      setExternalPlay(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, propText, repeat, voices, selectedVoice])

  // 外部制御の繰り返し再生
  useEffect(() => {
    if (externalPlay && isControlled && propText) {
      if (repeatIndex < repeat) {
        if (onProgress) onProgress(repeatIndex);
        speakControlled()
      } else {
        setExternalPlay(false)
        setRepeatIndex(0)
        if (onEnd) onEnd()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPlay, repeatIndex])

  // Add effect to stop speech when play becomes false in controlled mode
  useEffect(() => {
    if (isControlled && !play) {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  // 外部制御用のspeak
  const speakControlled = () => {
    if (!synthesisRef.current || !propText.trim()) return
    if (!voices.length || !selectedVoice) return // voices/voice未セットなら再生しない
    stop()
    const utterance = new SpeechSynthesisUtterance(propText)
    speechRef.current = utterance
    const voice = voices.find(v => v.voiceURI === selectedVoice)
    if (voice) utterance.voice = voice
    utterance.rate = rate[0]
    utterance.pitch = pitch[0]
    utterance.volume = isMuted ? 0 : volume[0]
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }
    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWord("")
      setRepeatIndex(idx => idx + 1)
    }
    utterance.onpause = () => setIsPaused(true)
    utterance.onresume = () => setIsPaused(false)
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const wordStart = event.charIndex
        const wordEnd = propText.indexOf(' ', wordStart)
        const word = propText.substring(wordStart, wordEnd === -1 ? propText.length : wordEnd)
        setCurrentWord(word)
      }
    }
    synthesisRef.current.speak(utterance)
  }

  const speak = () => {
    if (!synthesisRef.current || !text.trim()) return

    // 既存の読み上げを停止
    stop()

    // 新しい読み上げを作成
    const utterance = new SpeechSynthesisUtterance(text)
    speechRef.current = utterance

    // 音声設定
    if (selectedVoice) {
      const voice = voices.find(v => v.voiceURI === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    utterance.rate = rate[0]
    utterance.pitch = pitch[0]
    utterance.volume = isMuted ? 0 : volume[0]

    // イベントハンドラー
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWord("")
    }

    utterance.onpause = () => {
      setIsPaused(true)
    }

    utterance.onresume = () => {
      setIsPaused(false)
    }

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const wordStart = event.charIndex
        const wordEnd = text.indexOf(' ', wordStart)
        const word = text.substring(wordStart, wordEnd === -1 ? text.length : wordEnd)
        setCurrentWord(word)
      }
    }

    // 読み上げ開始
    synthesisRef.current.speak(utterance)
  }

  const pause = () => {
    if (synthesisRef.current) {
      synthesisRef.current.pause()
    }
  }

  const resume = () => {
    if (synthesisRef.current) {
      synthesisRef.current.resume()
    }
  }

  const stop = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (speechRef.current) {
      speechRef.current.volume = !isMuted ? 0 : volume[0]
    }
  }

  const downloadAudio = () => {
    // 音声ファイルのダウンロード機能（実装例）
    alert("Audio file download feature is currently under development.")
  }

  const getLanguageName = (langCode: string) => {
    const langNames: { [key: string]: string } = {
      'ja': '日本語',
      'en': '英語',
      'es': 'スペイン語',
      'fr': 'フランス語',
      'de': 'ドイツ語',
      'it': 'イタリア語',
      'pt': 'ポルトガル語',
      'ru': 'ロシア語',
      'zh': '中国語',
      'ko': '韓国語'
    }
    
    const baseLang = langCode.split('-')[0]
    return langNames[baseLang] || langCode
  }

  const sampleTexts = [
            "Hello, welcome to Atomic Language. This is a text-to-speech demonstration.",
    "こんにちは、学習プラットフォームへようこそ。これは音声合成のデモンストレーションです。",
    "The quick brown fox jumps over the lazy dog.",
    "今日は良い天気ですね。一緒に英語を勉強しましょう。"
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>Text-to-Speech</span>
          </CardTitle>
          <CardDescription>
            Convert text to speech for reading aloud. Useful for learning and listening practice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* テキスト入力 */}
          {!isControlled && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Text Input</label>
              <Textarea
                placeholder="Enter text you want to read aloud..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px]"
              />
              
              {/* サンプルテキスト */}
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setText(sample)}
                  >
                    Sample {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 音声設定 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Voice Settings</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 音声選択 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Voice</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                        <div className="flex items-center justify-between">
                          <span>{voice.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {getLanguageName(voice.lang)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 速度 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Speed: {rate[0].toFixed(1)}x</label>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* 音程 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Pitch: {pitch[0].toFixed(1)}</label>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* 音量 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Volume: {Math.round(volume[0] * 100)}%</label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* コントロールボタン */}
          {!isControlled && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={isPlaying && !isPaused ? pause : isPaused ? resume : speak}
                disabled={!text.trim()}
                className="flex items-center space-x-2"
              >
                {isPlaying && !isPaused ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>
                  {isPlaying && !isPaused ? "Pause" : isPaused ? "Resume" : "Start Reading"}
                </span>
              </Button>

              <Button
                variant="outline"
                onClick={stop}
                disabled={!isPlaying}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Stop</span>
              </Button>

              <Button
                variant="outline"
                onClick={toggleMute}
                className="flex items-center space-x-2"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={downloadAudio}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Button>
            </div>
          )}

          {/* 現在読み上げ中の単語 */}
          {currentWord && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Currently reading:</p>
              <p className="text-lg font-bold text-blue-800">{currentWord}</p>
            </div>
          )}

          {/* ステータス表示 */}
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>{isPlaying ? 'Reading' : 'Idle'}</span>
            </div>
            {voices.length > 0 && (
              <span>Available voices: {voices.length}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 使用例 */}
      <Card>
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Learning Purposes</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• English listening practice</li>
                <li>• Pronunciation verification</li>
                <li>• Long text reading practice</li>
                <li>• Vocabulary audio learning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Accessibility</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Support for visually impaired</li>
                <li>• Audio learning during busy times</li>
                <li>• Learning while commuting</li>
                <li>• Content verification through audio</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 