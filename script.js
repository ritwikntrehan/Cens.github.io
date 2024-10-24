document.addEventListener('DOMContentLoaded', function() {
    const headerSelect = document.getElementById('headerSelect');
    const rowSelect = document.getElementById('rowSelect');

    fetchCSV('New.csv').then(csvData => {
        const parsedData = parseCSV(csvData);
        populateHeaders(parsedData[0]); // Populate headers from the first row
        populateRows(parsedData); // Populate rows from the first column
    });

    document.getElementById('dropdownForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const selectedHeader = headerSelect.value;
        const selectedRow = rowSelect.value;

        fetchCSV('New.csv').then(csvData => {
            const parsedData = parseCSV(csvData);
            const headerIndex = parsedData[0].indexOf(selectedHeader);
            const rowIndex = parsedData.findIndex(row => row[0] === selectedRow);

            if (headerIndex !== -1 && rowIndex !== -1) {
                const value = parsedData[rowIndex][headerIndex];
                document.getElementById('result').innerText = `Value: ${value}`;
            }
        });
    });
});

function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text());
}

function parseCSV(data) {
    return data.split('\n').map(row => row.split(','));
}

function populateHeaders(headers) {
    headers.forEach(header => {
        const option = document.createElement('option');
        option.value = header;
        option.innerText = header;
        document.getElementById('headerSelect').appendChild(option);
    });
}

function populateRows(data) {
    data.forEach((row, index) => {
        if (index > 0) { // Skip the header row
            const option = document.createElement('option');
            option.value = row[0]; // Use first column value
            option.innerText = row[0];
            document.getElementById('rowSelect').appendChild(option);
        }
    });
}
