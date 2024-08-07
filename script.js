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
    totalAmount.textContent = sum
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
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

    const validCategory = ["Utility", "Food", "Others"].includes(category)
        ? category
        : "Unknown";
    Row.setAttribute("data-category", validCategory);

    // Updating table
    Row.innerHTML = `
                <td>${name.charAt(0).toUpperCase() + name.slice(1)}</td>
                <td>${amount}</td>
                <td>${date}</td>
                <td>${validCategory}</td>
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

// Filter buttons

const buttons = document.querySelectorAll("#filterButton button");

buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        buttons.forEach((btn) => btn.classList.remove("selected"));
        buttons.forEach((btn) => btn.classList.add("unselected"));

        this.classList.add("selected");
        this.classList.remove("unselected");

        filterTable(this.getAttribute("data-filter"));
    });
});

function filterTable(filter) {
    console.log(`Filtering for category: ${filter}`);
    const rows = document.querySelectorAll("#TableBody tr");
    rows.forEach((row) => {
        const category = row.getAttribute("data-category");
        console.log(`Row category: ${category}, Filter: ${filter}`);
        if (filter === "All" || category === filter) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });

    updateFilteredTotal(filter);
}

function updateFilteredTotal(filter) {
    let total = 0;
    expenses.forEach((expense) => {
        if (filter === "All" || expense.category === filter) {
            total += expense.amount;
        }
    });
    totalAmount.textContent = total.toFixed(2);
}
