import { renderOrderSummary } from '../scripts/checkout/orderSummary.js'
import { paymentSummary } from './checkout/paymentSummary.js';

import '../data/cart-class.js'
// import '../data/car.js'
import '../data/backend-practice.js';
import { loadproducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
/* first time create this
new Promise((resolve)=>{
    loadproducts(() =>{
        resolve();  //resolve is function similar as done in jasmine. done execute the function from backend it is use for testing
    });
    
}).then(()=>{
    paymentSummary();
    renderOrderSummary();
})
*/
// loadproducts(() => {
//     loadCart(()=>{
//         paymentSummary();
//         renderOrderSummary();
//     })
// })
/*
//Then second time
new Promise((resolve)=>{
    loadproducts(() =>{
        resolve();  //resolve is function similar as done in jasmine. done execute the function from backend it is use for testing
    });
    
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
}).then(()=>{
    paymentSummary();
    renderOrderSummary();
});
//this is called three time called function used.
*/

//This is Third time
Promise.all([
    loadproducts(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    paymentSummary();
    renderOrderSummary();
});
