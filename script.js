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

// EVENT LISTENERS FOR RESET
const containerBody = document.querySelector(".containerBody");
const Yes = document.getElementById("yes");
const Cancel = document.getElementById("cancel");
const reset = document.getElementById("reset");

Yes.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

Cancel.addEventListener("click", () => {
    containerBody.style.display = "none";
});

reset.addEventListener("click", () => {
    containerBody.style.display = "block";
});

// Function for CSV

function tableToCSV() {
    // Variable to store the final csv data
    let csv_data = [];
    // Get each row data
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        // Get each column data
        let cols = rows[i].querySelectorAll("td,th");

        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length - 1; j++) {
            // Get the text data of each cell of
            // a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }
    // Combine each row data with new line character
    /* We will use this function later to download
            the data in a csv file downloadCSVFile(csv_data);
            */
    downloadCSVFile(csv_data);

    function downloadCSVFile(csv_data) {
        // Create CSV file object and feed
        // our csv_data into it
        CSVFile = new Blob([csv_data], {
            type: "text/csv",
        });

        // Create to temporary link to initiate
        // download process
        let temp_link = document.createElement("a");

        // Download csv file
        temp_link.download = "GfG.csv";
        let url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);
        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
    }
}

const download = document.getElementById("Save");
download.addEventListener("click", () => {
    tableToCSV();
});
