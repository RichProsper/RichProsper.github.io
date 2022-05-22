class RWC_ToTopButton extends HTMLElement {
    static get observedAttributes() {
        return ['button_color', 'button_hover_color', 'button_placement'];
    }

    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.ToTopButton = this.shadowRoot.querySelector('button')
        this.Style = this.shadowRoot.querySelector('style')
    }

    getTemplate() {
        this.defaultButtonColor = 'hsla(var(--hue), 100%, 48%, .8)'
        this.defaultButtonHoverColor = 'hsl(var(--hue), 100%, 48%)'
        this.defaultButtonPlacement = 'bottom-right'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.totopbutton{--button-height: 5rem;--hue: 339;--button-color: hsla(var(--hue), 100%, 48%, .8);--button-hover-color: hsl(var(--hue), 100%, 48%);-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;bottom:calc(var(--button-height) * .6);right:calc(var(--button-height) * .6);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:var(--button-height);height:var(--button-height);-webkit-box-shadow:0 0.3rem 0.5rem -0.1rem rgba(0,0,0,0.22),0 0.6rem 1rem 0 rgba(0,0,0,0.34),0 0.1rem 1.8rem 0 rgba(0,0,0,0.32);box-shadow:0 0.3rem 0.5rem -0.1rem rgba(0,0,0,0.22),0 0.6rem 1rem 0 rgba(0,0,0,0.34),0 0.1rem 1.8rem 0 rgba(0,0,0,0.32);background-color:var(--button-color);border-radius:50%;color:#ccc;font-size:calc(var(--button-height) * .26);opacity:0;-webkit-transform:scale(0);transform:scale(0);visibility:hidden;pointer-events:none;cursor:pointer;border:none;z-index:9999;-webkit-transition:.25s ease-out;transition:.25s ease-out}.totopbutton:hover{background-color:var(--button-hover-color);color:#fff}.totopbutton:focus{outline-offset:.5rem;outline:-webkit-focus-ring-color auto 1px}.totopbutton.sticky{opacity:1;-webkit-transform:scale(1);transform:scale(1);visibility:visible;pointer-events:unset}.totopbutton *,.totopbutton *::before,.totopbutton *::after{-webkit-box-sizing:inherit;box-sizing:inherit}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="../../../vendors/all.min.css">
            <style>${this.css}</style>

            <button type="button" class="totopbutton" title="Back to Top">
                <i class="fas fa-chevron-up"></i>
            </button>
        `

        return template
    }

    connectedCallback() {
        window.addEventListener('scroll', () => {
            this.ToTopButton.classList.toggle('sticky', window.scrollY > 100)
        })

        if (window.scrollY > 100) this.ToTopButton.classList.add('sticky')

        this.ToTopButton.addEventListener('click', () => {
            window.scroll(0, 0)
        })
    }

    // This life cycle hook is run before connectedCallback()
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'button_color': {
                

                break
            }
            case 'button_hover_color': {
                
                break
            }
            case 'button_placement': {
                
                break
            }
            default: {}
        }
    }
}

window.customElements.define('rwc-totopbutton', RWC_ToTopButton)