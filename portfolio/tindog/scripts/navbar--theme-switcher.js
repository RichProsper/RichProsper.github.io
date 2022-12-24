export default () => {
    const li = document.querySelector('nav.navbar li.theme-switcher')
    const atag = li.querySelector('a')
    const form = li.querySelector('form')
    const themes = form.querySelectorAll('input')

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

    const activeTheme = localStorage.getItem('theme')
    if (activeTheme) {
        form.querySelector(`input#${activeTheme}`).checked = true
        // The <html> element
        document.documentElement.className = activeTheme
    }

    for (const theme of themes) {
        theme.addEventListener('click', () => {
            localStorage.setItem('theme', theme.id)
            document.documentElement.className = theme.id
        })
    }
}