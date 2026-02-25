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

  // Observatory / Mowbray Side
  "Observatory",
  "Mowbray",
  "Rosebank",
  "Little Mowbray",
  "Rondebosch",
  "Rondebosch East",
  "Newlands",
  "Bishopscourt",

  // Claremont / Kenilworth
  "Claremont",
  "Claremont Upper",
  "Kenilworth",
  "Kenilworth Upper",
  "Harfield Village",
  "Wetton",
  "Dreyer Street Area",
   "lansdowne",
   "Belgravia",
   "Athlone",
   "Rylands",
   "Crawford",
   "Penlyn",
   "Hazendal",

  // Wynberg / Plumstead
  "Wynberg",
  "Wynberg Upper",
  "Plumstead",
  "Diep River",
  "Southfield",
  "Heathfield",

  // Constantia Valley
  "Constantia",
  "Constantia Village",
  "Kreupelbosch",
  "Meadowridge",
  "Bergvliet",
  "Lakeside",
  "Tokai",
  "Kirstenhof",

  // Steenberg / Retreat Area
  "Steenberg",
  "Retreat",
  "Retreat Industrial",
  "Lavender Hill",
  "Seawinds",
  "Grassy Park",
  "Lotus River",
  "Pelican Park",
  "Zeekoevlei",

  // Muizenberg / False Bay
  "Muizenberg",
  "Marina da Gama",
  "Capricorn",
  "St James",
  "Kalk Bay",
  "Fish Hoek",
  "Sunny Cove",
  "Glencairn",
  "Simons Town",
  "Welcome Glen",

  // Noordhoek / Kommetjie
  "Noordhoek",
  "Sun Valley",
  "Capri",
  "Kommetjie",
  "Ocean View",
  "Masiphumelele",
  "Scarborough",
  "Red Hill"
];
const northernSuburbs = [

  // Bellville Core
  "Bellville",
  "Bellville South",
  "Boston",
  "Oakdale",
  "Parow Valley",
  "Hoheizen",
  "De La Haye",
  "Stellenridge",
  "Stellenryk",
  "Chrismar",
  "Belhar",
  "University Estate Bellville",
  "Bellville Central",

  // Parow Area
  "Parow",
  "Parow North",
  "Parow East",
  "Glenlily",
  "Oostersee",
  "Ravensmead",
  "Avondale Parow",
  "De Tijger",
  "Fairfield Estate",

  // Goodwood Area
  "Goodwood",
  "Goodwood Estate",
  "Townsend Estate",
  "Ruyterwacht",
  "Vasco Estate",
  "Glenwood",
  "Elsies River",
  "Connaught Estate",
  "Heideveld",
  "Bonteheuwel",

  // Plattekloof / Panorama Hills
  "Plattekloof",
  "Plattekloof Glen",
  "Panorama",
  "Welgelegen",
  "Baronetcy Estate",
  "Kleinbosch",
  "Welgemoed",
  "Van Riebeeckshof",
  "De Bron",
  "Door De Kraal",
  "Ridgeworth",
  "Tygerdal",
  "Monte Vista",
  "Bothasig",
  "Edgemead",

  // Durbanville Area
  "Durbanville",
  "Durbanville Hills",
  "Vierlanden",
  "Sonstraal",
  "Sonstraal Heights",
  "Uitzicht",
  "Bonnie Brae",
  "Eversdal",
  "Kenridge",
  "Vygeboom",
  "Vygeboom Estate",
  "Goedemoed",
  "Amanda Glen",
  "Aurora",
  "Clara Anna Fontein",
  "Langeberg Ridge",
  "Graanendal",
  "Pinehurst",

  // Brackenfell Area
  "Brackenfell",
  "Protea Heights",
  "Vredekloof",
  "Vredekloof East",
  "Vredekloof Heights",
  "Northpine",
  "Rouxville",
  "Ferndale",
  "Sonkring",
  "Kleinbron Estate",
  "Burgundy Estate ",

  // Kraaifontein Area
  "Kraaifontein",
  "Windsor Park",
  "Windsor Park Estate",
  "Fountain Village",
  "Peerless Park",
  "Peerless Park East",
  "Peerless Park North",
  "Zoo Park",
  "Langeberg Heights",
  "Joostenbergvlakte",

  // Airport / Industrial
  "Airport Industria",
  "Airport City",
  "Blackheath",
  "Blackheath Industrial",
  "Saxenburg Park",
  "Epping",
  "Thornton",
  "Ndabeni",
  "Maitland",

  // Blue Downs / Eastern Edge
  "Blue Downs",
  "Mfuleni",
  "Delft",
  "Rocklands",
  "Mitchell's plain",
  "Portlands",
  "Delft South",
  "Eerste River",
  "Kleinvlei",
  "The Hague",
  "Electric City"
];

