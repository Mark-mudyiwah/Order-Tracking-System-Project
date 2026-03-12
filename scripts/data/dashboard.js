
import { orders,saveToStorage,ADMIN_PASSWORD,now,startAutoLock } from "../utils/local.js";


// import { getDate } from "./index.js";
 startAutoLock(ADMIN_PASSWORD,30)
  
/* =========================
   DASHBOARD TOTALS
========================= */
function updateDashboardTotals() {
 
  const todaysOrders = orders.filter(order => 
    order.status ==='Processing'|| order.status === 'Awaiting Payment'
   // dayjs(order.dateAdded).isSame(now, "day") // compare only the day
  );
  
  console.log(todaysOrders)

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

  updateEachQuantity('.js-total-orders', todaysOrders.length);
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
      order.checkedDate = now
     //console.log(order)
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
    date:now
  });

  order.missingItemPrice = price;
  order.partial = true;
  console.log(order)
  order.status = 'checked'
  order.checkedDate = now

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



  

let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    lockSystem();
  }, 1 * 60 * 1000); // 5 minutes
}


document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);

resetInactivityTimer();


function lockSystem() {

  const password = prompt("🔒 System locked due to inactivity.\n\nEnter admin password:");

  if (password === ADMIN_PASSWORD) {
    resetInactivityTimer();
    alert("✅ Access restored");
  } else {
    alert("❌ Incorrect password");
    lockSystem(); // keep asking until correct
  }
}