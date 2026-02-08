import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert('Please fill out the task');
      return;
    }

    const task: Task = {
      id: Date.now(),
      text: newTask,
      isEditing: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleEdit = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isEditing: !task.isEditing } : task
    ));
  };

  const updateTask = (id: number, text: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#374151] text-[#EEE] font-sans">
      {/* Header */}
      <header className="p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-[2.5rem] font-light text-[#6B7280] mb-4">
          To do List
        </h1>

        <form className="flex" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you have planned?"
            className="flex-1 bg-[#1F2937] text-[#EEE] placeholder-[#6B7280] rounded-xl px-4 py-4 text-[1.25rem] mr-4 focus:outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            className="text-[1.25rem] font-bold bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent cursor-pointer transition-opacity duration-300 hover:opacity-80 active:opacity-60"
          >
            Add task
          </button>
        </form>
      </header>

      {/* Main */}
      <main className="flex-1 p-8 max-w-2xl w-full mx-auto">
        <section className="task-list">
          <h2 className="text-[1.5rem] font-light text-[#6B7280] mb-4 p-4">
            Tasks
          </h2>

          <div className="space-y-4" id="tasks">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between bg-[#111827] p-4 rounded-xl"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={task.text}
                    readOnly={!task.isEditing}
                    className={`w-full block text-[1.125rem] transition-colors ${
                      task.isEditing ? 'text-[#EC4899]' : 'text-[#EEE]'
                    } bg-transparent focus:outline-none`}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                  />
                </div>

                <div className="flex -mx-2">
                  <button
                    onClick={() => toggleEdit(task.id)}
                    className="mx-2 text-[1.125rem] font-bold uppercase bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent transition-opacity duration-300 hover:opacity-80 active:opacity-60"
                  >
                    {task.isEditing ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="mx-2 text-[1.125rem] font-bold uppercase text-red-600 transition-opacity duration-300 hover:opacity-80 active:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
