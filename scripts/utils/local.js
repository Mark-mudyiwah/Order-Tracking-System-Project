export function loadFromStorage(){
  let ordersData = localStorage.getItem('orders')
  let orders = JSON.parse(ordersData)
  
  return orders
  
}

export function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders))
}


export let orders = loadFromStorage() || []


const paidOrders = orders.filter(order=>
  order.paymentType ==='Payfast'
)


const awaitingPaymentOrders = orders.filter(order =>
  order.paymentType !== 'Payfast'
)


  const collectionOrders = paidOrders.filter(order =>
  order.deliveryType ==='Collection'
)

const checkedOrders = paidOrders.filter(order =>
  order.checkedStatus === true
)
 