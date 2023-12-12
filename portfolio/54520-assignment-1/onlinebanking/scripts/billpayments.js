import Header from "../../scripts/header.min.js"
import { formatCurrency, TRStringToNodes, formatDate, logout } from "./utilities.min.js"

// Redirects user to logged in page if they are not logged in.
if (localStorage.getItem('currentUser') === null) location.href = 'login.html'
else document.querySelector('body').classList.remove('hidden')

Header()
logout()

const user = JSON.parse(localStorage.getItem('currentUser'))
const users = JSON.parse(localStorage.getItem('users'))
// Find the index of the current user
const userIndex = users.map(e => e.userId).indexOf(user.userId)

const tbody = document.getElementById('billPayments')
const billPayments = user.transactions.billPayments
// Sorts from newest to oldest
billPayments.sort((a, b) => {
    return b.createdOn - a.createdOn
})

document.getElementById('name').textContent = user.name
document.getElementById('balance').textContent = formatCurrency(user.balance)
// Set maximum transfer amount to user's balance
document.getElementById('amount').max = user.balance

billPayments.forEach(t => {
    tbody.append(...TRStringToNodes(`
        <tr>
            <td>${t.company}</td>
            <td>${formatDate(t.createdOn)}</td>
            <td>${formatCurrency(t.amount)}</td>
        </tr>
    `))
})

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()

    document.querySelector('rwc-alert').openAlert()

    //** Update user's balance and bill payments
    user.balance -= +this.amount.value
    user.transactions.billPayments.push({
        company: this.name.value.trim(),
        amount: +this.amount.value,
        createdOn: new Date().getTime(),
        type: 'Bill'
    })
    users[userIndex] = user

    // Save updated info
    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('users', JSON.stringify(users))

    // Wait until alert is removed to reload the page
    setTimeout(() => location.reload(), 5201);
})