const westCoastSuburbs = [
  // Parklands / Rivergate Area
  "Rivergate",
  "Parklands",
  "Parklands North",
  "Table View",
  "Flamingo Vlei",
  "Sunningdale",
  "West Beach",
  "Bloubergstrand",
  "Big Bay",
  "Sandown",

  // Milnerton / Century Area
  "Century City",
  "Milnerton",
  "Milnerton Ridge",
  "Sunset Beach",
  "Sunset Links",
  "Royal Ascot",
  "Woodbridge Island",
  "Sanddrift",
  "Tijgerhof",
  "Bothasig",
  "Edgemead",
  "Monte Vista",
  "Summer Greens",

  // Industrial
  "Killarney Gardens",
  "Racing Park",
  "Montague Gardens",
  "Paarden Eiland",
  "Brooklyn",
  

  // Atlantis & Surroundings
  "Atlantis",
  "Robinvale",
  "Wesfleur",
  "Saxenburg Park",
  "Beacon Hill",
  "Protea Park",
  "Sherwood",
  "Avondale",
  "Mamre",
  "Pella",

  // West Coast Stretch
  "Melkbosstrand",
  "Duynefontein",
  "Van Riebeeckstrand",
  "Groot Brakrivier",
  "Philadelphia",
  "Morningstar",
  "Fisantkraal",
  "Klipheuwel",
  "Chatsworth",
  "Malmesbury"
];

const capeTownSuburbs= [

  // CBD Core
  "Capetown",
  "CBD",
  "City Bowl",
  "Foreshore",
  "Gardens",
  "Oranjezicht",
  "Vredehoek",
  "Tamboerskloof",
  "Higgovale",
  "Devils Peak Estate",
  "Zonnebloem",
  "District Six",
  "Bo-Kaap",
  "De Waterkant",
  "Lower Long Street Area",

  // Waterfront Area
  "Victoria & Alfred Waterfront",
  "Green Point Stadium Precinct",
  "Portswood",
  "Granger Bay",

  // Woodstock / Salt River Side
  "Woodstock",
  "Upper Woodstock",
  "Salt River",
  "Walmer Estate",
  "University Estate",
   

  // Green Point / Sea Point Strip
  "Green Point",
  "Three Anchor Bay",
  "Mouille Point",
  "Sea Point",
  "Fresnaye",
  "Bantry Bay",

  // Clifton / Camps Bay
  "Clifton",
  "Camps Bay",
  "Bakoven",
  "Oudekraal",

  // Hout Bay Stretch
  "Hout Bay",
  "Imizamo Yethu",
  "Llandudno"
];
  
   //STORE ZONES IN ARRAYS
 

const zoneNames = ["Southern", "Northern", "West Coast", "Cape Town"];
const zoneSuburbs = [
  southernSuburbs,
  northernSuburbs,
  westCoastSuburbs,
  capeTownSuburbs
];

 function normalizeLocation(value) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}
 
const normalizedZoneSets = zoneSuburbs.map(zoneArray =>
  new Set(zoneArray.map(suburb => normalizeLocation(suburb)))
);
 
for (let i = 0; i < zoneNames.length; i++) {

  const currentZoneName = zoneNames[i];
  const currentZoneSet = normalizedZoneSets[i];

  const route = routeOrders.filter(order =>
    currentZoneSet.has(normalizeLocation(order.address))
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