import { orders } from "../utils/local.js";

console.log(orders)

const southernRoute = orders.filter(order =>
    order.address === 'Muizenberg' ||
    order.address === 'Rondebosch' ||
    order.address === 'Constantia' ||
    order.address === 'Athlone' ||
    order.address === 'Crawford'||
    order.address === 'Rylands' ||
    order.address === 'Lansdowne'||
    order.address === 'Claremont' ||
    order.address === 'Penlyn'||
    order.address === 'Wynberg' ||
    order.address === 'Mowbray'||
    order.address === 'Surrey Estate'  
)


const northenRoute = orders.filter(order =>
    order.address === 'Maitland' ||
    order.address === 'Kensington' ||
    order.address === 'Goodwood'||
    order.address === 'Parow' ||
    order.address === 'Thornton'||
    order.address === 'Ruyterwatch' ||
    order.address === 'Townsend'||
    order.address === 'Monte Vista' ||
    order.address === 'Epping'||
    order.address === 'Pinelands'  
)

const capeTownRoute = orders.filter(order =>
    order.address === 'Capetown' ||
    order.address === 'Seapoint' ||
    order.address === 'Walmer Estate'
)

const collectionRoute = orders.filter(order =>
    order.deliveryType === 'Collection' 
    
)


const westCoastRoute = orders.filter(order =>
    order.address === 'Sandown' ||
    order.address === 'Parklands' ||
    order.address === 'Table View' ||
    order.address === 'Tableview' ||
    order.address === 'Flamingo Vlei'||
    order.address === 'Killarney Gardens' ||
    order.address === 'Blouberg'||
    order.address === 'Table Bay' ||
    order.address === 'Milnerton Ridge'||
    order.address === 'Sunset' ||
    order.address === 'De Aan Zitch'||
    order.address === 'Lagoon'  
)




 

function renderRoutes(routeTitle, routeName) {

    const totalRouteOrders = routeName.length 
    let checkedRouteOrders = 0
    let ordersHTML = ''
    routeName.forEach((order) => {
 if(order.checkedStatus === 'checked'){
    checkedRouteOrders++
    console.log(order)
      
  
 }
 
    
     ordersHTML +=
            `
        <tr>
         <td>${order.id}</td>
         <td>${order.address}</td>
        <td>${order.checkedStatus === 'checked'
            ?
            '<span class="status completed">Completed</span>'
            :
            '<span class="status pending">Pending</span>'}</td>
        </tr>

        `
    })
    
    const progressPercent = totalRouteOrders
    ? ((checkedRouteOrders / totalRouteOrders) * 100).toFixed(0)
    : 0; // fallback to 0 if no orders

    let html= `
   <div class="route-card">
            <h2>${routeTitle}</h2>

            <!-- Progress Bar -->
            <div class="progress-container">
                <span>Progress: <b>${progressPercent}%</b></span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
            </div>

            <!-- Orders Table -->
            <table class="orders-table">
           <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                     ${ordersHTML}
                </tbody>
            </table>
           
        </div>

         
    `;

    document.querySelector('.js-routes-container').innerHTML += html;

    console.log(totalRouteOrders, checkedRouteOrders)

}


console.log(southernRoute)

renderRoutes('Southern', southernRoute)
renderRoutes('Northern',northenRoute)
renderRoutes('West Coast', westCoastRoute)
renderRoutes('Capetown', capeTownRoute)
renderRoutes('Collections', collectionRoute)


