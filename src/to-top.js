(() => {
    const toTop = document.getElementsByClassName('to-top')[0]

    window.addEventListener('scroll', () => {
        toTop.classList.toggle('sticky', window.scrollY > 100)
    })

    if (window.scrollY > 100) toTop.classList.add('sticky')

    toTop.addEventListener('click', () => {
        window.scroll(0, 0)
    })
})()