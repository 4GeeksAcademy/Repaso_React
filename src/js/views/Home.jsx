import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Creamos una función async porque fetch devuelve una promesa
    const fetchTasks = async () => {
      try {
        // 👉 Hacemos la petición GET
        // fetch por defecto hace una petición GET, por eso no necesitamos especificar el método
        const response = await fetch(
          "https://playground.4geeks.com/todo/users/leodelis_07"
        );

        // 👉 Verificamos si la petición fue exitosa
        if (!response.ok) {
          throw new Error("¡Vaya! No hemos podido obtener las tareas");
        }

        // 👉 Convertimos la respuesta a JSON
        const data = await response.json();

        setTasks(data.todos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks(); // Llamamos a la función
  }, []); // El array vacío significa que solo se ejecuta cuando el componente se monta

  const addTasks = async (label) => {
    const newTask = {
      label,
      is_done: false,
    };

    try {
      // 👉 Hacemos la petición POST
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/leodelis_07",
        {
          method: "POST", // 👈 Especificamos que es POST
          headers: {
            "Content-Type": "application/json", // 👈 Indicamos que enviamos JSON
          },
          // 👉 Convertimos nuestro objeto a string JSON
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      const data = await response.json();

      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      // 👉 Hacemos la petición DELETE
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
      // 👉 Hacemos la petición PUT
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "PUT", // 👈 Especificamos que es PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...taskToUpdate,
            is_done: !taskToUpdate.is_done,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el post");

      const updatedPost = await response.json();
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return updatedPost;
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
