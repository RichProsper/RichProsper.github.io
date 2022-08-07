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
    setFormValue   = () => this.internals_.setFormValue(this.value)

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

    // TODO
    getTemplate() {
        this.defaultSelectSize = '1.6rem'
        this.defaultSelectColor = { h: 207, s: 90, l: 77 }
        this.css = ``

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">

            <div class="select-container">
                <select></select>
                <span class="label-text"></span>
                <span class="hover"></span>
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
                `hsl(${color.h}, ${color.s}%, ${color.l - 24}%)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .035)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .07)`
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
            `hsl(${hue}, ${saturation}%, ${lightness - 24}%)`,
            `hsla(${hue}, ${saturation}%, ${lightness}%, .035)`,
            `hsla(${hue}, ${saturation}%, ${lightness}%, .07)`
        ]
    }

    updateSizeColor() {
        const [color1a, color1b, color2a, color2b] = this.determineColors()

        this.Style.innerHTML = this.css
            .replace(
                '[[select_size]]', this.getAttribute('select_size') || this.defaultSelectColor
            )
            .replace('[[color_1a]]', color1a)
            .replace('[[color_1b]]', color1b)
            .replace('[[color_2a]]', color2a)
            .replace('[[color_2b]]', color2b)
    }
    
    onDOMSubtreeModified() {
        this.Select.innerHTML = null
        for (const child of this.children) this.Select.appendChild(child.cloneNode(true))
        
        this.setFormValue()
        this.validation()
    }
    
    // TODO
    connectedCallback() {
        this.onDOMSubtreeModified()
        // this.updateSizeColor()
        
        // TODO
        this.addEventListener('DOMSubtreeModified', () => this.onDOMSubtreeModified())
        this.Select.addEventListener('focus', () => this.SelectContainer.classList.add('focused'))
        this.Select.addEventListener('blur', () => this.SelectContainer.classList.remove('focused'))
        this.Select.addEventListener('change', () => {
            this.setFormValue()
            this.validation()
        })
    }

    // TODO
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
                // this.updateSizeColor()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-select', RWC_Select)