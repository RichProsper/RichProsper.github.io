export default ({ attrs = {}, evts = {}, label = 'Choose a file...' }) => {
    const Container = document.createElement('div')
    Container.setAttribute('data-input-media-file-container', '')

        const InputContainer = document.createElement('label')

            const Input = document.createElement('input')

            // Set attributes
            attrs.type = 'file'
            for (const attr in attrs) Input.setAttribute(attr, attrs[attr])

            // Set events
            for (const evt in evts) {
                if ( Array.isArray(evts[evt]) ) {
                    for (const e of evts[evt]) Input.addEventListener(evt, e)
                }
                else Input.addEventListener(evt, evts[evt])
            }

            const Div = document.createElement('div')
            if (attrs.title) Div.title = attrs.title

                const UploadIcon = document.createElement('i')
                UploadIcon.className = 'fas fa-upload'

                const Span = document.createElement('span')
                Span.textContent = ` ${label}`

            Div.appendChild(UploadIcon)
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

        const Preview = document.createElement('button')
        if (attrs.disabled !== undefined) Preview.disabled = true

            const MediaIcon = document.createElement('i')
            MediaIcon.className = 'fas fa-image'

        Preview.appendChild(MediaIcon)

    Container.appendChild(InputContainer)
    Container.appendChild(Preview)

    return Container
}