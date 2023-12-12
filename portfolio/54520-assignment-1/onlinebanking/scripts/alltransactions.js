import Header from "../../scripts/header.min.js"
import { formatCurrency, TRStringToNodes, formatDate, logout } from "./utilities.min.js"

// Redirects user to logged in page if they are not logged in.
if (localStorage.getItem('currentUser') === null) location.href = 'login.html'
else document.querySelector('body').classList.remove('hidden')

Header()
logout()

const user = JSON.parse(localStorage.getItem('currentUser'))
const tbody = document.getElementById('transactions')
// Combine all of the transactions
const transactions = user.transactions.pos.concat(user.transactions.billPayments, user.transactions.transfers)
// Sorts from newest to oldest
transactions.sort((a, b) => {
    return b.createdOn - a.createdOn
})

document.getElementById('name').textContent = user.name
document.getElementById('balance').textContent = formatCurrency(user.balance)

transactions.forEach(t => {
    tbody.append(...TRStringToNodes(`
        <tr>
            <td>${t.company ? t.company : t.payee}</td>
            <td>${formatDate(t.createdOn)}</td>
            <td>${formatCurrency(t.amount)}</td>
            <td>${t.type}</td>
        </tr>
    `))
})