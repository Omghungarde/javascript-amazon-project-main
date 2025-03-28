class Cart {
    cartItems = undefined;
    #localStorageKey; //this is as same as undefined.

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;  //("this.") point to the object
        this.#localCart(); 
        
    }

    #localCart(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        
      if(!this.cartItems){
          this.cartItems=
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

    saveStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addtocart(productId){
        let match;
          this.cartItems.forEach((item) => {  //ITEM CONTAIN PRODUCTNAME AND QUANTITY
              if(productId === item.productId){
               match=item;    
              }
          });
          
          const cartSelect = document.querySelector(`.js-quantity-selector-${productId}`);
          const totalno = cartSelect ? Number(cartSelect.value) : 1;
          if(match){
              match.quantity +=1;
          }
          else {
          this.cartItems.push({productId,
            quantity: 1,
            deliveryOptionId : '1'
          });
          }
        this.saveStorage();      
    }

    removeCart(productId){
        const newCart =[];
    
        this.cartItems.forEach((item)=>{
            if(item.productId!==productId){
                newCart.push(item);
            }
        });
        this.cartItems =newCart;
        this.saveStorage();
      
    }
    updateCartQuantity(){
        let cartQuantity =0;
          
          this.cartItems.forEach((item)=>{
              cartQuantity += item.quantity;
            });
            
            return cartQuantity;
          
    }
    updateQuantity(productId, inputQuantity){
        let match;
        this.cartItems.forEach((item) => {
          if(productId===item.productId){
            match = item;
          }
        });
        match.quantity=inputQuantity;
        
        this.saveStorage();
    }
    updateDeliveryOption(productId, deliveryOptionId){
        let match;
        this.cartItems.forEach((item)=>{
          if(productId === item.productId){ 
            match=item;
            
          }
        });
    
        match.deliveryOptionId = deliveryOptionId;
        
    
    
        this.saveStorage();
    }

}

const cart =  new Cart('cart-oops');
const buisnessCart = new Cart('cart-buisness');



console.log(cart);
console.log(buisnessCart);