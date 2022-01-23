export default ({ attrs = {}, evts = {} }) => {
    const InputContainer = document.createElement('div')
    InputContainer.setAttribute('data-input-container', '')

        const Input = document.createElement('input')

        // Set attributes
        for (const attr in attrs) Input.setAttribute(attr, attrs[attr])

        Input.addEventListener('focus', () => InputContainer.classList.add('focused'))
        Input.addEventListener('blur', () => InputContainer.classList.remove('focused'))

        // Set events
        for (const evt in evts) {
            if ( Array.isArray(evts[evt]) ) {
                for (const e of evts[evt]) Input.addEventListener(evt, e)
            }
            else Input.addEventListener(evt, evts[evt])
        }

    InputContainer.appendChild(Input)
    
    if (attrs?.placeholder) {
        const Span = document.createElement('span')
        Span.textContent = attrs?.placeholder
        InputContainer.appendChild(Span)
    }

    return InputContainer
}