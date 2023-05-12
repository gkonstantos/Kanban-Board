import { TaskContext } from "../../context/TaskContext";

const ColumnTitles = [
	{name: "To Do", id: 1},
	{name: "In Progress", id: 2},
	{name: "Completed", id: 3},
]

const MockToDo = [
	{ name: "Task Example 1", important: "yes", id: 1 },
	{ name: "Task Example 2", id: 2 },
	{ name: "Task Example 3", important: "yes", id: 3 },
	{ name: "Task Example 4", id: 4 },
];

const MockInProgress = [
	{ name: "Task Example 5", id: 5 },
	{ name: "Task Example 6", important: "yes", id: 6 },
	{ name: "Task Example 7", id: 7 },
];

const MockCompleted = [
	{ name: "Task Example 8", id: 8 },
	{ name: "Task Example 9", id: 9 },
	{ name: "Task Example 10", id: 10 },
	{ name: "Task Example 11", id: 11 },
	{ name: "Task Example 12", id: 12 },
	{ name: "Task Example 13", id: 13 },
];

export const TaskProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<TaskContext.Provider
			value={{
				Titles: ColumnTitles,
				ToDo: MockToDo,
				InProgress: MockInProgress,
				Completed: MockCompleted,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
