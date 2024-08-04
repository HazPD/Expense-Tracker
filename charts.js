var table = document.getElementById("TableBody");

// Extract the data
var dates = [];
var amounts = [];

// Loop through table rows (skip the header)
for (var i = 0, row; (row = table.rows[i]); i++) {
    dates.push(row.cells[2].innerText);
    amounts.push(parseFloat(row.cells[1].innerText));
}

// Create the chart
var ctx = document.getElementById("expenseChart").getContext("2d");
var expenseChart = new Chart(ctx, {
    type: "bar", // or 'bar', 'pie', etc.
    data: {
        labels: dates,
        datasets: [
            {
                label: "Expense Cost per day",
                data: dates,
                backgroundColor: "rgba(63, 183, 235, 1)",
                borderColor: "rgba(63, 183, 235,1)",
                borderWidth: 1,
                barThickness: 20,
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
        var date = row.cells[2].innerText;
        var amount = parseFloat(row.cells[1].innerText);

        if (aggregatedData[date]) {
            aggregatedData[date] += amount;
        } else {
            aggregatedData[date] = amount;
        }
    }

    // Separate the keys and values into arrays
    var dates = Object.keys(aggregatedData);
    var amounts = Object.values(aggregatedData);

    expenseChart.data.labels = dates;
    expenseChart.data.datasets[0].data = amounts;
    expenseChart.update();
}

setTimeout(updateChart, 500);
