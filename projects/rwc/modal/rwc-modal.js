class RWC_Modal extends HTMLElement {
    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }

    getTemplate() {
        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="modal.min.css">

            <div class="modal">
                <div class="content">
                    <div class="header">
                        <h3>A Cool Heading</h3>
                        <button type="button" class="close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="body">
                        <div class="body-content">
                            <p>The Body</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        return template
    }
}

window.customElements.define('rwc-modal', RWC_Modal)