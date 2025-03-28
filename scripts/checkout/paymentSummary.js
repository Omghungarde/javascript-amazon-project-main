import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions, getdeliveryOption } from "../../data/deliveryoptions.js";
import { formatcurrency } from "../utils/money.js";
export function paymentSummary(){
    let resultprice = 0;
    let Shippingprice = 0;
    cart.forEach((item) => {
        const product = getProduct(item.productId);
        resultprice += product.priceCents * item.quantity

        const deliveryOption = getdeliveryOption(item.deliveryOptionId);
        Shippingprice += deliveryOption.priceCents;


    });


    const totalbeforetax= resultprice + Shippingprice;
    const tax= totalbeforetax*0.1;
    const totalprice = totalbeforetax+tax;
    let cartQuantity =0;
      
      cart.forEach((item)=>{
          cartQuantity += item.quantity;
        });
    const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatcurrency(resultprice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatcurrency(Shippingprice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatcurrency(totalbeforetax)}</div>
          </div>
   
          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatcurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatcurrency(totalprice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}