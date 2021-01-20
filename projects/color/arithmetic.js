class ArithmeticCalc {
    /**
     * @param {HTMLElement} container 
     */
    constructor(container) {
        this.init(container)
    }

    /**
     * @param {HTMLElement} container 
     */
    init = container => {
        this.calculation = document.createElement('div')
        this.calculation.className = 'calculation arithmetic'
        container.appendChild(this.calculation)
    } // func init

} // class ArithmeticCalc