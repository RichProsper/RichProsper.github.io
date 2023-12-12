import Header from "../../scripts/Header.min.js"
import Carousel from "./Carousel.min.js"

Header()
Carousel()

document.querySelectorAll('a.no-click').forEach(link => {
    link.addEventListener('click', e => e.preventDefault())
})