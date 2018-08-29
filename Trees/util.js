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


class Node {
	constructor () {}
}

class Circle extends Node {
	/**
	 * 
	 * @param {Node} left 
	 * @param {Node} right 
	 */
	constructor (left, right) {
		super();

		this.left = left;
		this.right = right;
	}
}

class Triangle extends Node {
	/**
	 * 
	 * @param {number} level 
	 */
	constructor (level) {
		super();

		this.level = level;
	}
}

class Tree {
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {Node} root 
	 */
	constructor (x, y, root)  {
		this.x = x;
		this.y = y;
		this.selected = false;
		this.root = root;
	}
}
