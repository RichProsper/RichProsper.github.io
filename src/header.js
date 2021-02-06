const header = document.getElementById('header')

window.addEventListener('scroll', () => {
    // Add/remove sticky, depending on test conditional, scrollY greater than 0
    header.classList.toggle('sticky', window.scrollY > 0)
})

const toggle = () => header.classList.toggle('active')

const lis = header.children[1].children
for (let i = 0; i < lis.length; i++) {
    lis[i].children[0].addEventListener('click', toggle)
}

document.getElementsByClassName('menu-close')[0].addEventListener('click', toggle)