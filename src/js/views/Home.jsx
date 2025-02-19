import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTasks = (label) => {
    const newTask = {
      id: Date.now(),
      label,
      is_done: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, is_done: !task.is_done };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4"> Gestor de tareas</h1>
      <TaskForm onAddTask={addTasks} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={toggleTaskComplete}
      />
    </div>
  );
};

export default Home;
