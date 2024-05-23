// Get references to the input fields
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("amount");
const expenseDateInput = document.getElementById("date");
const expenseListUl = document.getElementById("expenseList");
const totalAmountSpan = document.getElementById("totalAmount");

function addExpense() {
    // Retrieve existing expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Create a new expense object
    const expense = {
        id: Date.now(),
        name: expenseNameInput.value,
        amount: parseFloat(expenseAmountInput.value),
        date: expenseDateInput.value,
    };

    // Add the new expense to the expenses array
    expenses.push(expense);

    // Store the updated expenses array back into localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Clear the input fields
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    expenseDateInput.value = "";

    // Display the updated expenses
    displayExpenses();
}

function displayExpenses() {
    // Retrieve expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Clear the current list
    expenseListUl.innerHTML = "";

    // Calculate the total amount
    let total = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    // Create and append each expense list item
    expenses.forEach(expense => {
        let expenseLi = document.createElement("li");
        expenseLi.id = expense.id;
        expenseLi.innerHTML = `
            <span class="expense-name">${expense.name}</span>
            <span class="expense-amount">${expense.amount}</span>
            <span class="expense-date">${expense.date}</span>
            <button onclick="removeExpense(event)">Remove</button>
        `;
        expenseListUl.appendChild(expenseLi);
    });

    // Display the total amount
    totalAmountSpan.textContent = total.toFixed(2);
}

function removeExpense(event) {
    const button = event.target;
    const li = button.closest("li");
    const expenseId = parseInt(li.id, 10);

    // Retrieve expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Filter out the removed expense
    expenses = expenses.filter(expense => expense.id !== expenseId);

    // Store the updated expenses array back into localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Remove the expense item from the list
    expenseListUl.removeChild(li);
    displayExpenses();
}

// Initialize the display of expenses on page load
document.addEventListener("DOMContentLoaded", displayExpenses);
