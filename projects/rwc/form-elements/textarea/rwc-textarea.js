class RWC_Textarea extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'rows', 'cols', 'dirname', 'minlength', 'maxlength', 'placeholder', 'readonly',
            'required', 'wrap', 'resize', 'textarea_size', 'textarea_color'
        ]        
    }

    get value()  { return this.Textarea.value }
    set value(v) {
        this.Textarea.value = v
        this.setFormValue()
        this.validation()
    }

    get rows()  { return this.Textarea.rows }
    set rows(r) { r ? this.setAttribute('rows', r) : this.removeAttribute('rows') }
    get cols()  { return this.Textarea.cols }
    set cols(c) { c ? this.setAttribute('cols', c) : this.removeAttribute('cols') }

    get dirName()   { return this.Textarea.dirName }
    set dirName(dN) { dN ? this.setAttribute('dirname', dN) : this.removeAttribute('dirname') }

    get disabled()  { return this.Textarea.disabled }
    set disabled(d) { d ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') }

    get minLength()   { return this.Textarea.minLength }
    set minLength(mL) {
        mL ? this.setAttribute('minlength', mL) : this.removeAttribute('minlength')
    }
    get maxLength()   { return this.Textarea.maxLength }
    set maxLength(mL) {
        mL ? this.setAttribute('maxlength', mL) : this.removeAttribute('maxlength')
    }

    get placeholder()  { return this.Textarea.placeholder }
    set placeholder(p) {
        p ? this.setAttribute('placeholder', p) : this.removeAttribute('placeholder')
    }

    get readOnly()   { return this.Textarea.readOnly }
    set readOnly(rO) { rO ? this.setAttribute('readonly', '') : this.removeAttribute('readonly') }

    get required()  { return this.Textarea.required }
    set required(r) { r ? this.setAttribute('required', '') : this.removeAttribute('required') }

    get wrap()  { return this.Textarea.wrap }
    set wrap(w) { w ? this.setAttribute('wrap', w) : this.removeAttribute('wrap') }

    get resize()  { return this.getAttribute('resize') || '' }
    set resize(r) { r ? this.setAttribute('resize', r) : this.removeAttribute('resize') }

    get textareaSize()   { return this.getAttribute('textarea_size') || '' }
    set textareaSize(tS) {
        tS ? this.setAttribute('textarea_size', tS) : this.removeAttribute('textarea_size')
    }

    get textareaColor()   { return this.getAttribute('textarea_color') || '' }
    set textareaColor(tC) {
        tC ? this.setAttribute('textarea_color', tC) : this.removeAttribute('textarea_color')
    }

    get form()              { return this.internals_.form            }
    get name()              { return this.getAttribute('name')       }
    get validity()          { return this.Textarea.validity          }
    get validationMessage() { return this.Textarea.validationMessage }
    get willValidate()      { return this.Textarea.willValidate      }

    checkValidity  = () => this.internals_.checkValidity()
    reportValidity = () => this.internals_.reportValidity()
    setFormValue   = () => this.internals_.setFormValue(this.value)

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        this.Textarea.disabled = disabled
    }

    /**
     * This is called when the form is reset
     */
    formResetCallback() {
        this.Textarea.value = this.Textarea.textContent
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

        this.TextareaContainer = this.shadowRoot.querySelector('div.textarea-container')
        this.Style = this.shadowRoot.querySelector('style')
        this.Textarea = this.shadowRoot.querySelector('textarea')
        this.Placeholder = this.shadowRoot.querySelector('span.placeholder')
    }

    getTemplate() {
        this.defaultTextareaSize = '1.6rem'
        this.defaultTextareaColor = { h: 207, s: 90, l: 77 }
        this.defaultResize = 'both'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}div.textarea-container{--textarea-size: [[textarea_size]];--resize: [[resize]];--hue-white: 0, 0%;--white: hsl(var(--hue-white), 100%);--grey-1: hsl(var(--hue-white), 87%);--grey-2: hsl(var(--hue-white), 50%);--grey-3: hsla(var(--hue-white), 100%, .035);--color-1a: [[color_1a]];--color-1b: [[color_1b]];--color-2a: [[color_2a]];--color-2b: [[color_2b]];position:relative;color-scheme:dark;font-size:var(--textarea-size);display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-sizing:border-box;box-sizing:border-box}div.textarea-container *,div.textarea-container *::before,div.textarea-container *::after{-webkit-box-sizing:inherit;box-sizing:inherit}div.textarea-container textarea{position:relative;height:100%;display:block;width:100%;background-color:var(--color-2a);border:none;border-bottom:0.0625em solid var(--grey-1);color:var(--grey-1);font-size:1em;font-family:inherit;padding:0 .3125em;resize:var(--resize);-webkit-tap-highlight-color:transparent;-webkit-transition:background-color .2s;transition:background-color .2s}div.textarea-container textarea::-webkit-input-placeholder{color:transparent;-webkit-user-select:none;user-select:none}div.textarea-container textarea:-ms-input-placeholder{color:transparent;-ms-user-select:none;user-select:none}div.textarea-container textarea::-ms-input-placeholder{color:transparent;-ms-user-select:none;user-select:none}div.textarea-container textarea::placeholder{color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.textarea-container textarea:hover{background-color:var(--color-2b)}div.textarea-container textarea:hover ~ .hover{opacity:1}div.textarea-container textarea:focus{outline:none}div.textarea-container textarea:focus+.placeholder{color:var(--color-1a)}div.textarea-container textarea:focus+.placeholder,div.textarea-container textarea:not(:placeholder-shown)+.placeholder{opacity:1;-webkit-transform:translateY(-1.5em) scale(0.75);transform:translateY(-1.5em) scale(0.75)}div.textarea-container textarea:disabled{background-color:var(--grey-3)}div.textarea-container textarea:disabled,div.textarea-container textarea:disabled+.placeholder{color:var(--grey-2);pointer-events:none}div.textarea-container textarea:disabled ~ .hover{opacity:0}div.textarea-container .placeholder{position:absolute;top:0;left:.3125em;opacity:.7;line-height:2.5em;pointer-events:none;-webkit-transform-origin:top left;transform-origin:top left;-webkit-transition:.2s;transition:.2s}div.textarea-container .hover{position:absolute;bottom:0;left:0;width:100%;height:.125em;background-color:var(--white);opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s;pointer-events:none}div.textarea-container::after{content:'';position:absolute;left:0;right:0;bottom:0;height:.125em;background-color:var(--color-1b);-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:300ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:300ms cubic-bezier(0, 0, 0.2, 1) 0ms;pointer-events:none}div.textarea-container.focused::after{-webkit-transform:scaleX(1);transform:scaleX(1)}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <div class="textarea-container">
                <textarea></textarea>
                <span class="placeholder"></span>
                <span class="hover"></span>
            </div>
        `

        return template
    }

    validation() {
        this.internals_.setValidity(this.validity, this.validationMessage, this.Textarea)
    }

    determineColors() {
        if (!this.hasAttribute('textarea_color')) {
            const color = this.defaultTextareaColor

            return [
                `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                `hsl(${color.h}, ${color.s}%, ${color.l - 24}%)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .035)`,
                `hsla(${color.h}, ${color.s}%, ${color.l}%, .07)`
            ]
        }

        const div = document.createElement('div')
        div.style.color = this.getAttribute('textarea_color')
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

    updateStyles() {
        const [color1a, color1b, color2a, color2b] = this.determineColors()

        this.Style.innerHTML = this.css
            .replace(
                '[[textarea_size]]', this.getAttribute('textarea_size') || this.defaultTextareaColor
            )
            .replace('[[color_1a]]', color1a)
            .replace('[[color_1b]]', color1b)
            .replace('[[color_2a]]', color2a)
            .replace('[[color_2b]]', color2b)
            .replace('[[resize]]', this.getAttribute('resize') || this.defaultResize)
    }

    onDOMSubtreeModified() {
        this.Textarea.textContent = this.textContent
        this.setFormValue()
        this.validation()
    }
    
    connectedCallback() {
        this.onDOMSubtreeModified()
        this.updateStyles()
                
        this.addEventListener('DOMSubtreeModified', () => this.onDOMSubtreeModified())
        this.Textarea.addEventListener('focus', () => this.TextareaContainer.classList.add('focused'))
        this.Textarea.addEventListener('blur', () => this.TextareaContainer.classList.remove('focused'))
        this.Textarea.addEventListener('input', () => {
            this.setFormValue()
            this.validation()
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'rows': {
                this.hasAttribute('rows')
                    ? this.Textarea.setAttribute('rows', newValue)
                    : this.Textarea.removeAttribute('rows')
                break
            }
            case 'cols': {
                this.hasAttribute('cols')
                    ? this.Textarea.setAttribute('cols', newValue)
                    : this.Textarea.removeAttribute('cols')
                break
            }
            case 'dirname': {
                this.hasAttribute('dirname')
                    ? this.Textarea.setAttribute('dirname', newValue)
                    : this.Textarea.removeAttribute('dirname')
                break
            }
            case 'minlength': {
                this.hasAttribute('minlength')
                    ? this.Textarea.setAttribute('minlength', newValue)
                    : this.Textarea.removeAttribute('minlength')
                break
            }
            case 'maxlength': {
                this.hasAttribute('maxlength')
                    ? this.Textarea.setAttribute('maxlength', newValue)
                    : this.Textarea.removeAttribute('maxlength')
                break
            }
            case 'placeholder': {
                if (this.hasAttribute('placeholder')) {
                    this.Textarea.setAttribute('placeholder', newValue)
                    this.Placeholder.textContent = newValue
                }
                else {
                    this.Textarea.removeAttribute('placeholder')
                    this.Placeholder.textContent = null
                }
                break
            }
            case 'readonly': {
                this.hasAttribute('readonly')
                    ? this.Textarea.setAttribute('readonly', '')
                    : this.Textarea.removeAttribute('readonly')
                break
            }
            case 'required': {
                this.hasAttribute('required')
                    ? this.Textarea.setAttribute('required', '')
                    : this.Textarea.removeAttribute('required')
                break
            }
            case 'wrap': {
                this.hasAttribute('wrap')
                    ? this.Textarea.setAttribute('wrap', newValue)
                    : this.Textarea.removeAttribute('wrap')
                break
            }
            case 'title': {
                this.hasAttribute('title')
                    ? this.Textarea.setAttribute('title', newValue)
                    : this.Textarea.removeAttribute('title')
                break
            }
            case 'textarea_size':
            case 'textarea_color':
            case 'resize': {
                this.updateStyles()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-textarea', RWC_Textarea)