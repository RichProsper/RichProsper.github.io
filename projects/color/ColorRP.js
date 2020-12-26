class Color {
    constructor() {
        this.copy = document.getElementsByClassName('copy')[0]
        this.color = document.getElementById('color')
        this.colorResult = document.getElementById('colorResult')
        this.colorResultDisplay = document.getElementsByClassName('color-result-display')[0]
        this.init()
    }

    init = () => {
        this.copy.addEventListener('click', this.copyTextToClipboard)
        this.color.addEventListener('change', this.processColor)

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

    /**
     * Copies text to clipboard
     * @param {Object} this_ - refers to 'this' of the class Color
     */
    copyTextToClipboard = () => {
        this.colorResult.select()
        this.colorResult.setSelectionRange(0, 99999)
        document.execCommand('copy')
    }

    /**
     * Takes color from input and sets it as the background of a div and the value
     * of another input
     * @param {String} hexColor
     */
    changeColor = hexColor => {
        this.colorResultDisplay.style.backgroundColor = hexColor
        this.colorResult.value = hexColor
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
        const hexColor = this.color.value

        if (hexColor[0] !== '#') return
        if (hexColor.length !== 7) return

        let rgb = this.hexToRGB(hexColor)

        rgb.red = Math.round(rgb.red * 0.9)
        rgb.green = Math.round(rgb.green * 0.9)
        rgb.blue = Math.round(rgb.blue * 0.9)

        this.changeColor(this.rgbToHex(rgb))
    }
} // class Color