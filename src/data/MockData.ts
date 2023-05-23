const Columns = [
	{ name: "To Do", id: 1, taskId:["task-1", "task-2", "task-3", "task-4", "task-5"] },
	{ name: "In Progress", id: 2, taskId:["task-6", "task-7", "task-8"]},
	{ name: "Completed", id: 3, taskId:["task-9", "task-10", "task-11", "task-12", "task-13"] },
];

const MockToDo = [
	{ name: "Task Example 1", important: "yes", id: "task-1" },
	{ name: "Task Example 2", id: "task-2" },
	{ name: "Task Example 3", important: "yes", id: "task-3" },
	{ name: "Task Example 4", id: "task-4" },
	{ name: "Task Example 5", id: "task-5" },
];

const MockInProgress = [
	{ name: "Task Example 6", important: "yes", id: "task-6" },
	{ name: "Task Example 7", id: "task-7" },
	{ name: "Task Example 8", id: "task-8" },
];

const MockCompleted = [
	{ name: "Task Example 9", id: "task-9" },
	{ name: "Task Example 10", id: "task-10" },
	{ name: "Task Example 11", id: "task-11" },
	{ name: "Task Example 12", id: "task-12" },
	{ name: "Task Example 13", id: "task-13" },
];


export{ Columns, MockToDo, MockCompleted, MockInProgress};