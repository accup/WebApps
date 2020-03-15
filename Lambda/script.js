window.addEventListener('load', function (e) {
	/** @type {HTMLTextAreaElement} */
	let inputArea = document.getElementById('input-area');
	/** @type {HTMLDivElement} */
	let outputArea = document.getElementById('output-area');
	
	inputArea.addEventListener('keydown', function (e) {
		let cursor = inputArea.selectionStart;
		let text = inputArea.value;
		let previousLetter = text[cursor - 1];
		let nextLetter = cursor < text.length ? text[cursor] : '';

		switch (e.key) {
		case '[':
				e.preventDefault();
				inputArea.setRangeText('[]');
				inputArea.setSelectionRange(cursor + 1, cursor + 1);
			return;
		case ']':
			if (nextLetter == ']') {
				e.preventDefault();
				inputArea.setSelectionRange(cursor + 1, cursor + 1);
				return;
			}
			break;
		case 'Tab':
			e.preventDefault();
			inputArea.setRangeText('\t');
			inputArea.setSelectionRange(cursor + 1, cursor + 1);
			return;
		case 'Backspace':
			if (previousLetter == '[' && nextLetter == ']') {
				inputArea.setRangeText('', cursor, cursor + 1);
				return;
			}
			break;
		case 'Enter':
			if (e.ctrlKey) {
				e.preventDefault();
				outputArea.textContent = Lambda.interpret(inputArea.value);
				return;
			}
			break;
		}
	});
});
