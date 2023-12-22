// array of objects storing fruit products
fruitProducts = [
    { id: 'p1', ptitle: 'Apple', pPrice: 25, pDescription: "Apple product demo description", pImg: "./img/apple_fruit.png", stock: 10 },
    { id: 'p2', ptitle: 'Avacado', pPrice: 30, pDescription: "Avacado demo description", pImg: "./img/avacado_fruit.png", stock: 6 },
    { id: 'p3', ptitle: 'Kiwi', pPrice: 35, pDescription: "Kiwi demo description", pImg: "./img/kiwi_fruit.png", stock: 7 },
    { id: 'p4', ptitle: 'Passion Fruit', pPrice: 28, pDescription: "Passion Fruit demo description", pImg: "./img/passion_fruit.png", stock: 10 }
]

cart = {} // cart object
var totalPrice = 0; // total price

// function to validate quantity field
const validateQuantity = (id) => {
    quantity = document.getElementById(`${id}-qty`).value;
    if (quantity <= 0) {
        document.getElementById(`${id}-errormsg`).innerHTML = '- invalid quantity -';
        return false;
    }
    return true;
}

// function to clear the error messgage if input field is focused
const clearErrorMsg = (id) => {
    document.getElementById(`${id}-qty`).value = '';
    document.getElementById(`${id}-errormsg`).innerHTML = '';
}

// function to add the product to cart
const addProductToCart = (id) => {
    if (validateQuantity(id)) {
        // adding to cart functionality
        if (typeof (cart) == 'object') {
            quantity = document.getElementById(`${id}-qty`).value;
            cart[id] = quantity;
        }
    }
    // storing the cart to session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // to render cart item cards
    renderCart();
}

// function to check if cart item is exits for an id, if not create a new one, else proceed to change quantity
const renderCartItem = (id) => {
    fruitObj = getProductById(id);
    var html = ``;
    html += `<div class="card h-10 w-100 mt-1" style="width: 18rem; background-color: #F0F5F7">
        <div class="row card-body text-center">
        <h5 class="card-title text-secondary">${fruitObj.ptitle}</h5> <hr>
        <div class="col-sm-8 m-auto">
            <button class="btn btn-outline-success" onclick="return increaseQty('${id}')"><i class="bi bi-plus"></i></button>
            <img src="${fruitObj.pImg}" class="img-thumbnail" width="100" height="100" alt="${fruitObj.ptitle} image">
            <button class="btn btn-outline-danger" onclick="return decreaseQty('${id}')"><i class="bi bi-dash"></i></button>
        </div>
        <div class="col-sm-4">
            <h6 class="card-subtitle mb-2 text-muted">Price - ${fruitObj.pPrice} /-</h6>
            <h6 class="card-subtitle mb-2 text-muted">Qty - ${cart[id]} items</h6>
            <button type="button" class="btn btn-danger" onclick="return removeProductById('${id}')"><i class="bi bi-trash"></i></button>
        </div>
        </div>
        </div>`;
    return html;
}

// function to render cart item card for all cart entries
const renderCart = () => {
    this.totalPrice = 0;
    const cartSection = document.getElementById('cartSection');
    const priceSection = document.getElementById('cart-totalPrice');
    // button element for checking out
    const checkoutBtn = document.getElementById('cart-checkout');

    // resetting cart section
    // if cart is empty
    if (Object.keys(cart).length == 0) {
        checkoutBtn.disabled = true;
        cartSection.innerHTML = `<div class="text-center text-primary h5">No items are added to cart </div>`;
    } else {
        checkoutBtn.disabled = false;
        // if cart is not empty
        cartSection.innerHTML = "";
        Object.keys(cart).map((id) => {
            this.totalPrice += (getProductById(id).pPrice * cart[id]);
            cartSection.innerHTML += renderCartItem(id);
        })
    }
    priceSection.innerHTML = 'Total Price : ' + totalPrice + ' /-';
}

// function to retrive product by id
const getProductById = (id) => {
    for (let i = 0; i < fruitProducts.length; i++) {
        if (fruitProducts[i].id === id) {
            return fruitProducts[i];
        }
    }
    return null;
}

// function to remove an item from cart
const removeProductById = (id) => {
    if (Object.keys(cart).includes(id)) {
        delete cart[id];
    }
    // storing the cart to session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // rendering cart
    renderCart();
}


// function to increase the quantity of item in cart
const increaseQty = (id) => {
    if (Object.keys(cart).includes(id)) {
        cart[id]++;
    }
    // storing the cart to session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // rendering cart
    renderCart();
}
// function to decrease the quantity of item in cart

const decreaseQty = (id) => {
    if (Object.keys(cart).includes(id)) {
        cart[id]--;
        if(cart[id] <= 0){
            removeProductById(id);
        }

    }
    // storing the cart to session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // rendering cart
    renderCart();
}

// function to dynamically populate an products
const populateProducts = () => {
    const productSection = document.getElementById('productSection');
    var html = ``;
    fruitProducts.map((fruitObj) => {
        html += `
        <div class="col-sm-8 col-md-4 mt-2">
        <div class="card mt-2" style="width: 17rem;"">
            <img src="${fruitObj.pImg}" height="250px" width="100px" class="card-img-top" alt="${fruitObj.ptitle} image">
            <div class="card-body">
              <h5 class="card-title text-center">${fruitObj.ptitle}</h5>
              <p class="card-text">${fruitObj.pDescription}</p>
              <p class="card-text text-center" style="font-weight:bold">Price : ${fruitObj.pPrice} /-</p>
              <div class="row">
              <div class="col-sm text-center">
              <label for="${fruitObj.id}-qty" class="form-label">Quantity*</label>
              <input type="number" class="form-control form-control-sm sm my-2" id="${fruitObj.id}-qty" onfocus="clearErrorMsg('${fruitObj.id}')"/>
              <p class="text-danger text-center" id="${fruitObj.id}-errormsg"></p>
              </div>
              <div class="col-sm mt-4">
              <p class="text-center"><button class="btn btn-primary m-2" onclick=" return addProductToCart('${fruitObj.id}')">Add</button></p>
              </div>
              </div>
            </div>
          </div>
        </div>
        `;
    })
    productSection.innerHTML = html;
}

// function to render different elements
const renderElements = () => {
    // checking session storage for cart object 
    // cart = JSON.parse(sessionStorage.getItem('cart'));
    // console.log(cart);
    if (JSON.parse(sessionStorage.getItem('cart')) == null) {
        cart = {}
    } else {
        cart = JSON.parse(sessionStorage.getItem('cart'));
    }
    populateProducts();
    renderCart();
}
