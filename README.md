# 🍅⏱️🗒️ POMODORO + TO DO LIST

A focused productivity web app that combines a **Pomodoro timer** with a clean **to-do list**, designed for real-world workflows: deep work sessions, structured breaks, and cycle tracking — all in a simple, distraction-free interface.

---

## ✨ Overview

**pomodoro-todo** is built with three principles in mind:

- **Clarity** – minimalist interface, no unnecessary noise.
- **Focus** – Pomodoro-based timeboxing to structure your work.
- **Control** – short and long breaks, plus cycle tracking to measure actual focus.

This is the kind of app you keep pinned in a browser tab throughout your workday.

---

## 🧩 Features

### ⏳ Pomodoro Timer

- Session modes:
  - **Focus (`work`)**
  - **Short break (`short-break`)**
  - **Long break (`long-break`)**
- Controls:
  - **Start / Pause**
  - **Reset** (resets the current session to its initial time)
- Behavior safeguards:
  - The **Start** button is disabled when the timer reaches `00:00`,  
    preventing accidental double-counting or invalid states.
- Implementation:
  - Timer driven by `setInterval` wrapped in `useEffect`, with proper cleanup to avoid memory leaks and duplicate intervals.

### 🔁 Cycle Counter

- A **completed cycle** is defined as:
  - One **focus** (`work`) session that naturally reaches `00:00`.
- Break sessions (short and long) **do not** count as cycles.
- The current number of completed cycles is always visible in the UI:
  - `Completed cycles: X`

This gives a more realistic measure of how much deep work you’ve actually done.

### ✅ To-Do List

- Add tasks through a simple input field.
- Confirm by clicking the button or pressing **Enter**.
- Toggle tasks as completed.
- Remove tasks individually.
- Basic validation to avoid empty tasks.

The to-do list is intentionally minimal: it’s meant to support your current focus sessions, not replace a full project management tool.

---

## 🏗️ Tech Stack

- **Framework:** React + TypeScript
- **Build tool / runner:** Vite or Bun (depending on your environment)
- **Styling:** Tailwind CSS
- **State management:** React Hooks (`useState`, `useEffect`, `useCallback`)
- **Timer logic:** `setInterval` + `useEffect` with proper cleanup

---

## 🧱 Architecture

### Folder Structure (simplified)

```bash
src/
  components/
    PomodoroTimer.tsx
    TodoList.tsx
  App.tsx
  main.tsx
```

### `PomodoroTimer.tsx` – Core Logic (Conceptual Overview)

State:

```ts
type SessionType = "work" | "short-break" | "long-break"

const [sessionType, setSessionType] = useState<SessionType>("work")
const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIME_IN_SECONDS)
const [isRunning, setIsRunning] = useState(false)
const [completedCycles, setCompletedCycles] = useState(0)
```

Session duration selection:

```ts
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
```

Timer effect:

```ts
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
```

Session mode buttons:

```tsx
{(["work", "short-break", "long-break"] as SessionType[]).map((type) => (
  <button
    key={type}
    type="button"
    onClick={() => handleSwitchSession(type)}
    className={/* conditional styling for active vs inactive */}
  >
    {type === "work"
      ? "Focus"
      : type === "short-break"
      ? "Short break"
      : "Long break"}
  </button>
))}
```

Timer display formatting:

```ts
function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const minutesString = String(minutes).padStart(2, "0")
  const secondsString = String(seconds).padStart(2, "0")

  return `${minutesString}:${secondsString}`
}
```

---

## 📸 UI Overview


<img width="1907" height="943" alt="image" src="https://github.com/user-attachments/assets/a502c9b0-9625-4c78-bf93-7d96d6366e71" />


The layout is split into two primary panels:

- **Left panel:** Pomodoro timer and session controls.
- **Right panel:** To-do list for the current work session.

This gives you immediate context on *what* you’re doing and *how much time* you have to do it.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** or **Bun**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/pomodoro-todo.git

cd pomodoro-todo

# Install dependencies
npm install
# or
yarn
# or
bun install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
bun run dev
```

Then open the URL indicated in the terminal, typically:

```text
http://localhost:5173
```

---

## 🗺️ Roadmap (Potential Enhancements)

Some natural next steps for this project include:

- [ ] Persist tasks and cycles using `localStorage`
- [ ] Track daily/weekly cycle history
- [ ] Auto-schedule long breaks every N focus cycles
- [ ] Optional sound notification when a session ends
- [ ] Keyboard shortcuts (e.g., space to start/pause)
- [ ] Customizable durations for focus and breaks
- [ ] Light/dark theme switching

---

## 🎯 Project Goals

This project serves as:

- A practical example of:
  - React + TypeScript fundamentals
  - Clean usage of `useEffect` with `setInterval`
  - Component-based UI architecture with Tailwind CSS
- A real, usable tool for:
  - Structuring work in focus sessions
  - Keeping a tight, contextual to-do list
  - Measuring progress via Pomodoro cycles

---

## 📄 License


```text
MIT License
```

---

If you’re reviewing this project as part of a portfolio, the best way to understand it is to actually use it:  
start a focus session, add a couple of tasks, and go through a full cycle.
