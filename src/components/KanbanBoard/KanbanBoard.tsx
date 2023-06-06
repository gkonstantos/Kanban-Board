import useTask from "../../hooks/useTask";
import {
	DragDropContext,
	DragStart,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { Column } from "../Column";
import { useCallback, useState } from "react";
import { ColumnType } from "../../context/TaskContext/context";
import PubSub from "pubsub-js";
import { EventTypes } from "../../common";

export const KanbanBoard: React.FC = () => {
	const { Columns, Tasks } = useTask();
	const [columns, setColumns] = useState<Array<ColumnType>>([...Columns]);

	// Publish here an event type, subscribe in the provider that listens for this event type and update the state accordingly.

	const onItemMoveEnd = useCallback(
		(result: DropResult) => {
			const { destination, source, draggableId, type } = result;
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
				PubSub.publish(EventTypes.UPDATE_COLUMNS, {
					source,
					destination,
					columns,
					setColumns,
				});
				return;
			}

			PubSub.publish(EventTypes.ITEM_MOVE, {
				draggableId,
				destination,
				setColumns,
			});

			PubSub.publish(EventTypes.ITEM_MOVE_END, payload);
		},
		[columns]
	);

	const onItemMoveStart = useCallback((start: DragStart) => {
		const { draggableId, source, type } = start;
		const payload = {
			type: type,
			stopped: false,
			draggableName: draggableId,
			StartPosition: source.index,
			startColumn: source.droppableId,
		};
		PubSub.publish(EventTypes.ITEM_MOVE_START, payload);
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
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className=" flex justify-center bg-slate-300 rounded-lg p-4 space-x-4"
					>
						{columns.map((column, index) => (
							<Column
								key={column.id}
								title={column.name}
								tasks={column.taskId.map((taskId) =>
									Tasks.find((task) => task.id === taskId)
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
