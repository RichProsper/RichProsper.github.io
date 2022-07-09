class RWC_Input extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'input_size', 'input_color', ''
        ]        
    }

    get value()             { return this.Input.value                  }
    set value(v)            { this.Input.value = v                     }
    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity  = () => this.internals_.checkValidity()
    reportValidity = () => this.internals_.reportValidity()
    setFormValue   = () => this.internals_.setFormValue(this.value)

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback = disabled => this.Input.disabled = disabled

    /**
     * This is called when the form is reset
     */
    formResetCallback() {
        this.Input.value = this.Input.getAttribute('value')
        this.setFormValue()
        this.validation()
    }

    constructor() {
        super()
        this.internals_ = this.attachInternals()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))  

        this.InputContainer = this.shadowRoot.querySelector('div.input-container')
        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.Placeholder = this.shadowRoot.querySelector('span.placeholder')
    }

    // TODO
    getTemplate() {
        this.defaultInputSize = '2.2rem'
        this.defaultInputColor = '207, 90%, 77%'
        this.css = ``

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <div class="input-container">
                <input>
                <span class="placeholder"></span>
            </div>
        `

        return template
    }

    // TODO
    validation() {
        // if (this.hasAttribute('required') && this.value === '') {
        //     this.internals_.setValidity({valueMissing: true}, 'Please fill out this field', this.Input)
        //     return
        // }

        // this.internals_.setValidity({})
    }

    // TODO
    convertToHSLColor() {
        if (!this.hasAttribute('input_color')) return false

        const div = document.createElement('div')
        div.style.color = this.getAttribute('input_color')
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

        if (rgbColor.length === 4) {
            return [
                `hsla(${hue}, ${saturation}%, ${lightness}%, ${rgbColor[3]})`,
                `hsla(${hue}, ${saturation}%, ${lightness}%, .1)`
            ]
        }
        else {
            return [
                `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                `hsla(${hue}, ${saturation}%, ${lightness}%, .1)`
            ]
        }
    }

    // TODO
    updateSizeColor() {
        // const colors = this.convertToHSLColor()
        // let css = this.css.replace('[[input_size]]', this.getAttribute('input_size') || this.defaultInputSize)

        // if (!colors) {
        //     css = css.replace('[[input_color]]', 'hsl(' + this.defaultInputColor + ')')
        //     css = css.replace('[[hover]]', 'hsl(' + this.defaultInputColor + ', .1)')
        // }
        // else {
        //     css = css.replace('[[input_color]]', colors[0])
        //     css = css.replace('[[hover]]', colors[1])
        // }

        // this.Style.innerHTML = css
    }
    
    connectedCallback() {
        this.updateSizeColor()
        this.setFormValue()
        this.validation()
        
        this.Input.addEventListener('focus', () => this.InputContainer.classList.add('focused'))
        this.Input.addEventListener('blur', () => this.InputContainer.classList.remove('focused'))
        this.Input.addEventListener('input', () => {
            this.setFormValue()
            this.validation()
        })
    }

    // TODO
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value': {
                this.hasAttribute('value')
                    ? this.Input.setAttribute('value', this.getAttribute('value'))
                    : this.Input.removeAttribute('value')
                break
            }
            case 'required': {
                this.hasAttribute('required') ? this.Input.setAttribute('required', '') : this.Input.removeAttribute('required')
                break
            }
            case 'input_size':
            case 'input_color': {
                this.updateSizeColor()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-input', RWC_Input)