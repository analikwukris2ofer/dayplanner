import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import React, { useState, ChangeEvent } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import useLocalStorage from "./hooks/useStorage";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreen";
import { Task } from "./types";

function App() {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  // const [focusedTaskId, setFocusedTaskId] = useState<String | undefined>(
  //   undefined
  // );
  // const [focusedTaskId, setFocusedTaskId] = useLocalStorage<String | undefined>(
  //   "focused",
  //   undefined
  // );
  const [focusedTaskId, setFocusedTaskId] = useState<String | undefined>(
    undefined
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
  };

  // const focusedTask = tasks.filter((task) => !task.isComplete)[0];
  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  const shuffleFocus = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isComplete))[0]?.id); //question mark means we pull id if it is not null or undefined otherwise undefined is returned.
    //?? means that if it is undefined just return null.
  };

  const tasksApi = {
    shuffleFocus,
    addTask,
    focusedTask,
    tasks,
    setTasks,
    ToggleComplete,
  };

  return (
    <BrowserRouter>
      <nav>
        <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>
          List
        </NavLink>{" "}
        {""} - {""}
        <NavLink to="/focus" activeStyle={{ fontWeight: "bold" }}>
          Focus
        </NavLink>
      </nav>
      <br />
      <Switch>
        <Route exact path="/">
          <ListScreen {...tasksApi} />
        </Route>
        <Route path="/focus">
          <FocusScreen {...tasksApi} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
