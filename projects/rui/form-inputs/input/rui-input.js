export default ({ attrs = {}, evts = {} }) => {
    const Control = document.createElement('div')
    Control.className = 'control'

        const Input = document.createElement('input')

        // Set attributes
        for (let attr in attrs) Input.setAttribute(attr, attrs[attr])

        Input.addEventListener('focus', () => Control.classList.add('focused'))
        Input.addEventListener('blur', () => Control.classList.remove('focused'))

        // Set events
        for (let evt in evts) {
            if ( Array.isArray(evts[evt]) ) {
                for (let e of evts[evt]) Input.addEventListener(evt, e)
            }
            else Input.addEventListener(evt, evts[evt])
        }

    Control.appendChild(Input)
    
    if (attrs?.placeholder) {
        const Span = document.createElement('span')
        Span.textContent = attrs?.placeholder
        Control.appendChild(Span)
    }

    return Control
}