export default ({ labelText, group, attributes }) => {
    // Container - label
    const CheckboxContainer = document.createElement('label')
    CheckboxContainer.setAttribute('data-checkbox-container', '')

        // Wrapper - span
        const CheckboxWrapper = document.createElement('span')
        CheckboxWrapper.setAttribute('data-checkbox-wrapper', '')

            // Input - input[type="checkbox"]
            const Checkbox = document.createElement('input')
            Checkbox.type = 'checkbox'

            const Icon = document.createElement('i')
            Icon.className = 'far fa-square icon'

            Checkbox.addEventListener( 'focus', () => CheckboxWrapper.classList.add('focus') )
            Checkbox.addEventListener( 'blur', () => CheckboxWrapper.classList.remove('focus') )

            if (group) {
                Checkbox.setAttribute('data-checkbox-group-id', group.id)

                if (group.type === 'all') {
                    Checkbox.setAttribute('data-checkbox-group-all', '')
                    Checkbox.setAttribute('data-checkbox-selected-count', 0)
    
                    Checkbox.addEventListener('change', function() {
                        Icon.className = this.checked ? 'fas fa-check-square icon checked' :
                            'far fa-square icon'

                        const query = `[data-checkbox-group-id="${group.id}"]` +
                            `[data-checkbox-group-single]`

                        if (this.checked) {
                            this.setAttribute(
                                'data-checkbox-selected-count',
                                document.querySelectorAll(query).length
                            )

                            const checkboxes = document.querySelectorAll(
                                `${query}[data-checked="false"]`
                            )

                            for (let checkbox of checkboxes) {
                                checkbox.setAttribute('data-checked', 'true')
                                checkbox.checked = true

                                const icon = checkbox.nextElementSibling
                                icon.className = 'fas fa-check-square icon checked'
                            }
                        }
                        else {
                            this.setAttribute('data-checkbox-selected-count', 0)

                            const checkboxes = document.querySelectorAll(
                                `${query}[data-checked="true"]`
                            )

                            for (let checkbox of checkboxes) {
                                checkbox.setAttribute('data-checked', 'false')
                                checkbox.checked = false

                                const icon = checkbox.nextElementSibling
                                icon.className = 'far fa-square icon'
                            }
                        }
                    })
                }
                else if (group.type === 'single') {
                    Checkbox.setAttribute('data-checkbox-group-single', '')
                    Checkbox.setAttribute('data-checked', 'false')

                    Checkbox.addEventListener('change', function() {
                        Icon.className = this.checked ? 'fas fa-check-square icon checked' :
                            'far fa-square icon'
                        
                        const groupId = `[data-checkbox-group-id="${group.id}"]`
                        const allQuery = groupId + `[data-checkbox-group-all]`
                        const singleQuery = groupId + `[data-checkbox-group-single]`

                        const allCheckbox = document.querySelector(allQuery)
                        const singleCheckboxes = document.querySelectorAll(singleQuery)

                        const icon = allCheckbox.nextElementSibling
                        
                        if (this.checked) {
                            this.setAttribute('data-checked', 'true')

                            const selectedCount = +allCheckbox.getAttribute(
                                'data-checkbox-selected-count'
                            ) + 1

                            allCheckbox.setAttribute(
                                'data-checkbox-selected-count', selectedCount
                            )
    
                            if (selectedCount === singleCheckboxes.length) {
                                icon.className = 'fas fa-check-square icon checked'
                            }
                            else if (selectedCount === 1) {
                                allCheckbox.checked = true
                                icon.className = 'fas fa-minus-square icon checked'
                            }
                        }
                        else {
                            this.setAttribute('data-checked', 'false')

                            const selectedCount = +allCheckbox.getAttribute(
                                'data-checkbox-selected-count'
                            ) - 1

                            allCheckbox.setAttribute(
                                'data-checkbox-selected-count', selectedCount
                            )

                            if ( selectedCount === (singleCheckboxes.length - 1) ) {
                                icon.className = 'fas fa-minus-square icon checked'
                            }
                            else if (selectedCount === 0) {
                                allCheckbox.checked = false
                                icon.className = 'far fa-square icon'
                            }
                        }
                    })
                }    
            } // if (group)
            else {
                Checkbox.addEventListener('change', function() {
                    Icon.className = this.checked ? 'fas fa-check-square icon checked' :
                        'far fa-square icon'
                })    
            }

            for (let attr in attributes) Checkbox[attr] = attributes[attr]
            if (attributes?.disabled) CheckboxContainer.classList.add('disabled')
            if (attributes?.checked) {
                Checkbox.setAttribute('checked', '')
                Icon.className = 'fas fa-check-square icon checked'
            }

        CheckboxWrapper.appendChild(Checkbox)
        CheckboxWrapper.appendChild(Icon)
    CheckboxContainer.appendChild(CheckboxWrapper)

        if (labelText) {
            const LabelText = document.createElement('span')
            LabelText.innerHTML = labelText
            CheckboxContainer.appendChild(LabelText)
        }

    return CheckboxContainer
}