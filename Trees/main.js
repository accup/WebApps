window.addEventListener('load', e => {
	let immutablePattern = createStripedPattern(1.2, 2.4, 'lightgray', 'white')
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
		for (let x=0; x<cw; x+=style.squareSize) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, ch);
		}
		for (let y=0; y<ch; y+=style.squareSize) {
			ctx.moveTo(0, y);
			ctx.lineTo(cw, y);
		}
		ctx.stroke();
	});

	let immutableCircle = new Tree(1, 1, new Circle(null, null));
	let immutableTriangle = new Tree(1, 2, new Triangle(2));
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
			10, 5,
			new Circle(
				new Circle(
					new Circle(null, new Triangle(2)),
					null
				),
				new Circle(
					new Circle(new Circle(null, null), new Triangle(3)),
					new Circle(
						new Triangle(1),
						new Circle(
							new Triangle(6),
							new Triangle(4)
						)
					)
				)
			)
		)
	];

	function render () {
		work_ctx.lineWidth = 1;

		work_ctx.clearRect(0, 0, work.width, work.height);

		work_ctx.strokeStyle = "blue";
		work_ctx.fillStyle = immutablePattern;

		work_ctx.beginPath();
		immutableCircle.render(work_ctx);
		work_ctx.fill();
		work_ctx.stroke();

		work_ctx.beginPath();
		immutableTriangle.render(work_ctx);
		work_ctx.fill();
		work_ctx.stroke();

		for (let i=0, n=trees.length; i<n; ++i) {
			let tree = trees[i];

			if (tree.selected) {
				work_ctx.strokeStyle = "red";
				work_ctx.fillStyle = "white";
			} else if (tree.hovered) {
				work_ctx.strokeStyle = "black";
				work_ctx.fillStyle = "#F8F8F8";
			} else {
				work_ctx.strokeStyle = "black";
				work_ctx.fillStyle = "white";
			}

			work_ctx.beginPath();
			tree.render(work_ctx);
			work_ctx.fill();
			work_ctx.stroke();
		}
	}

	function loop (timestamp) {
		render();
		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);

	/**
	 * @param {number} tx 
	 * @param {number} ty 
	 */
	function hits (tx, ty) {
		for (let i=trees.length-1; i>=0; --i) {
			let tree = trees[i];
			
			let node = tree.hits(tx, ty);
			if (node) return tree;
		}
		return null;
	}



	let moveState = {
		/** @type {Tree} */
		hoveredTree: null,
		/** @type {Tree} */
		selectedTree: null,
		treeStartX: 0,
		treeStartY: 0,
		startX: 0,
		startY: 0
	}

	/** @param {EventPoint} p */
	function onMoveStart0 (p) {
		let x = p.offsetX, y = p.offsetY;

		let tree = hits(x, y);
		if (null != tree) {
			if (p.ctrlKey) {
				tree.blur();
				tree = tree.clone();
				trees.push(tree);
			}
			tree.select();
			moveState.hoveredTree = null;
			moveState.selectedTree = tree;
			moveState.startX = x;
			moveState.startY = y;
			moveState.treeStartX = tree.x;
			moveState.treeStartY = tree.y;

			onMoveStart = onMoveStart1;
			onMove = onMove1;
			onMoveEnd = onMoveEnd1;
		}
	}
	/** @param {EventPoint} p */
	function onMoveStart1 (p) {}

	/** @param {EventPoint} p */
	function onMove0 (p) {
		let tree = hits(p.offsetX, p.offsetY);
		if (null != tree) {
			tree.hover();
			moveState.hoveredTree = tree;
			work.style.cursor = p.ctrlKey ? 'copy' : 'move';
		} else {
			if (null !== moveState.hoveredTree) {
				moveState.hoveredTree.blur();
				moveState.hoveredTree = null;
			}
			work.style.cursor = 'auto';
		}
	}
	/** @param {EventPoint} p */
	function onMove1 (p) {
		let x = p.offsetX, y = p.offsetY;

		moveState.selectedTree.x = Math.round(moveState.treeStartX + (x - moveState.startX) / style.squareSize);
		moveState.selectedTree.y = Math.round(moveState.treeStartY + (y - moveState.startY) / style.squareSize);
	}

	/** @param {EventPoint} p */
	function onMoveEnd0(p) {}
	/** @param {EventPoint} p */
	function onMoveEnd1(p) {
		moveState.selectedTree.hover();
		moveState.hoveredTree = moveState.selectedTree;
		moveState.selectedTree = null;

		onMoveStart = onMoveStart0;
		onMove = onMove0;
		onMoveEnd = onMoveEnd0;
	}


	let onMoveStart = onMoveStart0;
	let onMove = onMove0;
	let onMoveEnd = onMoveEnd0;
	let onMoveSet;

	/** @param {EventPoint} p */
	function onMoveStartEntry (p) {
		onMoveStart(p);
	}
	/** @param {EventPoint} p */
	function onMoveEntry (p) {
		onMove(p);
	}
	/** @param {EventPoint} p */
	function onMoveEndEntry (p) {
		onMoveEnd(p);
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

	work.addEventListener('mousedown', wrapMouseListener(onMoveStartEntry));
	work.addEventListener('touchstart', wrapTouchListener(onMoveStartEntry));

	work.addEventListener('mousemove', wrapMouseListener(onMoveEntry));
	work.addEventListener('touchmove', wrapTouchListener(onMoveEntry));

	work.addEventListener('mouseup', wrapMouseListener(onMoveEndEntry));
	work.addEventListener('touchcancel', wrapTouchListener(onMoveEndEntry));
	work.addEventListener('touchend', wrapTouchListener(onMoveEndEntry));

	window.addEventListener('keydown', e => {
		if (!e.repeat) switch (e.key) {
		case "Control":
			if (null != moveState.hoveredTree) {
				work.style.cursor = 'copy';
			}
			break;
		default:
			break;
		}
	});
	window.addEventListener('keyup', e => {
		if (!e.repeat) switch (e.key) {
		case "Control":
			if (null != moveState.hoveredTree) {
				work.style.cursor = 'move';
			}
			break;
		default:
			break;
		}
	});
});
