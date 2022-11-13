export default () => {
    const navlinks = document.getElementById('navbarSupportedContent')

    navlinks.addEventListener('transitionend', function() {
        this.classList.remove('transition')
    })

    document.querySelector('nav.navbar button').addEventListener('click', function() {
        this.ariaExpanded === "false" ? (
            navlinks.classList.add('transition'),
            navlinks.classList.add('show'),
            this.ariaExpanded = "true"
        ) : (
            navlinks.classList.add('transition'),
            navlinks.classList.remove('show'),
            this.ariaExpanded = "false"
        )
    })
}