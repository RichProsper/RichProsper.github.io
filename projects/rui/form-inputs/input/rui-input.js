export default ({ attrs = {}, evts = {} }) => {
    const Container = { el: {} }
    const Input = document.createElement('input')
    
    // Set attributes
    for (const attr in attrs) Input.setAttribute(attr, attrs[attr])

    Input.addEventListener('focus', () => Container.el.classList.add('focused'))
    Input.addEventListener('blur', () => Container.el.classList.remove('focused'))

    // Set events
    for (const evt in evts) {
        if ( Array.isArray(evts[evt]) ) {
            for (const e of evts[evt]) Input.addEventListener(evt, e)
        }
        else Input.addEventListener(evt, evts[evt])
    }

    switch (attrs?.type) {
        case 'file': {
            Container.el = document.createElement('label')

            const Icon = document.createElement('i')
            Icon.className = 'fas fa-upload'

            const Span = document.createElement('span')
            Span.textContent = ' Choose a file...'

            Container.el.appendChild(Input)
            Container.el.appendChild(Icon)
            Container.el.appendChild(Span)
            break
        }
        default: {
            Container.el = document.createElement('div')
            Container.el.appendChild(Input)
    
            if (attrs?.placeholder) {
                const Span = document.createElement('span')
                Span.textContent = attrs?.placeholder
                Container.el.appendChild(Span)
            }
        }
    }

    Container.el.setAttribute('data-input-container', '')

    return Container.el
}