document.addEventListener('DOMContentLoaded', function() {
    fetch('Dsb.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const options = rows[0].split(',');

            for (let i = 1; i <= 5; i++) {
                const select = document.getElementById(`menu${i}`);
                options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.trim();
                    opt.textContent = option.trim();
                    select.appendChild(opt);
                });
            }
        })
        .catch(error => console.error('Error fetching the CSV:', error));
});
