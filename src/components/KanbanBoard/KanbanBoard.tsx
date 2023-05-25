import useTask from "../../hooks/useTask";
import {
	DragDropContext,
	DragStart,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { Column } from "../Column";
import { useCallback, useState } from "react";
import { signal } from "@preact/signals";

export const KanbanBoard: React.FC = () => {
	const { Columns, Tasks } = useTask();

	const item = signal("");

	const [dragStartDetails, setDragStartDetails] = useState<any>(null);
	const [dragEndDetails, setDragEndDetails] = useState<any>(null);

	const onItemMoveEnd = useCallback(
		(result: DropResult) => {
			const { destination, source, draggableId, type } = result;
			// console.log(type);
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

			if (type === "column") {
				if (source.index !== destination.index) {
					const updatedColumns = Array.from(Columns.value);
					const movedColumn = updatedColumns[source.index];
					updatedColumns.splice(source.index, 1);
					updatedColumns.splice(destination.index, 0, movedColumn);
					Columns.value = updatedColumns;
				}

				return;
			}

			item.value = draggableId;

			const removedTask = Columns.value.map((column) => {
				if (column.taskId.includes(item.value)) {
					return {
						...column,
						taskId: column.taskId.filter(
							(taskId) => taskId !== item.value
						),
					};
				}
				return column;
			});

			Columns.value = removedTask;

			const updatedColumns = Columns.value.map((column) => {
				if (column.name === destination.droppableId) {
					const newTaskId = [...column.taskId];
					newTaskId.splice(destination.index, 0, item.value);

					return {
						...column,
						taskId: newTaskId,
					};
				}
				return column;
			});

			Columns.value = updatedColumns;

			setDragEndDetails(payload);
		},
		[Columns, item]
	);

	const onItemMoveStart = useCallback(
		(start: DragStart) => {
			const { draggableId, source,type } = start;
			const payload = {
				type: type,
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
						{Columns.value?.map((column, index) => (
							<Column
								key={column.id}
								title={column.name}
								tasks={column.taskId?.map((taskId) =>
									[...Tasks.value].find(
										(task) => task.id === taskId
									)
								)}
								id={index}
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
