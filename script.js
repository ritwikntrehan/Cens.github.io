document.addEventListener('DOMContentLoaded', () => {
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const headers = lines[0].split(',');

            const form = document.getElementById('dropdownForm');

            headers.forEach((header, index) => {
                const label = document.createElement('label');
                label.setAttribute('for', `menu${index + 1}`);
                label.textContent = header;

                const select = document.createElement('select');
                select.id = `menu${index + 1}`;
                select.name = `menu${index + 1}`;
                
                // You can customize the options here
                select.innerHTML = `
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                `;

                form.appendChild(label);
                form.appendChild(select);
            });

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Submit';
            form.appendChild(submitButton);

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                let sum = 0;

                for (let i = 0; i < headers.length; i++) {
                    const selectedValue = parseInt(document.getElementById(`menu${i + 1}`).value);
                    sum += selectedValue;
                }

                document.getElementById('result').innerText = 'Total Sum: ' + sum;
            });
        })
        .catch(error => console.error('Error fetching CSV:', error));
});
