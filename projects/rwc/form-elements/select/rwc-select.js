class RWC_Select extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'multiple', 'required', 'size', 'label_text', 'select_size', 'select_color'
        ]        
    }

    get value()  { return this.Select.value }
    set value(v) {
        this.Select.value = v
        this.setFormValue()
        this.validation()
    }

    get multiple()  { return this.Select.multiple }
    set multiple(m) { m ? this.setAttribute('multiple', '') : this.removeAttribute('multiple') }

    get required()  { return this.Select.required }
    set required(r) { r ? this.setAttribute('required', '') : this.removeAttribute('required') }

    get disabled()  { return this.Select.disabled }
    set disabled(d) { d ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') }

    get size()  { return this.Select.size }
    set size(s) { s ? this.setAttribute('size', s) : this.removeAttribute('size') }
    
    get labelText()  { return this.getAttribute('label_text') || '' }
    set labelText(p) { p ? this.setAttribute('label_text', p) : this.removeAttribute('label_text') }

    get selectSize()   { return this.getAttribute('select_size') || '' }
    set selectSize(sS) {
        sS ? this.setAttribute('select_size', sS) : this.removeAttribute('select_size')
    }

    get selectColor()   { return this.getAttribute('select_color') || '' }
    set selectColor(sC) {
        sC ? this.setAttribute('select_color', sC) : this.removeAttribute('select_color')
    }

    get form()              { return this.internals_.form          }
    get name()              { return this.getAttribute('name')     }
    get validity()          { return this.Select.validity          }
    get validationMessage() { return this.Select.validationMessage }
    get willValidate()      { return this.Select.willValidate      }

    checkValidity  = () => this.internals_.checkValidity()
    reportValidity = () => this.internals_.reportValidity()
    setFormValue   = () => {
        if (!this.multiple){
            this.internals_.setFormValue(this.value)
            return
        }

        if (!this.name) return
        const selectedOptions = []

        for (const option of this.Select.querySelectorAll('option')) {
            if (option.selected && !option.disabled) selectedOptions.push(option)
        }
        if (selectedOptions.length === 0) return

        const formData = new FormData()

        for (const selectedOption of selectedOptions) {
            const value = selectedOption.getAttribute('value')

            if (value) {
                formData.append(this.name, value)
                continue
            }

            if (selectedOption.hasAttribute('value')) {
                formData.append(this.name, '')
                continue
            }

            formData.append(this.name, selectedOption.textContent)
        }

        this.internals_.setFormValue(formData)
    }

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        this.Select.disabled = disabled
    }

    /**
     * This is called when the form is reset
     */
    // TODO
    formResetCallback() {
        // this.setFormValue()
        // this.validation()
    }

    constructor() {
        super()
        this.internals_ = this.attachInternals()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))  

        this.SelectContainer = this.shadowRoot.querySelector('div.select-container')
        this.Style = this.shadowRoot.querySelector('style')
        this.Select = this.shadowRoot.querySelector('select')
        this.LabelTextSpan = this.shadowRoot.querySelector('span.label-text')
    }

    getTemplate() {
        this.defaultSelectSize = '4rem'
        this.defaultSelectColor = { h: 207, s: 90, l: 77 }
        this.css = `
            *,*::before,*::after{margin:0;padding:0}div.select-container{--select-size: [[select_size]];--hue-white: 0, 0%;--white: hsl(var(--hue-white), 100%);--grey-1: hsl(var(--hue-white), 87%);--grey-2: hsl(var(--hue-white), 50%);--color-1a: [[color_1a]];--color-1b: [[color_1b]];--color-2a: [[color_2a]];--color-2b: [[color_2b]];--color-3a: [[color_3a]];position:relative;width:100%;color-scheme:dark;font-size:var(--select-size);display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-sizing:border-box;box-sizing:border-box}div.select-container *,div.select-container *::before,div.select-container *::after{-webkit-box-sizing:inherit;box-sizing:inherit}div.select-container select{position:relative;height:2.5em;display:block;width:100%;background-color:var(--color-2a);border:none;border-bottom:0.0625em solid var(--grey-1);color:var(--grey-1);font-size:.4em;font-family:inherit;padding:0 .3125em;-webkit-tap-highlight-color:transparent;-webkit-transition:background-color .2s;transition:background-color .2s;cursor:pointer}div.select-container select:hover{background-color:var(--color-2b)}div.select-container select:hover ~ .hover{opacity:1}div.select-container select:focus{outline:none}div.select-container select:focus+.label-text{color:var(--color-1a);opacity:1}div.select-container select:focus ~ .focus{-webkit-transform:scaleX(1);transform:scaleX(1)}div.select-container select:disabled,div.select-container select:disabled+.label-text{color:var(--grey-2);cursor:default;pointer-events:none}div.select-container select optgroup,div.select-container select option{background-color:var(--color-3a)}div.select-container select option:hover,div.select-container select option:checked{background-color:var(--color-1b)}div.select-container select[multiple]{height:unset;min-height:6.25em;padding:unset;outline:.125em solid transparent;border:0.0625em solid var(--grey-2);-webkit-transition:outline 300ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:outline 300ms cubic-bezier(0, 0, 0.2, 1) 0ms}div.select-container select[multiple]:hover{outline-color:var(--white)}div.select-container select[multiple]:focus{outline-color:var(--color-1b)}div.select-container select[multiple] ~ .hover,div.select-container select[multiple] ~ .focus{display:none}div.select-container select[multiple]:disabled optgroup,div.select-container select[multiple]:disabled option{background-color:unset}div.select-container select[multiple] option{padding:0 .3125em}div.select-container select[multiple] option:disabled:hover{background-color:unset}div.select-container select[multiple] option:disabled:checked{background-color:unset}div.select-container .label-text{position:absolute;top:0;left:.625em;font-size:.4em;opacity:.7;line-height:2.5em;pointer-events:none;-webkit-transform-origin:top left;transform-origin:top left;-webkit-transform:translateY(-1.5em) scale(0.75);transform:translateY(-1.5em) scale(0.75)}div.select-container .hover{position:absolute;bottom:0;left:0;width:100%;height:.05em;background-color:var(--white);opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s;pointer-events:none}div.select-container .focus{position:absolute;left:0;right:0;bottom:0;height:.05em;background-color:var(--color-1b);-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:300ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:300ms cubic-bezier(0, 0, 0.2, 1) 0ms;pointer-events:none}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <div class="select-container">
                <select></select>
                <span class="label-text"></span>
                <span class="hover"></span>
                <span class="focus"></span>
            </div>
        `

        return template
    }

    validation() {
        this.internals_.setValidity(this.validity, this.validationMessage, this.Select)
    }

    determineColors() {
        if (!this.hasAttribute('select_color')) {
            const color = this.defaultSelectColor

            return [
                `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                `hsl(${color.h}, ${color.s}%, ${color.l * 0.6883}%)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .035)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .07)`,
                `hsl(${color.h}, ${color.s}%, ${color.l * 0.1299}%)`
            ]
        }

        const div = document.createElement('div')
        div.style.color = this.getAttribute('select_color')
        document.body.appendChild(div)

        const rgbColor = window.getComputedStyle(div).getPropertyValue('color').replace(/[rgba()]/g, '').split(', ')
        document.body.removeChild(div)

        // Make red, green, and blue fractions
        const red   = +rgbColor[0] / 255,
              green = +rgbColor[1] / 255,
              blue  = +rgbColor[2] / 255

        // Find greatest and smallest channel values and the delta value
        const channel_min = Math.min(red, green, blue),
              channel_max = Math.max(red, green, blue),
              delta = channel_max - channel_min

        let hue = 0,
            saturation = 0,
            lightness = 0

        // Determine hue
        if      (delta === 0) hue = 0
        else if (channel_max === red) hue = ((green - blue) / delta) % 6
        else if (channel_max === green) hue = ((blue - red) / delta) + 2
        else if (channel_max === blue) hue = ((red - green) / delta) + 4

        hue = Math.round(hue * 60)
        if (hue < 0) hue += 360

        // Determine lightness & saturation
        lightness = (channel_max + channel_min) / 2
        saturation = delta === 0 ? 0 : delta / (1 - Math.abs((2 * lightness) - 1))

        saturation = +(saturation * 100).toFixed(1)
        lightness = +(lightness * 100).toFixed(1)

        return [
            `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            `hsl(${hue}, ${saturation}%, ${lightness * 0.6883}%)`,
            `hsla(${hue}, ${saturation}%, ${lightness}%, .035)`,
            `hsla(${hue}, ${saturation}%, ${lightness}%, .07)`,
            `hsl(${hue}, ${saturation}%, ${lightness * 0.1299}%)`
        ]
    }

    updateSizeColor() {
        const [color1a, color1b, color2a, color2b, color3a] = this.determineColors()

        this.Style.innerHTML = this.css
            .replace(
                '[[select_size]]', this.getAttribute('select_size') || this.defaultSelectSize
            )
            .replace('[[color_1a]]', color1a)
            .replace('[[color_1b]]', color1b)
            .replace('[[color_2a]]', color2a)
            .replace('[[color_2b]]', color2b)
            .replace('[[color_3a]]', color3a)
    }
    
    DOMSubtreeModified() {
        this.Select.innerHTML = null
        for (const child of this.children) this.Select.appendChild(child.cloneNode(true))
        
        this.setFormValue()
        this.validation()
    }

    /**
     * Updates this.Select.innerHTML if this.innerHTML is updated
     * @param {MutationRecord[]} MutationRecords The list of observed mutations
     */
    mutationCallback(MutationRecords) {
        const targets = []

        for (const record of MutationRecords) {
            if (record.type.toLowerCase() === 'attributes') targets.push(record.target)
        }

        // If all changes were on the attributes of rwc-select, ignore them
        if (targets.every(target => target === this)) return
        
        this.DOMSubtreeModified()
    }
    
    connectedCallback() {
        this.DOMSubtreeModified()
        this.updateSizeColor()
        
        const boundMutationCallback = this.mutationCallback.bind(this)
        this.mutationObserver = new MutationObserver(boundMutationCallback)
        this.mutationObserver.observe(this, {attributes: true, childList: true, subtree: true})

        
        this.Select.addEventListener('change', () => {
            this.setFormValue()
            this.validation()
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'multiple': {
                this.hasAttribute('multiple')
                    ? this.Select.setAttribute('multiple', '')
                    : this.Select.removeAttribute('multiple')
                break
            }
            case 'required': {
                this.hasAttribute('required')
                    ? this.Select.setAttribute('required', '')
                    : this.Select.removeAttribute('required')
                break
            }
            case 'size': {
                this.hasAttribute('size')
                    ? this.Select.setAttribute('size', newValue)
                    : this.Select.removeAttribute('size')
                break
            }
            case 'label_text': {
                this.hasAttribute('label_text')
                    ? this.LabelTextSpan.textContent = newValue
                    : this.LabelTextSpan.textContent = null
                break
            }
            case 'select_size':
            case 'select_color': {
                this.updateSizeColor()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-select', RWC_Select)