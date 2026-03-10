import { useState } from "react"

type Tarefa = {
  id: number
  title: string
  completed: boolean
}

export function ToDoList() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTarefa, setNovaTarefa] = useState("")

  function addTarefa() {
    const trimmed = novaTarefa.trim() //remove espaços em branco no início e no fim -> p/ verificação de input
    if (!trimmed) return

    const tarefa: Tarefa = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    }

    setTarefas((prev) => [tarefa, ...prev])
    setNovaTarefa("")
  }

  function handleRemoverTarefa(id: number) {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id))
  }

  function statusTarefa(id: number) {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
      )
    )
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTarefa()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Adicionar nova tarefa..."
          value={novaTarefa}
          onChange={(event) => setNovaTarefa(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addTarefa}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!novaTarefa.trim()}
        >
          Adicionar
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {tarefas.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded-md bg-slate-900 px-3 py-2"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => statusTarefa(todo.id)}
              />
              <span
                className={
                  todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-100"
                }
              >
                {todo.title}
              </span>
            </label>

            <button
              type="button"
              onClick={() => handleRemoverTarefa(todo.id)}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Remover
            </button>
          </li>
        ))}

        {tarefas.length === 0 && (
          <li className="text-sm text-slate-400">
            Nenhuma tarefa ainda. Adicione a primeira!
          </li>
        )}
      </ul>
    </div>
  )
}