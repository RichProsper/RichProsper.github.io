class RWC_Modal extends HTMLElement {
    static get observedAttributes() {
        return ['modal_id', 'modal_outline_color'];
    }

    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.Modal = this.shadowRoot.querySelector('.modal')
        this.Style = this.shadowRoot.querySelector('style')
    }

    getTemplate() {
        this.defaultModalOutlineColor = 'hsl(var(--hs-1), 63%)'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.modal{--hs-1: 0, 0%;--white-1: hsl(var(--hs-1), 33%);--white-2: hsla(var(--hs-1), 10%, .75);--white-3: hsl(var(--hs-1), 10%);--white-4: hsl(var(--hs-1), 5%);--white-5: hsl(var(--hs-1), 53%);--modal-outline-color: [[modal_outline_color]];display:none;z-index:1;position:fixed;top:0;left:0;width:100%;height:100vh;background-color:var(--white-2);padding:8em 4em;-webkit-backdrop-filter:blur(0.2rem);backdrop-filter:blur(0.2rem);-webkit-box-sizing:border-box;box-sizing:border-box}.modal.open{display:block}.modal *,.modal *::before,.modal *::after{-webkit-box-sizing:inherit;box-sizing:inherit}.modal .content{background-color:var(--white-3);border-radius:1.5rem;border:0.2rem solid var(--modal-outline-color)}.modal .content .header{position:relative;height:4rem;border-bottom:0.2rem solid var(--white-1)}.modal .content .header h3{font-size:2rem;line-height:4rem;padding:0 1.5rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.modal .content .header .close{position:absolute;top:-1.5rem;right:-1.5rem;width:3rem;height:3rem;border-radius:50%;background-color:var(--white-3);border:.2rem solid;border-color:var(--modal-outline-color) var(--modal-outline-color) var(--modal-outline-color) transparent;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);cursor:pointer;color:inherit;font-weight:300;font-size:3rem;line-height:0;-webkit-transition:.2s;transition:.2s}.modal .content .header .close span{display:block;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.modal .content .header .close:hover,.modal .content .header .close:focus{color:var(--modal-outline-color)}.modal .content .body{padding-top:1.2rem;padding-bottom:1.5rem}.modal .content .body .body-content{display:block;max-height:calc(100vh - (2 * 8em) - 4rem);padding:0 1.5rem;overflow:auto}@media only screen and (min-width: 600px) and (min-height: 600px){.modal{padding:4em 8em}.modal .content .body .body-content{max-height:calc(100vh - (2 * 4em) - 4rem)}}.modal ::-webkit-scrollbar{width:15px;height:15px}.modal ::-webkit-scrollbar-track,.modal ::-webkit-scrollbar-corner{background:var(--white-4)}.modal ::-webkit-scrollbar-thumb{background:var(--white-5);border-radius:9px;border:3px solid var(--white-4)}.modal ::-webkit-scrollbar-thumb:hover{background:var(--white-5)}
        `
        const template = document.createElement('template')
        template.innerHTML = `
            <style></style>

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

    openModal = () => this.Modal.classList.add('open')

    connectedCallback() {
        this.Modal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('open')
        })

        this.shadowRoot.querySelector('.close').addEventListener('click', () => {
            this.Modal.classList.remove('open')
        })

        this.Style.innerHTML = this.css.replace('[[modal_outline_color]]', this.getAttribute('modal_outline_color') || this.defaultModalOutlineColor)
    }

    // This life cycle hook is run before connectedCallback()
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'modal_id': {
                const prevModalOpener = document.querySelector(`[for_modal="${oldValue}"]`)
                const newModalOpener = document.querySelector(`[for_modal="${newValue}"]`)

                if (prevModalOpener) prevModalOpener.removeEventListener('click', this.openModal)
                newModalOpener.addEventListener('click', this.openModal)

                break
            }
            case 'modal_outline_color': {
                this.Style.innerHTML = this.css.replace('[[modal_outline_color]]', newValue)
                break
            }
            default: {}
        }
    }
}

window.customElements.define('rwc-modal', RWC_Modal)