async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.split('\n').map(row => row.split(','));
}

function createDropdowns(data) {
    const dropdownContainer = document.getElementById('dropdowns');
    data[0].forEach((option, index) => {
        const select = document.createElement('select');
        select.id = `menu${index + 1}`;
        data.slice(1).forEach(row => {
            const opt = document.createElement('option');
            opt.value = row[index].trim();
            opt.textContent = row[index].trim();
            select.appendChild(opt);
        });
        const label = document.createElement('label');
        label.textContent = `Menu ${index + 1}: `;
        label.appendChild(select);
        dropdownContainer.appendChild(label);
        dropdownContainer.appendChild(document.createElement('br'));
    });
}

document.getElementById('dropdownForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let sum = 0;
    for (let i = 1; i <= document.getElementById('dropdowns').childElementCount / 2; i++) {
        const value = parseInt(document.getElementById(`menu${i}`).value);
        sum += value || 0; // Add to sum, treat NaN as 0
    }

    document.getElementById('result').innerText = 'Total Sum: ' + sum;
});

// Load the CSV and create dropdowns
fetchCSV('Dsb.csv').then(createDropdowns).catch(console.error);
