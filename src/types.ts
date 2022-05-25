export type Task = {
  id: string;
  label: string;
  isComplete: boolean;
};

export type TasksProps = {
  addTask: (task: Pick<Task, "label">) => void;
  // focusedTask: Task | undefined;
  focusedTask?: Task; // same with the code above.
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  ToggleComplete: (taskId: string, isComplete: boolean) => void;
  shuffleFocus: () => void;
};
