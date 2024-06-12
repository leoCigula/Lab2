/*async function loadProducts(categoryId) {
    const response = await fetch(`/getProducts/${categoryId}`);
    console.log(response);
    const products = await response.json();
    const productsDiv = document.getElementById('proizvodi');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="/${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

async function addToCart(productId) {
    await fetch(`/cart/add/${productId}`, { method: 'POST' });
    alert('Product added to cart');
    updateCartCount();
}

async function updateCartCount() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    const itemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
    document.getElementById('num').innerText = itemCount;
}

document.addEventListener('DOMContentLoaded', updateCartCount);
*/

/*
async function loadProducts(categoryId) {
    const response = await fetch(`/getProducts/${categoryId}`);
    const products = await response.json();
    
    // Clear existing products
    const productsDiv = document.getElementById('proizvodi');
    productsDiv.innerHTML = '';

    // Use addItem logic to display products
    addItem(products);
}

function addItem(products) {
    let proiz = document.querySelector(".proizvodi");
    products.forEach(element => {
        let name = element["name"];
        let image = element["image"];
        
        let div = document.createElement("div");
        div.classList = "proizvod";
        div.setAttribute("data", name);
        div.innerHTML = `
            <img src="${image}">
            <p>${name}</p>
            <div class="cartHover"><img src="./images/kart.png"></div>
            <div class="numOfItem"><p id="num"></p></div>
        `;

        div.addEventListener('click', function() {
            let count = parseInt(localStorage.getItem(name)) || 0;
            count++;
            localStorage.setItem(name, count);
            updateCounter();
        });

        div.addEventListener('mouseenter', function () {
            this.querySelector(".numOfItem").style.display = "none";
            let child = this.querySelector(".cartHover");
            child.style.display = "block";
        });

        div.addEventListener('mouseleave', function () {
            let child = this.querySelector(".cartHover");
            child.style.display = "none";
            let count = parseInt(localStorage.getItem(name)) || 0;
            if(count > 0) {
                this.querySelector(".numOfItem>#num").textContent = count;
                this.querySelector(".numOfItem").style.display = "block";
            }
        });

        proiz.appendChild(div);
    });
}

async function addToCart(productId) {
    await fetch(`/cart/add/${productId}`, { method: 'POST' });
    alert('Product added to cart');
    updateCartCount();
}

async function updateCartCount() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    const itemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
    document.getElementById('num').innerText = itemCount;
}

document.addEventListener('DOMContentLoaded', updateCartCount);
*/

/*
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

async function loadProducts(categoryId) {
    const response = await fetch(`/getProducts/${categoryId}`);
    const products = await response.json();
    addItem(products);
}

function addItem(products) {
    let proiz = document.querySelector(".proizvodi");
    proiz.innerHTML='';
    products.forEach(element => {
        let name = element["name"];
        let image = element["image"];

        let div = document.createElement("div");
        div.classList = "proizvod";
        div.setAttribute("data", name);
        div.innerHTML = `
            <img src="${image}">
            <p>${name}</p>
            <div class="cartHover"><img src="./images/kart.png"></div>
            <div class="numOfItem"><p id="num">${getServerCartCount(element["id"])}</p></div>
        `;

        div.addEventListener('click', function() {
            addToCart(element.id);
        });

        div.addEventListener('mouseenter', function () {
            this.querySelector(".numOfItem").style.display = "none";
            let child = this.querySelector(".cartHover");
            child.style.display = "block";
        });

        div.addEventListener('mouseleave', function () {
            let child = this.querySelector(".cartHover");
            child.style.display = "none";
            if(getServerCartCount(element["id"]) >0 ) {
                this.querySelector(".numOfItem>p").innerText = getServerCartCount(element["id"]);
                this.querySelector(".numOfItem").style.display = "block";
            } 
        });

        proiz.appendChild(div);
    });
}

async function addToCart(productId) {
    await fetch(`/cart/add/${productId}`, { method: 'POST' });
    updateCartCount();
}

async function updateCartCount() {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    console.log(cart);
    let itemCnt=0;
    for(let key in cart){
        itemCnt+=cart[key];
    }
    if(itemCnt>0){
        document.querySelector(".numOfItems>#num").innerText = itemCnt;
        document.querySelector(".numOfItems").style.display = "block";
    }else{
        document.querySelector(".numOfItems>#num").innerText = 0;
        document.querySelector(".numOfItems").style.display = "hidden";
    }
}

async function getServerCartCount(productId) {
    const response = await fetch('/cart/getAll');
    const cart = await response.json();
    return cart[productId] || 0;
}

*/

