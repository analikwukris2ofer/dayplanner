import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import React, { useState, ChangeEvent } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import TaskContext from "./contexts/taskStore";
import useLocalStorage from "./hooks/useLocalStorage";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreen";
import { colors, GlobalStyle } from "./styles";
import { Task } from "./types";

const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 35px;
`;
const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;
const TabButton = styled(NavLink)`
  height: 62px;
  width: 120px;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  &:last-child {
    //This means if it is the last child of the parent component
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &.active {
    background: ${colors.primary};
    color: #000;
  }
`;

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          {/*place provider of the context API at the uppermost layer of the app to pass it around.*/}
          <Layout>
            <Nav>
              {/* <TabButton exact to="/" activeStyle={{ fontWeight: "bold" }}>
            List
          </TabButton> */}
              <TabButton exact to="/" activeClassName="active">
                List
              </TabButton>

              <TabButton to="/focus" activeClassName="active">
                Focus
              </TabButton>
            </Nav>

            <Switch>
              <Route exact path="/">
                <ListScreen />
              </Route>
              <Route path="/focus">
                <FocusScreen />
              </Route>
            </Switch>
          </Layout>
        </TaskContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
