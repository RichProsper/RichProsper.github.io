export default ({ attrs = {}, evts = {} }) => {
    switch (attrs?.type) {
        case 'file': {
            const InputContainer = document.createElement('label')
            InputContainer.setAttribute('data-input-container', '')
            InputContainer.title = 'Choose a file...'

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

                const Div = document.createElement('div')

                    const Icon = document.createElement('i')
                    Icon.className = 'fas fa-upload'

                    const Span = document.createElement('span')
                    Span.textContent = ' Choose a file...'

                Div.appendChild(Icon)
                Div.appendChild(Span)

                Input.addEventListener('change', e => {
                    const files = e.target.files
                    switch (files.length) {
                        case 0: {
                            Span.textContent = ' Choose a file...'
                            InputContainer.title = 'Choose a file...'
                            break
                        }
                        case 1: {
                            Span.textContent = ` ${files[0].name}`
                            InputContainer.title = files[0].name
                            break
                        }
                        default: {
                            if (files.length < 9) {
                                Span.textContent = ` ${files.length} files selected`
                                InputContainer.title = `${files.length} files selected`
                            }
                            else {
                                Span.textContent = ' 9+ files selected'
                                InputContainer.title = '9+ files selected'
                            }
                        }
                    }
                })

            InputContainer.appendChild(Input)
            InputContainer.appendChild(Div)
            
            return InputContainer
        }
        default: {
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
    }
}