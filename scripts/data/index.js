import { orders,ADMIN_PASSWORD} from "../utils/local.js";
import { searchMatchingArea } from "../utils/routes-utils.js";

 

const password = prompt("Enter admin password to access the system:");

if (password !== ADMIN_PASSWORD) {
  alert("❌ Access denied");
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Access Denied</h2>";
  throw new Error("Unauthorized access");
}



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

 
function renderOrders(today) {

    let html = '';

    orders.forEach(order => {
      dayjs(order.dateAdded).format(' DD-MMM-YYYY')=== dayjs(today).format(' DD-MMM-YYYY')?
        html += `
        <tr>
            <td>${order.id}</td>
            <td>${order.address}</td>
            <td>${order.dateAdded}</td>
            <td>${order.deliveryType}</td>
            <td>${order.paymentType}</td>
        </tr>
        `: ``;
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


addButton.addEventListener('click', () => {
    let id = idInputElement.value.trim();
    let address = addressInputElement.value.trim();
    const deliveryType = deliveryElement.value;
    const paymentType = paymentElement.value;
    const status = paymentType === 'Payfast' ? 'Processing' : 'Awaiting P.O.P';

    // 1️⃣ Validate Order ID first
    if (!validateOrder(id, address, paymentType, deliveryType)) {
        return; // stop if ID or other basic checks fail
    }

    // 2️⃣ Check address
    const result = searchMatchingArea(address);

    if (!result.match) {
        let message = '⚠ Address not recognized for delivery.\n\n' +
                      'Please enter a known delivery area to ensure your order is routed correctly.';

        // Suggest closest match if distance is small
        if (result.closest && result.closest.distance <= 5) {
            message += `\n\nSuggested address :"${result.closest.suburb}" in the "${result.closest.zone}" zone` 
                       
            
       }

        alert(message);
        return; // stop adding order until user confirms
    }

    // 3️⃣ Address is valid → add the order
    addOrder(id, address, paymentType, deliveryType, status);
});


/*
addButton.addEventListener('click', () => {
    const id = idInputElement.value;
    const address = addressInputElement.value;
    const deliveryType = deliveryElement.value;
    const paymentType = paymentElement.value;
    const status = paymentType === 'Payfast' ? 'Processing' : 'Awaiting P.O.P';

    const result = searchMatchingArea(address);


   

    // Address is valid, continue
    if (validateOrder(id, address, paymentType, deliveryType)) {
         if (!result.match) {
        let message = '⚠ Address not recognized for delivery.\n\n' +
                      'Please enter a known delivery area to ensure your order is routed correctly.';

        if (result.closest && result.closest.distance <= 5) { // only suggest if reasonably close
            message += `\n\nDid you mean "${result.closest.suburb}" in the "${result.closest.zone}" zone?`;
        }

        alert(message);
        return; // stop adding the order
    }
        addOrder(id, address, paymentType, deliveryType, status);
    }
});
 
if (addButton) {
    addButton.addEventListener('click', () => {

        const id = idInputElement.value;
        const address = addressInputElement.value;
        const deliveryType = deliveryElement.value;
        const paymentType = paymentElement.value;
        const status = paymentElement.value ==='Payfast'? 'Processing':'Awaiting P.O.P'

     // Check if address matches a known area
    const isMatchingArea = searchMatchingArea(address);

    if (!isMatchingArea) {
        alert( '⚠ Address not recognized for delivery.\n\n' +
          'Please enter a known delivery area to ensure your order is routed correctly.\n' +
          'Try using the closest suburb or area name from our delivery zones.');
        return; // stop adding the order
    }

       if (validateOrder(id, address, paymentType, deliveryType)) {
            addOrder(id, address, paymentType, deliveryType,status);
       }

     

    });
}*/

console.log(orders);