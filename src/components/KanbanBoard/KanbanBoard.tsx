import useTask from "../../hooks/useTask";
import {
	DragDropContext,
	DragStart,
	DraggableLocation,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { Column } from "../Column";
import { useCallback, useState } from "react";

export const KanbanBoard: React.FC = () => {
	const { Columns, ToDo, InProgress, Completed } = useTask();

	const [columns, setColumns] = useState(Columns);

	const [tasks, setTasks] = useState([...ToDo, ...InProgress, ...Completed]);

	const onItemMoveEnd = useCallback(
		(result: DropResult) => {
			console.log("drag stopped");
			const { destination, source } = result;
			console.log("End Column:", destination?.droppableId);
			console.log("End Position in list:", destination?.index);

			if (!destination) {
				return; // Item was dropped outside of a droppable area
			}
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			) {
				console.log("same");
			}

			console.log(source);
			console.log(destination);
		},
		[columns, setColumns]
	);

	const onItemMoveStart = useCallback((start: DragStart) => {
		console.log("drag started");
		const { draggableId, source } = start;
		console.log("Draggable name:", draggableId);
		console.log("Start position in list:", source.index);
		console.log("Column start:", source.droppableId);
	}, []);

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
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className=" flex justify-center bg-slate-300 rounded-lg p-4 space-x-4"
					>
						{columns.map((column, index) => (
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
