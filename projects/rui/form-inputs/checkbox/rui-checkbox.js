export default ({ labelText, attrs = {}, evts = {} }) => {
    // Container - label
    const CheckboxContainer = document.createElement('label')
    CheckboxContainer.setAttribute('data-checkbox-container', '')

        // Wrapper - span
        const CheckboxWrapper = document.createElement('span')
        CheckboxWrapper.setAttribute('data-checkbox-wrapper', '')

            // Input - input[type="checkbox"]
            const Checkbox = document.createElement('input')
            Checkbox.type = 'checkbox'

            // Icon - i
            const Icon = document.createElement('i')
            Icon.className = 'far fa-square icon'

            Checkbox.addEventListener( 'focus', () => CheckboxWrapper.classList.add('focus') )
            Checkbox.addEventListener( 'blur', () => CheckboxWrapper.classList.remove('focus') )

            Checkbox.addEventListener('change', function() {
                Icon.className = this.checked ? 'fas fa-check-square icon checked' :
                    'far fa-square icon'
            })    

            // Set attributes
            for (let attr in attrs) Checkbox.setAttribute(attr, attrs[attr])
            if ('disabled' in attrs) CheckboxContainer.classList.add('disabled')
            if ('checked' in attrs) {
                Checkbox.setAttribute('checked', '')
                Icon.className = 'fas fa-check-square icon checked'
            }

            // Set events
            for (let evt in evts) {
                if ( Array.isArray(evts[evt]) ) {
                    for (let e of evts[evt]) Checkbox.addEventListener(evt, e)
                }
                else Checkbox.addEventListener(evt, evts[evt])
            }

        CheckboxWrapper.appendChild(Checkbox)
        CheckboxWrapper.appendChild(Icon)
    CheckboxContainer.appendChild(CheckboxWrapper)

    if (labelText) {
        const LabelText = document.createElement('span')
        LabelText.textContent = labelText
        CheckboxContainer.appendChild(LabelText)
    }

    return CheckboxContainer
}