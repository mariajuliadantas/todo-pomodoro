import { ToDoList } from "./components/ToDoList"
import { PomodoroTimer } from "./components/PomodoroTimer"

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="flex gap-8 h-full">
        <div className="flex-1 bg-slate-800 rounded-xl p-6">
          <h2 className="text-slate-100 text-xl font-bold mb-4">Pomodoro</h2>
          <PomodoroTimer />
        </div>

        <div className="flex-1 bg-slate-800 rounded-xl p-6">
          <h2 className="text-slate-100 text-xl font-bold mb-4">To-Do</h2>
          <ToDoList />
        </div>
      </div>
    </div>
  )
}

export default App