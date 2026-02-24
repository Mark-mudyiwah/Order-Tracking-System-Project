
import { orders } from "../utils/local.js";
import { saveToStorage } from "../utils/local.js";

/* =========================
   DASHBOARD TOTALS
========================= */
function updateDashboardTotals() {

  const totalOrders = orders.length;

  const paidOrders = orders.filter(order =>
    order.status === 'Processing'
  );

  const pickUpOrders = orders.filter(order =>
    order.deliveryType === 'Collection'
  );

  const unPaidOrders = orders.filter(order =>
    order.paymentType !== 'Payfast'
  );

  const checkedOrders = orders.filter(order =>
    order.status ==='checked'
  );

  function updateEachQuantity(selector, quantity) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = quantity;
    }
  }

  updateEachQuantity('.js-total-orders', totalOrders);
  updateEachQuantity('.js-active-orders', paidOrders.length);
  updateEachQuantity('.js-collection-orders', pickUpOrders.length);
  updateEachQuantity('.js-unpaid-orders', unPaidOrders.length);
  updateEachQuantity('.js-checked-orders', checkedOrders.length);

  return paidOrders;
}


/* =========================
   RENDER ORDERS
========================= */
function renderOrders(paidOrders) {

  let html = '';

  paidOrders.forEach((order) => {
    html += `
      <tr>
        <td>${order.id}</td>
        <td>${order.address}</td>
        <td>${order.deliveryType}</td>
        <td>
          <select class="order-status-select js-select-${order.id}">
            <option value="" disabled selected>Change Status</option>
            <option value="Checked">Checked</option>
            <option value="partial-missing">Missing item</option>
          </select>

          <input 
            type="text" 
            placeholder="Enter item name"
            class="hide partial-item-input js-item-${order.id}">

          <input 
            type="number" 
            placeholder="Enter item price"
            class="hide partial-price-input js-price-${order.id}">
        </td>
        <td>
          <button 
            class="js-action-button save-changes-button" 
            data-order-id="${order.id}"
            data-stage="select">
            Save Changes
          </button>
        </td>
      </tr>
    `;
  });

  const tableElement = document.querySelector('.js-processing-orders-container');
  tableElement.innerHTML = html;
}


/* =========================
   INITIAL LOAD
========================= */
let paidOrders = updateDashboardTotals();
renderOrders(paidOrders);


/* =========================
   EVENT DELEGATION
========================= */
const tableElement = document.querySelector('.js-processing-orders-container');

tableElement.addEventListener('click', (event) => {

  const button = event.target.closest('.js-action-button');
  if (!button) return;

  const orderId = Number(button.dataset.orderId);
  const stage = button.dataset.stage;

  const selectElement = document.querySelector(`.js-select-${orderId}`);
  const itemInput = document.querySelector(`.js-item-${orderId}`);
  const priceInput = document.querySelector(`.js-price-${orderId}`);

  const order = orders.find(o => o.id === orderId);

  /* =========================
     STAGE 1 — STATUS SELECT
  ========================= */
  if (stage === "select") {

    const selectedValue = selectElement.value;

    if (!selectedValue) {
      alert("Please select order status");
      return;
    }

    if (selectedValue === "Checked") {

      order.status = 'checked';
      saveToStorage();

      refreshUI();
      return;
    }

    if (selectedValue === "partial-missing") {

      selectElement.classList.add("hide");
      itemInput.classList.remove("hide");

      button.textContent = "Next";
      button.dataset.stage = "item";

      return;
    }
  }

  /* =========================
     STAGE 2 — ITEM NAME
  ========================= */
  if (stage === "item") {

    const itemName = itemInput.value.trim();

    if (!itemName) {
      alert("Enter missing item name");
      return;
    }

    order.missingItem = itemName;

    itemInput.classList.add("hide");
    priceInput.classList.remove("hide");

    button.textContent = "Save";
    button.dataset.stage = "price";

    return;
  }

  /* =========================
   STAGE 3 — PRICE SAVE
========================= */
if (stage === "price") {

  const price = Number(priceInput.value);

  if (!price) {
    alert("Enter valid price");
    return;
  }

  // Save as history object
  if (!order.partialHistory) {
    order.partialHistory = [];
  }

  order.partialHistory.push({
    name: order.missingItem,   // use stored value
    price: price,
    date: new Date().toISOString()
  });

  order.missingItemPrice = price;
  order.partial = true;
  console.log(order)
  order.status = 'checked'

  saveToStorage();
  refreshUI();
}
});



