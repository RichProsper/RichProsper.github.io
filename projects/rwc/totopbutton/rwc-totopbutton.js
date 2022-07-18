class RWC_ToTopButton extends HTMLElement {
    static get observedAttributes() {
        return ['button_size', 'button_color', 'chevron_color', 'button_placement']
    }

    get buttonSize()   { return this.getAttribute('button_size') || '' }
    set buttonSize(bS) {
        bS ? this.setAttribute('button_size', bS) : this.removeAttribute('button_size')
    }

    get buttonColor()   { return this.getAttribute('button_color') || '' }
    set buttonColor(bC) {
        bC ? this.setAttribute('button_color', bC) : this.removeAttribute('button_color')
    }

    get chevronColor()   { return this.getAttribute('chevron_color') || '' }
    set chevronColor(cC) {
        cC ? this.setAttribute('chevron_color', cC) : this.removeAttribute('chevron_color')
    }

    get buttonPlacement()   { return this.getAttribute('button_placement') || '' }
    set buttonPlacement(bP) {
        bP ? this.setAttribute('button_placement', bP) : this.removeAttribute('button_placement')
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
        this.defaultButtonSize = '5rem'
        this.defaultButtonColor = 'hsla(339, 100%, 48%, .8)'
        this.defaultButtonHoverColor = 'hsl(339, 100%, 48%)'
        this.defaultChevronColor = 'hsl(0, 0%, 80%)'
        this.defaultChevronHoverColor = 'hsl(0, 0%, 100%)'
        this.defaultButtonPlacement = 'bottom-right'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.totopbutton{--button-size: [[button_size]];--button-color: [[button_color]];--button-hover-color: [[button_hover_color]];--chevron-color: [[chevron_color]];--chevron-hover-color: [[chevron_hover_color]];-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;inset:btn-placement;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:1em;height:1em;-webkit-box-shadow:0 0.06em 0.1em -0.02em rgba(0,0,0,0.22),0 0.12em 0.2em 0 rgba(0,0,0,0.34),0 0.02em 0.36em 0 rgba(0,0,0,0.32);box-shadow:0 0.06em 0.1em -0.02em rgba(0,0,0,0.22),0 0.12em 0.2em 0 rgba(0,0,0,0.34),0 0.02em 0.36em 0 rgba(0,0,0,0.32);background-color:var(--button-color);border-radius:50%;font-size:var(--button-size);opacity:0;-webkit-transform:scale(0);transform:scale(0);visibility:hidden;pointer-events:none;cursor:pointer;border:none;z-index:9999;-webkit-transition:.25s ease-out;transition:.25s ease-out}.totopbutton:hover{background-color:var(--button-hover-color)}.totopbutton:hover svg{fill:var(--chevron-hover-color)}.totopbutton:focus{outline-offset:.1em;outline:-webkit-focus-ring-color auto 1px}.totopbutton.sticky{opacity:1;-webkit-transform:scale(1);transform:scale(1);visibility:visible;pointer-events:unset}.totopbutton *,.totopbutton *::before,.totopbutton *::after{-webkit-box-sizing:inherit;box-sizing:inherit}.totopbutton svg{width:.26em;fill:var(--chevron-color)}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style></style>

            <button type="button" class="totopbutton" title="Back to Top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z"/></svg>
            </button>
        `

        return template
    }

    determineBtnColors() {
        if (!this.hasAttribute('button_color')) return false

        const div = document.createElement('div')
        div.style.color = this.getAttribute('button_color')
        document.body.appendChild(div)

        const rgbColor = window.getComputedStyle(div).getPropertyValue('color').replace(/[rgba()]/g, '').split(', ')
        document.body.removeChild(div)

        if (rgbColor.length === 4) {
            const btnColor = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${rgbColor[3]})`
            
            rgbColor[3] = +rgbColor[3] + .2

            const btnHoverColor = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${rgbColor[3]})`

            return [btnColor, btnHoverColor]
        }
        else {
            return [
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, .8)`,
                `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`
            ]
        }
    }

    determineChevronColors() {
        if (!this.hasAttribute('chevron_color')) return false

        const div = document.createElement('div')
        div.style.color = this.getAttribute('chevron_color')
        document.body.appendChild(div)

        const rgbColor = window.getComputedStyle(div).getPropertyValue('color').replace(/[rgba()]/g, '').split(', ')
        document.body.removeChild(div)

        // Make red, green, and blue fractions
        const red   = +rgbColor[0] / 255,
              green = +rgbColor[1] / 255,
              blue  = +rgbColor[2] / 255

        // Find greatest and smallest channel values and the delta value
        const channel_min = Math.min(red, green, blue),
              channel_max = Math.max(red, green, blue),
              delta = channel_max - channel_min

        let hue = 0,
            saturation = 0,
            lightness = 0

        // Determine hue
        if      (delta === 0) hue = 0
        else if (channel_max === red) hue = ((green - blue) / delta) % 6
        else if (channel_max === green) hue = ((blue - red) / delta) + 2
        else if (channel_max === blue) hue = ((red - green) / delta) + 4

        hue = Math.round(hue * 60)
        if (hue < 0) hue += 360

        // Determine lightness & saturation
        lightness = (channel_max + channel_min) / 2
        saturation = delta === 0 ? 0 : delta / (1 - Math.abs((2 * lightness) - 1))

        saturation = +(saturation * 100).toFixed(1)
        lightness = +(lightness * 100).toFixed(1)

        if (rgbColor.length === 4) {
            return [
                `hsla(${hue}, ${saturation}%, ${lightness}%, ${rgbColor[3]})`,
                `hsla(${hue}, ${saturation}%, ${lightness + 20}%, ${rgbColor[3]})`
            ]
        }
        else {
            return [
                `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`
            ]
        }
    }

    updateStyle() {
        const btnPlacement = this.getAttribute('button_placement') || this.defaultButtonPlacement
        
        const [buttonColor, buttonHoverColor] = this.determineBtnColors()
            || [this.defaultButtonColor, this.defaultButtonHoverColor]

        const [chevronColor, chevronHoverColor] = this.determineChevronColors()
            || [this.defaultChevronColor, this.defaultChevronHoverColor]

        const css = this.css
            .replace('[[button_size]]', this.getAttribute('button_size') || this.defaultButtonSize)
            .replace('[[button_color]]', buttonColor)
            .replace('[[button_hover_color]]', buttonHoverColor)
            .replace('[[chevron_color]]', chevronColor)
            .replace('[[chevron_hover_color]]', chevronHoverColor)

        switch (true) {
            case (btnPlacement === 'top-left' || btnPlacement === 'top left'): {
                this.Style.innerHTML = css.replace('inset:btn-placement', 'top:.6em;left:.6em')
                break
            }
            case (btnPlacement === 'top-right' || btnPlacement === 'top right'): {
                this.Style.innerHTML = css.replace('inset:btn-placement', 'top:.6em;right:.6em')
                break
            }
            case (btnPlacement === 'bottom-left' || btnPlacement === 'bottom left'): {
                this.Style.innerHTML = css.replace('inset:btn-placement', 'bottom:.6em;left:.6em')
                break
            }
            default: {
                this.Style.innerHTML = css.replace('inset:btn-placement', 'bottom:.6em;right:.6em')
                break
            }
        }
    }

    connectedCallback() {
        this.updateStyle()
        
        window.addEventListener('scroll', () => {
            this.ToTopButton.classList.toggle('sticky', window.scrollY > 100)
        })

        if (window.scrollY > 100) this.ToTopButton.classList.add('sticky')

        this.ToTopButton.addEventListener('click', () => {
            window.scroll(0, 0)
        })
    }

    // This life cycle hook is run before connectedCallback()
    attributeChangedCallback() {
        this.updateStyle()
    }
}

window.customElements.define('rwc-totopbutton', RWC_ToTopButton)