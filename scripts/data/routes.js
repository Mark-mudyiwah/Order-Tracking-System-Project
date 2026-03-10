import { routeOrders,startAutoLock } from "../utils/local.js";
import { zoneSuburbs,zoneNames,} from "../utils/routes-utils.js";

 // DELIVERY ZONES

;
   //STORE ZONES IN ARRAYS
 

 startAutoLock(ADMIN_PASSWORD,10)

  

const collectionRoute = routeOrders.filter(order =>
  order.deliveryType === "Collection"
);


 function normalizeLocation(value) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}
 
zoneNames.forEach((zoneName, index) => {

  const suburbs = zoneSuburbs[index];

  const route = routeOrders.filter(order => {

    const orderAddress = normalizeLocation(order.address);

    return suburbs.some(suburb =>
      normalizeLocation(suburb) === orderAddress
    );

  });

  if (route.length > 0) {
    renderRoutes(zoneName, route);
  }

});

  // COLLECTION ROUTE



renderRoutes("Collections", collectionRoute);

 

function renderRoutes(routeTitle, routeName) {

  const totalRouteOrders = routeName.length;
  let checkedRouteOrders = 0;
  let ordersHTML = "";

  routeName.forEach((order) => {

    if (order.status === "checked") {
      checkedRouteOrders++;
    }

    let statusClass = "status pending";
    let statusText = order.status;

    if (order.status === "checked") {
      statusClass = "status completed";
      statusText = "Completed";
    } else if (order.status === "Awaiting P.O.P") {
      statusClass = "status awaiting-payment";
    } else if (order.status === "Processing") {
      statusClass = "status processing";
    }else if (order.status === "Dispatched") {
      statusClass = "status dispatched";
    }

    ordersHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.address}</td>
        <td>
          <span class="${statusClass}">${statusText}</span>
        </td>
      </tr>
    `;
  });

  const progressPercent = totalRouteOrders
    ? ((checkedRouteOrders / totalRouteOrders) * 100).toFixed(0)
    : 0;

  let html = `
    <div class="route-card">
      <h2>${routeTitle}</h2>
      <div class="progress-container">
        <span>Progress: <b>${progressPercent}%</b></span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
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

  document.querySelector(".js-routes-container").innerHTML += html;
}