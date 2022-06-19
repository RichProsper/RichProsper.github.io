// TODO Handle 'input_size', 'music_icon_outline_color'
class RWC_InputMediaFile extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'input_size', 'title', 'disabled', 'max_file_size', 'max_files', 'multiple',
            'placeholder', 'required', 'accept', 'music_icon_outline_color'
        ]        
    }

    get files()             { return this.files_                       }
    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity()  { return this.internals_.checkValidity()  }
    reportValidity() { return this.internals_.reportValidity() }

    constructor() {
        super()
        this.internals_ = this.attachInternals()
        this.files_ = []
        this.init()
    }

    init() {
        this.setAttribute('tabindex', 0)
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))  

        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.PlaceholderDiv = this.shadowRoot.querySelector('div.placeholder')
        this.PlaceholderSpan = this.shadowRoot.querySelector('span.placeholder')
        this.ModalOpener = this.shadowRoot.querySelector('button')
    }

    getTemplate() {
        this.defaultInputSize = '1.6rem'
        this.defaultTitle = 'Only image, audio, or video files allowed'
        this.defaultPlaceholder = 'Choose a media file...'
        this.defaultMaxFileSize = 5242880 //5,242,880 bytes = 5MB
        this.defaultAccept = ['image/*']
        this.Extensions = {
            image: [
                'image/*', '.tif', '.pjp', '.xbm', '.jxl', '.svgz', '.jpg', '.jpeg', '.ico',
                '.tiff', '.gif', '.svg', '.jfif', '.webp', '.png', '.bmp', '.pjpeg', '.avif'
            ],
            audio: [
                'audio/*', '.opus', '.flac', '.webm', '.weba', '.wav', '.ogg', '.m4a', '.mp3',
                '.oga', '.mid', '.amr', '.aiff', '.wma', '.au', '.aac'
            ],
            video: [
                'video/*', '.ogm', '.wmv', '.mpg', '.webm', '.ogv', '.mov', '.asx', '.mpeg',
                '.mp4', '.m4v', '.avi'
            ]
        }
        this.defaultMusicIconOutlineColor = 'hsl(var(--hue-white), 13%)'
        this.css = ``

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <div class="inputmediafile">
                <label>
                    <input type="file">
                    <div class="placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z"/></svg>
                        <span class="placeholder"></span>
                    </div>
                </label>
                <button type="button" title="Click to preview selected media file(s)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 432c0 8.836-7.164 16-16 16H176c-8.838 0-16-7.164-16-16L160 128H48C21.49 128 .0003 149.5 .0003 176v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48L512 384h-160L352 432zM104 439c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V439zM104 335c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V335zM104 231c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30C56 196 60.03 192 65 192h30c4.969 0 9 4.031 9 9V231zM408 409c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9v30c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9V409zM591.1 0H239.1C213.5 0 191.1 21.49 191.1 48v256c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-256C640 21.49 618.5 0 591.1 0zM303.1 64c17.68 0 32 14.33 32 32s-14.32 32-32 32C286.3 128 271.1 113.7 271.1 96S286.3 64 303.1 64zM574.1 279.6C571.3 284.8 565.9 288 560 288H271.1C265.1 288 260.5 284.6 257.7 279.3C255 273.9 255.5 267.4 259.1 262.6l70-96C332.1 162.4 336.9 160 341.1 160c5.11 0 9.914 2.441 12.93 6.574l22.35 30.66l62.74-94.11C442.1 98.67 447.1 96 453.3 96c5.348 0 10.34 2.672 13.31 7.125l106.7 160C576.6 268 576.9 274.3 574.1 279.6z"/></svg>
                    <svg class="music" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z"/></svg>
                </button>
            </div>
        `

        return template
    }

    setupModal() {
        this.Modal = document.createElement('rwc-modal')
        this.Modal.setAttribute('modal_outline_color', '#2be')
        this.Modal.innerHTML = `
            <style>
                [rwc_modal][slot="body-content"] {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: distribute;
                    justify-content: space-around;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                }
                [rwc_modal][slot="body-content"] .media-container {
                    margin-right: 1em;
                    margin-bottom: 1em;
                }
            </style>
            <span slot="heading">${this.selectedPlaceholder}</span>
            <div rwc_modal slot="body-content"></div>
        `
        document.body.appendChild(this.Modal)

        this.ModalOpener.addEventListener('click', () => {
            this.Modal.shadowRoot.querySelector('.modal').classList.add('open')
        })
    }

    determineSelectedAccept() {
        if (!this.hasAttribute('accept')) return this.defaultAccept

        const accept = this.getAttribute('accept').replace(/ /g, '').split(',')
        const extensions = this.Extensions.image.concat(this.Extensions.audio, this.Extensions.video)
        const selectedAccept = []

        accept.forEach(accpt => {
            if (extensions.indexOf(accpt) > -1) selectedAccept.push(accpt)
        })

        if (selectedAccept.length === 0) return this.defaultAccept

        return selectedAccept
    }

    updateElement() {
        this.hasAttribute('multiple') ? this.Input.setAttribute('multiple', '') : this.Input.removeAttribute('multiple')
        this.hasAttribute('required') ? this.Input.setAttribute('required', '') : this.Input.removeAttribute('required')
        
        this.PlaceholderDiv.title = this.getAttribute('title') || this.defaultTitle
        this.selectedPlaceholder = this.getAttribute('placeholder') || this.defaultPlaceholder
        this.PlaceholderSpan.textContent = this.selectedPlaceholder

        this.Input.setAttribute('accept', this.determineSelectedAccept())
    }

    setPreview() {
        const ModalBody = this.Modal.querySelector('[slot="body-content"]')
        ModalBody.innerHTML = null

        for (const file of this.files_) {
            let ext = file.name.toLowerCase().split('.')
            ext = '.' + ext[ext.length - 1]
    
            switch (true) {
                case (this.Extensions.image.indexOf(ext) > -1): {
                    ModalBody.innerHTML += `
                        <div class="media-container">
                            <h4 class="media-title">${file.name}</h4>
                            <img src="${URL.createObjectURL(file)}" alt="${file.name}">
                        </div>
                    `
                    break
                }
                case (this.Extensions.audio.indexOf(ext) > -1): {
                    ModalBody.innerHTML += `
                        <div class="media-container">
                            <h4 class="media-title">${file.name}</h4>
                            <audio controls>
                                <source src="${URL.createObjectURL(file)}" type="${file.type}">
                            </audio>
                        </div>
                    `
                    break
                }
                case (this.Extensions.video.indexOf(ext) > -1): {
                    ModalBody.innerHTML += `
                        <div class="media-container">
                            <h4 class="media-title">${file.name}</h4>
                            <video controls>
                                <source src="${URL.createObjectURL(file)}" type="${file.type}">
                            </video>
                        </div>
                    `
                    break
                }
                default: {}
            }
        }
    }

    validation() {
        switch (true) {
            case (this.hasAttribute('required') && this.files_.length === 0): {
                this.internals_.setValidity({valueMissing: true}, 'Please select a media file')
                return
            }
            case (this.hasAttribute('max_file_size')): {
                const maxFileSize = +this.getAttribute('max_file_size')

                for (const file of this.files_) {
                    if (Number.isInteger(maxFileSize) && file.size > maxFileSize) {
                        this.internals_.setValidity({tooLong: true}, `One or more of your selected media files exceeds ${maxFileSize} bytes`)
                        return
                    }
                }

                break
            }
            case (this.hasAttribute('multiple')): {
                switch (true) {
                    case (this.hasAttribute('num_files')): {
                        const numFiles = +this.getAttribute('num_files')

                        if (Number.isInteger(numFiles) && numFiles > 0 && this.files_.length != numFiles) {
                            this.internals_.setValidity({customError: true}, `You need to select exactly ${numFiles} media files`)
                            return
                        }

                        break
                    }
                    case (this.hasAttribute('min_files') && this.hasAttribute('max_files')): {
                        const minFiles = +this.getAttribute('min_files')
                        const maxFiles = +this.getAttribute('max_files')

                        if (Number.isInteger(minFiles) && Number.isInteger(maxFiles) && minFiles > 0 && minFiles < maxFiles && (this.files_.length < minFiles || this.files_.length > maxFiles)) {
                            this.internals_.setValidity({rangeUnderflow: true}, `Please select atleast ${minFiles} and no more than ${maxFiles} media files`)
                            return
                        }

                        break
                    }
                    case (this.hasAttribute('min_files')): {
                        const minFiles = +this.getAttribute('min_files')

                        if (Number.isInteger(minFiles) && minFiles > 0 && this.files_.length < minFiles) {
                            this.internals_.setValidity({rangeUnderflow: true}, `Please select atleast ${minFiles} media files`)
                            return
                        }

                        break
                    }
                    case (this.hasAttribute('max_files')): {
                        const maxFiles = +this.getAttribute('max_files')

                        if (Number.isInteger(maxFiles) && maxFiles > 0 && this.files_.length > maxFiles) {
                            this.internals_.setValidity({rangeOverflow: true}, `Please select no more than ${maxFiles} media files`)
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

    setFormValueHelper() {
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

    resetInput() {
        const ModalHeading = this.Modal.querySelector('[slot="heading"]')
        const ModalBody = this.Modal.querySelector('[slot="body-content"]')

        this.PlaceholderSpan.textContent = ` ${this.selectedPlaceholder}`
        ModalHeading.textContent = this.selectedPlaceholder
        ModalBody.innerHTML = null
    }

    connectedCallback() {
        this.setupModal()
        this.updateElement()
        this.validation()

        this.Input.addEventListener('focus', () => this.PlaceholderDiv.classList.add('focused'))
        this.Input.addEventListener('blur', () => this.PlaceholderDiv.classList.remove('focused'))
        this.Input.addEventListener('change', e => {
            const ModalHeading = this.Modal.querySelector('[slot="heading"]')

            this.files_ = e.target.files
            this.setFormValueHelper()
            this.validation()

            switch (this.files_.length) {
                case 0: {
                    this.resetInput()
                    break
                }
                case 1: {
                    this.PlaceholderSpan.textContent = ` ${this.files_[0].name}`
                    ModalHeading.textContent = this.files_[0].name
                    this.setPreview()
                    break
                }
                default: {
                    if (this.files_.length < 9) {
                        this.PlaceholderSpan.textContent = ` ${this.files_.length} media files selected`
                        ModalHeading.textContent = `${this.files_.length} media files selected`
                    }
                    else {
                        this.PlaceholderSpan.textContent = ' 9+ media files selected'
                        ModalHeading.textContent = '9+ media files selected'
                    }
                    this.setPreview()
                }
            }
        })
    }

    attributeChangedCallback() {
        this.updateElement()
    }

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        if (disabled) {
            this.Input.setAttribute('disabled', '')
            this.ModalOpener.setAttribute('disabled', '')
        } 
        else {
            this.Input.removeAttribute('disabled')
            this.ModalOpener.removeAttribute('disabled')
        }
    }

    formResetCallback() {
        this.files_ = []
        this.setFormValueHelper()
        this.resetInput()
        this.validation()
    }
}

window.customElements.define('rwc-inputmediafile', RWC_InputMediaFile)