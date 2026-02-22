import { orders } from "../utils/local.js";

console.log(orders);

 //DOM elements

const dateFilterElement = document.querySelector('.js-date-input');
const statusFilterElement = document.querySelector('.js-filter-select');
const idFilterElement = document.querySelector('.js-id-filter-input');
const applyFilterButton = document.querySelector('.js-apply-filter-button');
const resetFilterButton = document.querySelector('.js-reset-filter-button');

const totalOrdersElement = document.querySelector('.js-total-orders');
const checkedOrdersElement = document.querySelector('.js-checked-orders');
const unPaidOrdersElement = document.querySelector('.js-unpaid-orders');
const collectonOrdersElement = document.querySelector('.js-collection-orders');
const dispatchedOrdersElement = document.querySelector('.js-dispatched-orders');
const inCompleteOrdersElement = document.querySelector('.js-incomplete-orders');
 
  // UPDATE TOTALS FUNCTION
 

function updateTotals(targetOrders) {

    const totalOrders = targetOrders.length;

    const checkedOrders = targetOrders.filter(order =>
        order.checkedStatus === 'checked'
    ).length;

    const unPaidOrders = targetOrders.filter(order =>
        order.paymentType !== 'Payfast'
    ).length;

    const collections = targetOrders.filter(order =>
        order.deliveryType === 'Collection'
    ).length;

    const dispatched = targetOrders.filter(order =>
        order.dispatchStatus === true
    ).length;

    const incomplete = targetOrders.filter(order =>
        order.partial === true
    ).length;

    totalOrdersElement.innerHTML = totalOrders;
    checkedOrdersElement.innerHTML = checkedOrders;
    unPaidOrdersElement.innerHTML = unPaidOrders;
    collectonOrdersElement.innerHTML = collections;
    dispatchedOrdersElement.innerHTML = dispatched;
    inCompleteOrdersElement.innerHTML = incomplete;
}

/* ===============================
   RENDER FUNCTION
================================= */

function renderOrdersHTML(targetOrders) {

    let html = ''; // ✅ RESET every time

    targetOrders.forEach((order) => {

        html += `
            <tr>
                <td><b>${order.id}</b></td>
                <td>${order.address}</td>
                <td>${order.dateAdded}</td>
                <td class="${order.checkedStatus === 'checked' ? 'checked' : 'pending'}">
                    ${order.checkedStatus === 'checked' ? 'Checked' : 'Processing'}
                </td>
                <td>${order.deliveryType}</td>
                <td>
                    <button>👁</button>
                    <button>🚚</button>
                </td>
            </tr>
        `;
    });

    document.querySelector('.js-orders-data-container').innerHTML = html;
}
 
//apply filter

if (applyFilterButton) {

    applyFilterButton.addEventListener('click', () => {

        let filteredOrders = [...orders]; // TART FROM ORIGINAL DATA

        const dateString = dateFilterElement.value
            ? dayjs(dateFilterElement.value).format('DD/MMM/YYYY')
            : null;

        const status = statusFilterElement.value;
        const orderId = idFilterElement.value.trim();

        //  Filter by date
        if (dateString) {
            filteredOrders = filteredOrders.filter(order =>
                dayjs(order.dateAdded).format('DD/MMM/YYYY') === dateString
            );
        }

        //  Filter by status
        if (status === 'completed') {
            filteredOrders = filteredOrders.filter(order =>
                order.checkedStatus === 'checked'
            );
        }

        if (status === 'paid') {
            filteredOrders = filteredOrders.filter(order =>
                order.paymentType === 'Payfast'
            );
        }

        if (status === 'dispatched') {
            filteredOrders = filteredOrders.filter(order =>
                order.dispatchStatus === true
            );
        }

          if (status === 'awaiting-payment') {
            filteredOrders = filteredOrders.filter(order =>
                order.paymentType === 'awaiting-payment'
            );
        }


        // 🔹 Filter by ID
        if (orderId) {
            filteredOrders = filteredOrders.filter(order =>
                order.id.toString().includes(orderId)
            );
        }

        renderOrdersHTML(filteredOrders);
        updateTotals(filteredOrders); // totals update dynamically
    });
}

 

if (resetFilterButton) {

    resetFilterButton.addEventListener('click', () => {

        dateFilterElement.value = '';
        statusFilterElement.value = '';
        idFilterElement.value = '';

        renderOrdersHTML(orders);
        updateTotals(orders);
    });
}

 //initial load
renderOrdersHTML(orders);
updateTotals(orders);