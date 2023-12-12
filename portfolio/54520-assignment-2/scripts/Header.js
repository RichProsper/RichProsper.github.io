export default () => {
    const navlinks = document.getElementById('navbarSupportedContent')
    const menu = document.querySelector('rwc-hmb')

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