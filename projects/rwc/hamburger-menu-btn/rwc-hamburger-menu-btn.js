class RWC_HamburgerMenuBtn extends HTMLElement {
    // TODO
    static get observedAttributes() {
        return [
            'aria-controls', 'title', 'color', 'border-color', 'line-color', 'line-top-color', 'line-middle-color', 'line-bottom-color', 'color-expanded', 'border-color-expanded', 'line-color-expanded', 'line-top-color-expanded', 'line-middle-color-expanded', 'line-bottom-color-expanded'
        ]
    }

    get ariaControls()   { return this.getAttribute('aria-controls') || '' }
    set ariaControls(aC) {
        aC ? this.setAttribute('aria-controls', aC) : this.removeAttribute('aria-controls')
    }

    // No need to do get title() or set title(t)

    get color()  { return this.getAttribute('color') || '' }
    set color(c) { c ? this.setAttribute('color', c) : this.removeAttribute('color') }

    get borderColor()   { return this.getAttribute('border-color') || '' }
    set borderColor(bC) {
        bC ? this.setAttribute('border-color', bC) : this.removeAttribute('border-color')
    }

    get lineColor()   { return this.getAttribute('line-color') || '' }
    set lineColor(lC) {
        lC ? this.setAttribute('line-color', lC) : this.removeAttribute('line-color')
    }

    get lineTopColor()    { return this.getAttribute('line-top-color') || '' }
    set lineTopColor(lTC) {
        lTC ? this.setAttribute('line-top-color', lTC) : this.removeAttribute('line-top-color')
    }

    get lineMiddleColor()    { return this.getAttribute('line-middle-color') || '' }
    set lineMiddleColor(lMC) {
        lMC ? this.setAttribute('line-middle-color', lMC) : this.removeAttribute('line-middle-color')
    }

    get lineBottomColor()   { return this.getAttribute('line-bottom-color') || '' }
    set lineBottomColor(lBC) {
        lBC ? this.setAttribute('line-bottom-color', lBC) : this.removeAttribute('line-bottom-color')
    }

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