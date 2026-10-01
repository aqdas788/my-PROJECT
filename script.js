document.addEventListener("DOMContentLoaded", () => {
	const calculator = document.createElement("div");
	calculator.innerHTML = `
		<input id="calculator-display" type="text" value="0" readonly aria-label="Calculator display">
		<div id="calculator-buttons">
			<button data-value="7">7</button>
			<button data-value="8">8</button>
			<button data-value="9">9</button>
			<button data-operation="/">÷</button>
			<button data-value="4">4</button>
			<button data-value="5">5</button>
			<button data-value="6">6</button>
			<button data-operation="*">×</button>
			<button data-value="1">1</button>
			<button data-value="2">2</button>
			<button data-value="3">3</button>
			<button data-operation="-">−</button>
			<button data-value="0">0</button>
			<button data-value=".">.</button>
			<button data-action="clear">C</button>
			<button data-operation="+">+</button>
			<button data-action="equals">=</button>
		</div>
	`;
	document.body.appendChild(calculator);

	const display = calculator.querySelector("#calculator-display");
	let storedValue = null;
	let selectedOperation = null;
	let startNewNumber = false;

	function reset() {
		display.value = "0";
		storedValue = null;
		selectedOperation = null;
		startNewNumber = false;
	}

	function calculate() {
		if (storedValue === null || selectedOperation === null) return;

		const currentValue = Number(display.value);
		let result;
		switch (selectedOperation) {
			case "+": result = storedValue + currentValue; break;
			case "-": result = storedValue - currentValue; break;
			case "*": result = storedValue * currentValue; break;
			case "/":
				if (currentValue === 0) {
					display.value = "Error";
					storedValue = null;
					selectedOperation = null;
					return;
				}
				result = storedValue / currentValue;
				break;
		}

		display.value = String(Number(result.toFixed(10)));
		storedValue = null;
		selectedOperation = null;
		startNewNumber = true;
	}

	calculator.addEventListener("click", (event) => {
		const button = event.target.closest("button");
		if (!button) return;

		if (button.dataset.action === "clear") {
			reset();
			return;
		}
		if (button.dataset.action === "equals") {
			calculate();
			return;
		}
		if (button.dataset.value !== undefined) {
			if (display.value === "Error" || startNewNumber) {
				display.value = "0";
				startNewNumber = false;
			}
			const value = button.dataset.value;
			if (value === "." && display.value.includes(".")) return;
			display.value = display.value === "0" && value !== "."
				? value
				: display.value + value;
			return;
		}
		if (button.dataset.operation) {
			if (storedValue !== null) calculate();
			storedValue = Number(display.value);
			selectedOperation = button.dataset.operation;
			startNewNumber = true;
		}
	});
});
