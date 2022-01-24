export default ({ labelText, attrs = {}, evts = {}, options = [], optgroups = [] }) => {
    const SelectContainer = document.createElement('div')
    SelectContainer.setAttribute('data-select-container', '')

        const Select = document.createElement('select')

        // Set attributes
        for (const attr in attrs) Select.setAttribute(attr, attrs[attr])

        Select.addEventListener('focus', () => SelectContainer.classList.add('focused'))
        Select.addEventListener('blur', () => SelectContainer.classList.remove('focused'))

        // Set events
        for (const evt in evts) {
            if ( Array.isArray(evts[evt]) ) {
                for (const e of evts[evt]) Select.addEventListener(evt, e)
            }
            else Select.addEventListener(evt, evts[evt])
        }

        /**
         * @param {Object[]} opts The options
         * @param {HTMLSelectElement|HTMLOptGroupElement} elem The parent element of the options
         */
        const createOptions = (opts, elem) => {
            for (const option of opts) {
                const Option = document.createElement('option')
    
                for (const attr in option) {
                    if (attr === 'textContent') Option[attr] = option[attr]
                    else Option.setAttribute(attr, option[attr])
                }
    
                elem.appendChild(Option)
            }
        }

        createOptions(options, Select)

        for (const optgroup of optgroups) {
            const OptGroup = document.createElement('optgroup')

            for (const attr in optgroup.attrs) OptGroup.setAttribute(attr, optgroup.attrs[attr])

            createOptions(optgroup.options, OptGroup)

            Select.appendChild(OptGroup)
        }

    SelectContainer.appendChild(Select)
    
    if (labelText) {
        const Span = document.createElement('span')
        Span.textContent = labelText
        SelectContainer.appendChild(Span)
    }

    return SelectContainer
}