/*
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

async function loadProducts(categoryId) {
    const response = await fetch(`/getProducts/${categoryId}`);
    const products = await response.json();
    addItem(products);
}

async function addItem(products) {
    const cart = await fetchCart();

    let proiz = document.querySelector(".proizvodi");
    proiz.innerHTML = '';
    products.forEach(element => {
        let name = element["name"];
        let image = element["image"];
        let productId = element["id"];
        let count = cart[productId] || 0;

        let div = document.createElement("div");
        div.className = "proizvod";
        div.setAttribute("data", productId);
        div.innerHTML = `
            <img src="${image}">
            <p>${name}</p>
            <div class="cartHover"><img src="./images/kart.png"></div>
            <div class="numOfItem"><p id="${productId}num">${count}</p></div>
        `;

        div.addEventListener('click', function() {
            addToCart(productId);
        });

        div.addEventListener('mouseenter', function () {
            this.querySelector(".numOfItem").style.display = "none";
            let child = this.querySelector(".cartHover");
            child.style.display = "block";
        });

        div.addEventListener('mouseleave', async function () {
            let child = this.querySelector(".cartHover");
            child.style.display = "none";
            let count = await getServerCartCount(productId);
            if (count > 0) {
                this.querySelector(".numOfItem>p").innerText = count;
                this.querySelector(".numOfItem").style.display = "block";
            }
        });

        proiz.appendChild(div);
    });
}

async function addToCart(productId) {
    await fetch(`/cart/add/${productId}`, { method: 'POST' });
    updateCartCount();
}

async function updateCartCount() {
    const cart = await fetchCart();
    let itemCnt = Object.values(cart).reduce((sum, count) => sum + count, 0);

    if (itemCnt > 0) {
        document.querySelector(".numOfItems>#num").innerText = itemCnt;
        document.querySelector(".numOfItems").style.display = "block";
    } else {
        document.querySelector(".numOfItems>#num").innerText = 0;
        document.querySelector(".numOfItems").style.display = "none";
    }
}

async function getServerCartCount(productId) {
    const cart = await fetchCart();
    return cart[productId] || 0;
}

async function fetchCart() {
    const response = await fetch('/cart/getAll');
    return await response.json();
}
*/

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

async function loadProducts(categoryId) {
    const response = await fetch(`/getProducts/${categoryId}`);
    const products = await response.json();
    addItem(products);
}

async function addItem(products) {
    const cart = await fetchCart();

    let proiz = document.querySelector(".proizvodi");
    proiz.innerHTML = '';
    products.forEach(element => {
        let name = element["name"];
        let image = element["image"];
        let productId = element["id"];
        let count = cart[productId] || 0;

        let div = document.createElement("div");
        div.className = "proizvod";
        div.setAttribute("data", productId);
        div.innerHTML = `
            <img src="${image}">
            <p>${name}</p>
            <div class="cartHover"><img src="./images/kart.png"></div>
            <div class="numOfItem" style="display: ${count > 0 ? 'block' : 'none'}"><p id="${productId}num">${count}</p></div>
        `;

        div.addEventListener('click', function() {
            addToCart(productId);
        });

        div.addEventListener('mouseenter', function () {
            this.querySelector(".numOfItem").style.display = "none";
            let child = this.querySelector(".cartHover");
            child.style.display = "block";
        });

        div.addEventListener('mouseleave', async function () {
            let child = this.querySelector(".cartHover");
            child.style.display = "none";
            let count = await getServerCartCount(productId);
            if (count > 0) {
                this.querySelector(".numOfItem>p").innerText = count;
                this.querySelector(".numOfItem").style.display = "block";
            }
        });

        proiz.appendChild(div);
    });
}

async function addToCart(productId) {
    await fetch(`/cart/add/${productId}`, { method: 'POST' });
    updateCartCount();
}

async function updateCartCount() {
    const cart = await fetchCart();
    let itemCnt = Object.values(cart).reduce((sum, count) => sum + count, 0);

    if (itemCnt > 0) {
        document.querySelector(".numOfItems>#num").innerText = itemCnt;
        document.querySelector(".numOfItems").style.display = "block";
    } else {
        document.querySelector(".numOfItems>#num").innerText = 0;
        document.querySelector(".numOfItems").style.display = "none";
    }
}

async function getServerCartCount(productId) {
    const cart = await fetchCart();
    return cart[productId] || 0;
}

async function fetchCart() {
    const response = await fetch('/cart/getAll');
    return await response.json();
}
