document.addEventListener("DOMContentLoaded", () => {
	const ss1 = document.getElementById("ss1");
	const ss2 = document.getElementById("ss2");
	const sstext = document.getElementById("sstext");
	const pause = document.getElementById("pause");

	let value = setCharacters(ss1) || 0;
	let value2 = setDigits(ss2) || 0;
	if (ss1 && ss2) {
		setInterval(() => {
			const isPaused = pause && pause.checked;
			if (!isPaused) {
				value = (String.fromCharCode(65+Math.floor(Math.random()*26)) + value).substring(0, 6);
				ss1.setAttribute("value", value);
				const real = setCharacters(ss1);
				if(sstext)sstext.textContent = Array.from(real).join(" ");

				ss2.setAttribute("value", (++value2).toString());
				setDigits(ss2);
			}
		}, 500);
	}
});

/**
 * Assigns the digit attribute to the child elements
 * @param {HTMLElement} element The parent element of all digits which has the value attribute set
 * @returns {number | undefined} The parsed value
 */
function setDigits(element) {
	if (!element) return;
	const value = parseInt(element.getAttribute("value"));
	if (isNaN(value)) return;

	const digits = Array.from(element.getElementsByClassName("sevensegdigit"));
	const t = digits.length;

	digits.forEach((el, i) => {
		const d = Math.floor(value / Math.pow(10, t - i - 1)) % 10;
		el.setAttribute("digit", d.toString());
	});

	return (value);
}

/**
 * Assigns the digit attribute to the child elements
 * @param {HTMLElement} element The parent element of all digits which has the value attribute set
 * @returns {string | undefined} The parsed value
 */
function setCharacters(element) {
	if (!element) return;
	const value = element.getAttribute("value");
	if (!value) return;

	const digits = Array.from(element.getElementsByClassName("sevensegdigit"));

	digits.forEach((el, i) => {
		el.setAttribute("digit", value[i] || "");
	});

	return (value);
}
