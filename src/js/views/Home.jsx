import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/mitoperni"
      );

      if (!response.ok) {
        throw new Error("¡Vaya! No hemos podido obtener las tareas");
      }

      const data = await response.json();

      setTasks(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTasks = async (label) => {
    const newTask = {
      label,
      is_done: false,
    };

    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/mitoperni",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

	  const data = await response.json()

      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE", // 👈 Especificamos que es DELETE
        }
      );

      if (!response.ok) throw new Error("Error al borrar la tarea");

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...taskToUpdate,
            is_done: !taskToUpdate.is_done,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar la tarea");

      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, is_done: !task.is_done };
          } else {
            return task;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
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
