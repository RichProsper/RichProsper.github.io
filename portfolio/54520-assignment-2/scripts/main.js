import Header from "./Header.min.js"

Header()

document.querySelectorAll('a.no-click').forEach(link => {
    link.addEventListener('click', e => e.preventDefault())
})