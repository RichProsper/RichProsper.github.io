class AlgebraicCalc {
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
        this.calculation.className = 'calculation algebraic'
        container.appendChild(this.calculation)
    } // func init
} // class AlgebraicCalc