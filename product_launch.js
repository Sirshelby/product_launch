function addToCart() {
    var sizeSelect = document.getElementById("size-select");
    var quantityInput = document.getElementById("quantity");
    var strapInputs = document.querySelectorAll("input[name='strap']");
    var colourLabel = document.getElementById("current-color");
    var status = document.getElementById("cart-status");

    if (!sizeSelect || !quantityInput || !status) {
        return;
    }

    var size = sizeSelect.value;
    var quantity = quantityInput.value;
    var strap = "";
    var i;

    for (i = 0; i < strapInputs.length; i++) {
        if (strapInputs[i].checked) {
            strap = strapInputs[i].value;
        }
    }

    if (!size || !quantity || !strap) {
        status.textContent = "Fill in all options before adding to cart.";
        status.style.display = "block";
        status.style.backgroundColor = "#fee2e2";
        status.style.color = "#b91c1c";
        status.style.border = "1px solid #b91c1c";
        return;
    }

    var item = {
        name: "Product X Ultra",
        size: size,
        quantity: parseInt(quantity, 10),
        strap: strap,
        colour: colourLabel ? colourLabel.textContent : "",
        price: 299
    };

    var items = [];
    var existing = localStorage.getItem("cartItems");

    if (existing) {
        items = JSON.parse(existing);
    }

    items.push(item);
    localStorage.setItem("cartItems", JSON.stringify(items));

    status.textContent = "Item added to cart.";
    status.style.display = "block";
    status.style.backgroundColor = "#d1fae5";
    status.style.color = "#065f46";
    status.style.border = "1px solid #065f46";

    window.location.href = "cart.html";
}

function changeColor(colorName) {
    var image = document.getElementById("product-image");
    var colorLabel = document.getElementById("current-color");

    if (image) {
        image.src = "https://placehold.co/400x400/1e3a8a/f0f0f0?text=Product+" + colorName.toUpperCase();
    }
    if (colorLabel) {
        colorLabel.textContent = colorName;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("buy-now-btn");
    if (button) {
        button.onclick = addToCart;
    }

    var swatches = document.querySelectorAll(".color-swatch");
    var i;
    for (i = 0; i < swatches.length; i++) {
        swatches[i].addEventListener("click", function() {
            var colorName = this.getAttribute("data-color");
            if (colorName) {
                changeColor(colorName);
            }
        });
    }

    var cartButton = document.getElementById("cart-button");
    if (cartButton) {
        cartButton.addEventListener("click", function() {
            window.location.href = "cart.html";
        });
    }
});