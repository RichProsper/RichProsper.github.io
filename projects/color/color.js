class Color {
    constructor() {
        this.newArithmeticCalc = document.getElementById('nArC')
        this.newAlgebraicCalc = document.getElementById('nAlC')
        this.container = document.getElementsByClassName('container')[0]
        this.init()
    }

    init = () => {
        this.ArithmeticCalcs = []
        this.AlgebraicCalcs = []
        this.newArithmeticCalc.addEventListener('click', this.addNewArithmeticCalc)
        this.newAlgebraicCalc.addEventListener('click', this.addNewAlgebraicCalc)

        const arr = []
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

    addNewArithmeticCalc = () => {
        this.ArithmeticCalcs.push(new ArithmeticCalc(this.container))
    }

    addNewAlgebraicCalc = () => {
        this.AlgebraicCalcs.push(new AlgebraicCalc(this.container))
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

        const red = (this.hexCodes[r[0]] * 16) + (this.hexCodes[r[1]])
        const green = (this.hexCodes[g[0]] * 16) + (this.hexCodes[g[1]])
        const blue = (this.hexCodes[b[0]] * 16) + (this.hexCodes[b[1]])

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
    subtractColors = () => {
        const hexColorA = this.colorInputA.value
        const hexColorB = this.colorInputB.value

        if (!this.colorCheck(hexColorA) || !this.colorCheck(hexColorB)) return

        const rgbA = this.hexToRGB(hexColorA)
        const rgbB = this.hexToRGB(hexColorB)

        rgbA.red = Math.abs(rgbA.red - rgbB.red)
        rgbA.green = Math.abs(rgbA.green - rgbB.green)
        rgbA.blue = Math.abs(rgbA.blue - rgbB.blue)

        this.changeColor(this.rgbToHex(rgbA))
    }

    /**
     * Verifies that color is in the form #123456
     * @param {String} hexColor
     */
    colorCheck = hexColor => {
        if (hexColor[0] !== '#') return false
        if (hexColor.length !== 7) return false
        return true
    }
} // class Color