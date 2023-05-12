import useTask from "../useTask";


type Item = {
  id: number;
  name: string;
  important?: string;
};

type OnItemChangeHandler = (itemId: number, updatedItem: Partial<Item>) => void;

export const useOnItemChange = (): OnItemChangeHandler => {
  const { ToDo, InProgress, Completed, setToDo, setInProgress, setCompleted } = useTask();

  const handleItemChange: OnItemChangeHandler = (itemId, updatedItem) => {
    const updatedToDo = ToDo.map((item) => (item.id === itemId ? { ...item, ...updatedItem } : item));
    const updatedInProgress = InProgress.map((item) => (item.id === itemId ? { ...item, ...updatedItem } : item));
    const updatedCompleted = Completed.map((item) => (item.id === itemId ? { ...item, ...updatedItem } : item));

    setToDo(updatedToDo);
    setInProgress(updatedInProgress);
    setCompleted(updatedCompleted);
  };

  return handleItemChange;
};


export default useOnItemChange;