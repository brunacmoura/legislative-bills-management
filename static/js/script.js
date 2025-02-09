function filterTable(inputId, tableId, columnIndex) {
    const input = document.getElementById(inputId);
    const table = document.querySelector(tableId);
    const rows = table.querySelectorAll("tbody tr");

    input.addEventListener("input", function(event) {
        const searchTerm = event.target.value.toLowerCase();
        rows.forEach(row => {
            const cellText = row.querySelector(`td:nth-child(${columnIndex})`).textContent.toLowerCase();
            row.style.display = cellText.includes(searchTerm) ? "" : "none";
        });
    });
}

filterTable("search-legislators", "#legislators-table", 2);
filterTable("search-bills", "#bills-table", 2);