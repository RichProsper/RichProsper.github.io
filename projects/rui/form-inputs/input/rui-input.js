export default (attrs = {}) => {
    const Control = document.createElement('div')
    Control.className = 'control'

        const Input = document.createElement('input')
        for (let attr in attrs) Input[attr] = attrs[attr]
        Input.addEventListener('focus', () => Control.classList.add('focused'))
        Input.addEventListener('blur', () => Control.classList.remove('focused'))

        const Span = document.createElement('span')
        Span.textContent = attrs?.placeholder

    Control.appendChild(Input)
    Control.appendChild(Span)
    return Control
}