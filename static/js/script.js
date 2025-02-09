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

function showTab(tabName, btn) {
    const tabs = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.getElementById(tabName);
    activeTab.classList.add('active');

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.disabled = false; 
    });

    btn.classList.add('active');
    btn.disabled = true;
}

function showOverview(title, supporters, opposers, sponsor_name) {
    let status = "Approved"
    if (supporters > opposers){
        status = "Rejected" 
    }
    document.getElementById("overview-title").innerText = title;
    document.getElementById("overview-status").innerText = status;
    document.getElementById("overview-supporters").innerText = supporters;
    document.getElementById("overview-opposers").innerText = opposers;
    document.getElementById("overview-sponsor-name").innerText = sponsor_name;

    let totalVotes = supporters + opposers;
    let supportersWidth = (supporters / totalVotes) * 100;
    let opposersWidth = (opposers / totalVotes) * 100;

    document.getElementById("supporters-bar").style.width = supportersWidth + "%";
    document.getElementById("opposers-bar").style.width = opposersWidth + "%";

    document.getElementById("bill-overview").style.display = "block";
}


filterTable("search-legislators", "#legislators-table", 2);
filterTable("search-bills", "#bills-table", 2);