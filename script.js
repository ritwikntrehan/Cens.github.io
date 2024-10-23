document.getElementById('dropdownForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values of the selected options
    const menu1Value = parseInt(document.getElementById('menu1').value);
    const menu2Value = parseInt(document.getElementById('menu2').value);
    const menu3Value = parseInt(document.getElementById('menu3').value);
    const menu4Value = parseInt(document.getElementById('menu4').value);
    const menu5Value = parseInt(document.getElementById('menu5').value);

    // Calculate the sum
    const sum = menu1Value + menu2Value + menu3Value + menu4Value + menu5Value;

    // Display the result
    document.getElementById('result').innerText = 'Total Sum: ' + sum;
});
