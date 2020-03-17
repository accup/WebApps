const style = {};
style.squareSize = 32;
style.halfSquareSize = style.squareSize / 2;
style.halfSquareSq = style.halfSquareSize * style.halfSquareSize;
style.squareJoint = style.halfSquareSize / Math.sqrt(2);

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

	/**
	 * @param {number} px 親X [px]
	 * @param {number} py 親Y [px]
	 * @param {number} tx 判定X [px]
	 * @param {number} ty 判定Y [px]
	 * @returns {TreeNode}
	 */
	hits (px, py, tx, ty) { return null; }

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
		this._leftPrepared = false;
		this._rightPrepared = false;
		this.left = left;
		this.right = right;
	}

	prepare () {
		super.prepare();
		if (!this._leftPrepared) {
			this._left.prepare();
			this._leftPrepared = true;
		}
		if (!this._rightPrepared) {
			this._right.prepare();
			this._rightPrepared = true;
		}

		let cw = Math.floor((this._left.rw + this._right.lw + 2) / 2);

		this._left.x = -cw;
		this._left.y = 1;
		this.lw = this._left instanceof NullNode ? 0 : this._left.lw + cw;
		this._right.x = cw;
		this._right.y = 1;
		this.rw = this._right instanceof NullNode ? 0 : cw + this._right.rw;
	}

	get left () { return this._left; }
	/** @param {TreeNode} value */
	set left (value) {
		this._left._parent = null;
		this._left = value || new NullNode;
		this._left._parent = this;
		this._leftPrepared = false;
		this.prepare();
	}

	get right () { return this._right; }
	/** @param {TreeNode} value */
	set right (value) {
		this._right._parent = null;
		this._right = value || new NullNode;
		this._right._parent = this;
		this._rightPrepared = false;
		this.prepare();
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

		this._left.render(ctx, x, y);
		this._right.render(ctx, x, y);
	}

	/**
	 * @param {number} px 親X [px]
	 * @param {number} py 親Y [px]
	 * @param {number} tx 判定X [px]
	 * @param {number} ty 判定Y [px]
	 * @returns {TreeNode}
	 */
	hits (px, py, tx, ty) {
		let x = px + this.x * style.squareSize, y = py + this.y * style.squareSize;
		let dx = tx - x, dy = ty - y;
		if (dx * dx + dy * dy <= style.halfSquareSq || this._left.hits(x, y, tx, ty) || this._right.hits(x, y, tx, ty)) {
			return this;
		} else {
			return null;
		}
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

	/**
	 * @param {number} px 親X [px]
	 * @param {number} py 親Y [px]
	 * @param {number} tx 判定X [px]
	 * @param {number} ty 判定Y [px]
	 * @returns {TreeNode}
	 */
	hits (px, py, tx, ty) {
		let x = px + this.x * style.squareSize, y = py + this.y * style.squareSize;
		let dx = tx - x, dy = ty - y;
		let w = style.squareSize, h = this.level * style.squareSize;
		if (0 <= dy && dy <= h && 2 * Math.abs(dx) * h <= w * dy) {
			return this;
		} else {
			return null;
		}
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
	render (ctx) {
		this.root.render(ctx, this.x * style.squareSize, this.y * style.squareSize);
	}

	/**
	 * @param {number} tx 判定X [px]
	 * @param {number} ty 判定Y [px]
	 * @returns {TreeNode}
	 */
	hits (tx, ty) {
		return this.root.hits(this.x * style.squareSize, this.y * style.squareSize, tx, ty);
	}

	clone () {
		return new Tree(this.x, this.y, this.root.clone());
	}
}

