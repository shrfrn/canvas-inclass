'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()

    // drawImg1()
    // drawImg2()
    // drawImg3()

    window.addEventListener('resize', () => resizeCanvas())
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function drawImg1() {
    const elImg = new Image()
    elImg.src = 'img/square.jpg'
    
    // Naive approach:
    // there is a risk that image is not loaded yet and nothing will be drawn on canvas
    
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg2() {
    const elImg = new Image()
    elImg.src = 'img/square.jpg'

    // Draw the image on the canvas only when it's ready
    
    elImg.onload = () => 
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg3() {
    const img = new Image()
    img.src = 'img/square.jpg'
    // img.src = 'img/wide.jpg'
    // img.src = 'img/tall.jpg'
    
    // Let's use the image natural width and height
    
    img.onload = () => 
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
}

// Cover a fixed-width canvas using an img
// by changing the canvas height

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}

function downloadCanvas(elLink) {
    
    elLink.download = 'my-img' // Set a name for the downloaded file

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function drawRect({ offsetX, offsetY }) {
    gCtx.strokeStyle = 'gray'
    gCtx.strokeRect(offsetX, offsetY, 120, 120)

    gCtx.fillStyle = 'orange'
    gCtx.fillRect(offsetX, offsetY, 120, 120)
}
