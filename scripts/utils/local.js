import ' https://unpkg.com/dayjs@1.11.10/dayjs.min.js'

export const ADMIN_PASSWORD = "mark-D-137"

export function loadFromStorage(){
  let ordersData = localStorage.getItem('orders')
  let orders = JSON.parse(ordersData)
  
  return orders
  
}

export function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders))
}


export let orders = loadFromStorage() || []


 export let routeOrders = orders.filter(order=>
  order.status !=='Dispatched'
)
 export const  now = dayjs().format('DD-MMM-YYYY @ HH:mm')
 
 export function startAutoLock(adminPassword, minutes = 5) {

  let inactivityTimer;

  function resetTimer() {
    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {
      lockSystem();
    }, minutes * 60 * 1000);
  }

  function lockSystem() {

    let unlocked = false;

    while (!unlocked) {

      const password = prompt("🔒 System locked due to inactivity.\n\nEnter admin password:");

      if (password === adminPassword) {
        alert("✅ Access restored");
        unlocked = true;
        resetTimer();
      } else {
        alert("❌ Incorrect password");
      }

    }
  }

  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keydown", resetTimer);
  document.addEventListener("click", resetTimer);

  resetTimer();
}