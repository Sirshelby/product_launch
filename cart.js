function formatMoney(value) {
    return "$" + value.toFixed(2);
}

function renderCart() {
    var existing = localStorage.getItem("cartItems");
    var items = existing ? JSON.parse(existing) : [];

    var emptyMessage = document.getElementById("cart-empty");
    var table = document.getElementById("cart-table");
    var tbody = document.getElementById("cart-items-body");
    var totalElement = document.getElementById("cart-total");
    var checkoutLink = document.getElementById("checkout-link");

    if (!emptyMessage || !table || !tbody || !totalElement || !checkoutLink) {
        return;
    }

    tbody.innerHTML = "";

    if (items.length === 0) {
        emptyMessage.style.display = "block";
        table.style.display = "none";
        totalElement.textContent = "";
        checkoutLink.style.pointerEvents = "none";
        checkoutLink.style.opacity = "0.6";
        return;
    }

    emptyMessage.style.display = "none";
    table.style.display = "table";
    checkoutLink.style.pointerEvents = "auto";
    checkoutLink.style.opacity = "1";

    var total = 0;
    var i;

    for (i = 0; i < items.length; i++) {
        var item = items[i];
        var quantity = item.quantity || 0;
        var price = item.price || 0;
        var subtotal = quantity * price;
        total += subtotal;

        var tr = document.createElement("tr");

        var nameCell = document.createElement("td");
        nameCell.textContent = item.name || "";
        tr.appendChild(nameCell);

        var optionsCell = document.createElement("td");
        var text = "";
        if (item.size) {
            text += "Size: " + item.size + " ";
        }
        if (item.strap) {
            text += "Strap: " + item.strap + " ";
        }
        if (item.colour) {
            text += "Colour: " + item.colour;
        }
        optionsCell.textContent = text.trim();
        tr.appendChild(optionsCell);

        var qtyCell = document.createElement("td");
        qtyCell.textContent = String(quantity);
        tr.appendChild(qtyCell);

        var priceCell = document.createElement("td");
        priceCell.textContent = formatMoney(price);
        tr.appendChild(priceCell);

        var subtotalCell = document.createElement("td");
        subtotalCell.textContent = formatMoney(subtotal);
        tr.appendChild(subtotalCell);

        tbody.appendChild(tr);
    }

    totalElement.textContent = "Cart total: " + formatMoney(total);
}

document.addEventListener("DOMContentLoaded", function() {
    renderCart();

    var clearButton = document.getElementById("clear-cart");
    if (clearButton) {
        clearButton.addEventListener("click", function() {
            localStorage.removeItem("cartItems");
            renderCart();
        });
    }

    var backButton = document.getElementById("back-to-product");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.location.href = "product_launch.html";
        });
    }
});