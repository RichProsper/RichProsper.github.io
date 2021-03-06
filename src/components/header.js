export default () => {
    const header = document.getElementById('header')
    const menuClose = document.getElementsByClassName('menu-close')[0]

    window.addEventListener('scroll', () => {
        // Add/remove sticky, depending on test conditional, scrollY greater than 0
        header.classList.toggle('sticky', window.scrollY > 0)
    })
    window.addEventListener('resize', () => {
        // If menu was opened when screen size was small close it when screen is resized
        // to bigger. This avoids some styling issues.
        if (window.innerWidth >= 993 && header.classList.contains('active')) {
            header.classList.remove('active')
            menuClose.classList.remove('close')
        }
    })

    if (window.scrollY > 0) header.classList.add('sticky')

    const toggle = () => {
        if (window.innerWidth < 993) {
            header.classList.toggle('active')
            menuClose.classList.toggle('close')
        }
    }

    const lis = header.children[1].children
    for (let i = 0; i < lis.length; i++) {
        lis[i].children[0].addEventListener('click', toggle)
    }
    menuClose.addEventListener('click', toggle)
}