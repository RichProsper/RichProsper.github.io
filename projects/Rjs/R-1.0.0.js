class RDOM {
    /**
     * @param {HTMLElement | NodeList} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef
        this.isValidElemRef()
    }

    /**
     * Checks whether or not the elemRef is valid.
     * This is incase a direct RDOM object was created, e.g. new RDOM(...)
     */
    isValidElemRef = () => {
        if (
            this.elemRef instanceof HTMLElement ||
            this.elemRef instanceof HTMLCollection ||
            this.elemRef instanceof NodeList
        )  return true
        else {
            console.error('Not an HTML Element nor an HTML Collection...')
            return false
        }
    }

    /**
     * Applies the styles to the elemRef
     * @param {Object} stylesObj
     */
    css = stylesObj => {
        if (this.isValidElemRef()) {
            if (typeof stylesObj === 'object') {
                const applyStyles = (elem, stylesObject) => {
                    for (let style in stylesObject) elem.style[style] = stylesObject[style]
                }

                if (this.elemRef instanceof HTMLElement) applyStyles(this.elemRef, stylesObj)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        applyStyles(this.elemRef[i], stylesObj)
                    }
                }
            }
            else console.error('Invalid Styles provided...')

            return this
        }
        return 0
    }
} // class RDOM

/**
 * Retrieves HTMLElement(s)
 * @param {HTMLElement | HTMLCollection | NodeList | String} elemRef
 * @param {Boolean} firstMatch
 */
const R = (elemRef, firstMatch=false) => {
    if (elemRef instanceof HTMLElement) return new RDOM(elemRef)

    if (elemRef instanceof NodeList || elemRef instanceof HTMLCollection) {
        if (elemRef.length > 0) return new RDOM(elemRef)
        else {
            console.error('Empty HTML Collection provided...')
            return 0
        }
    }

    if (typeof elemRef === 'string') {
        if (elemRef) {
            if (elemRef[0] === '#') {
                const _elemRef = document.getElementById(elemRef.slice(1))

                if (_elemRef) return new RDOM(_elemRef)
                else {
                    console.error(`No Element found matching selector: ${elemRef}`)
                    return 0
                }
            }

            if (firstMatch) {
                const _elemRef = document.querySelector(elemRef)

                if (_elemRef) return new RDOM(_elemRef)
                else {
                    console.error(`No Element found matching selector: ${elemRef}`)
                    return 0
                }
            }
            else {
                const _elemRef = document.querySelectorAll(elemRef)

                if (_elemRef.length > 0) return new RDOM(_elemRef)
                else {
                    console.error(`No Elements found matching selector: ${elemRef}`)
                    return 0
                }
            }
        } // if
        else {
            console.error('Empty selector...')
            return 0
        }
    } // if
    
    return 0
} // func R