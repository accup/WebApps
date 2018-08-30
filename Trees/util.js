/**
 * @param {HTMLCanvasElement} resizableCanvas 
 * @param {(cvs: HTMLCanvasElement) => any} onAfterCallback
 */
function setResizable (resizableCanvas, onAfterCallback) {
	let cvs = resizableCanvas;
	let ctx = resizableCanvas.getContext('2d');

	// リサイズ処理
	let resizingTimer = 0;
	function onResize (e) {
		if (0 != resizingTimer) {
			clearTimeout(resizingTimer);
		}
		resizingTimer = setTimeout(function () {
			resizingTimer = 0;
			previousImage = ctx.getImageData(0, 0, cvs.width, cvs.height);
			cvs.width = document.body.clientWidth;
			cvs.height = document.body.clientHeight;
			onAfterCallback(resizableCanvas);
		}, 100);
	}
	onResize();
	window.addEventListener('resize', onResize);
}

class EventPoint {
	constructor () {
		this.clientX = 0;
		this.clientY = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		this.screenX = 0;
		this.screenY = 0;
		this.pageX = 0;
		this.pageY = 0;

		this.ctrlKey = false;
		this.altKey = false;
		this.shiftKey = false;
		this.metaKey = false;
	}

	/**
	 * @param {MouseEvent} e 
	 */
	static fromMouseEvent(e) {
		let p = new EventPoint;

		p.clientX = e.clientX;
		p.clientY = e.clientY;
		p.screenX = e.screenX;
		p.screenY = e.screenY;
		p.offsetX = e.offsetX;
		p.offsetY = e.offsetY;
		p.pageX = e.pageX;
		p.pageY = e.pageY;

		p.ctrlKey = e.ctrlKey;
		p.altKey = e.altKey;
		p.shiftKey = e.shiftKey;
		p.metaKey = e.metaKey;
		return p;
	}

	/**
	 * @param {TouchEvent} e 
	 */
	static fromTouchEvent(e) {
		let t = e.changedTouches[0];

		let p = new EventPoint;
		p.clientX = t.clientX;
		p.clientY = t.clientY;
		p.screenX = t.screenX;
		p.screenY = t.screenY;
		let r = e.currentTarget.getBoundingClientRect();
		p.offsetX = p.clientX - r.left;
		p.offsetY = p.clientY - r.top;

		p.ctrlKey = e.ctrlKey;
		p.altKey = e.altKey;
		p.shiftKey = e.shiftKey;
		p.metaKey = e.metaKey;
		return p;
	}
}

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
	constructor () {}

	clone () {
		return new TreeNode();
	}
}

class Circle extends TreeNode {
	/**
	 * 
	 * @param {TreeNode} left 
	 * @param {TreeNode} right 
	 */
	constructor (left, right) {
		super();

		this.left = left;
		this.right = right;
	}

	clone () {
		return new Circle (
			null == this.left ? null : this.left.clone(),
			null == this.right ? null : this.right.clone()
		);
	}
}

class Triangle extends TreeNode {
	/**
	 * 
	 * @param {number} level 
	 */
	constructor (level) {
		super();

		this.level = level;
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
		this.selected = false;
		this.root = root;
	}

	clone () {
		return new Tree(this.x, this.y, this.root.clone());
	}
}
