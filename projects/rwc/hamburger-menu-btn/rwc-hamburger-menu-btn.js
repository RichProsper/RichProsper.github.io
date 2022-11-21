class RWC_HamburgerMenuBtn extends HTMLElement {
    // TODO
    static get observedAttributes() {
        return [
            'aria-controls', 'title', 'color', 'border-color', 'line-color', 'line-top-color', 'line-middle-color', 'line-bottom-color'
        ]
    }

    get ariaControls() { return this.getAttribute('aria-controls') || '' }
    set ariaControls(aC) {
        aC ? this.setAttribute('aria-controls', aC) : this.removeAttribute('aria-controls')
    }

    // No need to do get title() or set title(t)

    // TODO

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

    // TODO
    getTemplate() {
        this.defaultAriaControls = 'some-content'
        this.defaultTitle = 'Toggle something'
        this.defaultColor = 'black'
        this.css = ``
        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <button
                type="button"
                class="hamburger-menu-btn"
                aria-expanded="false"
            >
                <svg viewBox="0 0 100 100" width="250">
                    <rect class="line top" width="80" height="10" x="10" y="17.5" rx="5"></rect>
                    <rect class="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
                    <rect class="line bottom" width="80" height="10" x="10" y="72.5" rx="5"></rect>
                </svg>
            </button>
        `

        return template
    }

    // TODO
    updateStyles() {

    }

    connectedCallback() {
        if (!this.hasAttribute('aria-controls')) this.HamburgerMenuBtn.setAttribute('aria-controls', this.defaultAriaControls)
        if (!this.hasAttribute('title')) this.HamburgerMenuBtn.ariaLabel = this.defaultTitle
        if (!this.hasAttribute('title')) this.HamburgerMenuBtn.title = this.defaultTitle
    }

    // TODO
    // This life cycle hook is ran before connectedCallback()
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'aria-controls': {
                newValue
                    ?  this.HamburgerMenuBtn.setAttribute('aria-controls', this.getAttribute('aria-controls'))
                    : this.HamburgerMenuBtn.removeAttribute('aria-controls')

                break
            }
            case 'title': {
                newValue ? (
                    this.HamburgerMenuBtn.ariaLabel = this.getAttribute('title'),
                    this.HamburgerMenuBtn.title = this.getAttribute('title')
                ) : (
                    this.HamburgerMenuBtn.removeAttribute('aria-label'),
                    this.HamburgerMenuBtn.removeAttribute('title')
                )

                break
            }
            default: {}
        }
    }
}

window.customElements.define('rwc-hamburger-menu-btn', RWC_HamburgerMenuBtn)