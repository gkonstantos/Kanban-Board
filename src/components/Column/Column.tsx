import React, { useRef } from "react";
import { TaskType } from "../../context/TaskContext/context";
import TaskItem from "../TaskItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

type ColumnProps = {
	title: string;
	tasks: Array<TaskType>;
	id: number;
};

export const Column: React.FC<ColumnProps> = React.memo((props) => {
	const { title, tasks, id } = props;
	const renderCounter = useRef(0);
	renderCounter.current = renderCounter.current + 1;
	return (
		<Draggable draggableId={title} index={id}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="bg-gray-100 rounded-lg p-4 m- w-80 space-y-5"
				>
					<p className="text-lg font-medium ">
						{title} render:{renderCounter.current}
					</p>
					<p className="text-lg font-medium ">{title}</p>

					<Droppable droppableId={title} type="item">
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{tasks.map((task, index) => (
									<TaskItem
										index={index}
										key={task.id}
										task={task}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
});
export default Column;
