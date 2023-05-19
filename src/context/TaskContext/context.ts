import { createContext } from 'react';

export type ColumnType = {
	name:string;
	id: number;
	taskId: Array<string>;
}

export type TaskType = {
	name: string;
	important?: string;
	id: string;
}

export type TaskContextValues = {
	Columns:Array<ColumnType>;
	ToDo: Array<TaskType>;
	InProgress: Array<TaskType>;
	Completed: Array<TaskType>;
};


export const TaskContext = createContext<TaskContextValues>({} as TaskContextValues);