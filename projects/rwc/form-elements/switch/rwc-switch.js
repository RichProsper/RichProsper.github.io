class RWC_Switch extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return ['value', 'required', 'switch_size', 'switch_color']        
    }

    get value()             { return this.getAttribute('value')        }
    set value(v)            { this.setAttribute('value', v)            }

    get checked()           { return this.Input.checked                }
    set checked(c)          {
        this.Input.checked = c
        c ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
    }

    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity()  { return this.internals_.checkValidity()  }
    reportValidity() { return this.internals_.reportValidity() }

    setFormValue = () => this.checked ? this.internals_.setFormValue(this.getAttribute('value')) : this.internals_.setFormValue(null)

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        this.Switch.className = disabled ? 'switch disabled' : 'switch'
        this.Input.disabled = disabled
    }

    /**
     * This is called when the form is reset
     */
    formResetCallback() {
        this.Input.checked = this.hasAttribute('checked')
        this.hasAttribute('checked') ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
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

        this.Switch = this.shadowRoot.querySelector('label.switch')
        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.Base = this.shadowRoot.querySelector('span.base')
    }

    getTemplate() {
        this.defaultSwitchSize = '2.2rem'
        this.defaultSwitchColor = '207, 90%, 77%'
        this.defaultValue = 'on'
        this.css = ``

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <label class="switch">
                <span class="wrapper">
                    <span class="base">
                        <input type="checkbox">
                        <span class="thumb"></span>
                    </span>
                    <span class="track"></span>
                </span>
                <slot name="label" class="label"></slot>
            </label>
        `

        return template
    }

    validation() {
        if (this.hasAttribute('required') && !this.checked) {
            this.internals_.setValidity({valueMissing: true}, 'Please switch this on if you want to proceed', this.Input)
            return
        }

        this.internals_.setValidity({})
    }

    namedColorToRGBColor() {
        if (!this.hasAttribute('switch_color')) return false

        const div = document.createElement('div')
        div.style.color = this.getAttribute('switch_color')
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

    updateSizeColor() {
        const colors = this.namedColorToRGBColor()
        let css = this.css.replace('[[switch_size]]', this.getAttribute('switch_size') || this.defaultSwitchSize)

        if (!colors) {
            css = css.replace('[[switch_color]]', 'hsl(' + this.defaultSwitchColor + ')')
            css = css.replace('[[hover]]', 'hsl(' + this.defaultSwitchColor + ', .1)')
        }
        else {
            css = css.replace('[[switch_color]]', colors[0])
            css = css.replace('[[hover]]', colors[1])
        }

        this.Style.innerHTML = css
    }
    
    connectedCallback() {
        this.Input.checked = this.hasAttribute('checked')
        this.hasAttribute('checked') ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
        if (!this.getAttribute('value')) this.setAttribute('value', this.defaultValue)

        this.updateSizeColor()
        this.setFormValue()
        this.validation()
        
        this.Input.addEventListener('focus', () => this.Base.classList.add('focus'))
        this.Input.addEventListener('blur', () => this.Base.classList.remove('focus'))
        this.Input.addEventListener('change', e => {
            e.target.checked ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
            this.setFormValue()
            this.validation()
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value': {
                if (!this.getAttribute('value')) this.setAttribute('value', this.defaultValue)
                break
            }
            case 'required': {
                this.hasAttribute('required') ? this.Input.setAttribute('required', '') : this.Input.removeAttribute('required')
                break
            }
            case 'switch_size':
            case 'switch_color': {
                this.updateSizeColor()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-switch', RWC_Switch)