class RWC_Switch extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return ['value', 'required', 'switch_size', 'switch_color']        
    }

    get value()             { return this.getAttribute('value')        }
    set value(v)            { this.setAttribute('value', v)            }
    get checked()           { return this.Input.checked                }
    set checked(c)          {
        this.Input.checked = c
        c ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
    }
    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity()  { return this.internals_.checkValidity()  }
    reportValidity() { return this.internals_.reportValidity() }

    setFormValue = () => this.checked ? this.internals_.setFormValue(this.getAttribute('value')) : this.internals_.setFormValue(null)

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
    formDisabledCallback(disabled) {
        this.Switch.className = disabled ? 'switch disabled' : 'switch'
        this.Input.disabled = disabled
    }

    /**
     * This is called when the form is reset
     */
    formResetCallback() {
        this.Input.checked = this.hasAttribute('checked')
        this.hasAttribute('checked') ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
        this.setFormValue()
        this.validation()
    }

    constructor() {
        super()
        this.internals_ = this.attachInternals()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))  

        this.Switch = this.shadowRoot.querySelector('label.switch')
        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.Base = this.shadowRoot.querySelector('span.base')
    }

    getTemplate() {
        this.defaultSwitchSize = '5.8rem'
        this.defaultSwitchColor = '207, 90%, 77%'
        this.defaultValue = 'on'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}label.switch{--switch-size: [[switch_size]];--switch-color: [[switch_color]];--hover: [[hover]];--hue-white: 0, 0%;--white: hsl(var(--hue-white), 100%);--white-transparent: hsla(var(--hue-white), 100%, .1);--grey-1: hsl(var(--hue-white), 50%);--grey-2: hsl(var(--hue-white), 30%);position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;font-size:var(--switch-size);-webkit-box-sizing:border-box;box-sizing:border-box}label.switch *,label.switch *::before,label.switch *::after{-webkit-box-sizing:inherit;box-sizing:inherit}label.switch .wrapper{position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:1em;height:.655em;overflow:hidden;padding:.207em;z-index:0}label.switch .wrapper .base{position:absolute;left:0;top:0;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;-webkit-tap-highlight-color:transparent;padding:.155em;border-radius:50%;z-index:1;-webkit-transition:0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms}label.switch .wrapper .base input{position:absolute;top:0;left:0;width:100%;height:100%;cursor:inherit;opacity:0;z-index:1}label.switch .wrapper .base .thumb{width:.345em;height:.345em;border-radius:50%;background-color:currentColor;-webkit-box-shadow:0 0.0345em 0.0172em -0.0172em rgba(0,0,0,0.2),0 0.0172em 0.0172em 0 rgba(0,0,0,0.14),0 0.0172em 0.0517em 0 rgba(0,0,0,0.12);box-shadow:0 0.0345em 0.0172em -0.0172em rgba(0,0,0,0.2),0 0.0172em 0.0172em 0 rgba(0,0,0,0.14),0 0.0172em 0.0517em 0 rgba(0,0,0,0.12)}label.switch .wrapper .base:hover,label.switch .wrapper .base.focus{background-color:var(--white-transparent)}label.switch .wrapper .base.checked{color:var(--switch-color);-webkit-transform:translateX(0.345em);transform:translateX(0.345em)}label.switch .wrapper .base.checked:hover,label.switch .wrapper .base.checked.focus{background-color:var(--hover)}label.switch .wrapper .base.checked+.track{background-color:var(--switch-color);opacity:.5}label.switch .wrapper .track{width:100%;height:100%;border-radius:.121em;-webkit-transition:0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;background-color:var(--white);opacity:.3;z-index:-1}label.switch .label{font-size:.276em}label.switch.disabled{cursor:default;pointer-events:none;color:var(--grey-1)}label.switch.disabled .wrapper .base.checked{color:var(--grey-1)}label.switch.disabled .wrapper .base.checked+.track{background-color:var(--white);opacity:.3}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style>${this.css}</style>

            <label class="switch">
                <span class="wrapper">
                    <span class="base">
                        <input type="checkbox">
                        <span class="thumb"></span>
                    </span>
                    <span class="track"></span>
                </span>
                <slot name="label" class="label"></slot>
            </label>
        `

        return template
    }

    validation() {
        if (this.hasAttribute('required') && !this.checked) {
            this.internals_.setValidity({valueMissing: true}, 'Please switch this on if you want to proceed', this.Input)
            return
        }

        this.internals_.setValidity({})
    }

    addOpacityToColor() {
        if (!this.hasAttribute('switch_color')) return false

        const div = document.createElement('div')
        div.style.color = this.getAttribute('switch_color')
        document.body.appendChild(div)

        const rgbColor = window.getComputedStyle(div).getPropertyValue('color').replace(/[rgba()]/g, '').split(', ')
        document.body.removeChild(div)

        if (rgbColor.length === 4) {
            return [
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${rgbColor[3]})`,
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, .1)`
            ]
        }
        else {
            return [
                `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`,
                `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, .1)`
            ]
        }
    }

    updateSizeColor() {
        const colors = this.addOpacityToColor()
        let css = this.css.replace('[[switch_size]]', this.getAttribute('switch_size') || this.defaultSwitchSize)

        if (!colors) {
            css = css.replace('[[switch_color]]', 'hsl(' + this.defaultSwitchColor + ')')
            css = css.replace('[[hover]]', 'hsl(' + this.defaultSwitchColor + ', .1)')
        }
        else {
            css = css.replace('[[switch_color]]', colors[0])
            css = css.replace('[[hover]]', colors[1])
        }

        this.Style.innerHTML = css
    }
    
    connectedCallback() {
        this.Input.checked = this.hasAttribute('checked')
        this.hasAttribute('checked') ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
        if (!this.getAttribute('value')) this.setAttribute('value', this.defaultValue)

        this.updateSizeColor()
        this.setFormValue()
        this.validation()
        
        this.Input.addEventListener('focus', () => this.Base.classList.add('focus'))
        this.Input.addEventListener('blur', () => this.Base.classList.remove('focus'))
        this.Input.addEventListener('change', e => {
            e.target.checked ? this.Base.classList.add('checked') : this.Base.classList.remove('checked')
            this.setFormValue()
            this.validation()
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value': {
                if (!this.getAttribute('value')) this.setAttribute('value', this.defaultValue)
                break
            }
            case 'required': {
                this.hasAttribute('required') ? this.Input.setAttribute('required', '') : this.Input.removeAttribute('required')
                break
            }
            case 'switch_size':
            case 'switch_color': {
                this.updateSizeColor()
                break
            }
            default: {}
        }

        this.validation()
    }
}

window.customElements.define('rwc-switch', RWC_Switch)