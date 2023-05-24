import { TaskContext } from "../../context/TaskContext";
import { Columns, MockTasks } from "../../data/MockData";

export const TaskProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<TaskContext.Provider
			value={{
				Columns: Columns,
				Tasks: MockTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
