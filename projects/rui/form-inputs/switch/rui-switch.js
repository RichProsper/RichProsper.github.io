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

        SwitchWrapper.appendChild(Base)

    SwitchContainer.appendChild(SwitchWrapper)
    
    if (labelText) {
        const LabelText = document.createElement('span')
        LabelText.textContent = labelText
        SwitchContainer.appendChild(LabelText)
    }

    return SwitchContainer
}