import { createContext } from "react";
import { Task } from "../types";

const TaskContext = createContext<
  [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
>([[], () => {}]); // This should match the type of the value being passed into the contextAPI.
//In react context, this object provides the consumer and the provider.

export default TaskContext;
