document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-cuisine-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Get form values
        const name = document.getElementById('meal-name').value;
        const calories = document.getElementById('calories').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;

        // Validation
        if (!name || !calories || !price || !description) {
            alert('Please fill in all fields.');
            return;
        }
        if (/^\d/.test(name)) {
            alert('The name cannot start with a number.');
            return;
        }
        if (isNaN(parseFloat(calories)) || isNaN(parseFloat(price))) {
            alert('Calories and price must be numbers.');
            return;
        }

        // Store in local storage
        let meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.push({
            name: name,
            calories: calories,
            price: price,
            description: description
        });
        localStorage.setItem('meals', JSON.stringify(meals));

        // Success alert and clear form
        alert(`The new meal "${name}" has been added successfully.`);
        form.reset(); // Reset all form fields
    });
});
