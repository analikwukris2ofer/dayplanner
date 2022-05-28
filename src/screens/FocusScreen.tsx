import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useStore from "../hooks/useStore";
import { Task, TasksProps } from "../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Stretch = styled.div`
  flex: 1; //flex grow only grows as large as the parent container will allow.
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding-bottom: 45px;
`;
// type Props = TasksProps & {};
type Props = {};

// type Props = {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// };
// const FocusScreen: React.FC<Props> = ({
//   focusedTask: task,
//   tasks,
//   ToggleComplete,
//   shuffleFocus,
// }) => {
const FocusScreen: React.FC<Props> = () => {
  // const task = tasks.filter((task) => !task.isComplete)[0];
  const { focusedTask: task, tasks, ToggleComplete, shuffleFocus } = useStore();
  const handleMarkComplete = () => {
    if (task) ToggleComplete(task.id, true);
  };

  // const handleNopeClick = () => {
  //   shuffleFocus();
  // };
  return task ? (
    <Container>
      <Stretch>{task.label}</Stretch>
      <Button onClick={handleMarkComplete}>Mark complete</Button>
      <Spacer height={45} />
      <TextButton onClick={shuffleFocus}>Nope</TextButton>
    </Container>
  ) : (
    <div>No incomplete Tasks</div>
  );
};

export default FocusScreen;
