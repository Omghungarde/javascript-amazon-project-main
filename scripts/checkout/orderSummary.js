import { cart, removeCart, updateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatcurrency } from '../utils/money.js';
import { deliveryOptions, getdeliveryOption, calculateDeliveryDate } from '../../data/deliveryoptions.js'; 
import { paymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
	let cartSummaryHTML = '';
	cart.forEach((item) => {
		const productId = item.productId;

		const matchingProduct = getProduct(productId);

		const deliveryOptionId = item.deliveryOptionId;
		const deliveryOption=getdeliveryOption(deliveryOptionId);

		const dateString = calculateDeliveryDate(deliveryOption);

		cartSummaryHTML += `
		<div class="cart-item-container js-cart-item-delete-${matchingProduct.id}">
			<div class="delivery-date">
				Delivery date: ${dateString}
			</div>

			<div class="cart-item-details-grid">
				<img class="product-image" src="${matchingProduct.image}">

				<div class="cart-item-details">
					<div class="product-name">
						${matchingProduct.name}
					</div>
					<div class="product-price">
						${matchingProduct.getPrice()}
					</div>
					<div class="product-quantity">
						<span>
							Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${item.quantity}
							</span>
						</span>
						<span class="update-quantity-link link-primary js-link-update"
							data-product-id="$	{matchingProduct.id}">
							Update
						</span>
						<input class="quantity-input js-quantiy-input-${matchingProduct.id}">
						<span class="save-quantity-link link-primary js-click-save"
							data-product-id="${matchingProduct.id}">Save</span>
						<span class="delete-quantity-link link-primary js-link-delete"
							data-product-id="${matchingProduct.id}">
							Delete
						</span>
					</div>
				</div>

				<div class="delivery-options">
					<div class="delivery-options-title">
						Choose a delivery option:
					</div>
					${deliveryOptionHTML(matchingProduct,item)}
				</div>
			</div>
		</div>
		`;
	});


	function deliveryOptionHTML(matchingProduct,item) {
		let html = '';
		deliveryOptions.forEach((deliveryOption) => {
			const dateString = calculateDeliveryDate(deliveryOption);

			const priceString = deliveryOption.priceCents === 0
				? 'FREE'
				: `$${formatcurrency(deliveryOption.priceCents)}-`;

			const isChecked = deliveryOption.id === item.deliveryOptionId;
			html += `
			<div class="delivery-option js-delivery-option"
			data-product-id="${matchingProduct.id}"
			data-delivery-option-id="${deliveryOption.id}">
				<input type="radio"
				${isChecked ? 'checked' : ''}
				class="delivery-option-input"
				name="delivery-option-
				${matchingProduct.id}">
				<div>
					<div
					class="delivery-option-date">
						${dateString}
					</div>
					<div class="delivery-option-price">
						${priceString} Shipping
					</div>
				</div>
			</div>
				`
		});
		return html;
	}

	document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

	document.querySelectorAll('.js-link-delete').forEach((link) => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			removeCart(productId);

			const deleteItem = document.querySelector(`.js-cart-item-delete-${productId}`);

			renderOrderSummary();
            paymentSummary();

		});
	});
	 function calculate() {
		const cartQuantity = updateCartQuantity();

		document.querySelector('.js-cart-checkout').innerHTML = `${cartQuantity} items`;
        paymentSummary();

	}
	calculate();

	document.querySelectorAll('.js-link-update').forEach((link) => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;

			const container = document.querySelector(`.js-cart-item-delete-${productId}`);
			container.classList.add('is-editing-quantity');


		})
	});

	document.querySelectorAll('.js-click-save').forEach((link) => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			const container = document.querySelector(`.js-cart-item-delete-${productId}`);
			container.classList.remove('is-editing-quantity');

			const inputElement = document.querySelector(`.js-quantiy-input-${productId}`);
			const inputQuantity = Number(inputElement.value);
			updateQuantity(productId, inputQuantity);
			const quantitylabel = document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
				inputQuantity;

			calculate();
		})
	})

	document.querySelectorAll('.js-delivery-option').forEach((element) => {
		element.addEventListener('click', ()=>{
			const {productId, deliveryOptionId} = element.dataset;
			updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary()//it is called recursion function called in itself.
		});
		
	});
}


// const today1 = dayjs();
// const days5 = today1.subtract(1, 'month');
// console.log(days5.format('dddd'));


// function isWeekend(date){
//     const dayweek = date.format('dddd');
//     return dayweek === 'Saturday' || dayweek === 'Sunday'
// }

// let date = dayjs();
// console.log(date.format('dddd MMMM d'));
// console.log(isWeekend(date));

// let date3 = dayjs().add(2, 'days');
// console.log(date3.format('dddd MMMM d'));
// console.log(isWeekend(date3));



