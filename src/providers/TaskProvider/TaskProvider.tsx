import { TaskContext } from "../../context/TaskContext";
import {
	Columns,
	MockToDo,
	MockInProgress,
	MockCompleted,
} from "../../data/MockData";

export const TaskProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<TaskContext.Provider
			value={{
				Columns: Columns,
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
