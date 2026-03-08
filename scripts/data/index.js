import { orders } from "../utils/local.js";

 
// =========================
// INITIAL RENDER
// =========================
renderOrders();
 
// Display current date (requires dayjs)
document.querySelector('.js-date-container').innerHTML =
  `${dayjs().format('dddd, DD-MMM-YYYY')}`;


  

// =========================
// DOM ELEMENTS
// =========================
const addButton = document.querySelector('.js-add-orders-button');
const idInputElement = document.querySelector('.js-order-id-input');
const addressInputElement = document.querySelector('.js-order-address-input');
const deliveryElement = document.querySelector('.js-delivery-select');
const paymentElement = document.querySelector('.js-payment-select');

 
function validateOrder(id, address, paymentType, deliveryType) {

    
    if (!id) {
        alert('⚠ Please enter Order ID first');
        return false;
    }

     //Check if ID is exactly 5 digits
    if (!/^\d{5}$/.test(id)) {
        alert('⚠ Please enter a 5 digit order Number');
        return false;
    }

     
    const matchingOrder = orders.some(order =>
        order.id === Number(id)
    );

    if (matchingOrder) {
        alert('⚠ Order ID already exists');
        return false;
    }

   
    if (address.trim().length <= 4) {
        alert('⚠ Please enter valid address');
        return false;
    }

  
    if (!paymentType) {
        alert('⚠ Please select the payment type');
        return false;
    }

 
    if (!deliveryType) {
        alert('⚠ Please select a delivery time');
        return false;
    }

    return true;
}

 
function addOrder(id, address, paymentType, deliveryType,status) {

  

    const today = dayjs().format('DD-MMM-YYYY HH:mm');

    orders.push({
        id: Number(id),
        address: address.trim(),
        deliveryType,
        paymentType:paymentType,
        dateAdded: today,
        status,
        
        partial: false,

    });

    saveToStorage();
    renderOrders();
    resetInputs();
}

 
function renderOrders() {

    let html = '';

    orders.forEach(order => {
        html += `
        <tr>
            <td>${order.id}</td>
            <td>${order.address}</td>
            <td>${order.dateAdded}</td>
            <td>${order.deliveryType}</td>
            <td>${order.paymentType}</td>
        </tr>
        `;
    });

    document.querySelector('.js-orders-container').innerHTML = html;
}

 
function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
 
function resetInputs() {
    idInputElement.value = '';
    addressInputElement.value = '';
    deliveryElement.value = '';
    paymentElement.value = '';
}

 
if (addButton) {
    addButton.addEventListener('click', () => {

        const id = idInputElement.value;
        const address = addressInputElement.value;
        const deliveryType = deliveryElement.value;
        const paymentType = paymentElement.value;
        const status = paymentElement.value ==='Payfast'? 'Processing':'Awaiting P.O.P'

        if (validateOrder(id, address, paymentType, deliveryType)) {
            addOrder(id, address, paymentType, deliveryType,status);
        }

    });
}

console.log(orders);