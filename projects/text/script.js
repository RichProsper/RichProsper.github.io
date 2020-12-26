window.addEventListener('DOMContentLoaded', () => {
    const separate_chars = document.getElementsByClassName('separate-chars')
    for (let i = 0; i < separate_chars.length; i++) {
        separateChars(separate_chars[i])
    }

    const separate_chars_with_classes = document.getElementsByClassName('separate-chars-with-classes')
    for (let i = 0; i < separate_chars_with_classes.length; i++) {
        let classes = separate_chars_with_classes[i].getAttribute('data-classes')
        let pattern = separate_chars_with_classes[i].getAttribute('data-pattern')

        classes = classes ? classes.split(' ') : ['default']
        pattern = pattern ? pattern.split(' ') : ['1']

        separateCharsWithClasses(separate_chars_with_classes[i], classes, pattern)
    }
})

/**
 * Separates text in an HTML element into spans containing each character
 * @param {HTMLElement} elem 
 */
const separateChars = elem => {
    let text = elem.textContent || elem.innerText || elem.innerHTML
    elem.innerHTML = null

    for (let i = 0; i < text.length; i++) {
        let span = document.createElement('span')
        span.innerHTML = text[i]
        elem.appendChild(span)
    }
}

/**
 * Separates text in an HTML element into spans containing each character
 * and assigns each span a class form the array of classes according to
 * the specified pattern
 * @param {HTMLElement} elem 
 * @param {Array} classes 
 * @param {Array} pattern 
 */
const separateCharsWithClasses = (elem, classes, pattern) => {
    let text = elem.textContent || elem.innerText || elem.innerHTML
    elem.innerHTML = null

    if (pattern.length === 1) {
        for (let i = 0; i < classes.length - 1; i++) {
            pattern.push(pattern[i])
        }
    }
    else if (pattern.length < classes.length) {
        for (let i = pattern.length - 1; i < classes.length - 1; i++) {
            pattern.push(pattern[i])
        }
    }
    else if (pattern.length > classes.length) {
        pattern.splice(classes.length, (pattern.length - classes.length))
    }

    let i = 0
    while (i < text.length) {
        for (j = 0; j < classes.length; j++) {
            for (k = 0; k < parseInt(pattern[j]); k++) {
                if (i >= text.length) {
                    return
                }
                else {
                    let span = document.createElement('span')
                    span.innerHTML = text[i]
                    span.className = classes[j]
                    elem.appendChild(span)
                    i++
                }
            }
        }
    }
}