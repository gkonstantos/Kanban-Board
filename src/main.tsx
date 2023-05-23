import React, { Profiler, ProfilerOnRenderCallback } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const onRender: ProfilerOnRenderCallback = (
	id,
	phase,
	actualDuration,
	baseDuration,
	startTime,
	commitTime
) => {
	// console.log('Render completed!');
	// console.log('Actual duration:', actualDuration);
	// console.log('Base duration:', baseDuration);
	// console.log('Start time:', startTime);
	// console.log('Commit time:', commitTime);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

	<Profiler id="App" onRender={onRender}>
		<App />
	</Profiler>
);
