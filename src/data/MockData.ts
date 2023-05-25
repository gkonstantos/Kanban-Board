import { signal } from "@preact/signals";

const Columns = signal([
	{ name: "To Do", id: 0, taskId:["Task Example 1", "Task Example 2", "Task Example 3", "Task Example 4", "Task Example 5"] },
	{ name: "In Progress", id: 1, taskId:["Task Example 6", "Task Example 7", "Task Example 8"]},
	{ name: "Completed", id: 2, taskId:["Task Example 9", "Task Example 10", "Task Example 11", "Task Example 12", "Task Example 13"] },
]);



const MockTasks = signal(
	[
	{ name: "Task Example 1", important: "yes", id: "Task Example 1" },
	{ name: "Task Example 2", id: "Task Example 2" },
	{ name: "Task Example 3", important: "yes", id: "Task Example 3" },
	{ name: "Task Example 4", id: "Task Example 4" },
	{ name: "Task Example 5", id: "Task Example 5" },
	{ name: "Task Example 6", important: "yes", id: "Task Example 6" },
	{ name: "Task Example 7", id: "Task Example 7" },
	{ name: "Task Example 8", id: "Task Example 8" },
	{ name: "Task Example 9", id: "Task Example 9" },
	{ name: "Task Example 10", id: "Task Example 10" },
	{ name: "Task Example 11", id: "Task Example 11" },
	{ name: "Task Example 12", id: "Task Example 12" },
	{ name: "Task Example 13", id: "Task Example 13" },
	]
)


export{ Columns, MockTasks};