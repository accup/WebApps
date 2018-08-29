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

function hitsCircle (x, y, r, px, py) {
	let dx = px - x;
	let dy = py - y;

	return (dx * dx + dy * dy <= r * r);
}
function hitsTriangle (x, y, w, h, px, py) {
	let dx = px - x;
	let dy = py - y;

	return (0 <= dy && dy <= h && 2 * Math.abs(dx) * h <= w * dy);
}

window.addEventListener('load', e => {
	let squareSize = 32;
	let halfSquareSize = squareSize / 2;
	let squareJoint = halfSquareSize / Math.sqrt(2);

	/** @type {HTMLCanvasElement} */
	let work = document.getElementById('workspace');
	let work_ctx = work.getContext('2d');
	setResizable(work, cvs => {
		let cw = cvs.width, ch = cvs.height;
		let ctx = cvs.getContext('2d');
		ctx.clearRect(0, 0, cw, ch);
	});

	/** @type {HTMLCanvasElement} */
	let back = document.getElementById('back');
	setResizable(back, cvs => {
		let cw = cvs.width, ch = cvs.height;
		let ctx = cvs.getContext('2d');
		ctx.clearRect(0, 0, cw, ch);

		ctx.beginPath();
		ctx.strokeStyle = '#C0C0C0';
		ctx.lineWidth = 1;
		for (let x=0; x<cw; x+=squareSize) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, ch);
		}
		for (let y=0; y<ch; y+=squareSize) {
			ctx.moveTo(0, y);
			ctx.lineTo(cw, y);
		}
		ctx.stroke();
	});

	let trees = [
		{
			x: 5, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: null,
				right: null
			}
		},
		{
			x: 6, y: 1,
			selected: false,
			root: {
				type: "triangle",
				level: 1
			}
		},
		{
			x: 7, y: 1,
			selected: false,
			root: {
				type: "triangle",
				level: 2
			}
		},
		{
			x: 8, y: 1,
			selected: false,
			root: {
				type: "triangle",
				level: 3
			}
		},
		{
			x: 2, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: {
					type: "circle",
					left: null,
					right: null			
				},
				right: null
			}
		},
		{
			x: 1, y: 4,
			selected: false,
			root: {
				type: "circle",
				left: null,
				right: {
					type: "circle",
					left: null,
					right: null			
				}
			}
		},
		{
			x: 10, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: {
					type: "triangle",
					level: 1
				},
				right: null
			}
		},
		{
			x: 11, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: null,
				right: {
					type: "triangle",
					level: 1
				}
			}
		},
		{
			x: 14, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: {
					type: "triangle",
					level: 2
				},
				right: null
			}
		},
		{
			x: 15, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: null,
				right: {
					type: "triangle",
					level: 2
				}
			}
		},
		{
			x: 18, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: {
					type: "triangle",
					level: 3
				},
				right: null
			}
		},
		{
			x: 19, y: 1,
			selected: false,
			root: {
				type: "circle",
				left: null,
				right: {
					type: "triangle",
					level: 3
				}
			}
		}
	];

	let PIOver4 = Math.PI / 4;
	function renderNode (x, y, node, px, py, isLeft) {
		if (null === node) return;


		switch (node.type) {
		case "circle":
			if (null !== px) {
				work_ctx.moveTo(px, py);
				work_ctx.lineTo(x + (isLeft ? squareJoint : -squareJoint), y - squareJoint);
			}
			if (isLeft) {
				work_ctx.arc(x, y, halfSquareSize, -PIOver4, 7 * PIOver4);
			} else {
				work_ctx.arc(x, y, halfSquareSize, -3 * PIOver4, 5 * PIOver4);
			}
			renderNode(x - squareSize, y + squareSize, node.left, x - squareJoint, y + squareJoint, true);
			renderNode(x + squareSize, y + squareSize, node.right, x + squareJoint, y + squareJoint, false);
			break;
		case "triangle":
			if (null !== px) {
				work_ctx.moveTo(px, py);
				work_ctx.lineTo(x, y);
			}
			work_ctx.moveTo(x, y);
			work_ctx.lineTo(x - halfSquareSize, y + node.level * squareSize);
			work_ctx.lineTo(x + halfSquareSize, y + node.level * squareSize);
			work_ctx.closePath();
			break;
		}
	}
	function render () {
		work_ctx.fillStyle = "white";
		work_ctx.lineWidth = 1;

		work_ctx.clearRect(0, 0, work.width, work.height);

		for (let i=0, n=trees.length; i<n; ++i) {
			let tree = trees[i];

			if (tree.selected) {
				work_ctx.strokeStyle = "red";
			} else {
				work_ctx.strokeStyle = "black";
			}

			work_ctx.beginPath();
			renderNode(tree.x * squareSize, tree.y * squareSize, tree.root, null, null);
			work_ctx.fill();
			work_ctx.stroke();
		}
	}

	setInterval(render, 1000 / 100);

	function hitsNode (x, y, node, px, py) {
		if (null == node) return null;

		switch (node.type) {
		case "circle":
			if (hitsCircle(x, y, halfSquareSize, px, py)) return node;
			return hitsNode(x - squareSize, y + squareSize, node.left, px, py) || hitsNode(x + squareSize, y + squareSize, node.right, px, py);
		case "triangle":
			if (hitsTriangle(x, y, squareSize, node.level * squareSize, px, py)) return node;
			break;
		}
		return null;
	}
	function hits (px, py) {
		for (let i=0, n=trees.length; i<n; ++i) {
			let tree = trees[i];
			let node = hitsNode(tree.x * squareSize, tree.y * squareSize, tree.root, px, py);
			if (null != node) return tree;
		}
		return null;
	}

	let moving = false;
	let selectingTree = null;
	let sx = 0, sy = 0;
	let startX = 0, startY = 0;
	/**
	 * @param {TouchEvent | MouseEvent} e 
	 */
	function onMoveStart(e) {
		moving = true;

		let x = e.offsetX, y = e.offsetY;

		let tree = hits(x, y);
		if (null != tree) {
			if (e.ctrlKey) {
				tree = JSON.parse(JSON.stringify(tree));
				trees.push(tree);
			}
			tree.selected = true;
			selectingTree = tree;
			sx = x;
			sy = y;
			startX = tree.x;
			startY = tree.y;
		}
	}

	/**
	 * @param {TouchEvent | MouseEvent} e 
	 */
	function onMove(e) {
		let x = e.offsetX, y = e.offsetY;

		if (moving) {
			if (null != selectingTree) {
				selectingTree.x = Math.round(startX + (x - sx) / squareSize);
				selectingTree.y = Math.round(startY + (y - sy) / squareSize);
			}
		} else {
			let tree = hits(x, y);
			if (null != tree) {
				work.style.cursor = 'pointer';
			} else {
				work.style.cursor = 'auto';
			}
		}
	}

	/**
	 * @param {TouchEvent | MouseEvent} e 
	 */
	function onMoveEnd(e) {
		moving = false;

		if (null != selectingTree) {
			selectingTree.selected = false;
			selectingTree = null;
		}
	}

	work.addEventListener('mousedown', onMoveStart);
	work.addEventListener('touchstart', onMoveStart);

	work.addEventListener('mousemove', onMove);
	work.addEventListener('touchmove', onMove);

	work.addEventListener('mouseup', onMoveEnd);
	work.addEventListener('touchcancel', onMoveEnd);
	work.addEventListener('touchend', onMoveEnd);
});
