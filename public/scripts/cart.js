document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    let lista = document.getElementById('proizvodi'); 
    lista.innerHTML = '';
    Object.entries(cart).forEach(([productId, quantity]) => {
        addItem(productId, quantity);
    });
}

function addItem(productId, quantity) {
    let [categoryId, itemId] = productId.split("-");
    let categoryName = podatci.find(category => category.id === categoryId)?.name;
    let itemName = podatci.find(category => category.id === categoryId)?.products.find(product => product.id === productId)?.name;

    let lista = document.getElementById('proizvodi');
    let cnt = quantity;
    let div = document.createElement("div");
    div.id = `${productId}div`;
    div.className = "pro";

    let div1 = document.createElement("div");
    div1.className = "proizvodText";
    div1.innerHTML = `<p id="${productId}"> ${itemName} </p>`;

    let div2 = document.createElement("div");
    div2.className = "proizvodButton";
    div2.setAttribute("data", productId);
    div2.innerHTML = `
        <button id="${productId}mns"> - </button>
        <p id ="${productId}cnt"> ${cnt} </p>
        <button id="${productId}pls"> + </button>
        <button id="${productId}rmv"> makni </button>
    `;

    div.appendChild(div1);
    div.appendChild(div2);

    lista.appendChild(div);

    document.getElementById(`${productId}pls`).addEventListener('click', () => updateQuantity(productId, cnt + 1));
    document.getElementById(`${productId}mns`).addEventListener('click', () => updateQuantity(productId, cnt - 1));
    document.getElementById(`${productId}rmv`).addEventListener('click', () => removeItem(productId));
}

async function updateQuantity(productId, newQuantity) {
    await fetch(`/cart/update/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
    });
    loadCart();
}

async function removeItem(productId) {
    await fetch(`/cart/remove/${productId}`, { method: 'DELETE' });
    loadCart();
}


/*

DOBRA VERZIJA
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    let lista = document.getElementById('proizvodi'); 
    lista.innerHTML = '';
    Object.entries(cart).forEach(([productId, quantity]) => {
        addItem(productId, quantity);
    });
}

function addItem(productId, quantity) {
    let [categoryId, itemId] = productId.split("-");
    let categoryName = podatci.find(category => category.id === categoryId)?.name;
    let itemName = podatci.find(category => category.id === categoryId)?.products.find(product => product.id === productId)?.name;
    let lista = document.getElementById('proizvodi');
    let item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
        <span>${itemName}  </span>
        <span>Kolicina ${quantity}</span>
        <button class="increase" data-id="${productId}">+</button>
        <button class="decrease" data-id="${productId}">-</button>
        <button class="remove" data-id="${productId}">Remove</button>
    `;
    lista.appendChild(item);
    item.querySelector('.increase').addEventListener('click', () => updateQuantity(productId, quantity + 1));
    item.querySelector('.decrease').addEventListener('click', () => updateQuantity(productId, quantity - 1));
    item.querySelector('.remove').addEventListener('click', () => removeItem(productId));
}

async function updateQuantity(productId, newQuantity) {
    await fetch(`/cart/update/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
    });
    loadCart();
}

async function removeItem(productId) {
    await fetch(`/cart/remove/${productId}`, { method: 'DELETE' });
    loadCart();
}
*/

/*
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    let lista = document.getElementById('#proizvodi');
    lista.innerHTML = '';
    Object.entries(cart).forEach(([productId, quantity]) => {
        addItem(productId, quantity);
    });
}

function addItem(productId, quantity) {
    let [categoryId, itemId] = productId.split("-");
    let categoryName = podatci.find(category => category.id === categoryId)?.name;
    let itemName = podatci.find(category => category.id === categoryId)?.products.find(product => product.id === productId)?.name;
    console.log(itemName);

    let lista = document.getElementById('proizvodi');
    let div1 = null;
    let cnt = quantity;
    setSessionItem(productId,cnt);
    let div = document.createElement("div");
    div.id = `${productId}div`;
    div.classList = "pro";
    div1 = document.createElement("div");
    div1.classList = "proizvodText";
    let div2 = document.createElement("div");
    div2.classList = "proizvodButton";
    div2.setAttribute("data", productId);

    div1.innerHTML = `
    <p id="${productId}"> ${itemName} </p>`;

    div2.innerHTML = `
    <button id="${productId}mns"> - </button> ` +
        `<p id ="${productId}cnt" > ${cnt} </p> ` +
        `<button id="${productId}pls"> + </button> `;

    div.appendChild(div1);
    div.appendChild(div2);

    lista.appendChild(div);

    document.getElementById(`${productId}mns`).onclick = function () {
        removeOne(productId);
        updateCount(productId, -1);
    };

    document.getElementById(`${productId}pls`).onclick = function () {
        addItem(productId);
        updateCount(productId, 1);
    };
};

function updateCount(productId, delta) {
    let cnt = parseInt(getSessionItem(productId)) || 0;
    cnt += delta;
    if (cnt < 0) cnt = 0; // prevent negative count
    setSessionItem(productId, cnt);

    if (cnt === 0) {
        // Remove the div if count is zero
        let divToRemove = document.getElementById(`${productId}div`);
        if (divToRemove) {
            divToRemove.remove();
        }
    } else {
        // Update the count in the DOM
        document.getElementById(`${productId}cnt`).innerText = cnt;
    }
}

async function addToCart(productId) {
    await fetch(`/cart/add/${productId}`, { method: 'POST' });
    alert('Kolicina povecana');
    updateCartCount();
}
async function removeOne(productId) {
    await fetch(`/cart/remove/${productId}`, { method: 'POST' });
    alert('Kolicina smanjena');
    updateCartCount();
}

function getSessionItem(name) {
    return sessionStorage.getItem(name);
}

function setSessionItem(name, value) {
    sessionStorage.setItem(name, value);
}

*/

/*
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    const proizvodiDiv = document.getElementById('proizvodi');
    proizvodiDiv.innerHTML = '';

    Object.entries(cart).forEach(([productId, quantity]) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <p>${productId}</p>
            <p>Quantity: ${quantity}</p>
        `;
        proizvodiDiv.appendChild(productDiv);
    });
}
*/

/*

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    const proizvodiDiv = document.getElementById('proizvodi');
    proizvodiDiv.innerHTML = '';

    Object.entries(cart).forEach(([productId, quantity]) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <p>${productId}</p>
            <p>Quantity: ${quantity}</p>
        `;
        proizvodiDiv.appendChild(productDiv);
    });
}

*/

/*
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    const proizvodiDiv = document.getElementById('proizvodi');
    proizvodiDiv.innerHTML = '';

    Object.entries(cart).forEach(([productId, quantity]) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <p>${productId}</p>
            <p>Quantity: ${quantity}</p>
        `;
        proizvodiDiv.appendChild(productDiv);
    });
}
*/
