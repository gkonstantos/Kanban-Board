import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";


export const useTask = () => useContext(TaskContext);

export default useTask;