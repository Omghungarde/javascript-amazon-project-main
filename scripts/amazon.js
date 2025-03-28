// import {cart, addtocart, saveStorage} from '../data/cart.js';
// import {products, loadproducts} from '../data/products.js';
// import { formatcurrency } from '../scripts/utils/money.js';

// loadproducts(renderOrderGrid);

// function renderOrderGrid(){
// let productHTML = ''

// products.forEach((product) => {
//     productHTML += `
//         <div class="product-container">
//           <div class="product-image-container">
//             <img class="product-image"
//               src="${product.image}">
//           </div>

//           <div class="product-name limit-text-to-2-lines">
//             ${product.name}
//           </div>

//           <div class="product-rating-container">
           
//             <img class="product-rating-stars" 
//               src="${product.getStarsUrl()}">
//              <div class="product-rating-count link-primary">
//              ${product.rating.count}
//             </div>
//           </div>

//           <div class="product-price">
//             ${product.getPrice()}
//           </div>

//           <div class="product-quantity-container">
//             <select class ="js-quantity-selector-${product.id}">
//               <option selected value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>
//           </div>
          
//           ${product.extraInfoHTML()} 
          
//           <div class="product-spacer"></div>

//           <div class="added-to-cart js-added-to-cart-${product.id}">
//             <img src="images/icons/checkmark.png">
//             Added
//           </div>

//           <button class="add-to-cart-button button-primary js-add-to-cart"
//           data-product-id="${product.id}"
//           data-product-image="${product.image}"
//           data-product-price="${product.priceCents}">
//             Add to Cart
//           </button>
//         </div>
//     `
// });
// //inheritance = reuse the code between the classes from parent class.
// //${product.extraInfoHTML()} is called polymorphism = use a method without knowing a class, suppose we make anothe class for any other we don't repeat the lines or bunch of code we only give same (name) function in that class.


// document.querySelector('.js-product-grid').innerHTML = productHTML;

// function updateCartQuantity(productId){
//   let cartQuantity =0;
    
//     cart.forEach((item)=>{
//         cartQuantity += item.quantity;
//       });
 
//     document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
//     // document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
//     // localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));

//     const addlistyi = document.querySelector(`.js-added-to-cart-${productId}`)

//     addlistyi.classList.add('added-to-cart-visible');

//     setTimeout(() => {
//         addlistyi.classList.remove('added-to-cart-visible');
//     },2000);
    
//   }
// document.querySelectorAll('.js-add-to-cart')
// .forEach((button) => {
//  button.addEventListener('click',() =>{
//     const {productId} = button.dataset;
//     addtocart(productId);  
//     updateCartQuantity(productId);
    
//  }); 
// });

// }
import { cart, addtocart, saveStorage } from '../data/cart.js';
import { products, loadproducts } from '../data/products.js';
import { formatcurrency } from '../scripts/utils/money.js';

async function init() {
    await loadproducts(); // Ensure products are loaded first
    renderOrderGrid();
}

function renderOrderGrid() {
    let productHTML = '';

    products.forEach((product) => {
        productHTML += `
            <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars" 
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select class ="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              
              ${product.extraInfoHTML()} 
              
              <div class="product-spacer"></div>

              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-add-to-cart"
              data-product-id="${product.id}"
              data-product-image="${product.image}"
              data-product-price="${product.priceCents}">
                Add to Cart
              </button>
            </div>
        `;
    });

    document.querySelector('.js-product-grid').innerHTML = productHTML;

    function updateCartQuantity(productId) {
        let cartQuantity = 0;
        
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

        const addlistyi = document.querySelector(`.js-added-to-cart-${productId}`);
        addlistyi.classList.add('added-to-cart-visible');

        setTimeout(() => {
            addlistyi.classList.remove('added-to-cart-visible');
        }, 2000);
    }

    document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            addtocart(productId);  
            updateCartQuantity(productId);
        }); 
    });
}

init(); // Ensure products are loaded before rendering
