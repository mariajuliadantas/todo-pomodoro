import { useEffect, useState, useCallback } from "react"

type SessionType = "work" | "short-break" | "long-break"

const INITIAL_TIME_IN_SECONDS = 5 //mudar dps
const SHORT_BREAK_SECONDS = 5 
const LONG_BREAK_SECONDS = 15 

export function PomodoroTimer() {
  const [sessionType, setSessionType] = useState<SessionType>("work")
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIME_IN_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const[completedCycles, setCompletedCycles] = useState(0)

  const formattedTime = formatTime(secondsLeft)

  const getInitialTimerForSession = useCallback((sessionType: SessionType) => {
    switch (sessionType) {
      case "work":
        return INITIAL_TIME_IN_SECONDS
      case "short-break":
        return SHORT_BREAK_SECONDS
      case "long-break":
        return LONG_BREAK_SECONDS
    }
  }, [])

  const handleSwitchSession = useCallback((newSessionType: SessionType) => {
    setSessionType(newSessionType)
    setSecondsLeft(getInitialTimerForSession(newSessionType))
    setIsRunning(false)
  }, [getInitialTimerForSession])

  const statusTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(getInitialTimerForSession(sessionType))
  }, [sessionType, getInitialTimerForSession])

  useEffect(() => {
  if (!isRunning) return

  if (secondsLeft <= 0) {
    setIsRunning(false)
    if (sessionType === "work") {
      setCompletedCycles((prev) => prev + 1)
    }
    return
  }

  const intervalId = setInterval(() => {
    setSecondsLeft((prev) => prev - 1)
  }, 1000)

  return () => clearInterval(intervalId)
}, [isRunning, secondsLeft, sessionType])

  return (
  <div className="flex flex-col items-center gap-6">

    <div className="flex gap-3">
      {(["work", "short-break", "long-break"] as SessionType[]).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => handleSwitchSession(type)}
          className={
            "rounded-full px-4 py-1 text-sm font-medium " +
            (sessionType === type
              ? "bg-emerald-500 text-slate-900"
              : "bg-slate-700 text-slate-100 hover:bg-slate-600")
          }
        >
          {type === "work"
            ? "Foco"
            : type === "short-break"
            ? "Pausa curta"
            : "Pausa longa"}
        </button>
      ))}
    </div>

    {/* Timer */}
    <div className="text-6xl font-mono text-slate-100">
      {formattedTime}
    </div>

    {/* Controles */}
    <div className="flex gap-3">
      <button
        type="button"
        onClick={statusTimer}
        disabled={secondsLeft === 0}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
      >
        {isRunning ? "Pausar" : "Iniciar"}
      </button>

      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-500"
      >
        Resetar
      </button>
    </div>

    {/* Ciclos concluídos */}
    <div className="text-sm text-slate-400">
      Ciclos concluídos:{" "}
      <span className="font-semibold text-emerald-400">
        {completedCycles}
      </span>
    </div>

  </div>
)
}
function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const minutesString = String(minutes).padStart(2, "0")
  const secondsString = String(seconds).padStart(2, "0")

  return `${minutesString}:${secondsString}`
}