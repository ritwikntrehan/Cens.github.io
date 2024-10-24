async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.split('\n').map(row => row.split(','));
    return rows;
}

function populateHeaders(headers) {
    const headerSelect = document.getElementById('headerSelect');
    headers.forEach(header => {
        const option = document.createElement('option');
        option.value = header;
        option.innerText = header;
        headerSelect.appendChild(option);
    });
}

function populateRows(data) {
    const rowSelect = document.getElementById('rowSelect');
    data.forEach((row, index) => {
        if (index > 0) { // Skip the header row
            const option = document.createElement('option');
            option.value = row[0]; // Use first column value
            option.innerText = row[0];
            rowSelect.appendChild(option);
        }
    });
}

document.getElementById('dropdownForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const selectedHeader = document.getElementById('headerSelect').value;
    const selectedRow = document.getElementById('rowSelect').value;

    fetchCSV('data.csv').then(csvData => {
        const parsedData = parseCSV(csvData);
        const headerIndex = parsedData[0].indexOf(selectedHeader);
        const rowIndex = parsedData.findIndex(row => row[0] === selectedRow);

        if (headerIndex !== -1 && rowIndex !== -1) {
            const value = parsedData[rowIndex][headerIndex];
            document.getElementById('result').innerText = `Value: ${value}`;
        }
    });
});

(async function() {
    const csvData = await fetchCSV('New.csv');
    const parsedData = parseCSV(csvData);
    
    populateHeaders(parsedData[0]); // Populate headers from the first row
    populateRows(parsedData); // Populate rows from the first column
})();
