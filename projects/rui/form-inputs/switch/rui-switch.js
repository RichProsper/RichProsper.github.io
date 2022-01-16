export default ({ labelText, attrs = {} }) => {
    // Container - label
    const SwitchContainer = document.createElement('label')
    SwitchContainer.setAttribute('data-switch-container', '')

        // Wrapper - span
        const SwitchWrapper = document.createElement('span')
        SwitchWrapper.setAttribute('data-switch-wrapper', '')

            // Base - span
            const Base = document.createElement('span')
            Base.setAttribute('data-switch-base', '')

                // Input - input[type="checkbox"]
                const Checkbox = document.createElement('input')
                Checkbox.type = 'checkbox'
                Checkbox.addEventListener('change', function() {
                    if (this.checked) Base.classList.add('checked')
                    else Base.classList.remove('checked')
                })

                // Thumb - span
                const Thumb = document.createElement('span')
                Thumb.setAttribute('data-switch-thumb', '')

            Base.appendChild(Checkbox)
            Base.appendChild(Thumb)

            // Track - span
            const Track = document.createElement('span')
            Track.setAttribute('data-switch-track', '')

        SwitchWrapper.appendChild(Base)
        SwitchWrapper.appendChild(Track)

    SwitchContainer.appendChild(SwitchWrapper)
    
    if (labelText) {
        const LabelText = document.createElement('span')
        LabelText.textContent = labelText
        SwitchContainer.appendChild(LabelText)
    }

    return SwitchContainer
}