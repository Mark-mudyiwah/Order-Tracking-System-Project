import { orders } from "../utils/local.js"


 const url= new URL(window.location.href)
 

 const orderId = Number(url.searchParams.get('orderId'))
 
 let matchingOrder;

orders.forEach((order)=>{
if(order.id ===orderId){
   matchingOrder = order
}
});
 
console.log(orderId)
console.log(matchingOrder)
function displayOrder(matchingOrder){
const  main = document.querySelector('.js-main')

 if(main){
  main.innerHTML = `
  
   
<!-- ORDER INFO -->
<section class="order-info">
  <h2>Order Information</h2>

  <div class="order-details">
    <div class="detail-row">
      <span class="label">Order ID:</span>
      <span class="value">${matchingOrder.id}</span>
    </div>

    <div class="detail-row">
      <span class="label">Payment:</span>
      <span class="value">${matchingOrder.paymentType}</span>
    </div>

    <div class="detail-row">
      <span class="label">Address:</span>
      <span class="value">${matchingOrder.address}</span>
    </div>
    ${matchingOrder.partial === true ?`
         <div class="detail-row">
      <span class="label">Missing Item:</span>
      <span class="value">${matchingOrder.missingItem}</span>
    </div>

    <div class="detail-row">
      <span class="label">Price:</span>
      <span class="value">R ${matchingOrder.missingItemPrice}</span>
    </div>
` : ''}
   
    <div class="action-row">
    ${matchingOrder.paymentType !== 'Payfast'? `
              <button class="action-btn">Mark as Paid</button>
        `:''}

      <button class="action-btn">Change  Address</button>

      <button class="action-btn uplift">Uplift Order</button>
       ${matchingOrder.partial === true ?`
         <button class="action-btn success">To follow item sent</button>
        
        `:''}
     
    </div>
  </div>
</section>

<!-- TIMELINE -->
<section class="order-timeline">
  <h2>Timeline</h2>

  <div class="timeline">
    <div class="timeline-step">
      <span class="step-label">Order Added:</span>
      <span class="step-value">${matchingOrder.dateAdded}</span>
    </div>

    <div class="timeline-step">
     ${matchingOrder.checkedDate?
        `<span class="step-label">Checked by Mark:</span>
      <span class="step-value">${matchingOrder.checkedDate}</span>`:
        `    <span class="step-label">Checked:</span>
      <span class="step-value">Not yet</span>`}
  
    </div>

    <div class="timeline-step">
      ${matchingOrder.dispatchedTime? `
        <span class="step-label">Dispatched:</span>
      <span class="step-value">${matchingOrder.dispatchedTime}</span>
        
        `:`<span class="step-label">Dispatched:</span>
      <span class="step-value">No</span>`}
      
    </div>

    
    ${matchingOrder.driver?`
        <div class="timeline-step">
            <span class="step-label">Driver name:</span>
      <span class="step-value">${matchingOrder.driver}</span>
    </div>
        `:``}
  
    ${matchingOrder.status === 'Dispatched'?`
        
         <div class="action-buttons">
    <button class="action-btn deliver">Order Delivered</button>
     <button class="action-btn return">Order returned</button>
     </div>
        `: ''}
    
  </div>
</section>


  
  
  `
 }

}

 displayOrder(matchingOrder)