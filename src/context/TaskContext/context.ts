import { createContext } from 'react';


export type TaskContextValues = {
	Titles:Array<object>;
	ToDo: Array<object>;
	InProgress: Array<object>;
	Completed: Array<object>;
};


export const TaskContext = createContext<TaskContextValues>({} as TaskContextValues);