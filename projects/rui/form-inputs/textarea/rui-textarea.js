export default ({ attrs = {}, evts = {} }) => {
    const TextareaContainer = document.createElement('div')
    TextareaContainer.setAttribute('data-textarea-container', '')

        const Textarea = document.createElement('textarea')

        // Set attributes
        for (const attr in attrs) Textarea.setAttribute(attr, attrs[attr])

        Textarea.addEventListener('focus', () => TextareaContainer.classList.add('focused'))
        Textarea.addEventListener('blur', () => TextareaContainer.classList.remove('focused'))

        // Set events
        for (const evt in evts) {
            if ( Array.isArray(evts[evt]) ) {
                for (const e of evts[evt]) Textarea.addEventListener(evt, e)
            }
            else Textarea.addEventListener(evt, evts[evt])
        }

    TextareaContainer.appendChild(Textarea)

    if (attrs?.placeholder) {
        const Span = document.createElement('span')
        Span.textContent = attrs?.placeholder
        TextareaContainer.appendChild(Span)
    }

    return TextareaContainer
}