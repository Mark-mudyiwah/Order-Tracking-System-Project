import { orders,saveToStorage,now,ADMIN_PASSWORD,startAutoLock} from "../utils/local.js"
import { searchMatchingArea } from "../utils/routes-utils.js";
 

startAutoLock(ADMIN_PASSWORD,10)

const url = new URL(window.location.href)
 

const orderId = Number(url.searchParams.get('orderId'))

let matchingOrder;

orders.forEach((order) => {
  if (order.id === orderId) {
    matchingOrder = order
  }
});

console.log(orderId)
console.log(matchingOrder)
function displayOrder(matchingOrder) {



  const main = document.querySelector('.js-main')

  if (main) {
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
    ${matchingOrder.partial === true ? `
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
  
     <input class="action-input " placeholder = "Enter new Address" type = "text">
      <button class="action-btn change-address-btn">Change  Address</button>
     
      <select class="action-select">
      <option selected value = "">Change Delivery Type</option>
      <option value = "Collection">Collection</option>
       <option value = "Delivery">Delivery</option>
      </select>
      
       ${matchingOrder.partial === true ? `
         <button class="action-btn success">To follow item sent</button>
        
        `: ''}

          ${matchingOrder.paymentType !== 'Payfast' ? `
              <label class="upload-label">
  Upload Proof of Payment:
  <input type="file" class=" payment-upload image-input" accept="image/*">
</label>
<button class="action-btn confirm-payment">Upload image</button>
<img class="payment-preview" style="display:none; max-width:200px; margin-top:10px;" alt="Preview">
        `: ''}

     
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
   ${matchingOrder.paymentUploadDate?`
    <div class="timeline-step">
      <span class="step-label">Payment Uploaded:</span>
      <span class="step-value">${matchingOrder.paymentUploadDate}</span>
    </div>`:''}

    <div class="timeline-step">
     ${matchingOrder.checkedDate ?
        `<span class="step-label">Checked by Mark:</span>
      <span class="step-value">${matchingOrder.checkedDate}</span>` :
        `    <span class="step-label">Checked:</span>
      <span class="step-value">Not yet</span>`}
  
    </div>

    <div class="timeline-step">
      ${matchingOrder.dispatchedTime ? `
        <span class="step-label">Dispatched:</span>
      <span class="step-value">${matchingOrder.dispatchedTime}</span>
        
        `: `<span class="step-label">Dispatched:</span>
      <span class="step-value">No</span>`}
      
    </div>

    
    ${matchingOrder.driver ? `
        <div class="timeline-step">
            <span class="step-label">Driver name:</span>
      <span class="step-value">${matchingOrder.driver}</span>
    </div>
        `: ``}
  
    ${matchingOrder.status === 'Dispatched' ? `
        
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
// Get the elements after rendering
const paymentInput = document.querySelector('.image-input');
const paymentPreview = document.querySelector('.payment-preview');
const uploadBtn = document.querySelector('.confirm-payment');

if (paymentInput && uploadBtn && paymentPreview) {
  // When user selects a file, show preview
  paymentInput.addEventListener('change', () => {
    const file = paymentInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        paymentPreview.src = e.target.result;  // show the image
        paymentPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  

  // When user clicks the upload button
  uploadBtn.addEventListener('click', () => {

      const password = prompt("Enter admin password to confirm payment:");

  if(password !== ADMIN_PASSWORD){
    alert("❌ Incorrect password. Payment cannot be confirmed.");
    return;
  }

    const file = paymentInput.files[0];
    if (!file) {
      alert('⚠ Please select an image before uploading.');
      return;
    }

    // Save the proof in your order object
    matchingOrder.paymentProof = URL.createObjectURL(file); // temporary local URL
    matchingOrder.paymentType= 'Payfast';
    matchingOrder.paymentUploadDate = now;
    matchingOrder.status = 'Processing'

    alert('✅ Payment confirmed and image uploaded!');
    console.log(matchingOrder)

    saveToStorage()

    // Re-render the order to reflect the uploaded image
    displayOrder(matchingOrder);


  });
}
const changeBtn = document.querySelector('.change-address-btn');
const addressInput = document.querySelector('.action-input');

let editingAddress = false;

changeBtn.addEventListener('click', () => {

  // Stage 1 → Show input
  if (!editingAddress) {
    addressInput.classList.add('show');
    addressInput.value = matchingOrder.address; // preload current address
    changeBtn.textContent = 'Save Address';
    addressInput.focus();
    editingAddress = true;
    return;
  }

  // Stage 2 → Save address
  const newAddress = addressInput.value.trim();

  if (!newAddress) {
    alert('⚠ Please enter a new address first.');
    return;
  }

  if (newAddress.length <= 4) {
    alert('⚠ Please enter a valid address.');
    return;
  }

  const result = searchMatchingArea(newAddress);

  if (!result.match) {

    let message =
      '⚠ Address not recognized for delivery.\n\n' +
      'Please enter a known delivery area to ensure your order is routed correctly.';

    if (result.closest && result.closest.distance <= 5) {
      message += `\n\nSuggested address: "${result.closest.suburb}" in the "${result.closest.zone}" zone`;
    }

    alert(message);
    return;
  }

  // Password check
  const password = prompt("Enter admin password to change the address:");

  if (password !== ADMIN_PASSWORD) {
    alert("❌ Incorrect password. Address cannot be changed.");
    return;
  }

  // Update order
  matchingOrder.address = newAddress;

  alert('✅ Address updated successfully.');

  saveToStorage();

  editingAddress = false;

  displayOrder(matchingOrder);
});