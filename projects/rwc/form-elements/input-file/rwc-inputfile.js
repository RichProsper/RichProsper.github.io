class RWC_InputFile extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'input_size', 'input_color', 'title', 'max_file_size', 'num_files', 'min_files', 'max_files', 'multiple', 'placeholder', 'required', 'accept',
        ]        
    }

    // TODO input_size etc
    get files()             { return this.files_                       }
    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity  = () => this.internals_.checkValidity()
    reportValidity = () => this.internals_.reportValidity()

    setFormValue() {
        if (this.files_.length === 0) {
            this.internals_.setFormValue(null)
            this.Input.value = null
            return
        }

        const name = this.getAttribute('name')
        const fileEntries = new FormData()

        for (const file of this.files_) fileEntries.append(name, file)

        this.internals_.setFormValue(fileEntries)
    }

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        disabled ? this.Input.setAttribute('disabled', '') : this.Input.removeAttribute('disabled')
    }

    /**
     * This is called when the form is reset
     */
    formResetCallback() {
        this.files_ = []
        this.setFormValue()
        this.PlaceholderSpan.textContent = ` ${this.selectedPlaceholder}`
        this.validation()
    }

    constructor() {
        super()
        this.internals_ = this.attachInternals()
        this.files_ = []
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))  

        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.PlaceholderDiv = this.shadowRoot.querySelector('div.placeholder')
        this.PlaceholderSpan = this.shadowRoot.querySelector('span.placeholder')
    }

    getTemplate() {
        this.defaultInputSize = '1.6rem'
        this.defaultInputColor = 'hsl(207, 90%, 53%)'
        this.defaultTitle = 'Only image, audio, or video files allowed'
        this.defaultPlaceholder = 'Choose a file...'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.inputfile{--input-size: [[input_size]];--hue-white: 0, 0%;--white-1: hsl(var(--hue-white), 87%);--grey-1: hsl(var(--hue-white), 50%);--input-color: [[input_color]];position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--input-size);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.inputfile *,.inputfile *::before,.inputfile *::after{-webkit-box-sizing:inherit;box-sizing:inherit}.inputfile input{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;z-index:-1}.inputfile input:disabled+div{color:var(--grey-1);cursor:default;pointer-events:none}.inputfile input:disabled+div svg{fill:var(--grey-1)}.inputfile div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:2.5em;border:.125em solid currentColor;cursor:pointer;text-align:center;padding:0 .625em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;-webkit-transition:color .2s;transition:color .2s}.inputfile div.focused,.inputfile div:hover{color:var(--input-color)}.inputfile div.focused svg,.inputfile div:hover svg{fill:var(--input-color)}.inputfile div svg{color:inherit;width:1em;fill:currentColor;margin-right:.5em;-webkit-transition:fill .2s;transition:fill .2s}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <label class="inputfile">
                <input type="file">
                <div class="placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z"/></svg>
                    <span class="placeholder"></span>
                </div>
            </label>
        `

        return template
    }

    updateElement() {
        this.hasAttribute('multiple')
            ? this.Input.setAttribute('multiple', '')
            : this.Input.removeAttribute('multiple')

        this.hasAttribute('required')
            ? this.Input.setAttribute('required', '')
            : this.Input.removeAttribute('required')
        
        this.PlaceholderDiv.title = this.getAttribute('title') || this.defaultTitle
        this.selectedPlaceholder = this.getAttribute('placeholder') || this.defaultPlaceholder
        this.PlaceholderSpan.textContent = this.selectedPlaceholder

        this.Input.setAttribute('accept', this.getAttribute('accept'))

        this.Style.innerHTML = this.css
            .replace('[[input_size]]', this.getAttribute('input_size') || this.defaultInputSize)
            .replace('[[input_color]]', this.getAttribute('input_color') || this.defaultInputColor)

        this.validation()
    }

    validation() {
        switch (true) {
            case (this.hasAttribute('required') && this.files_.length === 0): {
                this.internals_.setValidity({valueMissing: true}, 'Please select a file', this.Input)
                return
            }
            case (this.hasAttribute('max_file_size')): {
                const maxFileSize = +this.getAttribute('max_file_size')

                for (const file of this.files_) {
                    if (Number.isInteger(maxFileSize) && file.size > maxFileSize) {
                        this.internals_.setValidity({tooLong: true}, `One or more of your selected files exceeds ${maxFileSize} bytes`, this.Input)
                        return
                    }
                }

                // No 'break' statement. This is so the other cases can get checked
            }
            case (this.hasAttribute('multiple')): {
                switch (true) {
                    case (this.hasAttribute('num_files')): {
                        const numFiles = +this.getAttribute('num_files')

                        if (Number.isInteger(numFiles) && numFiles > 0 && this.files_.length != numFiles) {
                            this.internals_.setValidity({customError: true}, `You need to select exactly ${numFiles} files`, this.Input)
                            return
                        }

                        break
                    }
                    case (this.hasAttribute('min_files') && this.hasAttribute('max_files')): {
                        const minFiles = +this.getAttribute('min_files')
                        const maxFiles = +this.getAttribute('max_files')

                        if (Number.isInteger(minFiles) && Number.isInteger(maxFiles) && minFiles > 0 && minFiles < maxFiles && (this.files_.length < minFiles || this.files_.length > maxFiles)) {
                            this.internals_.setValidity({customError: true}, `Please select atleast ${minFiles} and no more than ${maxFiles} files`, this.Input)
                            return
                        }

                        break
                    }
                    case (this.hasAttribute('min_files')): {
                        const minFiles = +this.getAttribute('min_files')

                        if (Number.isInteger(minFiles) && minFiles > 0 && this.files_.length < minFiles) {
                            this.internals_.setValidity({rangeUnderflow: true}, `Please select atleast ${minFiles} files`, this.Input)
                            return
                        }

                        break
                    }
                    case (this.hasAttribute('max_files')): {
                        const maxFiles = +this.getAttribute('max_files')

                        if (Number.isInteger(maxFiles) && maxFiles > 0 && this.files_.length > maxFiles) {
                            this.internals_.setValidity({rangeOverflow: true}, `Please select no more than ${maxFiles} files`, this.Input)
                            return
                        }

                        break
                    }
                    default: {}
                }

                break
            }
            default: {}
        }

        this.internals_.setValidity({})
    }

    connectedCallback() {
        this.updateElement()
        this.validation()

        this.Input.addEventListener('focus', () => this.PlaceholderDiv.classList.add('focused'))
        this.Input.addEventListener('blur', () => this.PlaceholderDiv.classList.remove('focused'))
        this.Input.addEventListener('change', e => {
            this.files_ = e.target.files
            this.setFormValue()
            this.validation()

            switch (this.files_.length) {
                case 0: {
                    this.PlaceholderSpan.textContent = ` ${this.selectedPlaceholder}`
                    break
                }
                case 1: {
                    this.PlaceholderSpan.textContent = ` ${this.files_[0].name}`
                    break
                }
                default: {
                    this.files_.length < 9
                        ? this.PlaceholderSpan.textContent = ` ${this.files_.length} files selected`
                        : this.PlaceholderSpan.textContent = ' 9+ files selected'
                }
            }
        })
    }

    attributeChangedCallback() {
        this.updateElement()
    }
}

window.customElements.define('rwc-inputfile', RWC_InputFile)