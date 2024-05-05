document.addEventListener("DOMContentLoaded", function () {
  const mealsContainer = document.getElementById("cart-items");
  const cuisines = JSON.parse(localStorage.getItem("order"));
  // Function to create meal's template
  function mealTemplate(meal) {
    return `
    <div class="cart-item">
        <img src="${meal.photo}" alt="Meal 1" class="item-image">
        <span class="item-name">${meal.name}</span>
        <span></span>
        <span class="item-price">SR${meal.price}</span>
        <input type="number" class="item-quantity" min="1" value="${
          meal.quantity
        }">
        <span class="item-total">SR${meal.price * meal.quantity}</span>
        <button class="remove-item"><img src="trashicon.jpg" alt="Remove Item"></button>
    </div>
    `;
  }

  // dispaly meals
  let total = 0; // total price
  function displayMeals() {
    cuisines.forEach((cuisine) => {
      total += parseFloat(cuisine.price * cuisine.quantity);
      const meal = mealTemplate(cuisine);
      mealsContainer.innerHTML += meal;
    });
  }
  displayMeals();

  // Grand total
  updateGrandTotal();

  const cartItems = document.getElementById("cart-items");
  const removeItem = document.getElementById("cart-items");
  const clearCartBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");

  // Update total when quantity changes
  cartItems.addEventListener("input", function (e) {
    if (e.target.classList.contains("item-quantity")) {
      const quantity = parseInt(e.target.value) || 0;
      const pricePerItem = parseFloat(
        e.target
          .closest(".cart-item")
          .querySelector(".item-price")
          .textContent.replace("SR", "")
      );
      const total = quantity * pricePerItem;
      e.target
        .closest(".cart-item")
        .querySelector(".item-total").textContent = `SR${total.toFixed(2)}`;
      updateGrandTotal();
    }
  });

  // Delete an item from the cart
  const meals = document.querySelectorAll(".cart-item");
  meals.forEach((item) => {
    const removeItem = item.querySelector(".remove-item");
    removeItem.addEventListener("click", function (e) {
      const newCartMeals = []; // list of undeleted meals
      const mealName = e.target
        .closest(".cart-item")
        .querySelector(".item-name").innerHTML;
      console.log(mealName);
      cuisines.forEach((cuisine) => {
        if (cuisine.name !== mealName) {
          newCartMeals.push(cuisine);
        }
      });
      localStorage.setItem("order", JSON.stringify(newCartMeals)); // set new offers
      location.reload(); // reload page
    });
  });

  // Clear the entire cart
  clearCartBtn.addEventListener("click", function () {
    localStorage.removeItem('order');
    location.reload();
  });

  // Update the grand total
  function updateGrandTotal() {
    let total = 0;
    document.querySelectorAll(".item-total").forEach((item) => {
      total += parseFloat(item.textContent.replace("SR", ""));
    });
    document.querySelector(
      ".total-label"
    ).textContent = `Grand Total: SR ${total.toFixed(2)}`;
  }

  // Checkout button logic
  checkoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const total = document
      .querySelector(".total-label")
      .textContent.split(": ")[1];
    alert(`Checking out, total to pay: ${total}`);
    window.location.href = "eval.HTML"; // Redirect to evaluation page
  });
});
document.getElementById('theme-toggle').addEventListener('click', function() {
  var body = document.body;
  body.classList.toggle('dark-theme'); // Toggle the dark theme on body

  // Toggle and store the theme state in localStorage
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }

  // Also toggle the header image along with the theme
  var headerImg = document.querySelector('.header-image img');
  if (body.classList.contains('dark-theme')) {
    headerImg.src = '23.png'; // Path to the dark theme image
  } else {
    headerImg.src = '1.png'; // Path back to the original image
  }
});

// On page load, set the theme based on what's stored in localStorage
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    document.querySelector('.header-image img').src = '23.png';
  }
});
