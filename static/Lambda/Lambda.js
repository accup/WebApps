class Lambda {
	constructor () {
		this.identifiers = [];
		this.brackets = [];
		this.outputs = [];
	}
	
	push (identifier) {
		this.identifiers.push(identifier);
	}
	enter () {
		this.brackets.push(this.identifiers.length);
	}
	exit () {
		let expression = this.identifiers.splice(this.brackets.pop());
		
	}

	/**
	 * Parse Lambda expression.
	 * @param {string} text 
	 * @param {number} startIndex 
	 * @param {number} endIndex 
	 */
	static interpret(text, startIndex = 0, endIndex = text.length) {
		// Validation
		if (startIndex < 0)
			startIndex = text.length + startIndex;
		if (endIndex < 0)
			endIndex = text.length + endIndex;
		
		if (startIndex < 0 || text.length <= startIndex)
			throw new Error(`Start index (${startIndex}) is out of range.`);
		if (endIndex < 0 || text.length < endIndex)
			throw new Error(`End index (${endIndex}) is out of range.`);
		
		// Utilities
		let whitespace = /\s/;
		
		// Machine states
		let cursor = startIndex;
		let identifiers = [];
		let brackets = [];
		let lastBracket = 0;
		
		let outputs = [];
		
		while (cursor < endIndex) {
			let codePoint = text.codePointAt(cursor);
			let c = String.fromCodePoint(codePoint);

			let nextCursor = cursor + (0x10000 <= codePoint ? 2 : 1);
			
			// Ignore whitespace
			if (!/\s/.test(c)) {
				switch (c) {
				case '[': // Left bracket
					brackets.push(lastBracket);
					lastBracket = identifiers.length;
					break;
				case ']': // Right bracket
					if (brackets.length == 0)
						throw new Error(`Extra ']' (at ${cursor})`);
					let expression = identifiers.splice(lastBracket);
					lastBracket = brackets.pop();
					break;
				default:
					identifiers.push(c);
					break;
				}
				
			}

			cursor += nextCursor;
		}
	}
}