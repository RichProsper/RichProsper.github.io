class Color {
    /**
     * @param {String} anchorId - Anchor element's ID
     */
    constructor(anchorId) {
        this.prefix = 'color-'
        this.anchorId = anchorId || 'color-anchor'
        this.init()
    }

    init = () => {
        this.setupElements()

        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(i)
        }

        arr["a"] = 10
        arr["A"] = 10
        arr["b"] = 11
        arr["B"] = 11
        arr["c"] = 12
        arr["C"] = 12
        arr["d"] = 13
        arr["D"] = 13
        arr["e"] = 14
        arr["E"] = 14
        arr["f"] = 15
        arr["F"] = 15

        this.hexCodes = arr
        this.rgbCodes = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
    } // func init

    setupElements = () => {
        this.setupAnchorElement()

        this.colorInput = document.createElement('input')
        this.colorInput.type = 'color'
        this.anchorElem.appendChild(this.colorInput)

        this.boxDiv = document.createElement('div')
        this.boxDiv.className = this.prefix + 'box'
        this.anchorElem.appendChild(this.boxDiv)

        this.resultDisplayDiv = document.createElement('div')
        this.resultDisplayDiv.className = this.prefix + 'result-display'
        this.boxDiv.appendChild(this.resultDisplayDiv)

        this.labelBoxDiv = document.createElement('div')
        this.labelBoxDiv.className = this.prefix + 'label-box'
        this.boxDiv.appendChild(this.labelBoxDiv)

        this.labelDiv = document.createElement('div')
        this.labelDiv.className = this.prefix + 'label'
        this.labelBoxDiv.appendChild(this.labelDiv)

        this.resultInput = document.createElement('input')
        this.resultInput.type = 'text'
        this.resultInput.value = '#000000'
        this.resultInput.setAttribute('readonly', '')
        this.labelDiv.appendChild(this.resultInput)

        this.copySpan = document.createElement('span')
        this.copySpan.className = this.prefix + 'copy'
        const iTag = document.createElement('i')
        iTag.className = 'fa fa-clipboard'
        this.copySpan.appendChild(iTag)
        this.labelBoxDiv.appendChild(this.copySpan)

        this.copySpan.addEventListener('click', this.copyTextToClipboard)
        this.colorInput.addEventListener('change', this.processColor)
    }

    setupAnchorElement = () => {
        const id = this.anchorId
        delete this.anchorId

        const anchor = document.getElementById(id)
        if (anchor) {
            this.anchorElem = anchor
        }
        // If the anchor element doesn't exist create it
        else {
            this.anchorElem = document.createElement('div')
            document.body.appendChild(this.anchorElem)
        }

        this.anchorElem.innerHTML = null    // Empty the anchor element of any possible children elements
        this.anchorElem.classList.add(this.prefix + 'wrapper')
    }

    /**
     * Copies text to clipboard
     * @param {Object} this_ - refers to 'this' of the class Color
     */
    copyTextToClipboard = () => {
        this.resultInput.select()
        this.resultInput.setSelectionRange(0, 99999)
        document.execCommand('copy')
    }

    /**
     * Takes color from input and sets it as the background of a div and the value
     * of another input
     * @param {String} hexColor
     */
    changeColor = hexColor => {
        this.resultDisplayDiv.style.backgroundColor = hexColor
        this.resultInput.value = hexColor
    }

    /**
     * Convert color from format #123456 to rgb(50, 100, 150)
     * @param {String} hexColor 
     */
    hexToRGB = hexColor => {
        const r = [hexColor[1], hexColor[2]]
        const g = [hexColor[3], hexColor[4]]
        const b = [hexColor[5], hexColor[6]]

        let red = (this.hexCodes[r[0]] * 16) + (this.hexCodes[r[1]])
        let green = (this.hexCodes[g[0]] * 16) + (this.hexCodes[g[1]])
        let blue = (this.hexCodes[b[0]] * 16) + (this.hexCodes[b[1]])

        return {red, green, blue}
    }

    /**
     * Convert color from format rgb(50, 100, 150) to #123456
     * @param {Object} rgbColor 
     */
    rgbToHex = rgbColor => {
        const r = String(this.rgbCodes[Math.floor(rgbColor.red / 16)])
                + String(this.rgbCodes[rgbColor.red % 16])

        const g = String(this.rgbCodes[Math.floor(rgbColor.green / 16)])
                + String(this.rgbCodes[rgbColor.green % 16])

        const b = String(this.rgbCodes[Math.floor(rgbColor.blue / 16)])
                + String(this.rgbCodes[rgbColor.blue % 16])
                
        return '#' + r + g + b
    }

    /**
     * Process a color
     * * Only supports hex colors in the six digit format i.e. #123456
     */
    processColor = () => {
        const hexColor = this.colorInput.value

        if (hexColor[0] !== '#') return
        if (hexColor.length !== 7) return

        let rgb = this.hexToRGB(hexColor)

        rgb.red = Math.round(rgb.red * 0.9)
        rgb.green = Math.round(rgb.green * 0.9)
        rgb.blue = Math.round(rgb.blue * 0.9)

        this.changeColor(this.rgbToHex(rgb))
    }
} // class Color