export default () => {
    const carousel = document.querySelector('div.carousel')
    const itemsDiv = carousel.querySelector('.items')
    const items = itemsDiv.children
    const total = items.length
    const totalSpan = carousel.querySelector('.total')
    const current = carousel.querySelector('.current')
    const prevBtn = carousel.querySelector('.prev')
    const nextBtn = carousel.querySelector('.next')

    totalSpan.innerHTML = total

    const setItemsDivHeight = () => itemsDiv.style.height = `${items[0].clientHeight}px`
    setItemsDivHeight()
    window.addEventListener('resize', setItemsDivHeight)

    for (const item of items) {
        item.addEventListener('transitionend', function() { this.classList.remove('left') })
    }

    const disableBtns = () => {
        prevBtn.disabled = true
        nextBtn.disabled = true

        // 750 = slide animation (500) + 250
        setTimeout(() => {
            prevBtn.disabled = false
            nextBtn.disabled = false
        }, 750);
    }

    prevBtn.addEventListener('click', () => {
        if (total === 1) return

        // Prevents clicks while animation is ongoing
        disableBtns()

        let i = +current.innerHTML
        items[i - 1].classList.replace('active', 'left')
        
        if (i === 1) i = total    
        else i--

        current.innerHTML = i
        items[i - 1].classList.add('active')
    })

    nextBtn.addEventListener('click', () => {
        if (total === 1) return

        disableBtns()
        
        let i = +current.innerHTML
        items[i - 1].classList.replace('active', 'left')
        
        if (i === total) i = 1
        else i++

        current.innerHTML = i
        items[i - 1].classList.add('active')
    })
}