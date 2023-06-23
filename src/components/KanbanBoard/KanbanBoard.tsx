import useTask from "../../hooks/useTask";
import {
	DragDropContext,
	DragStart,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { Column } from "../Column";
import { useRef } from "react";
import { TaskType } from "../../context/TaskContext/context";
import React from "react";

type KanbanBoardType = {
	onItemMoveStart: (start: DragStart) => void;
	onItemMoveEnd: (result: DropResult) => void;
};

export const KanbanBoard: React.FC<KanbanBoardType> = React.memo((props) => {
	const { Columns, Tasks } = useTask();
	const { onItemMoveStart, onItemMoveEnd } = props;
	const renderCounter = useRef(0);
	renderCounter.current = renderCounter.current + 1;

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
						<p>render:{renderCounter.current}</p>
						{Columns.value?.map((column, index) => (
							<Column
								key={column.id}
								title={column.name}
								tasks={
									column.taskId?.map((taskId) =>
										[...Tasks.value].find(
											(task) => task.id === taskId
										)
									) as TaskType[]
								}
								id={index}
							/>
						))}

						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
});

export default KanbanBoard;
