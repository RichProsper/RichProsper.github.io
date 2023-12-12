import Header from "../../scripts/header.min.js"
import { redirectLoggedInUser, randomNumber, randomPosTransactions } from "./utilities.min.js"

redirectLoggedInUser()
Header()

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()

    const failureAlert = document.getElementById('failure')
    const failureMessage = failureAlert.children[1]
    const successAlert = document.getElementById('success')
    const name = this.name.value.trim()
    const creditcard = this.creditcard.value.trim()
    const email = this.email.value.trim()
    const password = this.password.value.trim()
    const confirmPassword = this.confirmPassword.value.trim()
    const user = {
        name,
        userId: creditcard,
        creditcard,
        email,
        password,
        balance: randomNumber(5000, 10000),
        transactions: {
            pos: randomPosTransactions(),
            transfers: [],
            billPayments: []
        }
    }

    if (password !== confirmPassword) {
        failureMessage.textContent = "Password and Confirm Password don't match."
        failureAlert.openAlert()
        return
    }

    if (localStorage.getItem('users') === null) {
        localStorage.setItem('users', JSON.stringify([user]))
        localStorage.setItem('currentUser', JSON.stringify(user))
        successAlert.openAlert()
        // Wait until alert clears from the screen then redirect.
        setTimeout(() => location.href = 'index.html', 5201)
        return
    }

    const users = JSON.parse(localStorage.getItem('users'))

    for (const user_ of users) {
        if (user_.userId === creditcard) {
            failureMessage.textContent = "There's already a user with that Credit Card Number."
            failureAlert.openAlert()
            return
        }
    }

    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(user))
    successAlert.openAlert()
    setTimeout(() => location.href = 'index.html', 5201)
})