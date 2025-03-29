const board = document.getElementById('board')
const context = board.getContext('2d')

const gridSize = 25
const rows = 20
const columns = 20

let velocityX = 0
let velocityY = 0

let snakeX = gridSize * 5
let snakeY = gridSize * 5

let snakeBody = []

let foodX
let foodY

let gameOver = false

const changeDirection = event => {
	if (event.code === 'ArrowUp' && velocityY === 0) {
		velocityX = 0
		velocityY = -1
	}
	if (event.code === 'ArrowDown' && velocityY === 0) {
		velocityX = 0
		velocityY = 1
	}
	if (event.code === 'ArrowLeft' && velocityX === 0) {
		velocityX = -1
		velocityY = 0
	}
	if (event.code === 'ArrowRight' && velocityX === 0) {
		velocityX = 1
		velocityY = 0
	}
}

const placeFood = () => {
	foodX = Math.floor(Math.random() * columns) * gridSize
	foodY = Math.floor(Math.random() * rows) * gridSize
}

const update = () => {
	if (gameOver) {
		return
	}

	context.fillStyle = '#000'
	context.fillRect(0, 0, board.width, board.height)

	context.fillStyle = '#ce0c0c'
	context.fillRect(foodX, foodY, gridSize, gridSize)

	if (snakeX === foodX && snakeY === foodY) {
		// Добавляем новый сегмент к телу змейки
		snakeBody.push([foodX, foodY])
		// Размещаем новую еду
		placeFood()
	}

	for (let i = snakeBody.length - 1; i >= 0; i--) {
		snakeBody[i] = snakeBody[i - 1]
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY]
	}

	context.fillStyle = '#64f34e'
	snakeX += velocityX * gridSize
	snakeY += velocityY * gridSize
	context.fillRect(snakeX, snakeY, gridSize, gridSize)

	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], gridSize, gridSize)
	}

	if (
		snakeX < 0 ||
		snakeX >= columns * gridSize ||
		snakeY < 0 ||
		snakeY >= rows * gridSize
	) {
		gameOver = true
		alert('Game Over')
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
			gameOver = true
			alert('Game Over')
		}
	}
}

window.onload = () => {
	board.height = rows * gridSize
	board.width = columns * gridSize

	document.addEventListener('keyup', changeDirection)
	placeFood()
	setInterval(update, 170)
}
