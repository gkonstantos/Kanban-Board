import { EventTypes } from "../../common";
import { TaskContext } from "../../context/TaskContext";
import { ColumnType } from "../../context/TaskContext/context";
import { Columns, MockTasks } from "../../data/MockData";
import PubSub from "pubsub-js";

export const TaskProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	PubSub.subscribe(EventTypes.ITEM_MOVE_START, function (msg, data) {
		console.log(data);
	});
	PubSub.subscribe(EventTypes.ITEM_MOVE_END, function (msg, data) {
		console.log(data);
	});

	PubSub.subscribe(EventTypes.UPDATE_COLUMNS, function (msg, data) {
		const { source, destination, setColumns, columns } = data;

		if (source.index !== destination.index) {
			const updatedColumns = Array.from(columns);
			const movedColumn = updatedColumns[source.index];
			updatedColumns.splice(source.index, 1);
			updatedColumns.splice(destination.index, 0, movedColumn);
			setColumns(updatedColumns);
		}
	});

	PubSub.subscribe(EventTypes.ITEM_MOVE, function (msg, data) {
		const { draggableId, destination, setColumns } = data;

		setColumns((prevColumns: ColumnType[]) => {
			const removedTask = prevColumns.map((column) => {
				if (column.taskId.includes(draggableId)) {
					return {
						...column,
						taskId: column.taskId.filter(
							(taskId) => taskId !== draggableId
						),
					};
				}

				return column;
			});

			const updatedColumns = removedTask.map((column) => {
				if (column.name === destination.droppableId) {
					const newTaskId = [...column.taskId];
					newTaskId.splice(destination.index, 0, draggableId);

					return {
						...column,
						taskId: newTaskId,
					};
				}
				return column;
			});

			return updatedColumns;
		});
	});

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
