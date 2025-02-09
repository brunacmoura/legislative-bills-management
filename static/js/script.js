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

function showOverview(bill) {
    let status = "Approved"
    if (bill.supporters > bill.opposers){
        status = "Rejected" 
    }
    console.log(bill)
    document.getElementById("overview-title").innerText = bill.title;
    document.getElementById("overview-status").innerText = status;
    document.getElementById("overview-supporters").innerText = bill.supporters;
    document.getElementById("overview-opposers").innerText = bill.opposers;
    document.getElementById("overview-sponsor-name").innerText = bill.name;
    
    updateList("overview-supporter-names", bill.supporter_names, "No supporters");
    updateList("overview-opposer-names", bill.opposer_names, "No opposers");

    let totalVotes = bill.supporters + bill.opposers;
    let supportersWidth = (bill.supporters / totalVotes) * 100;
    let opposersWidth = (bill.opposers / totalVotes) * 100;

    document.getElementById("supporters-bar").style.width = supportersWidth + "%";
    document.getElementById("opposers-bar").style.width = opposersWidth + "%";

    document.getElementById("bill-overview").style.display = "block";
}

function updateList(elementId, names, emptyMessage) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = "";

    if (names.length > 0) {
        names.forEach(name => {
            const listItem = document.createElement("li");
            listItem.textContent = name;
            listElement.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = emptyMessage;
        listItem.style.fontStyle = "italic";
        listElement.appendChild(listItem);
    }
}

filterTable("search-legislators", "#legislators-table", 2);
filterTable("search-bills", "#bills-table", 2);