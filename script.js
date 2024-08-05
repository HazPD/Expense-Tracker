// Global
let expenses = [];
let count = 0;
const totalAmount = document.getElementById("TotalDisplay");
Load();

// Function for total
function UpdateTotalAmount() {
    let sum = 0;
    expenses.forEach((el) => {
        sum += el.amount;
    });
    totalAmount.textContent = sum;
}

// Function for save
function Save() {
    localStorage.setItem("main", JSON.stringify(expenses));
    console.log("Saved successfully");
}

// Function for load
function Load() {
    if (JSON.parse(localStorage.getItem("main")))
        expenses = JSON.parse(localStorage.getItem("main"));
    console.log(expenses);
    if (expenses !== null) {
        expenses.forEach((ExpenseData) => {
            Display(
                ExpenseData.name,
                ExpenseData.amount,
                ExpenseData.date,
                ExpenseData.id,
                ExpenseData.category
            );
        });
    }
    UpdateTotalAmount();
}

// Function for display
function Display(name, amount, date, id, category) {
    const expenseBody = document.getElementById("TableBody");
    const Row = document.createElement("tr");

    // Updating table
    Row.innerHTML = `
                <td>${name.charAt(0).toUpperCase() + name.slice(1)}</td>
                <td>${amount}</td>
                <td>${date}</td>
                <td>${category}</td>
                <td><button class="delete">Delete</button></td>
            `;

    expenseBody.appendChild(Row);
    count += 1;

    Row.querySelector(".delete").addEventListener("click", function (e) {
        const del = id;
        expenses = expenses.filter((expense) => expense.id !== id);
        expenseBody.removeChild(Row);
        Save();
        updateChart();
        UpdateTotalAmount();
    });
}
// EVENT LISTENER FOR ADD EXPENSE BUTTON

document
    .getElementById("expense-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector(".data-name");
        const amount = document.querySelector(".data-amount");
        const date = new Date().toLocaleDateString();
        const category = document.querySelector("#category");
        const categoryCondition = document.querySelector("#firstOption").value;
        const expense = {
            id: count + 1,
            name: name.value,
            amount: parseFloat(amount.value),
            date,
            category: category.value,
        };

        if (
            name.value &&
            amount.value &&
            category.value !== categoryCondition
        ) {
            // if all fields have input
            Display(name.value, amount.value, date, expense.id, category.value);
            document.querySelector(".data-name").value = ""; // clear input fields
            document.querySelector(".data-amount").value = ""; // clear input fields
            document.getElementById("category").selectedIndex = 0;

            updateChart();
            name.focus();

            expenses.push(expense);
            UpdateTotalAmount(expense);
            Save();
        } else {
            alert("Please enter both name and amount and choose category");
        }
    });
