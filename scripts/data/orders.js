import { orders, saveToStorage,now,startAutoLock,ADMIN_PASSWORD} from "../utils/local.js";

    const todaysOrders = orders.filter(order=>{
        const isToday =dayjs(order.dateAdded).isSame(now,"day")
        const isPendingFromPrevious = 
        order.status !=="dispatched"
       

         return isToday || isPendingFromPrevious;
    })
 

console.log(todaysOrders);
startAutoLock(ADMIN_PASSWORD,10)



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

    const totalOrders = targetOrders.filter(order=>{
        const isToday =dayjs(order.dateAdded).isSame(now,"day")
        const isPendingFromPrevious = 
        order.status ==="awaiting-payment"||
        order.status ==="Processing"
         return isToday || isPendingFromPrevious;
    })

    const checkedOrders = targetOrders.filter(order =>
        order.status === 'checked'
    ).length;

    const unPaidOrders = targetOrders.filter(order =>
        order.paymentType !== 'Payfast'
    ).length;

    const collections = targetOrders.filter(order =>
        order.deliveryType === 'Collection'
    ).length;

    const dispatched = targetOrders.filter(order =>{
        return(
        order.status === 'Dispatched'&& dayjs(order.dispatchTime).isSame(now,"day"))
    }
    ).length;

    const incomplete = targetOrders.filter(order =>
        order.partial === true
    ).length;

    totalOrdersElement.innerHTML = totalOrders.length;
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

        let statusClass = 'status pending';
        let statusText = order.status;

        if (order.status === 'checked') {
            statusClass = 'status completed';
            statusText = 'Completed';
        } else if (order.status === 'Awaiting P.O.P') {
            statusClass = 'status awaiting-payment';
        } else if (order.status === 'Processing') {
            statusClass = 'status processing'
        } else if (order.status === 'Dispatched') {
            statusClass = 'status dispatched'
        }


        html += `
            <tr>
                <td><b>${order.id}</b></td>
                <td>${order.address}</td>
                <td>${order.dateAdded}</td>
                <td class="${statusClass}">
                 ${statusText}
                </td>
                <td>${order.deliveryType}</td>

                <td class = " action-td js-action-td-${order.id}">

                    <img class= "view-icon js-view-order-icon" src= "./icons/view-icon.png" data-order-id="${order.id}">

                    ${statusText === 'Completed' ? 
                    `<img src="./icons/delivery-icon.png"
                        class="delivery-icon js-open-dispatch"
                        data-order-id="${order.id}">` : 
                     ''}
                   
                 

                     
                </td>
                <td class = "select-td js-select-td-${order.id}">
                    <select   class="js-driver-select driver-select">
      
                    <option value="All" selected disabled>Select Driver</option> 
                    <option value="Allie">Allie</option>
                    <option value="Darryl">Darryl</option>
                    <option value="Ashwaad">Ashwaad</option>
                    <option value="Muawiya">Muawiya</option>
                    <option value="Antony">Antony</option>
                    <option value="Magdeen">Magdeen</option>
                    <option value="Factory Driver">Factory Driver</option>
                    </select>

                  <button class="dispatch-button js-confirm-dispatch"
                   data-order-id="${order.id}">
    Dispatch
</button>
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

        console.log(status)

        //  Filter by date
        if (dateString) {
            filteredOrders = filteredOrders.filter(order =>
                dayjs(order.dateAdded).format('DD/MMM/YYYY') === dateString
            );
        }

        //  Filter by status
        if (status === 'completed') {
            filteredOrders = filteredOrders.filter(order =>
                order.status === 'checked'
            );
        }

        if (status === 'paid') {
            filteredOrders = filteredOrders.filter(order =>
                order.paymentType === 'Payfast'
            );
        }

        if (status === 'dispatched') {
            filteredOrders = filteredOrders.filter(order =>
                order.status === 'Dispatched'
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
renderOrdersHTML(todaysOrders);
updateTotals(todaysOrders);

 

const tableElement = document.querySelector('.js-orders-data-container');

if (tableElement) {

  tableElement.addEventListener('click', (event) => {

    //open driver select

    const openButton = event.target.closest('.js-open-dispatch');

    const viewbuton = event.target.closest('.js-view-order-icon')

    if(viewbuton){
       const orderId = viewbuton.dataset.orderId
       console.log(orderId)
       window.open (`order.html?orderId=${orderId}`)
    }

    if (openButton) {
      const orderId = Number(openButton.dataset.orderId);

      const actionTd = tableElement.querySelector(`.js-action-td-${orderId}`);
      const selectTd = tableElement.querySelector(`.js-select-td-${orderId}`);

      if (actionTd && selectTd) {
        actionTd.classList.add('hide');
        selectTd.classList.add('show');
      }

      return;
    }

 //Confirm dispatch
 

    const confirmButton = event.target.closest('.js-confirm-dispatch');

    if (confirmButton) {

      const orderId = Number(confirmButton.dataset.orderId);

      const selectElement = tableElement.querySelector(
        `.js-select-td-${orderId} .js-driver-select`
      );

      const selectedDriver = selectElement.value;

      if (!selectedDriver || selectedDriver === "All") {
        alert("Please select a driver first.");
        return;
      }

      // Update data
      const order = orders.find(order => order.id === orderId);

      if (order) {
        order.driver = selectedDriver;
        order.status = "Dispatched";
        order.dispatchedTime = now
      }

      //  Save + Re-render
      saveToStorage();
      renderOrdersHTML(orders);
      updateTotals(orders);
    }

  });

}  