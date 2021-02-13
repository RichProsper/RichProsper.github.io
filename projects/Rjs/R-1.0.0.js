class RDOM {
    /**
     * @param {HTMLElement | HTMLCollection | NodeList} elemRef
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
        ) return true
        else {
            console.error('Not an HTML Element / HTML Collection / Node List...')
            return false
        }
    }

    /**
     * Ensure's str is of type String and is not empty
     * @param {String} str
     */
    isValidString = str => {
        if (typeof str === 'string') {
            if (str) return true
            else console.error('Empty string provided...')
        }
        else {
            const strType = typeof str
            console.error(
                'Invalid parameter provided:',
                str,
                `\nExpecting a string instead a(n) ${strType} was provided.`
            )
        }

        return false
    }

    /**
     * Applies the styles to the elemRef
     * @param {Object} stylesObj - An object containing CSS styles
     */
    css = stylesObj => {
        if ( this.isValidElemRef() ) {
            if (typeof stylesObj === 'object') {
                /**
                 * @param {HTMLElement} elem 
                 * @param {Object} stylesObject 
                 */
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
            else {
                const stylesType = typeof stylesObj
                console.error(
                    'Invalid Styles provided:',
                    stylesObj,
                    `\nExpecting an object instead a(n) ${stylesType} was provided.`
                )
            }
        }

        return this
    } // func css

    /**
     * Adds 1 or more classes only if it/they don't exist
     * @param {String} clsStr - Holds 1 or more classes separated by spaces
     */
    addCls = clsStr => {
        if ( this.isValidElemRef() ) {
            if ( this.isValidString(clsStr) ) {
                /**
                 * @param {HTMLElement} elem 
                 * @param {String} classesStr 
                 */
                const addClass = (elem, classesStr) => {
                    const classesArr = classesStr.split(' ')
                    for (let cls of classesArr) elem.classList.add(cls)
                }

                if (this.elemRef instanceof HTMLElement) addClass(this.elemRef, clsStr)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        addClass(this.elemRef[i], clsStr)
                    }
                }
            }
        }

        return this
    } // func addCls

    /**
     * Removes 1 or more classes only if it/they exist
     * @param {String} clsStr - Holds 1 or more classes separated by spaces
     */
    remCls = clsStr => {
        if ( this.isValidElemRef() ) {
            if ( this.isValidString(clsStr) ) {
                /**
                 * @param {HTMLElement} elem 
                 * @param {String} classesStr 
                 */
                const remClass = (elem, classesStr) => {
                    const classesArr = classesStr.split(' ')
                    for (let cls of classesArr) elem.classList.remove(cls)
                }

                if (this.elemRef instanceof HTMLElement) remClass(this.elemRef, clsStr)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        remClass(this.elemRef[i], clsStr)
                    }
                }
            }
        }

        return this
    } // func remCls

    /**
     * Checks whether the Element(s) contains the class(es)
     * @param {String} clsStr - Holds 1 or more classes separated by spaces
     * @param {Boolean} verbose - Determines how detailed the results will be
     */
    hasCls = (clsStr, verbose=false) => {
        if ( this.isValidElemRef() ) {
            if ( this.isValidString(clsStr) ) {
                /**
                 * @param {HTMLElement} elem 
                 * @param {String} classesStr 
                 * @param {Boolean} verboseOutput 
                 */
                const hasClass = (elem, classesStr, verboseOutput) => {
                    const classesArr = classesStr.split(' ')
                    if (verboseOutput) {
                        let output = {
                            numClasses: classesArr.length,
                            numFound: 0,
                            foundList: '',
                            notFoundList: '',
                            foundAll: false
                        }

                        for (let cls of classesArr) {
                            if (elem.classList.contains(cls)) {
                                output.numFound++
                                output.foundList += `${cls} `
                            }
                            else output.notFoundList += `${cls} `
                        }

                        output.foundList = output.foundList.trim()
                        output.notFoundList = output.notFoundList.trim()

                        if (output.numClasses === output.numFound) output.foundAll = true

                        return output
                    } // if
                    else {
                        let classFound = true

                        for (let cls of classesArr) {
                            if (!elem.classList.contains(cls)) classFound = false
                        }

                        return classFound
                    }
                } // func hasClass

                if (this.elemRef instanceof HTMLElement) return hasClass(this.elemRef, clsStr, verbose)
                else {
                    if (verbose) {
                        let result = {
                            numElems: this.elemRef.length,
                            numPassed: 0,
                            passedList: [],
                            failedList: [],
                            didAllPass: false
                        }

                        for (let i = 0; i < this.elemRef.length; i++) {
                            const output = hasClass(this.elemRef[i], clsStr, true)
                            output.element = this.elemRef[i]

                            if (output.foundAll) {
                                result.numPassed++
                                result.passedList.push(output)
                            }
                            else result.failedList.push(output)
                        }

                        if (result.numPassed === result.numElems) result.didAllPass = true

                        return result
                    } // if
                    else {
                        let classFoundForAllElements = true

                        for (let i = 0; i < this.elemRef.length; i++) {
                            if ( !hasClass(this.elemRef[i], clsStr, false) ) classFoundForAllElements = false
                        }

                        return classFoundForAllElements
                    }
                } // else
            } // if
        } // if

        return false
    } // func hasCls

    /**
     * Toggles between adding/removing classes
     * @param {String} clsStr - Holds 1 or more classes separated by spaces
     * @param {Boolean} force - Forces the class(es) to be added or removed,
     *                          regardless of whether or not it already existed.
     */
    toggleCls = (clsStr, force) => {
        if ( this.isValidElemRef() ) {
            if ( this.isValidString(clsStr) ) {
                /**
                 * @param {HTMLElement} elem 
                 * @param {String} classesStr 
                 * @param {Boolean} theForce 
                 */
                const toggleClass = (elem, classesStr, theForce) => {
                    const classesArr = classesStr.split(' ')
                    for (let cls of classesArr) elem.classList.toggle(cls, theForce)
                }

                if (this.elemRef instanceof HTMLElement) toggleClass(this.elemRef, clsStr, force)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        toggleClass(this.elemRef[i], clsStr, force)
                    }
                }
            }
        }

        return this
    } // func toggleCls

    /**
     * Replaces 1 or more classes with 1 or more other classes,
     * only if the class(es) to be replaced exists
     * @param {String} aClsStr - Holds the class(es) to be replaced
     * @param {String} bClsStr - Holds the replacing class(es)
     */
    replaceCls = (aClsStr, bClsStr) => {
        if ( this.isValidElemRef() ) {
            if ( this.isValidString(aClsStr) && this.isValidString(bClsStr) ) {
                /**
                 * @param {HTMLElement} elem 
                 * @param {String} aClassesStr 
                 * @param {String} bClassesStr 
                 */
                const replaceClass = (elem, aClassesStr, bClassesStr) => {
                    const aClassesArr = aClassesStr.split(' ')
                    const bClassesArr = bClassesStr.split(' ')
                    let foundAll = true

                    for (let aCls of aClassesArr) {
                        if ( !elem.classList.contains(aCls) ) foundAll = false
                    }

                    if (foundAll) {
                        for (let aCls of aClassesArr) elem.classList.remove(aCls)
                        for (let bCls of bClassesArr) elem.classList.add(bCls)
                    }
                }

                if (this.elemRef instanceof HTMLElement) replaceClass(this.elemRef, aClsStr, bClsStr)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        replaceClass(this.elemRef[i], aClsStr, bClsStr)
                    }
                }
            } // if
        } // if

        return this
    } // func replaceCls

    /**
     * Toggle 1 or more classes with 1 or more other classes
     * @param {String} aClsStr - Holds the first class(es)
     * @param {String} bClsStr - Holds the second class(es)
     * @param {Boolean} force - Forces the first class(es) to be added or the second class(es) to be added
     */
    toggleBtwnCls = (aClsStr, bClsStr, force) => {
        if ( this.isValidElemRef() ) {
            if ( this.isValidString(aClsStr) && this.isValidString(bClsStr) ) {
                /**
                 * @param {HTMLElement} elem 
                 * @param {String} aClassesStr 
                 * @param {String} bClassesStr 
                 * @param {Boolean} theForce 
                 */
                const toggleBtwnClass = (elem, aClassesStr, bClassesStr, theForce) => {
                    const aClassesArr = aClassesStr.split(' ')
                    const bClassesArr = bClassesStr.split(' ')

                    if (typeof theForce === 'undefined') {
                        let foundAll = true

                        for (let aCls of aClassesArr) {
                            if ( !elem.classList.contains(aCls) ) foundAll = false
                        }

                        if (foundAll) {
                            for (let aCls of aClassesArr) elem.classList.remove(aCls)
                            for (let bCls of bClassesArr) elem.classList.add(bCls)
                        }
                        else {
                            for (let bCls of bClassesArr) elem.classList.remove(bCls)
                            for (let aCls of aClassesArr) elem.classList.add(aCls)
                        }
                    }
                    else {
                        if (theForce) { // Add the first class(es)
                            for (let bCls of bClassesArr) elem.classList.remove(bCls)
                            for (let aCls of aClassesArr) elem.classList.add(aCls)
                        }
                        else { // Add the second class(es)
                            for (let aCls of aClassesArr) elem.classList.remove(aCls)
                            for (let bCls of bClassesArr) elem.classList.add(bCls)
                        }
                    }
                } // func toggleBtwnClass

                if (this.elemRef instanceof HTMLElement) toggleBtwnClass(this.elemRef, aClsStr, bClsStr, force)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        toggleBtwnClass(this.elemRef[i], aClsStr, bClsStr, force)
                    }
                }
            } // if
        } // if

        return this
    } // func toggleBtwnCls
} // class RDOM

/**
 * Retrieves HTMLElement(s)
 * @param {HTMLElement | HTMLCollection | NodeList | String} elemRef
 * @param {Boolean} firstMatch - If true, returns the first HTMLElement found
 */
const R = (elemRef, firstMatch=false) => {
    if (elemRef instanceof HTMLElement) return new RDOM(elemRef)

    if (elemRef instanceof NodeList || elemRef instanceof HTMLCollection) {
        if (elemRef.length > 0) return new RDOM(elemRef)
        else {
            console.error('Empty HTML Collection / Node List provided...')
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

    console.error(
        'Invalid Element Reference:',
        elemRef,
        '\nExpecting HTMLElement, HTMLCollection, NodeList or String'
    )
    
    return 0
} // func R