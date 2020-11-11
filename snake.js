const SNAKE_COLOR = new col(50, 90, 168)
const DEATH_COLOR = new col(200, 200, 200)
const FOOD_COLOR = new col(85, 87, 158)
let canvas
let context
let d = "NONE"
// Controls grid color
let grid_color = 80
let color_flip = true

// Controls time
const delay = 20
let time = 0

let snake = [new pos(7,7)] // Snake positions
let food = new pos(getRandomInt(0,15), getRandomInt(0,15))

// score
let score = 0;
let txt; // text element on page

window.onload = init

function init() {
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')

    // Start the first frame request
    animFrame = window.requestAnimationFrame(gameLoop)
    document.addEventListener("keydown", direction)

    txt = document.getElementById('score')
    update_score()
}

let gameLoop = (timeStamp) =>  {
    time += 1
    if (time % delay == 0) {
        next()
    }
    draw()

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop)
}
/*
## Drawing
*/
function draw() {
    draw_grid()
    draw_tile(food.x, food.y, FOOD_COLOR)
    for (let i = 0; i < snake.length; i++) {
        draw_tile(snake[i].x, snake[i].y, SNAKE_COLOR)
    }
}

function draw_grid() {
    // Changes color
    const step = 0.2
    const max = 125
    const min = 75
    grid_color += (-step*(!color_flip)) + (step*(color_flip))

    if (grid_color >= max) {
        color_flip = false
    } else if (grid_color <= min) {
        color_flip = true
    }
    context.fillStyle = `rgb(${grid_color}, ${grid_color + 50}, ${grid_color + 50})`
    // actually draws the grid
    for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
            context.fillRect(1 + (32*x), 1 + (32*y), 30, 30)
        }
    }
}
function draw_tile(x, y, color) {
    context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
    context.fillRect(1 + (32*x), 1 + (32*y), 30, 30)
}
/*
## Listeners
*/
function direction(event) {
    switch (event.keyCode) {
        case 37:
            d = "LEFT"
            break
        case 38:
            d = "UP"
            break
        case 39:
            d = "RIGHT"
            break
        case 40:
            d = "DOWN"
            break
    }
}
/*
## Calculations
*/
function next() {
    pressed = false
    if (d == "LEFT") {
        snake.unshift(new pos(snake[0].x - 1, snake[0].y))
    } else if (d == "UP") {
        snake.unshift(new pos(snake[0].x, snake[0].y - 1))
    } else if (d == "RIGHT") {
        snake.unshift(new pos(snake[0].x + 1, snake[0].y))
    } else if (d == "DOWN") {
        snake.unshift(new pos(snake[0].x, snake[0].y + 1))
    } else {
        snake.push(snake[snake.length-1])
    }
    snake.pop()
    // detects collision with food
    if (snake[0].x == food.x && snake[0].y == food.y) {
        snake.push(snake[snake.length-1])
        summon_food()
    }

    // checks for collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            if (snake.length > 2) {
                exit()
            }
            
        }
    }
    if (snake[0].x == 16 ||
        snake[0].x == -1 ||
        snake[0].y == 16 ||
        snake[0].y == -1) {
            exit()
        }

}
function summon_food() {
    update_score()
    let reset = false
    food.x = getRandomInt(0,15)
    food.y = getRandomInt(0,15)
    snake.forEach(value => {
        if (food.x == value.x && food.y == value.y) {
            reset = true
        }
    })
    if (reset) {
        summon_food()
    }
}
function exit() {
    
    gameLoop = () => {}
    console.log("Game Ended.")
    setTimeout(function(){
        for (let i = 0; i < snake.length; i++) {
            draw_tile(snake[i].x, snake[i].y, DEATH_COLOR)
        }
    }, 100)
}

function update_score() {
    score += 1
    txt.innerHTML = score;
}
