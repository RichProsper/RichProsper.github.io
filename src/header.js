const header = document.getElementById('header')

window.addEventListener('scroll', () => {
    // Add/remove sticky, depending on test conditional, scrollY greater than 0
    header.classList.toggle('sticky', window.scrollY > 0)
})

const toggle = () => {
    header.classList.toggle('active')
}