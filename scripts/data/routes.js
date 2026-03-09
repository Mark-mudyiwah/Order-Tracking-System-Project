import { routeOrders } from "../utils/local.js";

 

 
  // DELIVERY ZONES
const southernSuburbs = [
  "Observatory", "Mowbray", "Rosebank", "Little Mowbray", "Rondebosch", "Rondebosch East", 
  "Newlands", "Bishopscourt", "Claremont", "Claremont Upper", "Kenilworth", "Kenilworth Upper", 
  "Harfield Village", "Wetton", "Lansdowne", "Belgravia", "Athlone", "Rylands", "Crawford", 
  "Penlyn", "Hazendal", "Wynberg", "Wynberg Upper", "Plumstead", "Diep River", "Southfield", 
  "Heathfield", "Constantia", "Constantia Village", "Kreupelbosch", "Meadowridge", "Bergvliet", 
  "Lakeside", "Tokai", "Kirstenhof", "Steenberg", "Retreat", "Lavender Hill", "Seawinds", 
  "Grassy Park", "Lotus River", "Pelican Park", "Zeekoevlei", "Muizenberg", "Marina da Gama","Fisherman's Village",
  "Capricorn", "St James", "Kalk Bay", "Fish Hoek", "Sunny Cove", "Glencairn", "Simons Town", 
  "Welcome Glen", "Noordhoek", "Sun Valley", "Capri", "Kommetjie", "Ocean View", "Masiphumelele", 
  "Scarborough", "Red Hill","Belthorn Estate","Newfields","Ottery"
];

const northernSuburbs = [
  "Bellville", "Bellville South","Pinelands" ,"Boston", "Oakdale", "Parow Valley", "Hoheizen", "De La Haye", 
  "Stellenridge", "Stellenryk", "Chrismar", "Belhar", "University Estate Bellville", "Bellville Central", 
  "Parow", "Parow North", "Parow East", "Glenlily", "Oostersee", "Ravensmead", "Avondale Parow", 
  "De Tijger", "Fairfield Estate", "Goodwood", "Goodwood Estate", "Townsend Estate", "Ruyterwacht", 
  "Vasco Estate", "Glenwood", "Elsies River", "Connaught Estate", "Heideveld", "Bonteheuwel","Charlesville",
  "Plattekloof", "Plattekloof Glen", "Panorama", "Welgelegen", "Baronetcy Estate", "Kleinbosch", 
  "Welgemoed", "Van Riebeeckshof", "De Bron", "Door De Kraal", "Ridgeworth", "Tygerdal","Riverton",
  "Monte Vista", "Bothasig", "Edgemead", "Durbanville", "Durbanville Hills", "Vierlanden", 
  "Sonstraal", "Sonstraal Heights", "Uitzicht", "Bonnie Brae", "Eversdal", "Kenridge", "Vygeboom", 
  "Goedemoed", "Amanda Glen", "Aurora", "Clara Anna Fontein", "Langeberg Ridge", "Graanendal", 
  "Pinehurst", "Brackenfell", "Protea Heights", "Vredekloof", "Vredekloof East", "Northpine", 
  "Rouxville", "Ferndale", "Sonkring", "Kleinbron Estate", "Burgundy Estate", "Kraaifontein", 
  "Windsor Park", "Fountain Village", "Peerless Park", "Zoo Park", "Langeberg Heights","Oakdene",
  "Joostenbergvlakte", "Airport Industria", "Airport City", "Blackheath", "Saxenburg Park", 
  "Epping", "Thornton", "Ndabeni", "Maitland", "Blue Downs", "Mfuleni", "Delft", "Mitchell's Plain","schaapkraal","Strandfontein",
  "Eerste River", "Kleinvlei", "Electric City"
];

const westCoastSuburbs = [
  "Milnerton", "Milnerton Ridge", "Sunset Beach", "Sunset Links", "Royal Ascot", 
  "Woodbridge Island", "Sanddrift", "Tijgerhof", "Century City","Century Boulevard", "Summer Greens", 
  "Montague Gardens", "Marconi Beam", "Paarden Eiland", "Brooklyn", "Rugby", "Table View", 
  "Flamingo Vlei", "Sunningdale", "West Beach", "Bloubergstrand","Blouberg", "Big Bay", "Sandown", 
  "Parklands", "Parklands North", "Rivergate", "Killarney Gardens", "Racing Park", 
  "Melkbosstrand", "Duynefontein", "Van Riebeeckstrand"
];

const farWestCoastSuburbs = [
  "Philadelphia", "Morningstar", "Fisantkraal", "Klipheuwel", "Chatsworth", "Atlantis", 
  "Robinvale", "Wesfleur", "Beacon Hill", "Protea Park", "Sherwood", "Avondale Atlantis", 
  "Mamre", "Pella", "Malmesbury","Cape Farms"
];

const capeTownSuburbs = [
  "Capetown", "CBD", "City Bowl", "Foreshore", "Gardens", "Oranjezicht", "Vredehoek", 
  "Tamboerskloof", "Higgovale", "Devils Peak Estate", "Zonnebloem", "District Six", 
  "Bo-Kaap", "De Waterkant", "Victoria & Alfred Waterfront", "WaterFront","Granger Bay", "Woodstock", 
  "Upper Woodstock", "Salt River", "Walmer Estate", "University Estate", "Green Point", 
  "Three Anchor Bay", "Mouille Point", "Sea Point", "Fresnaye", "Bantry Bay", "Clifton", 
  "Camps Bay", "Bakoven", "Oudekraal", "Hout Bay", "Imizamo Yethu", "Llandudno",
];

 
const stellenStrandSuburbs = [
  "Stellenbosch", "Die Boord", "Mostertsdrift", "Idas Valley", "Cloetesville","Kuils River","Kraaifontein",
  "Kayamandi", "Paradyskloof", "Brandwacht", "Welgevonden Estate", "Jamestown", 
  "Kylemore", "Pniel", "Franschhoek",  "Somerset West", "Strand", "Gordon's Bay", "Firgrove", "Macassar", "Sir Lowry's Pass", 
  "Spanish Farm", "Heldervue", "Greenways","Paarl","Wellington"
];
   //STORE ZONES IN ARRAYS
 

const zoneNames = ["Southern", "Northern", "West Coast", "Cape Town","Far West Coast","Strand & Stellenbosch"];
const zoneSuburbs = [
  southernSuburbs,
  northernSuburbs,
  westCoastSuburbs,
  capeTownSuburbs,
  farWestCoastSuburbs,
  stellenStrandSuburbs,

];


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