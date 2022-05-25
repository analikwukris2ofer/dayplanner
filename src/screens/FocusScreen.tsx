import React from "react";
import { Task, TasksProps } from "../types";

type Props = TasksProps & {};

// type Props = {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// };
const FocusScreen: React.FC<Props> = ({
  focusedTask: task,
  tasks,
  ToggleComplete,
  shuffleFocus,
}) => {
  // const task = tasks.filter((task) => !task.isComplete)[0];

  const handleMarkComplete = () => {
    if (task) ToggleComplete(task.id, true);
  };

  // const handleNopeClick = () => {
  //   shuffleFocus();
  // };
  return task ? (
    <div>
      <div>{task.label}</div>
      <button onClick={handleMarkComplete}>mark complete</button>
      <button onClick={shuffleFocus}>Nope</button>
    </div>
  ) : (
    <div>No incomplete Tasks</div>
  );
};

export default FocusScreen;