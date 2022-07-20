class RWC_Input extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'type', 'value', 'readonly', 'minlength', 'maxlength', 'min', 'max', 'multiple', 'pattern', 'title', 'placeholder', 'required', 'step', 'autofocus', 'input_size', 'input_color'
        ]        
    }

    get type()  { return this.Input.type }
    set type(t) { t ? this.setAttribute('type', t) : this.removeAttribute('type') }

    get value()  { return this.Input.value }
    set value(v) { this.Input.value = v    }

    get disabled()  { return this.Input.disabled }
    set disabled(d) { d ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') }

    get readOnly()   { return this.Input.readOnly }
    set readOnly(rO) { rO ? this.setAttribute('readonly', '') : this.removeAttribute('readonly') }

    get maxLength()   { return this.Input.maxLength }
    set maxLength(mL) {
        mL ? this.setAttribute('maxlength', mL) : this.removeAttribute('maxlength')
    }
    get minLength()   { return this.Input.minLength }
    set minLength(mL) {
        mL ? this.setAttribute('minlength', mL) : this.removeAttribute('minlength')
    }

    get max()  { return this.Input.max }
    set max(m) { m ? this.setAttribute('max', m) : this.removeAttribute('max') }
    get min()  { return this.Input.min }
    set min(m) { m ? this.setAttribute('min', m) : this.removeAttribute('min') }

    get multiple()  { return this.Input.multiple        }
    set multiple(m) { m ? this.setAttribute('multiple', '') : this.removeAttribute('multiple') }

    get pattern()  { return this.Input.pattern }
    set pattern(p) { p ? this.setAttribute('pattern', p) : this.removeAttribute('pattern') }
    
    get placeholder()  { return this.Input.placeholder }
    set placeholder(p) {
        p ? this.setAttribute('placeholder', p) : this.removeAttribute('placeholder')
    }

    get required()  { return this.Input.required }
    set required(r) { r ? this.setAttribute('required', '') : this.removeAttribute('required') }

    get step()  { return this.Input.step }
    set step(s) { s ? this.setAttribute('step', s) : this.removeAttribute('step') }

    get autofocus()  { return this.Input.autofocus }
    set autofocus(a) { a ? this.setAttribute('autofocus', '') : this.removeAttribute('autofocus') }

    get inputSize()   { return this.getAttribute('input_size') || '' }
    set inputSize(iS) {
        iS ? this.setAttribute('input_size', iS) : this.removeAttribute('input_size')
    }

    get inputColor()   { return this.getAttribute('input_color') || '' }
    set inputColor(iC) {
        iC ? this.setAttribute('input_color', iC) : this.removeAttribute('input_color')
    }

    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
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
    formDisabledCallback(disabled) {
        this.Input.disabled = disabled
    }

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

    getTemplate() {
        this.defaultInputSize = '4rem'
        this.defaultInputColor = 'hsl(207, 90%, 77%)'
        this.defaultInputColor = { h: 207, s: 90, l: 77 }
        this.supportedTypes = [
            'text', 'search', 'email', 'password', 'url', 'tel', 'number', 'month', 'week', 'date', 'datetime-local', 'time'
        ]
        this.css = `
            *,*::before,*::after{margin:0;padding:0}div.input-container{--input-size: [[input_size]];--hue-white: 0, 0%;--white: hsl(var(--hue-white), 100%);--grey-1: hsl(var(--hue-white), 87%);--grey-2: hsl(var(--hue-white), 50%);--grey-3: hsla(var(--hue-white), 100%, .035);--color-1a: [[color_1a]];--color-1b: [[color_1b]];--color-2a: [[color_2a]];--color-2b: [[color_2b]];color-scheme:dark;position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--input-size);height:1em;-webkit-box-sizing:border-box;box-sizing:border-box}div.input-container *,div.input-container *::before,div.input-container *::after{-webkit-box-sizing:inherit;box-sizing:inherit}div.input-container input{position:relative;height:100%;display:block;width:100%;background-color:var(--color-2a);border:none;border-bottom:0.0625em solid var(--grey-1);color:var(--grey-1);font-size:.4em;font-family:inherit;padding:0 .3125em;-webkit-tap-highlight-color:transparent;-webkit-transition:background-color .2s;transition:background-color .2s}div.input-container input::-webkit-input-placeholder{color:transparent;-webkit-user-select:none;user-select:none}div.input-container input:-ms-input-placeholder{color:transparent;-ms-user-select:none;user-select:none}div.input-container input::-ms-input-placeholder{color:transparent;-ms-user-select:none;user-select:none}div.input-container input::placeholder{color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.input-container input:hover{background-color:var(--color-2b)}div.input-container input:hover ~ .hover{opacity:1}div.input-container input:focus{outline:none}div.input-container input:focus+.placeholder{color:var(--color-1a)}div.input-container input:focus+.placeholder,div.input-container input:not(:placeholder-shown)+.placeholder{opacity:1;-webkit-transform:translateY(-1.5em) scale(0.75);transform:translateY(-1.5em) scale(0.75)}div.input-container input:disabled{background-color:var(--grey-3)}div.input-container input:disabled,div.input-container input:disabled+.placeholder{color:var(--grey-2);pointer-events:none}div.input-container .placeholder{position:absolute;top:0;left:.125em;font-size:.4em;opacity:.7;line-height:2.5em;pointer-events:none;-webkit-transform-origin:top left;transform-origin:top left;-webkit-transition:.2s;transition:.2s}div.input-container .hover{position:absolute;bottom:0;left:0;width:100%;height:.05em;background-color:var(--white);opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s;pointer-events:none}div.input-container::after{content:'';position:absolute;left:0;right:0;bottom:0;height:.05em;background-color:var(--color-1b);-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:300ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:300ms cubic-bezier(0, 0, 0.2, 1) 0ms;pointer-events:none}div.input-container.focused::after{-webkit-transform:scaleX(1);transform:scaleX(1)}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <div class="input-container">
                <input>
                <span class="placeholder"></span>
                <span class="hover"></span>
            </div>
        `

        return template
    }

    // TODO
    validation() {
        switch (true) {
            case (this.required && this.value === ''): {
                this.internals_.setValidity({valueMissing: true}, 'Please fill out this field', this.Input)
                return
            }
            case (this.hasAttribute('minlength') && this.hasAttribute('maxlength')): {
                if (
                    this.type === 'text'     || this.type === 'search' || this.type === 'email' ||
                    this.type === 'password' || this.type === 'url'    || this.type === 'tel'   ||
                    this.type === 'number'
                ) {

                }
                break
            }
            default: {}
        }

        this.internals_.setValidity({})
    }

    determineColors() {
        if (!this.hasAttribute('input_color')) {
            const color = this.defaultInputColor

            return [
                `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                `hsl(${color.h}, ${color.s}%, ${color.l - 24}%)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .035)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .07)`
            ]
        }

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

        return [
            `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            `hsl(${hue}, ${saturation}%, ${lightness - 24}%)`,
            `hsla(${hue}, ${saturation}%, ${lightness}%, .035)`,
            `hsla(${hue}, ${saturation}%, ${lightness}%, .07)`
        ]
    }

    updateType() {
        if (!this.hasAttribute('type')) {
            this.Input.removeAttribute('type')
            return
        }

        const type = this.getAttribute('type')

        this.supportedTypes.indexOf(type) > -1
            ? this.Input.setAttribute('type', type)
            : this.Input.setAttribute('type', 'text')
    }

    updateSizeColor() {
        const [color1a, color1b, color2a, color2b] = this.determineColors()

        this.Style.innerHTML = this.css
            .replace('[[input_size]]', this.getAttribute('input_size') || this.defaultInputSize)
            .replace('[[color_1a]]', color1a)
            .replace('[[color_1b]]', color1b)
            .replace('[[color_2a]]', color2a)
            .replace('[[color_2b]]', color2b)
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
            case 'type': {
                this.updateType()
                break
            }
            case 'value': {
                this.hasAttribute('value')
                    ? this.Input.setAttribute('value', newValue)
                    : this.Input.removeAttribute('value')
                break
            }
            case 'readonly': {
                this.hasAttribute('readonly')
                    ? this.Input.setAttribute('readonly', '')
                    : this.Input.removeAttribute('readonly')
                break
            }
            case 'maxlength': {
                this.hasAttribute('maxlength')
                    ? this.Input.setAttribute('maxlength', newValue)
                    : this.Input.removeAttribute('maxlength')
                break
            }
            case 'minlength': {
                this.hasAttribute('minlength')
                    ? this.Input.setAttribute('minlength', newValue)
                    : this.Input.removeAttribute('minlength')
                break
            }
            case 'max': {
                this.hasAttribute('max')
                    ? this.Input.setAttribute('max', newValue)
                    : this.Input.removeAttribute('max')
                break
            }
            case 'min': {
                this.hasAttribute('min')
                    ? this.Input.setAttribute('min', newValue)
                    : this.Input.removeAttribute('min')
                break
            }
            case 'multiple': {
                this.hasAttribute('multiple')
                    ? this.Input.setAttribute('multiple', '')
                    : this.Input.removeAttribute('multiple')
                break
            }
            case 'pattern': {
                this.hasAttribute('pattern')
                    ? this.Input.setAttribute('pattern', newValue)
                    : this.Input.removeAttribute('pattern')
                break
            }
            case 'title': {
                this.hasAttribute('title')
                    ? this.Input.setAttribute('title', newValue)
                    : this.Input.removeAttribute('title')
                break
            }
            case 'placeholder': {
                if (this.hasAttribute('placeholder')) {
                    this.Input.setAttribute('placeholder', newValue)
                    this.Placeholder.textContent = newValue
                }
                else {
                    this.Input.removeAttribute('placeholder')
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
                    : this.Input.removeAttribute('step')
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

/**
 *  TODO Validation
 ** [maxlength, minlength] <==> [text, search, email, password, url, tel, number]
 ** [max, min, step]       <==> [number, month, week, date, datetime-local, time]
 ** [pattern]              <==> [text, search, email, password, url, tel]
 */

// TODO These types are not supported. Default to text
// button - Use a regular button[type="button"]
// checkbox - Use rwc-checkbox or rwc-switch
// color - // TODO
// file - Use rwc-inputfile
// hidden - Just use a normal hidden input
// image - Use a regular button and set a background-image
// radio - // TODO
// range - // TODO
// reset - Use a regular button[type="reset"]
// submit - Use a regular button[type="submit"]

// TODO datalists don't work in web components. Will have to create a InputList web component