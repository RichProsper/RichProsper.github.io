export default () => {
    const header = document.getElementById('header')
    const navlinks = document.getElementById('navbarSupportedContent')
    const menu = document.querySelector('rwc-hmb')

    window.addEventListener('scroll', () => {
        // Add/remove sticky class, depending on scrollY greater than 0
        header.classList.toggle('sticky', window.scrollY > 0)
    })

    if (window.scrollY > 0) header.classList.add('sticky')

    // Fixes some styling issues on page resize
    navlinks.addEventListener('transitionend', function() {
        this.classList.remove('transition')
    })

    // Open and close nav links
    menu.addEventListener('click', function() {
        this.HamburgerMenuBtn.ariaExpanded === 'true' ? (
            navlinks.classList.add('transition'),
            navlinks.classList.add('show')
        ) : (
            navlinks.classList.add('transition'),
            navlinks.classList.remove('show')
        )
    })
}