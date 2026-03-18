import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://share.minicoursegenerator.com/widget/mcg-widget-loader.min.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  function addTodo(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setInput('')
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="todo-add">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <p className="todo-count">
          {todos.filter(t => !t.done).length} item(s) remaining
        </p>
      )}
      <a
        id="modal-widget"
        href="#"
        className="widget-button mcg-widget"
        data-mcg-widget="modal"
        data-mcg-collection="0243f677-b8db-44ee-bc61-8c5b3e577104"
        data-mcg-title="new"
        data-mcg-modal-max-width="1280px"
        data-mcg-theme="light"
        data-mcg-public-key="upvvj95i16yv3nrfhzuzv0x6"
        data-mcg-user-name="dlo0russell@gmail.com"
        data-mcg-name-surname="Eren Gunduz"
      >
        Academy
      </a>
    </div>
  )
}

export default App
