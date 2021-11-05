const RUI_ToTopBtn = () => {
    const toTopBtn = document.createElement('button')
    toTopBtn.type = 'button'
    toTopBtn.className = 'rui-to-top-btn'
    toTopBtn.title = 'Back to Top'
    toTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
    document.body.appendChild(toTopBtn)

    window.addEventListener('scroll', () => {
        toTopBtn.classList.toggle('sticky', window.scrollY > 100)
    })

    if (window.scrollY > 100) toTopBtn.classList.add('sticky')

    toTopBtn.addEventListener('click', () => {
        window.scroll(0, 0)
    })
}