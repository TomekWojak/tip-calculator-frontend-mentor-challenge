document.addEventListener("DOMContentLoaded", function () {
	const billInput = document.querySelector(".splitter__input--bill");
	const peopleInput = document.querySelector(".splitter__input--people");
	const tipBtns = document.querySelectorAll(".splitter__btn");
	const customTipInput = document.querySelector(".splitter__custom-input");
	const tipAmount = document.querySelector(".splitter__tip-tip");
	const total = document.querySelector(".splitter__tip-total");
	const resetBtn = document.querySelector(".splitter__reset-btn");
	const inputs = [billInput, peopleInput];

	const billRegexp = /^-?\d+(\.\d+)?$/;
	const peopleRegexp = /^[0-9]\d*$/;
	let parent;
	let errorTxt;

	const handleSplitter = (input, regexp, msg1, msg2) => {
		let value = parseFloat(input.value);

		if (regexp.test(value)) {
			if (value === 0) {
				showError(input, msg1);
			} else if (value < 0) {
				showError(input, msg2);
			} else {
				removeError(input);
			}
		} else {
			showError(input, "Enter valid number");
		}

		countErrors();
	};

	const showError = (input, msg) => {
		input.classList.add("error");
		parent = input.closest(".splitter__billing-section");
		errorTxt = parent.querySelector(".input-error");
		errorTxt.style.visibility = "visible";
		errorTxt.textContent = msg;
	};
	const removeError = (input) => {
		input.classList.remove("error");
		parent = input.closest(".splitter__billing-section");
		errorTxt = parent.querySelector(".input-error");
		errorTxt.style.visibility = "hidden";
	};

	const unlockBtn = () => {
		resetBtn.removeAttribute("disabled");
	};

	const countErrors = () => {
		let errorCount = 0;
		inputs.forEach((input) => {
			if (input.classList.contains("error")) {
				errorCount++;
			}
		});

		if (errorCount === 0) {
			unlockBtn();
		}
	};

	billInput.addEventListener("input", () => {
		handleSplitter(
			billInput,
			billRegexp,
			"Can't be zero",
			"Must be greater than zero"
		);
	});
	peopleInput.addEventListener("input", () => {
		handleSplitter(peopleInput, peopleRegexp, "Can't be zero");
	});
});
