function drawCharts() {
	gStars.forEach((star, idx) => {
		star.x = (idx + 1) * (BAR_WIDTH + BAR_SPACE)
		star.y = gElCanvas.height - star.rate

		gCtx.fillStyle = star.color
		gCtx.fillRect(star.x, star.y, BAR_WIDTH, star.rate)
	})
}

function onMouseMove(ev) {
	const { offsetX, offsetY, clientX, clientY } = ev

	const hoveredStar = gStars.find(star => {
        const { x, y, rate } = star

		return offsetX >= x && offsetX <= x + BAR_WIDTH && 
               offsetY >= y && offsetY <= y + rate
	})

	if (hoveredStar) {
        const { name, rate } = hoveredStar
		openModal(name, rate, clientX, clientY)
	} else {
		closeModal()
	}
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
