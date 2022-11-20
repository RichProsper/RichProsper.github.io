class RWC_HamburgerMenuBtn extends HTMLElement {
    // TODO
    static get observedAttributes() {
        return []
    }

    constructor() {
        super()
        this.init()
    }
    
    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.HamburgerMenuBtn = this.shadowRoot.querySelector('.hamburger-menu-btn')
        this.Style = this.shadowRoot.querySelector('style')
    }

    getTemplate() {
        this.defaultAriaControls = 'some-content'
        this.Title = 'Toggle something'
        this.css = ``
        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <button
                type="button"
                class="hamburger-menu-btn"
                aria-controls="some-content"
                aria-expanded="false"
                aria-label="Toggle something"
                title="Toggle something"
            >
                <svg class="hamburger" viewBox="0 0 100 100" width="250">
                    <rect class="line top" width="80" height="10" x="10" y="17.5" rx="5"></rect>
                    <rect class="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
                    <rect class="line bottom" width="80" height="10" x="10" y="72.5" rx="5"></rect>
                </svg>
            </button>
        `

        return template
    }

    connectedCallback() {
    }

    // This life cycle hook is ran before connectedCallback()
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('rwc-hamburger-menu-btn', RWC_HamburgerMenuBtn)