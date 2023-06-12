import clsx from "clsx";
import { Draggable } from "react-beautiful-dnd";
import { TaskType } from "../../context/TaskContext/context";
import { useRef } from "react";
import React from "react";

type TaskItemProps = {
	task: TaskType;
	index: number;
};

export const TaskItem: React.FC<TaskItemProps> = React.memo((props) => {
	const { task, index } = props;
	const renderCounter  = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    // console.log(task)
	return (
		<Draggable draggableId={task.name} index={index}>
			
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={clsx(
						"rounded-lg text-lg p-5 mb-3",
						task?.important ? "bg-red-500" : "bg-orange-500"
					)}
				>
					<p>{task.name} render:{renderCounter.current}</p>
				</div>
			)}
		</Draggable>
	);
});

export default TaskItem;
