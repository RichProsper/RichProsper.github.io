// import Header from "./header.js"
import Header from "./header.min.js"

Header()

document.querySelectorAll('a.no-click').forEach(link => {
    link.addEventListener('click', e => e.preventDefault())
})