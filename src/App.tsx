import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import React, { useState, ChangeEvent } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import TaskContext from "./contexts/taskStore";
import useLocalStorage from "./hooks/useLocalStorage";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreen";
import { Task } from "./types";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  return (
    <BrowserRouter>
      <TaskContext.Provider value={[tasks, setTasks]}>
        {" "}
        {/*place provider at the uppermost layer of the app to pass it around.*/}
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
            <ListScreen />
          </Route>
          <Route path="/focus">
            <FocusScreen />
          </Route>
        </Switch>
      </TaskContext.Provider>
    </BrowserRouter>
  );
}

export default App;
