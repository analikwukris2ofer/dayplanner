import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import TaskContext from "../contexts/taskStore";
import { Task } from "../types";
import useLocalStorage from "./useLocalStorage";

const useStore = () => {
  const [tasks, setTasks] = useContext(TaskContext); // This comes from the App.tsx file
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  // const [focusedTaskId, setFocusedTaskId] = useState<String | undefined>(
  //   undefined
  // );
  // const [focusedTaskId, setFocusedTaskId] = useLocalStorage<String | undefined>(
  //   "focused",
  //   undefined
  // );

  // const getIncompleteTask = () =>
  //   tasks.filter((task) => !task.isComplete)[0]?.id;
  const [focusedTaskId, setFocusedTaskId] = useState<String | undefined>(
    // undefined
    // tasks.filter((task) => !task.isComplete)[0]?.id
    // getIncompleteTask()
    tasks.filter((task) => !task.isComplete)[0]?.id
  );

  // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && newTask !== "") {
  //     setTasks((tasks) => [
  //       ...tasks,
  //       { id: nanoid(), label: newTask, isComplete: false },
  //     ]);
  //     //always good to use a function if the next state depends on the previous state.
  //     setNewTask("");
  //   }
  // };

  const addTask = (task: Pick<Task, "label">) => {
    // The pick in typescript takes in an object but only retrieves one attribute which you explicitly specify.
    //The task will basically have only one attribute which is the label.
    const id = nanoid();
    setTasks((tasks) => [
      ...tasks,
      { id: id, label: task.label, isComplete: false },
    ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  };

  const ToggleComplete = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );

    // if (taskId === focusedTaskId) setFocusedTaskId(getIncompleteTask());
  };

  // const focusedTask = tasks.filter((task) => !task.isComplete)[0];
  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  useEffect(() => {
    if (focusedTask?.isComplete)
      setFocusedTaskId(tasks.filter((task) => !task.isComplete)[0]?.id);
  }, [tasks, focusedTask]);

  const shuffleFocus = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isComplete))[0]?.id); //question mark means we pull id if it is not null or undefined otherwise undefined is returned.
    //?? means that if it is undefined just return null.
  };

  const api = {
    shuffleFocus,
    addTask,
    focusedTask,
    tasks,
    setTasks,
    ToggleComplete,
  };

  return api;
};

export default useStore;
