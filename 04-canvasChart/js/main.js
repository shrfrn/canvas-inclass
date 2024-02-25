'use strict'

const gStars = [
	{
		name: 'Shabi',
		rate: 200,
		color: getRandomColor(),
	},
	{
		name: 'Uza',
		rate: 130,
		color: getRandomColor(),
	},
	{
		name: 'Batz',
		rate: 250,
		color: getRandomColor(),
	},
	{
		name: 'Puki',
		rate: 350,
		color: getRandomColor(),
	},
	{
		name: 'Muki',
		rate: 50,
		color: getRandomColor(),
	},
	{
		name: 'Shraga',
		rate: 200,
		color: getRandomColor(),
	},
]

var gElCanvas
var gCtx

const BAR_WIDTH = 50
const BAR_SPACE = 25

function onInit() {
	gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

	gCtx.fillStyle = 'whitesmoke'
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

	drawCharts()
}

function drawCharts() {

    // :TODO - Draw all stars (start with the 1st)
}

function onMouseMove(ev) {
	const { offsetX, offsetY, clientX, clientY } = ev

    // :TODO - find the hovered star

    // :TODO - display the modal if a star has been found
}

function openModal(starName, starRate, x, y) {
	const elModal = document.querySelector('.modal')

	elModal.innerText = `${starName}: ${starRate}`
	elModal.style.opacity = 1
	elModal.style.top = y + 'px'
	elModal.style.left = x + 'px'
}

function closeModal() {
	document.querySelector('.modal').style.opacity = 0
}

function getRandomColor() {
	const letters = '0123456789ABCDEF'
	let color = '#'

	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}
