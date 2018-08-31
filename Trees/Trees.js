const style = {};
style.squareSize = 32;
style.halfSquareSize = style.squareSize / 2;
style.squareJoint = style.halfSquareSize / Math.sqrt(2);

/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} r 
 * @param {number} px 
 * @param {number} py 
 */
function hitsCircle (x, y, r, px, py) {
	let dx = px - x;
	let dy = py - y;

	return (dx * dx + dy * dy <= r * r);
}
/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {number} px 
 * @param {number} py 
 */
function hitsTriangle (x, y, w, h, px, py) {
	let dx = px - x;
	let dy = py - y;

	return (0 <= dy && dy <= h && 2 * Math.abs(dx) * h <= w * dy);
}

class TreeNode {
	constructor () {
		/** @type {TreeNode} */
		this._parent = null;

		this.x = 0;
		this.y = 0;
		this.lw = 0;
		this.rw = 0;
	}

	get parent () { return this._parent; }

	prepare () {
		this.x = 0;
		this.y = 0;
		this.lw = 0;
		this.rw = 0;
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} px
	 * @param {number} py
	 */
	render (ctx, px, py) {}

	clone () {
		return new TreeNode;
	}
}

class NullNode extends TreeNode {
	clone () {
		return new NullNode;
	}
}

class Circle extends TreeNode {
	/**
	 * @param {TreeNode} left 
	 * @param {TreeNode} right 
	 */
	constructor (left, right) {
		super();

		this._left = new NullNode;
		this._right = new NullNode;
		this.left = left;
		this.right = right;
	}

	prepare () {
		super.prepare();
		this.prepareLeft();
		this.prepareRight();
	}

	prepareLeft () {
		this._left.prepare();
		this._left.x = -this._left.rw - 1;
		this._left.y = 1;
		this.lw = this._left instanceof NullNode ? 0 : this._left.lw + 1 + this._left.rw;
	}
	prepareRight () {
		this._right.prepare();
		this._right.x = this._right.lw + 1;
		this._right.y = 1;
		this.rw = this._right instanceof NullNode ? 0 : this._right.lw + 1 + this._right.rw;
	}

	get left () { return this._left; }
	/** @param {TreeNode} value */
	set left (value) {
		this._left._parent = null;
		this._left = value || new NullNode;
		this._left._parent = this;

		this.prepareLeft();
	}

	get right () { return this._right; }
	/** @param {TreeNode} value */
	set right (value) {
		this._right._parent = null;
		this._right = value || new NullNode;
		this._right._parent = this;

		this.prepareRight();
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} px
	 * @param {number} py
	 */
	render (ctx, px, py) {
		let d = Math.sqrt(this.x * this.x + this.y * this.y);
		let k = style.halfSquareSize / d;
		let kx = this.x * k, ky = this.y * k;
		let x = px + this.x * style.squareSize, y = py + this.y * style.squareSize;
		ctx.moveTo(px + kx, py + ky);
		ctx.lineTo(x - kx, y - ky);

		ctx.moveTo(x + style.halfSquareSize, y);
		ctx.arc(x, y, style.halfSquareSize, 0, 2 * Math.PI);

		if (null !== this._left)
			this._left.render(ctx, x, y);
		if (null !== this._right)
			this._right.render(ctx, x, y);
	}

	clone () {
		return new Circle (
			this.left.clone(),
			this.right.clone()
		);
	}
}

class Triangle extends TreeNode {
	/**
	 * @param {number} level 
	 */
	constructor (level) {
		super();

		this._level = 0;
		this.level = level;
	}

	get level () { return this._level; }
	/** @param {number} value */
	set level (value) { this._level = value; }

	/**
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} px
	 * @param {number} py
	 */
	render (ctx, px, py) {
		let d = Math.sqrt(this.x * this.x + this.y * this.y);
		let k = style.halfSquareSize / d;
		let kx = this.x * k, ky = this.y * k;
		let x = px + this.x * style.squareSize, y = py + this.y * style.squareSize;
		ctx.moveTo(px + kx, py + ky);
		ctx.lineTo(x, y);

		let b = y + this.level * style.squareSize;
		ctx.moveTo(x, y);
		ctx.lineTo(x - style.halfSquareSize, b);
		ctx.lineTo(x + style.halfSquareSize, b);
		ctx.closePath();
	}

	clone () {
		return new Triangle (this.level);
	}
}

class Tree {
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {TreeNode} root 
	 */
	constructor (x, y, root)  {
		this.x = x;
		this.y = y;
		this._selected = false;
		this._hovered = false;
		this.root = root;
	}

	select () {
		this._selected = true;
		this._hovered = false;
	}
	hover () {
		this._selected = false;
		this._hovered = true;
	}
	blur () {
		this._selected = false;
		this._hovered = false;
	}

	get selected () { return this._selected; }
	get hovered () { return this._hovered; }

	/**
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	render (ctx) {}

	clone () {
		return new Tree(this.x, this.y, this.root.clone());
	}
}
