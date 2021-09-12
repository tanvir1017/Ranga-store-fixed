
const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  const url = 'http://127.0.0.1:5500/db.json'
  fetch(url)
    .then((res) => res.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show product details in UI
const showDeatils = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(data =>showDeatilsUi(data))
  
}
const showDeatilsUi = detail => {
   console.log(detail)
    const img = detail.image;
    const titles = detail.title.slice(0, 20)
  const description = detail.description.slice(0, 200)
  const details = document.querySelector('.details-on-ui')
  details.textContent = ''
    const div = document.createElement('div')
    div.classList.add('mx-auto')
    div.innerHTML = `
    <div class="col">
     <div class="card">
      <img src="${img}" class="card-img-top show-details-img" alt="Releted image">
      <div class="card-body">
        <h2 class="card-title fw-bold">${titles}</h2>
        <h2 class="card-text mb-0 fw-bold"> $ ${detail.price}</h2>
        <p class="card-text mb-2 fw-bold">${detail.category}</p>
        <p class="font-bold mb-0 d-flex justify-content-start">
        <span class="me-3"><i class="fas fa-grin-stars"></i> ${detail.rating.rate}</span>   <span>${detail.rating.count} <i class="fas fa-user"></i> </span>
      </p>
        <p class="card-text mt-3 text-muted">${description}</p>
        </div>
    </div>
  </div>
  
  `
  details.appendChild(div)
  }
// show product details in UI 

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const title = product.title.slice(0, 20)
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("h-100");
    div.innerHTML = `<div class="single-product h-100">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${title}</h3>
      <p>Category: ${product.category}</p>
      <p class="font-bold d-flex justify-content-evenly">
      <span><i class="fas fa-grin-stars"></i> ${product.rating.rate}</span> 
      <span>${product.rating.count} <i class="fas fa-user"></i> </span>
      </p>

      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button id="details-btn" class="btn btn-dark" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"  onclick="showDeatils('${product.id}')" class="btn btn-dark">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};
