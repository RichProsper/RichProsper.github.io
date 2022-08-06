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
    
    get LabelText()  { return this.getAttribute('label_text') || '' }
    set LabelText(p) { p ? this.setAttribute('label_text', p) : this.removeAttribute('label_text') }

    get selectSize()   { return this.getAttribute('select_size') || '' }
    set selectSize(sS) {
        sS ? this.setAttribute('select_size', sS) : this.removeAttribute('select_size')
    }

    get selectColor()   { return this.getAttribute('select_color') || '' }
    set selectColor(sC) {
        sC ? this.setAttribute('select_color', sC) : this.removeAttribute('select_color')
    }

    get form()              { return this.internals_.form            }
    get name()              { return this.getAttribute('name')       }
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
        this.LabelText = this.shadowRoot.querySelector('span.label-text')
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
}

window.customElements.define('rwc-select', RWC_Select)