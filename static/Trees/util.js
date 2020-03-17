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
 * @param {number} weight 
 * @param {number} padding 
 * @param {string} stroke 
 * @param {string} fill 
 */
function createStripedPattern (weight, padding, stroke, fill) {
	let cvs = document.createElement('canvas');
	cvs.width = cvs.height = weight + 2 * padding;
	let ctx = cvs.getContext('2d');
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	ctx.lineWidth = weight;

	ctx.fillRect(0, 0, cvs.width, cvs.height);

	ctx.beginPath();
	ctx.moveTo( cvs.width, -cvs.height);
	ctx.lineTo(-cvs.width,  cvs.height);
	ctx.moveTo(2 * cvs.width, -cvs.height);
	ctx.lineTo(-cvs.width, 2 * cvs.height);
	ctx.moveTo(2 * cvs.width, 0);
	ctx.lineTo(0, 2 * cvs.height);
	ctx.stroke();

	return ctx.createPattern(cvs, 'repeat');
}
