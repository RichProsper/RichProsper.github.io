export default () => {
    const navlinks = document.getElementById('navbarSupportedContent')

    navlinks.addEventListener('transitionend', function() {
        this.classList.remove('transition')
    })

    document.querySelector('nav.navbar rwc-hmb').addEventListener('click', function() {
        this.HamburgerMenuBtn.ariaExpanded === 'true' ? (
            navlinks.classList.add('transition'),
            navlinks.classList.add('show')
        ) : (
            navlinks.classList.add('transition'),
            navlinks.classList.remove('show')
        )
    })
}