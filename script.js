const circle = document.querySelector('#circle')
const score = document.querySelector('#score')
const bottom = document.querySelector('#bottom')
const resetBtn = document.querySelector('#reset')

function start() {
    setScore(getScore())
    setImage()
    resetStorage()
}

function setScore(scores) {
    localStorage.setItem('score', scores)
    score.textContent = scores
}

function resetStorage() {
    resetBtn.addEventListener('click', () => {
        localStorage.clear()
        circle.setAttribute('src', './images/i-1.png')
        bottom.textContent = 'Спортик'
        score.textContent = 0
        resetBtn.style.cssText = `display: none`
    })
}

function setImage() {
    if (getScore() >= 50) {
        circle.setAttribute('src', './images/i-2.png')
        bottom.textContent = 'Начал курить'
    } if (getScore() >= 100) {
        circle.setAttribute('src', './images/i-3.png')
        bottom.textContent = 'Немного выпил'
    } if (getScore() >= 150) {
        circle.setAttribute('src', './images/i-4.png')
        bottom.textContent = 'Выпил еще'
    } if (getScore() >= 200) {
        circle.setAttribute('src', './images/i-5.png')
        bottom.textContent = 'Порыжел'
    } if (getScore() >= 250) {
        circle.setAttribute('src', './images/i-6.png')
        bottom.textContent = 'Стал рыжим!!!'
        resetBtn.style.cssText = `display: block`
    } 
}


function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
    setScore(getScore() + 1)
    setImage()
}



circle.addEventListener('click', (event) => {
    const rect = circle.getBoundingClientRect()

    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const deg = 45

    const tiltX = (offsetY / rect.height) * deg
    const tiltY = (offsetX / rect.width) * -deg

    circle.style.setProperty('--tiltX', `${tiltX}deg`)
    circle.style.setProperty('--tiltY', `${tiltY}deg`)

    setTimeout(() => {
        circle.style.setProperty('--tiltX', `0deg`)
        circle.style.setProperty('--tiltY', `0deg`)
    }, 300)


    const plusOne = document.createElement('div')
    plusOne.classList.add('plus-one')
    plusOne.textContent = '+1'
    plusOne.style.left = `${event.clientX - rect.left}px`
    plusOne.style.top = `${event.clientY - rect.top}px`

    circle.parentElement.appendChild(plusOne)

    addOne()

    setTimeout(() => {
        plusOne.remove()
    }, 2000)
})

start()