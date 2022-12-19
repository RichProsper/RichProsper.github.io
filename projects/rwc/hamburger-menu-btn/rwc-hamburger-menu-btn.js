class RWC_HamburgerMenuBtn extends HTMLElement {
    static get observedAttributes() {
        return [
            'aria-controls', 'title', 'background-color', 'color', 'border-color', 'line-color', 'line-top-color', 'line-middle-color', 'line-bottom-color', 'background-color-expanded', 'color-expanded', 'border-color-expanded', 'line-color-expanded', 'line-top-color-expanded', 'line-bottom-color-expanded', 'size', 'animation-style'
        ]
    }

    // #region Getters & Setters
    get ariaControls()   { return this.getAttribute('aria-controls') || '' }
    set ariaControls(aC) {
        aC ? this.setAttribute('aria-controls', aC) : this.removeAttribute('aria-controls')
    }

    // No need to do get title() or set title(t)

    get backgroundColor()   { return this.getAttribute('background-color') || '' }
    set backgroundColor(bC) {
        bC ? this.setAttribute('background-color', bC) : this.removeAttribute('background-color')
    }

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

    get backgroundColorExpanded()    { return this.getAttribute('background-color-expanded') || '' }
    set backgroundColorExpanded(bCE) {
        bCE ? this.setAttribute('background-color-expanded', bCE) : this.removeAttribute('background-color-expanded')
    }

    get colorExpanded()   { return this.getAttribute('color-expanded') || '' }
    set colorExpanded(cE) {
        cE ? this.setAttribute('color-expanded', cE) : this.removeAttribute('color-expanded')
    }

    get borderColorExpanded()    { return this.getAttribute('border-color-expanded') || '' }
    set borderColorExpanded(bCE) {
        bCE ? this.setAttribute('border-color-expanded', bCE) : this.removeAttribute('border-color-expanded')
    }

    get lineColorExpanded()    { return this.getAttribute('line-color-expanded') || '' }
    set lineColorExpanded(lCE) {
        lCE ? this.setAttribute('line-color-expanded', lCE) : this.removeAttribute('line-color-expanded')
    }

    get lineTopColorExpanded()     { return this.getAttribute('line-top-color-expanded') || '' }
    set lineTopColorExpanded(lTCE) {
        lTCE ? this.setAttribute('line-top-color-expanded', lTCE) : this.removeAttribute('line-top-color-expanded')
    }

    get lineBottomColorExpanded()     {
        return this.getAttribute('line-bottom-color-expanded') || ''
    }
    set lineBottomColorExpanded(lBCE) {
        lBCE ? this.setAttribute('line-bottom-color-expanded', lBCE) : this.removeAttribute('line-bottom-color-expanded')
    }

    get size()  { return this.getAttribute('size') || '' }
    set size(s) { s ? this.setAttribute('size', s) : this.removeAttribute('size') }

    get animationStyle()   { return this.getAttribute('animation-style') || '' }
    set animationStyle(aS) {
        aS ? this.setAttribute('animation-style', aS) : this.removeAttribute('animation-style')
    }
    // #endregion

    constructor() {
        super()
        this.init()
    }
    
    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.HamburgerMenuBtn = this.shadowRoot.querySelector('.hamburger-menu-btn')
        this.Style = this.shadowRoot.querySelector('style')
        this.SVG1 = this.shadowRoot.querySelector('.style-1')
        this.SVG2 = this.shadowRoot.querySelector('.style-2')
    }

    getTemplate() {
        this.defaultAriaControls = 'some-content'
        this.defaultTitle = 'Toggle something'
        this.defaultBackgroundColor = 'none'
        this.defaultColor = 'hsl(0 0% 87%)'
        this.defaultSize = '4rem'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.hamburger-menu-btn{--background-color: [[background-color]];--border-color: [[border-color]];--line-top-color: [[line-top-color]];--line-middle-color: [[line-middle-color]];--line-bottom-color: [[line-bottom-color]];--background-color-expanded: [[background-color-expanded]];--border-color-expanded: [[border-color-expanded]];--line-top-color-expanded: [[line-top-color-expanded]];--line-bottom-color-expanded: [[line-bottom-color-expanded]];--size: [[size]];box-sizing:border-box;display:flex;width:1em;height:1em;font-size:var(--size);border:none;background:none;background-color:var(--background-color);border-radius:.1em;border:.05em solid var(--border-color);padding:0 .1em;cursor:pointer;transition:opacity .2s,background-color .4s,border-color .4s}.hamburger-menu-btn:hover,.hamburger-menu-btn:focus{opacity:.65}.hamburger-menu-btn *,.hamburger-menu-btn *::before,.hamburger-menu-btn *::after{box-sizing:inherit}.hamburger-menu-btn[data-svg="2"]{transition:opacity .2s,background-color .5s,border-color .5s}.hamburger-menu-btn svg{width:100%;height:100%;transition:rotate .2s ease-in .2s}.hamburger-menu-btn svg.hidden{display:none}.hamburger-menu-btn svg.style-1 .line{transform-origin:center;transition:rotate .2s ease-in,y .2s ease-in .2s,opacity .1s ease-in .2s,fill .4s}.hamburger-menu-btn svg.style-1 .line.top{fill:var(--line-top-color)}.hamburger-menu-btn svg.style-1 .line.middle{fill:var(--line-middle-color)}.hamburger-menu-btn svg.style-1 .line.bottom{fill:var(--line-bottom-color)}.hamburger-menu-btn svg.style-2 .line{stroke-width:10;stroke-linecap:round;stroke-dasharray:80;stroke-dashoffset:0;transform-origin:center;transition:opacity .2s ease-in .2s,stroke .5s}.hamburger-menu-btn svg.style-2 .line.top{--rotation: 45deg;--translate: -20px 20px;stroke:var(--line-top-color)}.hamburger-menu-btn svg.style-2 .line.middle{stroke:var(--line-middle-color)}.hamburger-menu-btn svg.style-2 .line.bottom{--rotation: -45deg;--translate: -20px -20px;stroke:var(--line-bottom-color)}.hamburger-menu-btn svg.style-2.closed .line:is(.top,.bottom){-webkit-animation:open-icon .5s forwards;animation:open-icon .5s forwards}.hamburger-menu-btn[aria-expanded=true]{background-color:var(--background-color-expanded);border-color:var(--border-color-expanded)}.hamburger-menu-btn[aria-expanded=true] svg{rotate:.25turn}.hamburger-menu-btn[aria-expanded=true] svg.style-1 .line{transition:y .2s ease-in,rotate .2s ease-in .2s,opacity .1s ease-in .2s,fill .4s}.hamburger-menu-btn[aria-expanded=true] svg.style-1 .line:is(.top,.bottom){y:45}.hamburger-menu-btn[aria-expanded=true] svg.style-1 .line.top{rotate:.125turn;fill:var(--line-top-color-expanded)}.hamburger-menu-btn[aria-expanded=true] svg.style-1 .line.middle{opacity:0}.hamburger-menu-btn[aria-expanded=true] svg.style-1 .line.bottom{rotate:-0.125turn;fill:var(--line-bottom-color-expanded)}.hamburger-menu-btn[aria-expanded=true] svg.style-2 .line{transition:opacity .2s ease-in .2s,stroke .5s}.hamburger-menu-btn[aria-expanded=true] svg.style-2 .line:is(.top,.bottom){-webkit-animation:close-icon .5s forwards;animation:close-icon .5s forwards}.hamburger-menu-btn[aria-expanded=true] svg.style-2 .line.top{stroke:var(--line-top-color-expanded)}.hamburger-menu-btn[aria-expanded=true] svg.style-2 .line.middle{opacity:0}.hamburger-menu-btn[aria-expanded=true] svg.style-2 .line.bottom{stroke:var(--line-bottom-color-expanded)}@-webkit-keyframes open-icon{0%{stroke-dashoffset:0;translate:var(--translate);rotate:var(--rotation)}40%{stroke-dashoffset:79.9;translate:var(--translate);rotate:var(--rotation)}60%{stroke-dashoffset:79.9}100%{stroke-dashoffset:0}}@keyframes open-icon{0%{stroke-dashoffset:0;translate:var(--translate);rotate:var(--rotation)}40%{stroke-dashoffset:79.9;translate:var(--translate);rotate:var(--rotation)}60%{stroke-dashoffset:79.9}100%{stroke-dashoffset:0}}@-webkit-keyframes close-icon{0%{stroke-dashoffset:0}40%{stroke-dashoffset:79.9}60%{stroke-dashoffset:79.9;translate:var(--translate);rotate:var(--rotation)}100%{stroke-dashoffset:0;translate:var(--translate);rotate:var(--rotation)}}@keyframes close-icon{0%{stroke-dashoffset:0}40%{stroke-dashoffset:79.9}60%{stroke-dashoffset:79.9;translate:var(--translate);rotate:var(--rotation)}100%{stroke-dashoffset:0;translate:var(--translate);rotate:var(--rotation)}}
        `
        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <button type="button" class="hamburger-menu-btn" aria-expanded="false">
                <svg class="style-1" viewBox="0 0 100 100" width="250">
                    <rect class="line top" width="80" height="10" x="10" y="17.5" rx="5"></rect>
                    <rect class="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
                    <rect class="line bottom" width="80" height="10" x="10" y="72.5" rx="5"></rect>
                </svg>
                <svg class="style-2 hidden" viewBox="0 0 100 100" width="250">
                    <line class="line top" x1="90" x2="10" y1="22.5" y2="22.5"></line>
                    <line class="line middle" x1="10" x2="90" y1="50" y2="50"></line>
                    <line class="line bottom"  x1="10" x2="90" y1="77.5" y2="77.5"></line>
                </svg>
            </button>
        `

        return template
    }

    updateStyles() {
        const backgroundColor = this.getAttribute('background-color') || this.defaultBackgroundColor
        const color = this.getAttribute('color') || this.defaultColor
        const borderColor = this.getAttribute('border-color')
        const lineColor = this.getAttribute('line-color')
        const lineTopColor = this.getAttribute('line-top-color')
        const lineMiddleColor = this.getAttribute('line-middle-color')
        const lineBottomColor = this.getAttribute('line-bottom-color')

        const backgroundColorExpanded = this.getAttribute('background-color-expanded') || backgroundColor
        const colorExpanded = this.getAttribute('color-expanded')
        const borderColorExpanded = this.getAttribute('border-color-expanded') || colorExpanded || borderColor
        const lineColorExpanded = this.getAttribute('line-color-expanded')
        const lineTopColorExpanded = this.getAttribute('line-top-color-expanded') || lineColorExpanded || colorExpanded || lineTopColor || lineColor || color
        const lineBottomColorExpanded = this.getAttribute('line-bottom-color-expanded') || lineColorExpanded || colorExpanded || lineBottomColor || lineColor || color

        this.Style.innerHTML = this.css
            .replace('[[background-color]]', backgroundColor)
            .replace('[[border-color]]', borderColor || color)
            .replace('[[line-top-color]]', lineTopColor || lineColor || color)
            .replace('[[line-middle-color]]', lineMiddleColor || lineColor || color)
            .replace('[[line-bottom-color]]', lineBottomColor || lineColor || color)
            .replace('[[background-color-expanded]]', backgroundColorExpanded)
            .replace('[[border-color-expanded]]', borderColorExpanded || color)
            .replace('[[line-top-color-expanded]]', lineTopColorExpanded)
            .replace('[[line-bottom-color-expanded]]', lineBottomColorExpanded)
            .replace('[[size]]', this.getAttribute('size') || this.defaultSize)
    }

    open() {
        this.HamburgerMenuBtn.ariaExpanded = 'true',
        this.SVG2.classList.remove('closed')
    }
    close() {
        this.HamburgerMenuBtn.ariaExpanded = 'false',
        this.SVG2.classList.add('closed')
    }

    connectedCallback() {
        if (!this.hasAttribute('aria-controls')) this.HamburgerMenuBtn.setAttribute('aria-controls', this.defaultAriaControls)
        if (!this.hasAttribute('title')) this.HamburgerMenuBtn.ariaLabel = this.defaultTitle
        if (!this.hasAttribute('title')) this.HamburgerMenuBtn.title = this.defaultTitle

        const menu = this
        this.HamburgerMenuBtn.addEventListener('click', function() {
            this.ariaExpanded === 'true' ? menu.close() : menu.open()
        })

        this.updateStyles()
    }

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
            case 'background-color':
            case 'color':
            case 'border-color':
            case 'line-color':
            case 'line-top-color':
            case 'line-middle-color':
            case 'line-bottom-color':
            case 'background-color-expanded':
            case 'color-expanded':
            case 'border-color-expanded':
            case 'line-color-expanded':
            case 'line-top-color-expanded':
            case 'line-bottom-color-expanded':
            case 'size': {
                this.updateStyles()
                break
            }
            case 'animation-style': {
                (newValue  && newValue === '2') ? (
                    this.SVG1.classList.add('hidden'),
                    this.SVG2.classList.remove('hidden'),
                    // Stops the closed animation from occurring
                    this.SVG2.classList.remove('closed'),
                    this.HamburgerMenuBtn.setAttribute('data-svg', '2')

                ) : (
                    this.SVG1.classList.remove('hidden'),
                    this.SVG2.classList.add('hidden'),
                    this.HamburgerMenuBtn.removeAttribute('data-svg')
                )
                break
            }
            default: {}
        }
    }
}

window.customElements.define('rwc-hmb', RWC_HamburgerMenuBtn)