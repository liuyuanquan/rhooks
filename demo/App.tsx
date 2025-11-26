import {
	useCounter,
	useToggle,
	useLocalStorage,
	useWindowSize,
	useHover,
} from "@sanxing/rhooks";

function App() {
	// useCounter hook demo
	const [count, increment, decrement, reset] = useCounter(0);

	// useToggle hook demo
	const [isToggled, toggle] = useToggle(false);

	// useLocalStorage hook demo
	const [name, setName, removeName] = useLocalStorage("demo-name", "John Doe");

	// useWindowSize hook demo
	const { width, height } = useWindowSize();

	// useHover hook demo
	const [hoverRef, isHovered] = useHover<HTMLDivElement>();

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>@sanxing/rhooks Demo</h1>

			<div
				style={{
					marginBottom: "20px",
					padding: "10px",
					border: "1px solid #ccc",
				}}
			>
				<h2>useCounter Demo</h2>
				<p>Count: {count}</p>
				<button onClick={increment}>Increment</button>
				<button onClick={decrement} style={{ marginLeft: "10px" }}>
					Decrement
				</button>
				<button onClick={reset} style={{ marginLeft: "10px" }}>
					Reset
				</button>
			</div>

			<div
				style={{
					marginBottom: "20px",
					padding: "10px",
					border: "1px solid #ccc",
				}}
			>
				<h2>useToggle Demo</h2>
				<p>Status: {isToggled ? "ON" : "OFF"}</p>
				<button onClick={toggle}>Toggle</button>
			</div>

			<div
				style={{
					marginBottom: "20px",
					padding: "10px",
					border: "1px solid #ccc",
				}}
			>
				<h2>useLocalStorage Demo</h2>
				<p>Name: {name}</p>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter name"
				/>
				<button onClick={removeName} style={{ marginLeft: "10px" }}>
					Remove
				</button>
			</div>

			<div
				style={{
					marginBottom: "20px",
					padding: "10px",
					border: "1px solid #ccc",
				}}
			>
				<h2>useWindowSize Demo</h2>
				<p>
					Window size: {width} x {height}
				</p>
			</div>

			<div
				style={{
					marginBottom: "20px",
					padding: "10px",
					border: "1px solid #ccc",
				}}
			>
				<h2>useHover Demo</h2>
				<div
					ref={hoverRef}
					style={{
						padding: "20px",
						backgroundColor: isHovered ? "#007acc" : "#f0f0f0",
						color: isHovered ? "white" : "black",
						cursor: "pointer",
						transition: "all 0.3s ease",
					}}
				>
					{isHovered ? "Hovered!" : "Hover over me!"}
				</div>
			</div>
		</div>
	);
}

export default App;
