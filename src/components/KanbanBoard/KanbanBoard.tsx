import { motion } from "framer-motion";
import { TaskItem } from "../TaskItem";
import useTask from "../../hooks/useTask";
import { useState } from "react";

export const KanbanBoard: React.FC = () => {
	const { Titles, ToDo, InProgress, Completed } = useTask();

	const [firstcolname, setFirstColName] = useState<string>("To Do");
	const [showEdit, setShowEdit] = useState<boolean>(false);

	
	// const [secondcolname, setSecondColName] = useState<string>("In Progress");
	// const [showEdit, setShowEdit] = useState<boolean>(false);

	
	// const [thirdtcolname, setThirdColName] = useState<string>("Completed");
	// const [showEdit, setShowEdit] = useState<boolean>(false);

	return (
		<div className=" flex justify-center bg-slate-300 rounded-lg p-4 space-x-4">
			<motion.div
				className="bg-gray-100 rounded-lg p-4 m- w-80 space-y-5"
				initial="initial"
				animate="animate"
				variants={{
					animate: {
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				{showEdit ? (
					<div className=" flex space-x-2 items-center justify-center">
						<input
							className="bg-inherit border-2 border-black"
							type="text"
							value={firstcolname}
							onChange={(e) => setFirstColName(e.target.value)}
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
						<p className="text-lg font-medium ">{firstcolname}</p>
						<button
							className="border-2 border-black rounded-lg px-1"
							onClick={() => setShowEdit(true)}
						>
							Edit
						</button>
					</div>
				)}

				{ToDo.map((task, index) => (
					<TaskItem
						key={index}
						initial={{
							y: "200%",
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						task={task}
					/>
				))}
			</motion.div>
			<motion.div
				className="bg-gray-100 rounded-lg p-4 m- w-80 space-y-5"
				initial="initial"
				animate="animate"
				variants={{
					animate: {
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				<p className="text-lg font-medium mb-4">In Progress</p>
				{InProgress.map((task, index) => (
					<TaskItem
						key={index}
						initial={{
							y: "200%",
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						task={task}
					/>
				))}
			</motion.div>
			<motion.div
				className="bg-gray-100 rounded-lg p-4 m- w-80 space-y-5"
				initial="initial"
				animate="animate"
				variants={{
					animate: {
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				<p className="text-lg font-medium mb-4">Completed</p>
				{Completed.map((task, index) => (
					<TaskItem
						key={index}
						initial={{
							y: "200%",
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						task={task}
					/>
				))}
			</motion.div>
		</div>
	);
};

export default KanbanBoard;
