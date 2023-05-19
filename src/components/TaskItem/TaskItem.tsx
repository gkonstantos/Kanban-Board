import clsx from "clsx";
import { Variant, motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskType } from "../../context/TaskContext/context";

type TaskItemProps = {
	task?: TaskType;
	index: number;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
	const { task, index } = props;

	const [name, setName] = useState<string>(task?.name ?? "");
	const [showEdit, setShowEdit] = useState<boolean>(false);

	const handleItemMoveStart = () => {
		console.log("task dragged!");
	};

	return (
		<Draggable draggableId={task ? task.name : "1"} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={clsx(
						"rounded-lg text-lg p-5 mb-3",
						task?.important ? "bg-red-500" : "bg-orange-500"
					)}
				>
					{showEdit ? (
						<div className="flex flex-col space-y-1 items-center">
							<input
								className="bg-inherit border-2 border-black"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<button
								className="border-2 border-black rounded-lg w-12"
								onClick={() => setShowEdit(false)}
							>
								Save
							</button>
						</div>
					) : (
						<>
							<p>{name}</p>
							<button
								className="border-2 border-black rounded-lg px-1"
								onClick={() => setShowEdit(true)}
							>
								Edit
							</button>
						</>
					)}
				</div>
			)}
		</Draggable>
	);
};

export default TaskItem;
