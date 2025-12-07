function formatMoney(value) {
    return "$" + value.toFixed(2);
}

function renderCheckout() {
    var existing = localStorage.getItem("cartItems");
    var items = existing ? JSON.parse(existing) : [];

    var emptyMessage = document.getElementById("checkout-empty");
    var table = document.getElementById("checkout-table");
    var tbody = document.getElementById("checkout-items-body");
    var totalElement = document.getElementById("checkout-total");
    var form = document.getElementById("checkout-form");

    if (!emptyMessage || !table || !tbody || !totalElement || !form) {
        return;
    }

    tbody.innerHTML = "";

    var submitButton = form.querySelector("button[type='submit']");

    if (items.length === 0) {
        emptyMessage.style.display = "block";
        table.style.display = "none";
        totalElement.textContent = "";
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = "0.6";
        }
        return;
    }

    emptyMessage.style.display = "none";
    table.style.display = "table";
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
    }

    var total = 0;

    items.forEach(function(item) {
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

        var subtotalCell = document.createElement("td");
        subtotalCell.textContent = formatMoney(subtotal);
        tr.appendChild(subtotalCell);

        tbody.appendChild(tr);
    });

    totalElement.textContent = "Order total: " + formatMoney(total);
}

document.addEventListener("DOMContentLoaded", function() {
    renderCheckout();

    var backButton = document.getElementById("back-to-cart");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.location.href = "cart.html";
        });
    }

    var form = document.getElementById("checkout-form");
    var status = document.getElementById("checkout-status");

    if (form && status) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            status.textContent = "Order placed successfully. Thank you for your purchase.";
            status.style.display = "block";
            status.style.backgroundColor = "#d1fae5";
            status.style.color = "#065f46";
            status.style.border = "1px solid #065f46";

            localStorage.removeItem("cartItems");
            renderCheckout();
        });
    }
});