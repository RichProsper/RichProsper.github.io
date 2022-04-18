export default ({ attrs = {}, evts = {} }) => {
    const DivContainer = document.createElement('div')
    DivContainer.setAttribute('data-input-container', '')

        const Input = document.createElement('input')
    
        // Set attributes
        for (const attr in attrs) Input.setAttribute(attr, attrs[attr])

        Input.addEventListener('focus', () => DivContainer.classList.add('focused'))
        Input.addEventListener('blur', () => DivContainer.classList.remove('focused'))

        // Set events
        for (const evt in evts) {
            if ( Array.isArray(evts[evt]) ) {
                for (const e of evts[evt]) Input.addEventListener(evt, e)
            }
            else Input.addEventListener(evt, evts[evt])
        }

    DivContainer.appendChild(Input)
    
    if (attrs?.placeholder) {
        const Span = document.createElement('span')
        Span.textContent = attrs?.placeholder
        DivContainer.appendChild(Span)
    }

    if (attrs?.type === 'file') DivContainer.setAttribute('data-file', '')

    return DivContainer
}