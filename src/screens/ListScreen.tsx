import { nanoid } from "nanoid";
import React, {
  ChangeEvent,
  useState,
  KeyboardEvent,
  MouseEvent,
  useContext,
} from "react";
import TaskContext from "../contexts/taskStore";
import useStore from "../hooks/useStore";
import { Task, TasksProps } from "../types";

// type Props = TasksProps & {};
type Props = {};
// type Props = {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// };

// const ListScreen: React.FC<Props> = () => {
//({
//   addTask,
//   tasks,
//   setTasks,
//   ToggleComplete,
// }) => {
const ListScreen: React.FC<Props> = () => {
  const { addTask, tasks, setTasks, ToggleComplete } = useStore();
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // const value = useContext(TaskContext);
  //This helps to spread the value from the context all around the App.

  const handleNewTask = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTask(e.target.value);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTask !== "") {
      // setTasks((tasks) => [
      //   ...tasks,
      //   { id: nanoid(), label: newTask, isComplete: false },
      // ]);
      //always good to use a function if the next state depends on the previous state.
      addTask({ label: newTask });
      setNewTask("");
    }
  };

  const handleChange =
    (handledTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      ToggleComplete(handledTask.id, e.target.checked);
      // setTasks((tasks) =>
      //   tasks.map((task) => {
      //     if (task.id === handledTask.id)
      //       return { ...task, isComplete: e.target.checked };
      //     return task;
      //   })
      // );
    };
  //This is a higher order function i.e a function that returns a function.

  const handleClear = () =>
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));

  const handleDelete = (handleTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handleTask.id));
  };

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleChange(task)}
            />
            {task.label}
            <button onClick={handleDelete(task)}>delete</button>
          </div>
        ))}
      </div>
      <input
        value={newTask}
        onChange={handleNewTask}
        onKeyPress={handleKeyPress}
      />
      <div>
        <button onClick={handleClear}>Clear Completed</button>
      </div>
    </div>
  );
};

export default ListScreen;
