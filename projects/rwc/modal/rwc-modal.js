class RWC_Modal extends HTMLElement {
    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.Modal = this.shadowRoot.querySelector('.modal')
    }

    getTemplate() {
        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="modal.min.css">

            <div class="modal" aria-modal="true" role="dialog">
                <div class="content">
                    <div class="header">
                        <h3><slot name="heading" /></h3>
                        <button type="button" class="close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="body">
                        <div class="body-content">
                            <slot name="body-content" />
                        </div>
                    </div>
                </div>
            </div>
        `
        return template
    }

    connectedCallback() {
        this.Modal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('open')
        })

        this.shadowRoot.querySelector('.close').addEventListener('click', () => {
            this.Modal.classList.remove('open')
        })

        if (this.getAttribute('modal_id')) {
            const modalOpener = document.querySelector(`[modal_id="${this.getAttribute('modal_id')}"]`)
            modalOpener.addEventListener('click', () => {
                this.Modal.classList.add('open')
            })
        }

        if (this.getAttribute('modal_outline_color')) {
            this.Modal.firstElementChild.style.borderColor = this.getAttribute('modal_outline_color')
        }
    }
}

window.customElements.define('rwc-modal', RWC_Modal)