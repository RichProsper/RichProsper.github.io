import Header from "../../scripts/header.min.js"
import { redirectLoggedInUser } from "./utilities.min.js"

redirectLoggedInUser()
Header()

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()

    const failureAlert = document.getElementById('failure')
    const failureMessage = failureAlert.children[1]
    const successAlert = document.getElementById('success')
    const userId = this.userId.value.trim()
    const email = this.email.value.trim()
    const newPassword = this.newPassword.value.trim()
    const confirmNewPassword = this.confirmNewPassword.value.trim()

    if (newPassword !== confirmNewPassword) {
        failureMessage.textContent = "New Password and Confirm New Password don't match."
        failureAlert.openAlert()
        return
    }

    if (localStorage.getItem('users') === null) {
        failureMessage.textContent = 'User Not Found.'
        failureAlert.openAlert()
        return
    }

    const users = JSON.parse(localStorage.getItem('users'))

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId && users[i].email === email) {
            users[i].password = newPassword
            localStorage.setItem('users', JSON.stringify(users))
            localStorage.setItem('currentUser', JSON.stringify(users[i]))

            successAlert.openAlert()
            // Wait until alert clears from the screen then redirect.
            setTimeout(() => location.href = 'index.html', 5201)
            return
        }
    }

    failureMessage.textContent = 'User Not Found.'
    failureAlert.openAlert()
})