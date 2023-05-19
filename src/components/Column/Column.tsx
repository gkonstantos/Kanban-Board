import { motion } from "framer-motion";
import { useState } from "react";
import TaskItem from "../TaskItem";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskType } from "../../context/TaskContext/context";

type ColumnProps = {
	title: string;
	tasks: Array<any>;
	id?: number;
};

export const Column: React.FC<ColumnProps> = (props) => {
	const { title, tasks, id = 1 } = props;

	const [Colname, setColName] = useState<string>(title);
	const [showEdit, setShowEdit] = useState<boolean>(false);
	// console.log(tasks);
	// console.log(id)
	return (
		<Draggable draggableId={title} index={id}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="bg-gray-100 rounded-lg p-4 m- w-80 space-y-5"
				>
					{showEdit ? (
						<div className=" flex space-x-2 items-center justify-center">
							<input
								className="bg-inherit border-2 border-black"
								type="text"
								value={Colname}
								onChange={(e) => setColName(e.target.value)}
							/>
							<button
								className="border-2 border-black rounded-lg  w-12"
								onClick={() => setShowEdit(false)}
							>
								Save
							</button>
						</div>
					) : (
						<div className="flex justify-center items-center space-x-4">
							<p className="text-lg font-medium ">{Colname}</p>
							<button
								className="border-2 border-black rounded-lg px-1"
								onClick={() => setShowEdit(true)}
							>
								Edit
							</button>
						</div>
					)}

					<Droppable droppableId={title}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{tasks.map((task, index) => (
									<TaskItem
										index={index}
										key={index}
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
};

export default Column;
