import ' https://unpkg.com/dayjs@1.11.10/dayjs.min.js'


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
 
 