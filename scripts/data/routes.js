import { routeOrders } from "../utils/local.js";

//console.log(routeOrders)






/*

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




 */
 
 
 

 

 
  // DELIVERY ZONES
 

const southernSuburbs = [
  "Athlone","Claremont","Constantia","Crawford","Kenilworth",
  "Kenwyn","Kirstenhof","Lansdowne","Lotus River","Marina da Gama",
  "Meadowridge","Mowbray","Newlands","Observatory","Ottery","retreat",
  "Penlyn","Pinelands","Plumstead","Rondebosch","Rondebosch East",
  "Rylands","Southfield","Surrey Estate","Tokai","Wynberg","Zeekoevlei","Zeekovlei","Hout Bay"
];

const northernSuburbs = [
  "Bluedowns","Bellville","Belhar","Blue Downs","Bonteheuwel","Bothasig",
  "Brackenfell","","Durbanville","Edgemead","Eersterivier",
  "Elsies River","Goodwood","Kraaifontein","Kuils River","Loevenstein",
  "Monte Vista","Northpine","Oakdene","Oostersee","Panorama","Delft","Heideveld",
  "Parow","Parow North","Parow Valley","Parow West","Plattekloof","Maitland",
  "Ruyterwacht","Thornton","Tijgerhof","Brooklyn","Vasco Estate","Welgelegen"
];

const westCoastSuburbs = [
  "Big Bay","Blouberg","Burgundy Estate","Century City","Eagle Park",
  "Flamingo Vlei","Milnerton Rural","Paarden Eiland",
  "Parklands","Sandrift","Summergreens","Milnerton",
  "Sunningdale","Tableview","Montague","Montague Gardens"
];

const capeTownSuburbs = [
  "Cape Town CBD","Bo-Kaap","Green Point",
  "Sea Point","Fresnaye","Vredehoek",
  "Walmer Estate","Woodstock"
];

  
   //STORE ZONES IN ARRAYS
 

const zoneNames = ["Southern", "Northern", "West Coast", "Cape Town"];
const zoneSuburbs = [
  southernSuburbs,
  northernSuburbs,
  westCoastSuburbs,
  capeTownSuburbs
];

 
   //GENERATE ROUTES USING FOR LOOP
 

for (let i = 0; i < zoneNames.length; i++) {

  const currentZoneName = zoneNames[i];
  const currentZoneSuburbs = zoneSuburbs[i];

  const route = routeOrders.filter(order =>
    currentZoneSuburbs.includes(order.address)
  );

  renderRoutes(currentZoneName, route);
}

  // COLLECTION ROUTE


const collectionRoute = routeOrders.filter(order =>
  order.deliveryType === "Collection"
);

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