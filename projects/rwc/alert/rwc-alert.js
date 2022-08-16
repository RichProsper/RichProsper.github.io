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

    get alertDuration()   { return this.getAttribute('alert_duration') || '' }
    set alertDuration(aD) {
        aD ? this.setAttribute('alert_duration', aD) : this.removeAttribute('alert_duration')
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

    getTemplate() {
        this.defaultAlertColor = { h: 197, s: 71, l: 73 } // Light blue
        this.defaultAlertSize = '1.6rem'
        this.defaultZIndex = '9999'
        this.defaultAlertDuration = 5 * 1000 //5 seconds
        this.alertTimer = null
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.alert{--color-1: [[color_1]];--color-2: [[color_2]];--color-3: [[color_3]];--alert-size: [[alert_size]];--z-index: [[z_index]];z-index:var(--z-index);font-size:var(--alert-size);position:fixed;top:0;left:0;width:100%;height:3.125em;transform:translateY(-3.125em);opacity:0;padding:.78125em 1.5625em;background-color:var(--color-1);color:var(--color-2);transition:.2s;box-sizing:border-box}.alert.open{transform:none;opacity:1}.alert *,.alert *::before,.alert *::after{box-sizing:inherit}.alert button{position:absolute;top:0;right:0;padding-top:.0667em;border:none;background-color:inherit;width:1.667em;height:1.667em;font-size:1.875em;font-weight:400;cursor:pointer}.alert button:hover,.alert button:focus{background-color:var(--color-3)}
        `
        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <div class="alert">
                <strong><slot name="status"></strong>
                <span><slot name="message"></span>
                <button type="button">×</button>
            </div>
        `

        return template
    }

    openAlert() {
        this.Alert.classList.add('open')

        this.alertTimer = setTimeout(() => {
            this.Alert.classList.remove('open')
        }, +this.alertDuration || this.defaultAlertDuration)
    }

    closeAlert() {
        this.Alert.classList.remove('open')
        clearTimeout(this.alertTimer)
    }

    determineColors() {
        if (!this.hasAttribute('alert_color')) {
            const color = this.defaultAlertColor

            return [
                `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                `hsl(${color.h}, ${color.s * 1.5}%, ${color.l * 0.2667}%)`,
                `hsl(${color.h}, ${color.s}%, ${color.l * 0.8667}%)`
            ]
        }

        const div = document.createElement('div')
        div.style.color = this.getAttribute('alert_color')
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

        return [
            `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            `hsl(${hue}, ${saturation* 1.5}%, ${lightness * 0.2667}%)`,
            `hsl(${hue}, ${saturation}%, ${lightness * 0.8667}%)`
        ]
    }

    updateStyles() {
        const [color1, color2, color3] = this.determineColors()

        this.Style.innerHTML = this.css
            .replace('[[color_1]]', color1)
            .replace('[[color_2]]', color2)
            .replace('[[color_3]]', color3)
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
