export default () => {
    const carousel = document.querySelector('[data-carousel]')
    const items = carousel.querySelector('.items')
    const total = carousel.querySelector('.total')

    total.innerHTML = items.children.length

    console.log(total)
}