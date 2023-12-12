/**
 * Redirects a logged in user to the All Transactions page.
 * If the user isn't logged in, it auto focuses the first input element on the page.
 */
export const redirectLoggedInUser = () => {
    if (localStorage.getItem('currentUser') !== null) location.href = 'index.html'
    else document.querySelector('body').classList.remove('hidden')

    document.querySelector('rwc-input').Input.focus()
}

/**
 * Generates a random number (to 2 decimal places) between min and max, both inclusive
 * @param {Number} min The minimum value
 * @param {Number} max The maximum value
 * @returns The random number
 */
export const randomNumber = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

/**
 * Generates a random integer between min and max, both inclusive
 * @param {Number} min The minimum value
 * @param {Number} max The maximum value
 * @returns The random integer
 */
export const randomInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

/**
 * Generates a random date between min and max, both inclusive
 * @param {Date} min The minimum value
 * @param {Date} max The maximum value
 * @returns The random date
 */
export const randomDate = (min, max) => {
    return new Date(Math.random() * (max.getTime() - min.getTime()) + min.getTime()).getTime()
}

/**
 * Formats the date in the form of Jul 30, 1997
 * @param {Number|Date|Undefined} d The date to format
 * @returns the formatted date
 */
export const formatDate = d => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    }).format(d)
}

/**
 * Generates random POS Transactions
 * @returns The random POS Transactions
 */
export const randomPosTransactions = () => {
    const posCompanies = [
        "John's Supermarket", "Stacy's Pharmacy", "Cloister's Bookstore", "Toys R Us",
        "Games R Us", "Celltronics", "Hardware Store", "Fred's Clothing Store"
    ]
    const pos = [{
        company: posCompanies[randomInt(0, posCompanies.length - 1)],
        amount: randomNumber(50, 500),
        createdOn: randomDate(new Date(2023, 1, 1), new Date(2024, 1, 1)),
        type: 'POS'
    }]
    pos.push({
        company: posCompanies[randomInt(0, posCompanies.length - 1)],
        amount: randomNumber(50, 500),
        createdOn: randomDate(new Date(2023, 1, 1), new Date(2024, 1, 1)),
        type: 'POS'
    })
    pos.push({
        company: posCompanies[randomInt(0, posCompanies.length - 1)],
        amount: randomNumber(50, 500),
        createdOn: randomDate(new Date(2023, 1, 1), new Date(2024, 1, 1)),
        type: 'POS'
    })

    return pos
}

/**
 * Formats the number in currency form: $1,234.56
 * @param {Number} c The number to format
 * @returns The formatted number
 */
export const formatCurrency = c => {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(c)
}

/**
 * Converts a Table Row string to actual DOM nodes
 * @param {String} trString The HTML string
 * @returns 
 */
export const TRStringToNodes = trString => {
    const tbody = document.createElement('tbody')
    tbody.innerHTML = trString
    return tbody.children
}

export const logout = () => {
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('currentUser')
        location.href = 'login.html'
    })
}