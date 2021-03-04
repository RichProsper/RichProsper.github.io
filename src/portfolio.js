(() => {
    const countDownDate = new Date("Mar 31, 2021 23:59:59").getTime()
    const countDownElem = document.getElementById("countdown")

    const countDown = () => {
        const now = new Date().getTime()
        const distance = countDownDate - now
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        countDownElem.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s "
        return distance
    }

    const d = countDown()

    const countDownInterval = setInterval(function() {
        const distance = countDown()
        
        if (distance < 0) {
            clearInterval(countDownInterval)
            countDownElem.innerHTML = "EXPIRED"
        }
    }, 1000)
})()