function addToCart() {
    const cartStatus = document.getElementById("cart-status");
    cartStatus.textContent = "Item added to cart! Proceed to checkout.";
    cartStatus.style.display = "block";
    cartStatus.style.backgroundColor = "#d1fae5";
    cartStatus.style.color = "#065f46";
    cartStatus.style.border = "1px solid #065f46";
}

function changeColor(colorName) {
    const image = document.getElementById("product-image");
    const colorLabel = document.getElementById("current-color");

    image.src = "https://placehold.co/400x400/1e3a8a/f0f0f0?text=Product+" + colorName.toUpperCase();
    colorLabel.textContent = colorName;
}

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButton = document.getElementById("buy-now-btn");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", addToCart);
    }

    const swatches = document.querySelectorAll(".color-swatch");
    swatches.forEach(function(swatch) {
        swatch.addEventListener("click", function() {
            const colorName = swatch.getAttribute("data-color");
            if (colorName) {
                changeColor(colorName);
            }
        });
    });
});