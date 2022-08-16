class RWC_Alert extends HTMLElement {
    static get observedAttributes() {
        return ['alert_color', 'alert_size', 'z_index']
    }

    get alertColor()   { return this.getAttribute('alert_color') || '' }
    set alertColor(aC) {
        aC ? this.setAttribute('alert_color', aC) : this.removeAttribute('alert_color')
    }

    get alertSize()   { return this.getAttribute('alert_size') || '' }
    set alertSize(aS) {
        aS ? this.setAttribute('alert_size', aS) : this.removeAttribute('alert_size')
    }

    get zIndex()   { return this.getAttribute('z_index') || '' }
    set zIndex(zI) {
        zI ? this.setAttribute('z_index', zI) : this.removeAttribute('z_index')
    }

    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.Alert = this.shadowRoot.querySelector('.alert')
        this.Style = this.shadowRoot.querySelector('style')
    }

    // TODO
    getTemplate() {
        this.defaultAlertColor = ''
        this.defaultAlertSize = ''
        this.defaultZIndex = '9999'
        this.css = ``
        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <div class="alert">
                <strong><slot name="status"></strong>
                <span><slot name="message"></span>
                <button type="button">×</button>
            </div>
        `

        return template
    }

    // TODO
    openAlert() {
        this.Alert.classList.add('open')
    }

    // TODO
    closeAlert() {
        this.Alert.classList.remove('open')
    }

    updateStyles() {
        this.Style.innerHTML = this.css
            .replace('[[alert_color]]', this.getAttribute('alert_color') || this.defaultAlertColor)
            .replace('[[alert_size]]', this.getAttribute('alert_size') || this.defaultAlertSize)
            .replace('[[z_index]]', this.getAttribute('z_index') || this.defaultZIndex)
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => this.closeAlert())
        this.updateStyles()
    }

    attributeChangedCallback() {
        this.updateStyles()
    }
}

window.customElements.define('rwc-alert', RWC_Alert)
