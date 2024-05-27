import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Tasks } from "./components/Tasks/Tasks";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todolist:savedTasks";

export interface TaskInterface {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function setTasksAndSave(newTasks: TaskInterface[]) {
    const sortedTasks = sortTasks(newTasks);
    setTasks(sortedTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortedTasks));
  }

  function sortTasks(tasks: TaskInterface[]) {
    return tasks.sort((a, b) =>
      a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1
    );
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: uuidv4(),
        title: taskTitle,
        isCompleted: false,
      },
    ]);
  }

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}

export default App;
