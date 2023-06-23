import React, { useCallback, useState } from "react";
import { KanbanBoard } from "../../components/KanbanBoard";
import useTask from "../../hooks/useTask";
import { signal } from "@preact/signals-core";
import { DragStart, DropResult } from "react-beautiful-dnd";

export const KanbanPage: React.FC = () => {
	const { Columns } = useTask();

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
			const { draggableId, source, type } = start;
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
		<KanbanBoard
			onItemMoveStart={onItemMoveStart}
			onItemMoveEnd={onItemMoveEnd}
		/>
	);
};

export default KanbanPage;
