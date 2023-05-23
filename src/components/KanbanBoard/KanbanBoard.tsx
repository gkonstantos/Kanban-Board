import useTask from "../../hooks/useTask";
import {
	DragDropContext,
	DragStart,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { Column } from "../Column";
import { useCallback, useState } from "react";
import { TaskType } from "../../context/TaskContext/context";

export const KanbanBoard: React.FC = () => {
	const { Columns, ToDo, InProgress, Completed } = useTask();

	const [tasks, setTasks] = useState<Array<TaskType>>([
		...ToDo,
		...InProgress,
		...Completed,
	]);

	const [dragStartDetails, setDragStartDetails] = useState<any>(null);
	const [dragEndDetails, setDragEndDetails] = useState<any>(null);

	const onItemMoveEnd = useCallback(
		(result: DropResult) => {
			const { destination, source } = result;
			const payload = {
				stopped: true,
				destinationColumn: destination?.droppableId,
				destinationPosition: destination?.index,
			};

			if (!destination) {
				return;
			}
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			) {
				console.log("same");
				return;
			}

			setDragEndDetails(payload);
		},
		[setDragEndDetails]
	);

	const onItemMoveStart = useCallback(
		(start: DragStart) => {
			const { draggableId, source } = start;
			const payload = {
				stopped: false,
				draggableName: draggableId,
				StartPosition: source.index,
				startColumn: source.droppableId,
			};

			setDragStartDetails(payload);
		},
		[setDragStartDetails]
	);

	console.log(dragStartDetails);
	console.log(dragEndDetails);
	return (
		<DragDropContext
			onDragStart={onItemMoveStart}
			onDragEnd={onItemMoveEnd}
		>
			<Droppable
				droppableId="columns"
				direction="horizontal"
				type="column"
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className=" flex justify-center bg-slate-300 rounded-lg p-4 space-x-4"
					>
						{Columns.map((column, index) => (
							<Column
								key={index}
								title={column.name}
								tasks={column.taskId.map((taskId) =>
									tasks.find((task) => task.id === taskId)
								)}
								id={column.id}
							/>
						))}

						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default KanbanBoard;
