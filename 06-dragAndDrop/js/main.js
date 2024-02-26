'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
	gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

	addListeners()
	resizeCanvas()

	//Calc the center of the canvas
	const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

	//Create the circle in the center
	createCircle(center)
	renderCanvas()
}

function renderCanvas() {
	gCtx.fillStyle = '#ede5ff' //Set the backgournd color to grey
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height) //Clear the canvas

	renderCircle()
}

function renderCircle() {
	//Get the props we need from the circle
	const { pos, color, size } = getCircle()

	//Draw the circle
	drawCircle(pos.x, pos.y, size, color)
}

//Handle the listeners
function addListeners() {
	addMouseListeners()
	addTouchListeners()
	//Listen for resize ev
	window.addEventListener('resize', () => {
		resizeCanvas()
		//Calc the center of the canvas
		const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
		//Create the circle in the center
		createCircle(center)
		renderCanvas()
	})
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown)
	gElCanvas.addEventListener('mousemove', onMove)
	gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchmove', onMove)
	gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
	
	gStartPos = getEvPos(ev)        // Get the ev pos from mouse or touch
	if (!isCircleClicked(gStartPos)) return

	setCircleDrag(true)
	//Save the pos we start from
	document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
	const { isDrag } = getCircle()
	if (!isDrag) return

	const pos = getEvPos(ev)
	// Calc the delta, the diff we moved
	const dx = pos.x - gStartPos.x
	const dy = pos.y - gStartPos.y
	moveCircle(dx, dy)

	// Save the last pos, we remember where we`ve been and move accordingly
	gStartPos = pos
	
    // The canvas is rendered again after every move
	renderCanvas()
}

function onUp() {
	setCircleDrag(false)
	document.body.style.cursor = 'grab'
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')

	gElCanvas.width = elContainer.offsetWidth
	gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
	let pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	}

	if (TOUCH_EVENTS.includes(ev.type)) {
		
		ev.preventDefault()         // Prevent triggering the mouse events
		ev = ev.changedTouches[0]   // Gets the first touch point

		// Calc pos according to the touch screen
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		}
	}
	return pos
}

function drawCircle(x, y, size = 60, color = 'blue') {
	gCtx.beginPath()
	gCtx.arc(x, y, size, 0, 2 * Math.PI)
	gCtx.fillStyle = color
	gCtx.fill()
}
