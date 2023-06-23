import React, { useCallback, useState } from "react";
import { KanbanBoard } from "../../components/KanbanBoard";
import { DragStart, DropResult } from "react-beautiful-dnd";
import { EventTypes } from "../../common";
import useTask from "../../hooks/useTask";
import { ColumnType } from "../../context/TaskContext/context";

export const KanbanPage: React.FC = () => {
	const { Columns } = useTask();
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
		<KanbanBoard
			onItemMoveStart={onItemMoveStart}
			onItemMoveEnd={onItemMoveEnd}
			columns={columns}
		/>
	);
};

export default KanbanPage;
