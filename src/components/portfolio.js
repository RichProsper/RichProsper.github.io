export default () => {
    const carousel = document.querySelector('[data-carousel]')
    const items = carousel.querySelector('.items')
    const total = items.children.length
    const totalSpan = carousel.querySelector('.total')
    const current = carousel.querySelector('.current')
    const prevBtn = carousel.querySelector('.prev')
    const nextBtn = carousel.querySelector('.next')

    totalSpan.innerHTML = total

    prevBtn.addEventListener('click', () => {
        if (total === 1) return

        let i = +current.innerHTML
        items.children[i - 1].classList.add('hidden')
        
        if (i === 1) i = total    
        else i--

        current.innerHTML = i
        items.children[i - 1].classList.remove('hidden')
    })

    nextBtn.addEventListener('click', () => {
        if (total === 1) return
        
        let i = +current.innerHTML
        items.children[i - 1].classList.add('hidden')
        
        if (i === total) i = 1
        else i++

        current.innerHTML = i
        items.children[i - 1].classList.remove('hidden')
    })
}