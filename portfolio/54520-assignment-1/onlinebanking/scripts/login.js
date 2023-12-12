import Header from "../../scripts/header.min.js"
import { redirectLoggedInUser, randomNumber, randomPosTransactions } from "./utilities.min.js"

redirectLoggedInUser()
Header()

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()

    const alert = document.querySelector('rwc-alert')

    if (localStorage.getItem('users') === null) {
        alert.openAlert()
        return
    }
    
    const users = JSON.parse(localStorage.getItem('users'))
    const userId = this.userId.value.trim()
    const password = this.password.value.trim()

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId && users[i].password === password) {
            users[i].balance += randomNumber(500, 1500)
            users[i].transactions.pos.push(...randomPosTransactions())

            localStorage.setItem('users', JSON.stringify(users))
            localStorage.setItem('currentUser', JSON.stringify(users[i]))
            location.href = 'index.html'
            return
        }
    }

    alert.openAlert()
})