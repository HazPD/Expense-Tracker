var table = document.getElementById("TableBody");
var categories = [];
var amounts = [];

// Loop through table rows (skip the header)
for (var i = 0, row; (row = table.rows[i]); i++) {
    categories.push(row.cells[3].innerText);
    amounts.push(parseFloat(row.cells[1].innerText));
}

// Create the chart
var ctx = document.getElementById("expenseChart").getContext("2d");
var expenseChart = new Chart(ctx, {
    type: "bar", // or 'bar', 'pie', etc.
    data: {
        labels: categories,
        datasets: [
            {
                label: "Expenses",
                data: amounts,
                backgroundColor: [
                    "rgba(63, 183, 235, 1)",
                    "rgba(251, 192, 147,1)",
                    "rgba(255, 0, 0,1)",
                ],
                borderColor: [
                    "rgba(63, 183, 235,1)",
                    "rgba(251, 192, 147,1)",
                    "rgba(255, 0, 0,1)",
                ],
                borderWidth: 1,
                barThickness: 30,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                suggestedMax: 3000,
            },
        },
    },
});

// CHART UPDATE
function updateChart() {
    var aggregatedData = {};
    for (var i = 0, row; (row = table.rows[i]); i++) {
        var category = row.cells[3].innerText;
        var amount = parseFloat(row.cells[1].innerText);

        if (aggregatedData[category]) {
            aggregatedData[category] += amount;
        } else {
            aggregatedData[category] = amount;
        }
    }

    // Separate the keys and values into arrays
    var categories = Object.keys(aggregatedData);
    var amounts = Object.values(aggregatedData);

    expenseChart.data.labels = categories;
    expenseChart.data.datasets[0].data = amounts;
    expenseChart.update();
}

setTimeout(updateChart, 500);
