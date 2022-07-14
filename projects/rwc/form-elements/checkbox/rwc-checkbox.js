class RWC_Checkbox extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'value', 'required', 'is_indeterminate', 'checkbox_size', 'checkbox_color'
        ]        
    }

    get value()     { return this.getAttribute('value') }
    set value(v)    { this.setAttribute('value', v)     }
    get checked()   { return this.Input.checked         }
    set checked(c)  { this.Input.checked = c            }
    get required()  { return this.Input.required        }
    set required(r) { r ? this.setAttribute('required', '') : this.removeAttribute('required') }
    get disabled()  { return this.Input.disabled        }
    set disabled(d) { d ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') }

    get isIndeterminate()   { return this.hasAttribute('is_indeterminate') }
    set isIndeterminate(iI) {
        iI ? this.setAttribute('is_indeterminate', '') : this.removeAttribute('is_indeterminate')
    }

    get checkboxSize()   { return this.getAttribute('checkbox_size') || '' }
    set checkboxSize(cS) {
        cS ? this.setAttribute('checkbox_size', cS) : this.removeAttribute('checkbox_size')
    }

    get checkboxColor()   { return this.getAttribute('checkbox_color') || '' }
    set checkboxColor(cC) {
        cC ? this.setAttribute('checkbox_color', cC) : this.removeAttribute('checkbox_color')
    }

    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity  = () => this.internals_.checkValidity()
    reportValidity = () => this.internals_.reportValidity()

    setFormValue() {
        this.checked
            ? this.internals_.setFormValue(this.getAttribute('value'))
            : this.internals_.setFormValue(null)
    }

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        this.Checkbox.className = disabled ? 'checkbox disabled' : 'checkbox'
        this.Input.disabled = disabled
    }

    /**
     * This is called when the form is reset
     */
    formResetCallback() {
        this.Input.checked = this.hasAttribute('checked')
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

        this.Checkbox = this.shadowRoot.querySelector('label.checkbox')
        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.Wrapper = this.shadowRoot.querySelector('span.wrapper')
        this.SvgSquare = this.shadowRoot.querySelector('svg.square')
        this.SvgChecked = this.shadowRoot.querySelector('svg.checked')
        this.SvgIndeterminate = this.shadowRoot.querySelector('svg.indeterminate')
    }

    getTemplate() {
        this.defaultCheckboxSize = '2.2rem'
        this.defaultCheckboxColor = '207, 90%, 77%'
        this.defaultValue = 'on'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.checkbox{--checkbox-size: [[checkbox_size]];--checkbox-color: [[checkbox_color]];--hover: [[hover]];--hue-white: 0, 0%;--grey-1: hsl(var(--hue-white), 50%);--grey-2: hsl(var(--hue-white), 30%);color-scheme:dark;position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;font-size:var(--checkbox-size);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox *,.checkbox *::before,.checkbox *::after{-webkit-box-sizing:inherit;box-sizing:inherit}.checkbox.disabled{cursor:default;pointer-events:none;color:var(--grey-1)}.checkbox .wrapper{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative;padding:.409em;border-radius:50%;-webkit-transition:.2s;transition:.2s}.checkbox .wrapper input{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1}.checkbox .wrapper input:checked ~ svg.checked{display:block}.checkbox .wrapper input:not(:checked) ~ svg.square{display:block}.checkbox .wrapper input:disabled{cursor:default}.checkbox .wrapper input:disabled ~ svg{color:var(--grey-2)}.checkbox .wrapper svg{width:1em;height:1em;fill:currentColor;display:none}.checkbox .wrapper svg.checked,.checkbox .wrapper svg.indeterminate{color:var(--checkbox-color)}.checkbox .wrapper:hover,.checkbox .wrapper.focus{background-color:var(--hover)}.checkbox .wrapper[is_indeterminate] input ~ svg.square,.checkbox .wrapper[is_indeterminate] input ~ svg.checked{display:none}.checkbox .wrapper[is_indeterminate] input ~ svg.indeterminate{display:block}.checkbox .label{font-size:.727em}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <label class="checkbox">
                <span class="wrapper">
                    <input type="checkbox">
                    <svg class="square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
                    <svg class="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/></svg>
                    <svg class="indeterminate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM136 232C122.7 232 112 242.7 112 256C112 269.3 122.7 280 136 280H312C325.3 280 336 269.3 336 256C336 242.7 325.3 232 312 232H136z"/></svg>
                </span>
                <slot name="label" class="label"></slot>
            </label>
        `

        return template
    }

    validation() {
        if (this.required && !this.checked) {
            this.internals_.setValidity({valueMissing: true}, 'Please check this box if you want to proceed', this.Input)
            return
        }

        this.internals_.setValidity({})
    }

    addOpacityToColor() {
        if (!this.hasAttribute('checkbox_color')) return false

        const div = document.createElement('div')
        div.style.color = this.getAttribute('checkbox_color')
        document.body.appendChild(div)

        const rgbColor = window.getComputedStyle(div).getPropertyValue('color').replace(/[rgba()]/g, '').split(', ')
        document.body.removeChild(div)

        if (rgbColor.length === 4) {
            return [
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${rgbColor[3]})`,
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, .1)`
            ]
        }
        else {
            return [
                `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`,
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, .1)`
            ]
        }
    }

    updateSizeColor() {
        const colors = this.addOpacityToColor()
        let css = this.css.replace('[[checkbox_size]]', this.getAttribute('checkbox_size') || this.defaultCheckboxSize)

        if (!colors) {
            css = css.replace('[[checkbox_color]]', 'hsl(' + this.defaultCheckboxColor + ')')
            css = css.replace('[[hover]]', 'hsl(' + this.defaultCheckboxColor + ', .1)')
        }
        else {
            css = css.replace('[[checkbox_color]]', colors[0])
            css = css.replace('[[hover]]', colors[1])
        }

        this.Style.innerHTML = css
    }
    
    connectedCallback() {
        this.Input.checked = this.hasAttribute('checked')
        if (!this.getAttribute('value')) this.setAttribute('value', this.defaultValue)

        this.updateSizeColor()
        this.setFormValue()
        this.validation()
        
        this.Input.addEventListener('focus', () => this.Wrapper.classList.add('focus'))
        this.Input.addEventListener('blur', () => this.Wrapper.classList.remove('focus'))
        this.Input.addEventListener('change', () => {
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
                this.hasAttribute('required')
                    ? this.Input.setAttribute('required', '')
                    : this.Input.removeAttribute('required')
                break
            }
            case 'is_indeterminate': {
                this.hasAttribute('is_indeterminate')
                    ? this.Wrapper.setAttribute('is_indeterminate', '')
                    : this.Wrapper.removeAttribute('is_indeterminate')
                break
            }
            case 'checkbox_size':
            case 'checkbox_color': {
                this.updateSizeColor()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-checkbox', RWC_Checkbox)