export default () => {
    const li = document.querySelector('nav.navbar li.theme-switcher')
    const atag = li.querySelector('a')
    const form = li.querySelector('form')

    /**
     * Close theme switcher dropdown
     * @param {MouseEvent} e Click Event
     */
    const closeThemeSwitcher = e => {
        if (!li.contains(e.target)) {
            form.classList.add('hidden')
            window.removeEventListener('click', closeThemeSwitcher)
        }
    }
    
    atag.addEventListener('click', e => {
        e.preventDefault()
        
        form.classList.contains('hidden') ? (
            form.classList.remove('hidden'),
            window.addEventListener('click', closeThemeSwitcher)
        ) : (
            form.classList.add('hidden'),
            window.removeEventListener('click', closeThemeSwitcher)
        )
    })
}