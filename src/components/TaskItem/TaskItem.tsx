import clsx from "clsx";
import { Variant, motion } from "framer-motion";
import { ChangeEvent, useState } from "react";

type TaskItemProps = {
	initial?: Variant;
	animate?: Variant;
	exit?: Variant;
	task?: any;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
	const { initial, animate, exit, task } = props;

	const [name, setName] = useState<string>(task.name);
	const [showEdit, setShowEdit] = useState<boolean>(false);

	const handleItemMoveStart = () => {
		console.log("task dragged!");
	};

	return (
		<motion.div
			onDrag={handleItemMoveStart}
			drag
			// dragConstraints={{
			// 	top: -50,
			// 	left: -50,
			// 	right: 50,
			// 	bottom: 50,
			// }}
			variants={{
				initial: initial ?? {},
				animate: animate ?? {},
				exit: exit ?? {},
			}}
			className={clsx(
				"rounded-lg text-lg p-5",
				task.important ? "bg-red-500" : "bg-orange-500"
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
						className="border-2 border-black rounded-lg  w-12"
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
		</motion.div>
	);
};

export default TaskItem;
