export let cart;
localCart();
export function localCart(){
  cart = JSON.parse(localStorage.getItem('cart'));
  
if(!cart){
    cart=
    [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
  }
}
export function saveStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function addtocart(productId){
    let match;
      cart.forEach((item) => {  //ITEM CONTAIN PRODUCTNAME AND QUANTITY
          if(productId === item.productId){
           match=item;    
          }
      });
      
      const cartSelect = document.querySelector(`.js-quantity-selector-${productId}`);
      const totalno = Number(cartSelect.value);
      if(match){
          match.quantity +=totalno;
      }
      else {
      cart.push({productId,
        quantity: totalno,
        deliveryOptionId : '1'
      });
      }
        saveStorage();      
  }
  
  export function removeCart(productId){
    const newCart =[];

    cart.forEach((item)=>{
        if(item.productId!==productId){
            newCart.push(item);
        }
    });
    cart =newCart;
    saveStorage();
  }

  export function updateCartQuantity(){
    let cartQuantity =0;
      
      cart.forEach((item)=>{
          cartQuantity += item.quantity;
        });
        
        return cartQuantity;
      
  }
  export function updateQuantity(productId, inputQuantity){
    let match;
    cart.forEach((item) => {
      if(productId===item.productId){
        match = item;
      }
    });
    match.quantity=inputQuantity;
    
    saveStorage();
  }

  export function updateDeliveryOption(productId, deliveryOptionId){
    let match;
    cart.forEach((item)=>{
      if(productId === item.productId){
        match=item;
        
      }
    });

    match.deliveryOptionId = deliveryOptionId;
    


    saveStorage();
  }
  export function loadCart(fun) {
  
    const xhr =  new XMLHttpRequest();
  
    xhr.addEventListener('load',() =>{
      console.log(xhr.response);
      
      fun();
    })
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }