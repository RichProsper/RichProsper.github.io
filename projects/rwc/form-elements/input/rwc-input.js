// TODO observedAttributes, getters & setters, color-scheme: dark scss on the other form-element web components

class RWC_Input extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'value', 'readonly', 'maxlength', 'minlength', 'min', 'max', 'multiple', 'pattern', 'title', 'placeholder', 'required', 'step', 'autofocus', 'input_size', 'input_color'
        ]        
    }

    // TODO inputSize, inputColor
    // TODO setAttribute (like placeholder)
    get value()             { return this.Input.value                  }
    set value(val)          { this.Input.value = val                   }
    get disabled()          { return this.Input.disabled               }
    set disabled(d)         { this.Input.disabled = d                  }
    get readOnly()          { return this.Input.readOnly               }
    set readOnly(rO)        { this.Input.readOnly = rO                 }
    get maxLength()         { return this.Input.maxLength              }
    set maxLength(maxL)     { this.Input.maxLength = maxL              }
    get minLength()         { return this.Input.minLength              }
    set minLength(minL)     { this.Input.minLength = minL              }
    get max()               { return this.Input.max                    }
    set max(max_)           { this.Input.max = max_                    }
    get min()               { return this.Input.min                    }
    set min(min_)           { this.Input.min = min_                    }
    get multiple()          { return this.Input.multiple               }
    set multiple(m)         { this.Input.multiple = m                  }
    get pattern()           { return this.Input.pattern                }
    set pattern(pat)        { this.Input.pattern = pat                 }
    get title()             { return this.Input.title                  }
    set title(title_)       { this.Input.title = title_                }
    get placeholder()       { return this.Input.placeholder            }
    set placeholder(ph)     { this.Input.placeholder = ph,
                              this.setAttribute('placeholder', ph)     }
    get required()          { return this.Input.required               }
    set required(r)         { this.Input.required = r                  }
    get step()              { return this.Input.step                   }
    set step(step_)         { this.Input.step = step_                  }
    get autofocus()         { return this.Input.autofocus              }
    set autofocus(a)        { this.Input.autofocus = a                 }
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
        if (this.hasAttribute('required') && this.value === '') {
            this.internals_.setValidity({valueMissing: true}, 'Please fill out this field', this.Input)
            return
        }

        this.internals_.setValidity({})
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

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value': {
                this.hasAttribute('value')
                    ? this.Input.setAttribute('value', newValue)
                    : this.Input.removeAttribute('value')
                break
            }
            case 'readonly': {
                this.hasAttribute('readonly')
                    ? this.Input.setAttribute('readonly', '')
                    : this.removeAttribute('readonly')
                break
            }
            case 'maxlength': {
                this.hasAttribute('maxlength')
                    ? this.Input.setAttribute('maxlength', newValue)
                    : this.removeAttribute('maxlength')
                break
            }
            case 'minlength': {
                this.hasAttribute('minlength')
                    ? this.Input.setAttribute('minlength', newValue)
                    : this.removeAttribute('minlength')
                break
            }
            case 'max': {
                this.hasAttribute('max')
                    ? this.Input.setAttribute('max', newValue)
                    : this.removeAttribute('max')
                break
            }
            case 'min': {
                this.hasAttribute('min')
                    ? this.Input.setAttribute('min', newValue)
                    : this.removeAttribute('min')
                break
            }
            case 'multiple': {
                this.hasAttribute('multiple')
                    ? this.Input.setAttribute('multiple', '')
                    : this.removeAttribute('multiple')
                break
            }
            case 'pattern': {
                this.hasAttribute('pattern')
                    ? this.Input.setAttribute('pattern', newValue)
                    : this.removeAttribute('pattern')
                break
            }
            case 'title': {
                this.hasAttribute('title')
                    ? this.Input.setAttribute('title', newValue)
                    : this.removeAttribute('title')
                break
            }
            case 'placeholder': {
                if (this.hasAttribute('placeholder')) {
                    this.Input.setAttribute('placeholder', newValue)
                    this.Placeholder.textContent = newValue
                }
                else {
                    this.removeAttribute('placeholder')
                    this.Placeholder.textContent = null
                }
                break
            }
            case 'required': {
                this.hasAttribute('required')
                    ? this.Input.setAttribute('required', '')
                    : this.Input.removeAttribute('required')
                break
            }
            case 'step': {
                this.hasAttribute('step')
                    ? this.Input.setAttribute('step', newValue)
                    : this.removeAttribute('step')
                break
            }
            case 'autofocus': {
                this.hasAttribute('autofocus')
                    ? this.Input.setAttribute('autofocus', '')
                    : this.Input.removeAttribute('autofocus')
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

// TODO These types are not supported. Default to text
// case 'button':
// case 'checkbox':
// case 'color':
// case 'file':
// case 'image':
// case 'radio':
// case 'range':
// case 'reset':
// case 'submit':

// TODO datalists don't work in web components. Will have to creatr a InputList web component