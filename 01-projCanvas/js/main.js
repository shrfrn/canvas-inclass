'use strict'

let gElCanvas
let gCtx
let gCurrShape = 'rect'

function onInit() {
	gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

	//   drawLine(10, 10, 130, 230)
	//   drawTriangle(50, 280)
	//   drawRect(250, 50)
	//   drawArc(330, 330)
	//   drawText('Hola!', gElCanvas.width / 2, gElCanvas.height / 2)
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
	gCtx.moveTo(x, y)
	gCtx.lineTo(xEnd, yEnd)
	//   ?gCtx.lineWidth = 3
	//   ?gCtx.strokeStyle = 'orange'
	gCtx.stroke()
}

function drawTriangle(x, y) {
	gCtx.beginPath()
	gCtx.moveTo(x, y)

	gCtx.lineTo(130, 330)
	gCtx.lineTo(50, 400)

	gCtx.closePath()

	gCtx.strokeStyle = 'gray'
	gCtx.lineWidth = 3
	gCtx.stroke()

	gCtx.fillStyle = 'pink'
	gCtx.fill()
}

function drawRect(x, y) {
	gCtx.strokeStyle = 'lightblue'
	gCtx.lineWidth = 4
	gCtx.strokeRect(x, y, 120, 120)

	gCtx.fillStyle = 'orange'
	gCtx.fillRect(x, y, 120, 120)
}

function drawArc(x, y) {
	gCtx.beginPath()

	// The x,y cords of the center, radius,
	// starting angle & ending angle, in radians

	gCtx.arc(x, y, 70, 0, 2 * Math.PI) // draws a circle

	gCtx.lineWidth = 4
	gCtx.strokeStyle = 'orangered'
	gCtx.stroke()

	gCtx.fillStyle = 'lightsteelblue'
	gCtx.fill()
}

function drawText(text, x, y) {
	gCtx.lineWidth = 2
	gCtx.strokeStyle = 'orange'

	gCtx.fillStyle = 'lightsteelblue'

	gCtx.font = '45px Arial'
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'

	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}

function onClearCanvas() {
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

	// Clear just a part of the canvas...
	//   ?gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}

function onSetShape(shape) {
	gCurrShape = shape
}

function onDraw(ev) {
	const { offsetX, offsetY } = ev

	switch (gCurrShape) {
		case 'triangle':
			drawTriangle(offsetX, offsetY)
			break
		case 'rect':
			drawRect(offsetX, offsetY)
			break
		case 'text':
			drawText('Hello', offsetX, offsetY)
			break
		case 'line':
			drawLine(offsetX, offsetY)
			break
	}
}
