'use strict'

let gCanvas
let gCtx

function onInit() {
	gCanvas = document.querySelector('canvas')
	gCtx = gCanvas.getContext('2d')
}

function onSelectImg(elImg) {
	gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function onDownloadCanvas(elLink) {
	elLink.href = '#'       // Clear the link
	const dataUrl = gCanvas.toDataURL()

	elLink.href = dataUrl
	elLink.download = 'my-img'
}
