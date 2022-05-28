import { nanoid } from "nanoid";
import React, {
  ChangeEvent,
  useState,
  KeyboardEvent,
  MouseEvent,
  useContext,
} from "react";
import styled from "styled-components";
import Checkbox from "../components/Checkbox";
import IconButton from "../components/IconButton";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import TaskContext from "../contexts/taskStore";
import useStore from "../hooks/useStore";
import DeleteIcon from "../icons/DeleteIcon";
import { Task, TasksProps } from "../types";

const Container = styled.div`
  /* align-self: stretch; */
  display: flex;
  /* flex: 0 1 460px; //flex-grow, flex-shrink, flex-basis - The shrink attribute of one means it will shrink when screen is smaller, flex grow of 0 means it will not grow even if screen is larger. */
  flex-direction: column;
  align-items: stretch; // everything will stretch out to match the container.
  width: 460px;
`;
const List = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 45px 24px;
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.label`
  /* margin-bottom: 8px; */
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 4px 0; // gives us a padding top and bottom of 4px
`;

const DeleteButton = styled(IconButton)`
  /* visibility: hidden;

  ${ListItem}:hover & {
    visibility: visible;
  } */
`;
const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  border-radius: 15px;
  padding: 20px 24px;
`;
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
    <Container>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              //If you put your checkbox inside the label tag you can click on the name beside the checkbox and the checkbox will be selected.
              // type="checkbox"
              checked={task.isComplete}
              onChange={handleChange(task)}
            />
            <Spacer width={24} />
            {task.label}
            <Spacer flex={1} />
            <DeleteButton showOnHover onClick={handleDelete(task)}>
              <DeleteIcon />
            </DeleteButton>
          </ListItem>
        ))}
      </List>
      <Spacer height={30} />
      <Input
        placeholder="Add a task"
        value={newTask}
        onChange={handleNewTask}
        onKeyPress={handleKeyPress}
      />
      <Spacer height={45} />

      <TextButton onClick={handleClear} style={{ alignSelf: "center" }}>
        Clear Completed
      </TextButton>
    </Container>
  );
};

export default ListScreen;
