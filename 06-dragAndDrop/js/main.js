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
	const { pos, color, size } = getCircle()
	drawCircle(pos.x, pos.y, size, color)
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()
    
	window.addEventListener('resize', () => {
		resizeCanvas()

        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
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
	
	// Save the position we started from...
    // Get the event position from mouse or touch
	gStartPos = getEvPos(ev)        

	if (!isCircleClicked(gStartPos)) return

	setCircleDrag(true)
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

	if (TOUCH_EVENTS.includes(ev.type)) {
		
		ev.preventDefault()         // Prevent triggering the mouse events
		ev = ev.changedTouches[0]   // Gets the first touch point

        // Calculate the touch position inside the canvas
        
        // ev.pageX = distance of touch position from the documents left edge
        // target.offsetLeft = offset of the elemnt's left side from the it's parent
        // target.clientLeft = width of the elemnt's left border

		return {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		}

	} else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}

function drawCircle(x, y, size = 60, color = 'blue') {
	gCtx.beginPath()
	gCtx.arc(x, y, size, 0, 2 * Math.PI)
	gCtx.fillStyle = color
	gCtx.fill()
}