import { Signal } from '@preact/signals';
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
	Columns:Signal<Array<ColumnType>>;
	Tasks:Signal<Array<TaskType>>;
};


export const TaskContext = createContext<TaskContextValues>({} as TaskContextValues);