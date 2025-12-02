import ClickAwayDemo from "./components/ClickAwayDemo";
import ScrollDemo from "./components/ScrollDemo";
import MultiClickAwayDemo from "./components/MultiClickAwayDemo";
import PopupDemo from "./components/PopupDemo";
import IntervalDemo from "./components/IntervalDemo";
import TimeoutDemo from "./components/TimeoutDemo";
import RequestDemo from "./components/RequestDemo";
import BooleanDemo from "./components/BooleanDemo";
import LocalStorageStateDemo from "./components/LocalStorageStateDemo";
import PreviousDemo from "./components/PreviousDemo";
import ToggleDemo from "./components/ToggleDemo";
import DebounceFnDemo from "./components/DebounceFnDemo";

function App() {
	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>@xumi/rhooks Demo</h1>
			<ClickAwayDemo />
			<MultiClickAwayDemo />
			<PopupDemo />
			<ScrollDemo />
			<IntervalDemo />
			<TimeoutDemo />
			<RequestDemo />
			<BooleanDemo />
			<LocalStorageStateDemo />
			<PreviousDemo />
			<ToggleDemo />
			<DebounceFnDemo />
		</div>
	);
}

export default App;
