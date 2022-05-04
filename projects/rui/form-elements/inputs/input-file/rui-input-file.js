export default ({ attrs = {}, evts = {}, label = 'Choose a file...' }) => {
    switch (attrs?.type) {
        case 'file': {
            const InputContainer = document.createElement('label')
            InputContainer.setAttribute('data-input-container', '')

                const Input = document.createElement('input')
        
                // Set attributes
                for (const attr in attrs) Input.setAttribute(attr, attrs[attr])

                // Set events
                for (const evt in evts) {
                    if ( Array.isArray(evts[evt]) ) {
                        for (const e of evts[evt]) Input.addEventListener(evt, e)
                    }
                    else Input.addEventListener(evt, evts[evt])
                }

                const Div = document.createElement('div')
                Div.title = attrs.title ? attrs.title : ''

                    const Icon = document.createElement('i')
                    Icon.className = 'fas fa-upload'

                    const Span = document.createElement('span')
                    Span.textContent = ` ${label}`

                Div.appendChild(Icon)
                Div.appendChild(Span)

                Input.addEventListener('focus', () => Div.classList.add('focused'))
                Input.addEventListener('blur', () => Div.classList.remove('focused'))
                Input.addEventListener('change', e => {
                    const files = e.target.files
                    switch (files.length) {
                        case 0: {
                            Span.textContent = ` ${label}`
                            break
                        }
                        case 1: {
                            Span.textContent = ` ${files[0].name}`
                            break
                        }
                        default: {
                            if (files.length < 9) {
                                Span.textContent = ` ${files.length} files selected`
                            }
                            else {
                                Span.textContent = ' 9+ files selected'
                            }
                        }
                    }
                })

            InputContainer.appendChild(Input)
            InputContainer.appendChild(Div)
            
            return InputContainer
        }
        default: {
            const Div = document.createElement('div')
            Div.style.lineHeight = '4rem'
            Div.textContent = `Only input type 'file' is supported!`
            return Div
        }
    }
}