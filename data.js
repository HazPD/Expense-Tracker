function tableToCSV() {
    let csv_data = [];
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll("td,th");

        let csvrow = [];
        for (let j = 0; j < cols.length - 1; j++) {
            csvrow.push(cols[j].innerText.trim());
        }
        csv_data.push(csvrow.join(","));
    }

    let csv_content = csv_data.join("\n");

    downloadCSVFile(csv_content);

    function downloadCSVFile(csv_content) {
        let CSVFile = new Blob([csv_content], { type: "text/csv" });
        let temp_link = document.createElement("a");
        temp_link.download = "data.csv";

        let url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        temp_link.click();
        document.body.removeChild(temp_link);
    }
}

const dl = document.getElementById("Save");
dl.addEventListener("click", () => {
    tableToCSV();
});

// Function import

function importCSV(event) {
    let file = event.target.files[0];
    console.log("File selected:", file);

    if (!file) {
        alert("Please select a CSV file to import.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        try {
            let csvContent = event.target.result;
            console.log("CSV content:", csvContent);
            let rows = csvContent
                .split("\n")
                .map((row) => row.split(",").map((cell) => cell.trim()));

            let tableBody = document.querySelector("#TableBody");
            tableBody.innerHTML = "";

            rows.slice(1).forEach((row, rowIndex) => {
                if (row.length > 1) {
                    let newRow = tableBody.insertRow();
                    row.forEach((cell, cellIndex) => {
                        let newCell = newRow.insertCell(cellIndex);
                        newCell.innerText = cell;
                    });

                    let actionCell = newRow.insertCell();
                    let deleteButton = document.createElement("button");
                    deleteButton.innerText = "Delete";
                    deleteButton.onclick = function () {
                        newRow.remove();
                    };
                    actionCell.appendChild(deleteButton);
                }
            });
        } catch (error) {
            console.error("Error parsing CSV:", error);
        }
    };

    reader.onerror = function () {
        console.error("Error reading file.");
    };

    reader.readAsText(file);
}

document.getElementById("Import").addEventListener("click", function () {
    console.log("Import button clicked");
    document.getElementById("csvFileInput").click();
});
document.getElementById("csvFileInput").addEventListener("change", importCSV);

// Function Reset

const BodyHide = document.querySelector(".containerBody");
const ok = document.getElementById("yes");
const abort = document.getElementById("cancel");
const erase = document.getElementById("reset");

ok.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

abort.addEventListener("click", () => {
    BodyHide.style.display = "none";
});

erase.addEventListener("click", () => {
    BodyHide.style.display = "block";
});
