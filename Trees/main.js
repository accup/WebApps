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
		new Tree(
			5, 1,
			new Circle(null, null)
		),
		new Tree(
			6, 1,
			new Triangle(1)
		),
		new Tree(
			7, 1,
			new Triangle(2)
		),
		new Tree(
			8, 1,
			new Triangle(3)
		),
		new Tree(
			2, 1,
			new Circle(
				new Circle(null, null),
				null
			)
		),
		new Tree(
			1, 4,
			new Circle(
				null,
				new Circle(null, null)
			)
		),
		new Tree(
			10, 1,
			new Circle(
				new Triangle(1),
				null
			)
		),
		new Tree(
			11, 1,
			new Circle(
				null,
				new Triangle(1)
			)
		),
		new Tree(
			14, 1,
			new Circle(
				new Triangle(2),
				null
			)
		),
		new Tree(
			15, 1,
			new Circle(
				null,
				new Triangle(2)
			)
		),
		new Tree(
			18, 1,
			new Circle(
				new Triangle(3),
				null
			)
		),
		new Tree(
			19, 1,
			new Circle(
				null,
				new Triangle(3)
			)
		)
	];

	let PIOver4 = Math.PI / 4;

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {TreeNode} node 
	 * @param {number} px 
	 * @param {number} py 
	 * @param {boolean} isLeft 
	 */
	function renderNode (x, y, node, px, py, isLeft) {
		if (null === node) return;

		if (node instanceof Circle) {
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
		} else if (node instanceof Triangle) {
			if (null !== px) {
				work_ctx.moveTo(px, py);
				work_ctx.lineTo(x, y);
			}
			work_ctx.moveTo(x, y);
			work_ctx.lineTo(x - halfSquareSize, y + node.level * squareSize);
			work_ctx.lineTo(x + halfSquareSize, y + node.level * squareSize);
			work_ctx.closePath();
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

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {TreeNode} node 
	 * @param {number} px 
	 * @param {number} py 
	 */
	function hitsNode (x, y, node, px, py) {
		if (null == node) return null;

		if (node instanceof Circle) {
			if (hitsCircle(x, y, halfSquareSize, px, py)) {
				return node;
			}
			return hitsNode(x - squareSize, y + squareSize, node.left, px, py) || hitsNode(x + squareSize, y + squareSize, node.right, px, py);
		} else if (node instanceof Triangle) {
			if (hitsTriangle(x, y, squareSize, node.level * squareSize, px, py)) {
				return node;
			}
		}
		return null;
	}
	/**
	 * 
	 * @param {number} px 
	 * @param {number} py 
	 */
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
	 * @param {EventPoint} e 
	 */
	function onMoveStart(e) {
		moving = true;

		let x = e.offsetX, y = e.offsetY;

		let tree = hits(x, y);
		if (null != tree) {
			if (e.ctrlKey) {
				tree = tree.clone();
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
	 * @param {EventPoint} e 
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
	 * @param {EventPoint} e 
	 */
	function onMoveEnd(e) {
		moving = false;

		if (null != selectingTree) {
			selectingTree.selected = false;
			selectingTree = null;
		}
	}

	function wrapMouseListener (listener) {
		return e => {
			e.preventDefault();

			listener(EventPoint.fromMouseEvent(e));
		};
	}

	function wrapTouchListener (listener) {
		return e => {
			e.preventDefault();

			listener(EventPoint.fromTouchEvent(e));
		};
	}

	work.addEventListener('mousedown', wrapMouseListener(onMoveStart));
	work.addEventListener('touchstart', wrapTouchListener(onMoveStart));

	work.addEventListener('mousemove', wrapMouseListener(onMove));
	work.addEventListener('touchmove', wrapTouchListener(onMove));

	work.addEventListener('mouseup', wrapMouseListener(onMoveEnd));
	work.addEventListener('touchcancel', wrapTouchListener(onMoveEnd));
	work.addEventListener('touchend', wrapTouchListener(onMoveEnd));
});