/* =========================
   REFRESH FUNCTION
========================= */
function refreshUI() {
  const updatedOrders = updateDashboardTotals();
  renderOrders(updatedOrders);
}




/*
import { orders } from "../utils/local.js";
import { saveToStorage } from "../utils/local.js";

 
   
function updateDashboardTotals() {

  const totalOrders = orders.length;

  const paidOrders = orders.filter(order =>
    order.paymentType === 'Payfast' &&
    order.checkedStatus === false
  );

  const pickUpOrders = orders.filter(order =>
    order.deliveryType === 'Collection'
  );

  const unPaidOrders = orders.filter(order =>
    order.paymentType !== 'Payfast'
  );

  const checkedOrders = orders.filter(order =>
    order.checkedStatus
  );

  const totalOrdersElement = document.querySelector('.js-total-orders');
  const activeOrdersElement = document.querySelector('.js-active-orders');
  const collectionOrdersElement = document.querySelector('.js-collection-orders');
  const unPaidOrdersElement = document.querySelector('.js-unpaid-orders');
  const checkedOrdersElement = document.querySelector('.js-checked-orders');

  function updateEachQuantity(element, quantity) {
    if (element) {
      element.textContent = quantity;
    }
  }

  updateEachQuantity(totalOrdersElement, totalOrders);
  updateEachQuantity(activeOrdersElement, paidOrders.length);
  updateEachQuantity(checkedOrdersElement, checkedOrders.length);
  updateEachQuantity(collectionOrdersElement, pickUpOrders.length);
  updateEachQuantity(unPaidOrdersElement, unPaidOrders.length);

  return paidOrders;
}

 
function renderOrders(paidOrders) {

  let html = '';

  paidOrders.forEach((order) => {
    html += `
      <tr>
        <td>${order.id}</td>
        <td>${order.address}</td>
        <td>${order.deliveryType}</td>
        <td>
                <select class="order-status-select js-select-element-${order.id}">
            <option value="" disabled selected>Change Status</option>
            <option value="Checked">Checked</option>
            <option value="partial-added">Added item</option>
            <option value="partial-missing">Missing item</option>
          </select>

          <input 
          type ="text" 
          placeholder = "Enter item name"
           class= "partial-item-input js-partial-missing-${order.id}">

            <input 
          type ="text" 
          placeholder = "Enter  item price"
           class= "partial-price-input js-missing-item-price-${order.id}">
        </td>
        <td>
          <button 
            class="save-changes-button js-save-changes-button" 
            data-order-id="${order.id}">
            Save Changes
          </button>
          <button 
            class="update-order-button js-update-order-button-${order.id}" 
            data-order-id="${order.id}">
             Update Order
          </button>
        </td>
      </tr>
    `;
  });

 const tableElement = document.querySelector('.js-processing-orders-container');
  tableElement.innerHTML = html
}


 
let paidOrders = updateDashboardTotals();
renderOrders(paidOrders);

 
 const tableElement = document.querySelector('.js-processing-orders-container')
 

tableElement.addEventListener('click', (event) => {

  const button = event.target.closest('.js-save-changes-button');
  
  

  if (!button) return;
  

  const orderId = Number(button.dataset.orderId);
  const updateOrderButton = document.querySelector(`.js-update-order-button-${orderId}`)
  const missingInputElement = document.querySelector(`.js-partial-missing-${orderId}`)
  const missingPriceInput  = document.querySelector(`.js-missing-item-price-${orderId}`)
  const selectElement = document.querySelector(`.js-select-element-${orderId}`);
  const orderStatus = selectElement.value;

  if(!orderStatus){
  
    alert('Select the order Status you Bastard!!')
  }

 if(orderStatus ==='partial-missing'){
  button.remove()
  selectElement.classList.add('hide')
  missingInputElement.classList.add('show')
  updateOrderButton.classList.add('show')

  updateOrderButton.addEventListener('click',()=>{
    
    const missingItem = missingInputElement.value
    missingInputElement.remove()
    missingPriceInput.classList.add('show')
    console.log(missingItem)
  })
 
    
}
  console.log(orderId)

  return
})

  */