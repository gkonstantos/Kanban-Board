import "./App.css";
import { KanbanPage } from "./pages/KanbanPage";
import { TaskProvider } from "./providers/TaskProvider";

export const App: React.FC = () => {
	return (
		<TaskProvider>
			<KanbanPage />
		</TaskProvider>
	);
};

export default App;
