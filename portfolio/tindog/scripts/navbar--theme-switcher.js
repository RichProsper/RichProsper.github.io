export default () => {
    const li = document.querySelector('nav.navbar li.theme-switcher')
    const atag = li.querySelector('a')
    const chevronRight = atag.querySelector('.fa-chevron-right')
    const chevronDown = atag.querySelector('.fa-chevron-down')
    const form = li.querySelector('form')
    const themes = form.querySelectorAll('input')

    const closeThemeSwitcher = () => {
        form.classList.add('hidden')
        chevronDown.classList.add('hidden')
        chevronRight.classList.remove('hidden')
        window.removeEventListener('click', cleanup)
    }

    /**
     * Close theme switcher dropdown and removes the window click event listener
     * @param {MouseEvent} e Click Event
     */
    const cleanup = e => {
        if (!li.contains(e.target)) {
            closeThemeSwitcher()
        }
    }
    
    atag.addEventListener('click', e => {
        e.preventDefault()
        
        form.classList.contains('hidden') ? (
            form.classList.remove('hidden'),
            chevronRight.classList.add('hidden'),
            chevronDown.classList.remove('hidden'),
            window.addEventListener('click', cleanup)
        ) : (
            closeThemeSwitcher()
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