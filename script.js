async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.split('\n').map(row => row.split(','));
    return rows;
}

function createDropdowns(headers) {
    const dropdownContainer = document.getElementById('dropdowns');
    headers.forEach((header, index) => {
        const label = document.createElement('label');
        label.innerText = `Menu ${index + 1}: `;
        const select = document.createElement('select');
        select.id = `menu${index + 1}`;
        select.name = `menu${index + 1}`;

        // Add options from the headers
        headers.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.innerText = option;
            select.appendChild(optionElement);
        });

        dropdownContainer.appendChild(label);
        dropdownContainer.appendChild(select);
        dropdownContainer.appendChild(document.createElement('br'));
    });
}

document.getElementById('dropdownForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    let sum = 0;
    for (let i = 1; i <= 5; i++) {
        const value = parseInt(document.getElementById(`menu${i}`).value);
        sum += value;
    }
    
    document.getElementById('result').innerText = 'Total Sum: ' + sum;
});

(async function() {
    const csvData = await fetchCSV('Dsb.csv');
    const parsedData = parseCSV(csvData);
    createDropdowns(parsedData[0]); // Use the first row for dropdown options
})();
