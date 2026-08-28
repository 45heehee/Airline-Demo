/* Meridian Air — shared booking logic */

/* ── 1. AIRPORTS ─────────────────────────────────────────────────────── */
 window.MA_AIRPORTS = [
  { city: "Atlanta", code: "ATL", country: "United States", region: "North America", airport: "Hartsfield-Jackson Atlanta International Airport" },
  { city: "Beijing", code: "PEK", country: "China", region: "East Asia", airport: "Beijing Capital International Airport" },
  { city: "Los Angeles", code: "LAX", country: "United States", region: "North America", airport: "Los Angeles International Airport" },
  { city: "Dubai", code: "DXB", country: "UAE", region: "Middle East", airport: "Dubai International Airport" },
  { city: "Tokyo", code: "HND", country: "Japan", region: "East Asia", airport: "Tokyo Haneda Airport" },
  { city: "Chicago", code: "ORD", country: "United States", region: "North America", airport: "O'Hare International Airport" },
  { city: "London", code: "LHR", country: "United Kingdom", region: "Europe", airport: "London Heathrow Airport" },
  { city: "Shanghai", code: "PVG", country: "China", region: "East Asia", airport: "Shanghai Pudong International Airport" },
  { city: "Paris", code: "CDG", country: "France", region: "Europe", airport: "Charles de Gaulle Airport" },
  { city: "Dallas", code: "DFW", country: "United States", region: "North America", airport: "Dallas/Fort Worth International Airport" },
  { city: "Amsterdam", code: "AMS", country: "Netherlands", region: "Europe", airport: "Amsterdam Airport Schiphol" },
  { city: "Hong Kong", code: "HKG", country: "Hong Kong", region: "East Asia", airport: "Hong Kong International Airport" },
  { city: "Guangzhou", code: "CAN", country: "China", region: "East Asia", airport: "Guangzhou Baiyun International Airport" },
  { city: "Frankfurt", code: "FRA", country: "Germany", region: "Europe", airport: "Frankfurt Airport" },
  { city: "Singapore", code: "SIN", country: "Singapore", region: "Southeast Asia", airport: "Singapore Changi Airport" },
  { city: "Seoul", code: "ICN", country: "South Korea", region: "East Asia", airport: "Incheon International Airport" },
  { city: "Denver", code: "DEN", country: "United States", region: "North America", airport: "Denver International Airport" },
  { city: "New Delhi", code: "DEL", country: "India", region: "South Asia", airport: "Indira Gandhi International Airport" },
  { city: "Mumbai", code: "BOM", country: "India", region: "South Asia", airport: "Chhatrapati Shivaji Maharaj International Airport" },
  { city: "Bangalore", code: "BLR", country: "India", region: "South Asia", airport: "Kempegowda International Airport" },
  { city: "Jakarta", code: "CGK", country: "Indonesia", region: "Southeast Asia", airport: "Soekarno-Hatta International Airport" },
  { city: "New York", code: "JFK", country: "United States", region: "North America", airport: "John F. Kennedy International Airport" },
  { city: "Kuala Lumpur", code: "KUL", country: "Malaysia", region: "Southeast Asia", airport: "Kuala Lumpur International Airport" },
  { city: "San Francisco", code: "SFO", country: "United States", region: "North America", airport: "San Francisco International Airport" },
  { city: "Chengdu", code: "CTU", country: "China", region: "East Asia", airport: "Chengdu Shuangliu International Airport" },
  { city: "Madrid", code: "MAD", country: "Spain", region: "Europe", airport: "Adolfo Suárez Madrid-Barajas Airport" },
  { city: "Bangkok", code: "BKK", country: "Thailand", region: "Southeast Asia", airport: "Suvarnabhumi Airport" },
  { city: "Las Vegas", code: "LAS", country: "United States", region: "North America", airport: "Harry Reid International Airport" },
  { city: "Chengdu", code: "TFU", country: "China", region: "East Asia", airport: "Chengdu Tianfu International Airport" },
  { city: "Seattle", code: "SEA", country: "United States", region: "North America", airport: "Seattle-Tacoma International Airport" },
  { city: "Orlando", code: "MCO", country: "United States", region: "North America", airport: "Orlando International Airport" },
  { city: "Newark", code: "EWR", country: "United States", region: "North America", airport: "Newark Liberty International Airport" },
  { city: "Charlotte", code: "CLT", country: "United States", region: "North America", airport: "Charlotte Douglas International Airport" },
  { city: "Phoenix", code: "PHX", country: "United States", region: "North America", airport: "Phoenix Sky Harbor International Airport" },
  { city: "Houston", code: "IAH", country: "United States", region: "North America", airport: "George Bush Intercontinental Airport" },
  { city: "Miami", code: "MIA", country: "United States", region: "North America", airport: "Miami International Airport" },
  { city: "Shenzhen", code: "SZX", country: "China", region: "East Asia", airport: "Shenzhen Bao'an International Airport" },
  { city: "Munich", code: "MUC", country: "Germany", region: "Europe", airport: "Munich Airport" },
  { city: "Sydney", code: "SYD", country: "Australia", region: "Oceania", airport: "Sydney Kingsford Smith Airport" },
  { city: "Rome", code: "FCO", country: "Italy", region: "Europe", airport: "Leonardo da Vinci-Fiumicino Airport" },
  { city: "London", code: "LGW", country: "United Kingdom", region: "Europe", airport: "London Gatwick Airport" },
  { city: "Kunming", code: "KMG", country: "China", region: "East Asia", airport: "Kunming Changshui International Airport" },
  { city: "Xi'an", code: "XIY", country: "China", region: "East Asia", airport: "Xi'an Xianyang International Airport" },
  { city: "Manila", code: "MNL", country: "Philippines", region: "Southeast Asia", airport: "Ninoy Aquino International Airport" },
  { city: "Tokyo", code: "NRT", country: "Japan", region: "East Asia", airport: "Narita International Airport" },
  { city: "Moscow", code: "SVO", country: "Russia", region: "Europe", airport: "Sheremetyevo International Airport" },
  { city: "Minneapolis", code: "MSP", country: "United States", region: "North America", airport: "Minneapolis-Saint Paul International Airport" },
  { city: "Detroit", code: "DTW", country: "United States", region: "North America", airport: "Detroit Metropolitan Airport" },
  { city: "Boston", code: "BOS", country: "United States", region: "North America", airport: "Boston Logan International Airport" },
  { city: "Philadelphia", code: "PHL", country: "United States", region: "North America", airport: "Philadelphia International Airport" },
  { city: "New York", code: "LGA", country: "United States", region: "North America", airport: "LaGuardia Airport" },
  { city: "Fort Lauderdale", code: "FLL", country: "United States", region: "North America", airport: "Fort Lauderdale-Hollywood International Airport" },
  { city: "Baltimore", code: "BWI", country: "United States", region: "North America", airport: "Baltimore/Washington International Airport" },
  { city: "Salt Lake City", code: "SLC", country: "United States", region: "North America", airport: "Salt Lake City International Airport" },
  { city: "San Diego", code: "SAN", country: "United States", region: "North America", airport: "San Diego International Airport" },
  { city: "Washington", code: "IAD", country: "United States", region: "North America", airport: "Washington Dulles International Airport" },
  { city: "Tampa", code: "TPA", country: "United States", region: "North America", airport: "Tampa International Airport" },
  { city: "Chicago", code: "MDW", country: "United States", region: "North America", airport: "Chicago Midway International Airport" },
  { city: "Honolulu", code: "HNL", country: "United States", region: "North America", airport: "Daniel K. Inouye International Airport" },
  { city: "Portland", code: "PDX", country: "United States", region: "North America", airport: "Portland International Airport" },
  { city: "Orange County", code: "SNA", country: "United States", region: "North America", airport: "John Wayne Airport" },
  { city: "St. Louis", code: "STL", country: "United States", region: "North America", airport: "St. Louis Lambert International Airport" },
  { city: "Hartford", code: "BDL", country: "United States", region: "North America", airport: "Bradley International Airport" },
  { city: "Austin", code: "AUS", country: "United States", region: "North America", airport: "Austin-Bergstrom International Airport" },
  { city: "Brisbane", code: "BNE", country: "Australia", region: "Oceania", airport: "Brisbane Airport" },
  { city: "Melbourne", code: "MEL", country: "Australia", region: "Oceania", airport: "Melbourne Airport" },
  { city: "Auckland", code: "AKL", country: "New Zealand", region: "Oceania", airport: "Auckland Airport" },
  { city: "Vancouver", code: "YVR", country: "Canada", region: "North America", airport: "Vancouver International Airport" },
  { city: "Toronto", code: "YYZ", country: "Canada", region: "North America", airport: "Toronto Pearson International Airport" },
  { city: "Montreal", code: "YUL", country: "Canada", region: "North America", airport: "Montréal-Trudeau International Airport" },
  { city: "Mexico City", code: "MEX", country: "Mexico", region: "North America", airport: "Mexico City International Airport" },
  { city: "São Paulo", code: "GRU", country: "Brazil", region: "South America", airport: "São Paulo/Guarulhos International Airport" },
  { city: "Rio de Janeiro", code: "GIG", country: "Brazil", region: "South America", airport: "Rio de Janeiro/Galeão International Airport" },
  { city: "Buenos Aires", code: "EZE", country: "Argentina", region: "South America", airport: "Ministro Pistarini International Airport" },
  { city: "Santiago", code: "SCL", country: "Chile", region: "South America", airport: "Arturo Merino Benítez International Airport" },
  { city: "Bogotá", code: "BOG", country: "Colombia", region: "South America", airport: "El Dorado International Airport" },
  { city: "Lima", code: "LIM", country: "Peru", region: "South America", airport: "Jorge Chávez International Airport" },
  { city: "Cape Town", code: "CPT", country: "South Africa", region: "Africa", airport: "Cape Town International Airport" },
  { city: "Johannesburg", code: "JNB", country: "South Africa", region: "Africa", airport: "O.R. Tambo International Airport" },
  { city: "Cairo", code: "CAI", country: "Egypt", region: "Africa", airport: "Cairo International Airport" },
  { city: "Casablanca", code: "CMN", country: "Morocco", region: "Africa", airport: "Mohammed V International Airport" },
  { city: "Addis Ababa", code: "ADD", country: "Ethiopia", region: "Africa", airport: "Addis Ababa Bole International Airport" },
  { city: "Nairobi", code: "NBO", country: "Kenya", region: "Africa", airport: "Jomo Kenyatta International Airport" },
  { city: "Istanbul", code: "IST", country: "Turkey", region: "Europe", airport: "Istanbul Airport" },
  { city: "Istanbul", code: "SAW", country: "Turkey", region: "Europe", airport: "Sabiha Gökçen International Airport" },
  { city: "Athens", code: "ATH", country: "Greece", region: "Europe", airport: "Athens International Airport" },
  { city: "Zurich", code: "ZRH", country: "Switzerland", region: "Europe", airport: "Zurich Airport" },
  { city: "Vienna", code: "VIE", country: "Austria", region: "Europe", airport: "Vienna International Airport" },
  { city: "Copenhagen", code: "CPH", country: "Denmark", region: "Europe", airport: "Copenhagen Airport" },
  { city: "Stockholm", code: "ARN", country: "Sweden", region: "Europe", airport: "Stockholm Arlanda Airport" },
  { city: "Oslo", code: "OSL", country: "Norway", region: "Europe", airport: "Oslo Airport, Gardermoen" },
  { city: "Helsinki", code: "HEL", country: "Finland", region: "Europe", airport: "Helsinki Airport" },
  { city: "Dublin", code: "DUB", country: "Ireland", region: "Europe", airport: "Dublin Airport" },
  { city: "Brussels", code: "BRU", country: "Belgium", region: "Europe", airport: "Brussels Airport" },
  { city: "Geneva", code: "GVA", country: "Switzerland", region: "Europe", airport: "Geneva Airport" },
  { city: "Lisbon", code: "LIS", country: "Portugal", region: "Europe", airport: "Lisbon Airport" },
  { city: "Barcelona", code: "BCN", country: "Spain", region: "Europe", airport: "Josep Tarradellas Barcelona-El Prat Airport" },
  { city: "Doha", code: "DOH", country: "Qatar", region: "Middle East", airport: "Hamad International Airport" },
  { city: "Riyadh", code: "RUH", country: "Saudi Arabia", region: "Middle East", airport: "King Khalid International Airport" },
  { city: "Jeddah", code: "JED", country: "Saudi Arabia", region: "Middle East", airport: "King Abdulaziz International Airport" },
  { city: "Muscat", code: "MCT", country: "Oman", region: "Middle East", airport: "Muscat International Airport" }
];

];

/* Build fast lookup maps */
const MA_BY_CODE = {};
const MA_BY_NAME = {};
MA_AIRPORTS.forEach(a => {
  MA_BY_CODE[a.code.toUpperCase()] = a;
  MA_BY_NAME[a.city.toLowerCase()] = a;
  /* common aliases */
  if (a.city === "São Paulo")      MA_BY_NAME["sao paulo"]     = a;
  if (a.city === "Bogotá")         MA_BY_NAME["bogota"]         = a;
  if (a.city === "New Delhi")      MA_BY_NAME["delhi"]          = a;
  if (a.city === "Dallas")         MA_BY_NAME["dallas fort worth"] = a;
  if (a.city === "Ho Chi Minh City") MA_BY_NAME["ho chi minh"] = a;
});

/* ── 2. REGION-PAIR TABLE ────────────────────────────────────────────── */
/*  Keys are sorted alphabetically so lookup is order-independent.
    tier: 1 = narrow/short-haul (<3.5h), 2 = wide/medium (3.5–8h), 3 = flagship (>8h) */
const MA_REGION_PAIRS = {
  "Africa|Africa":               {minKm:500,  maxKm:4500,  minH:1,   maxH:6,   tier:2},
  "Africa|East Asia":            {minKm:8500, maxKm:11500, minH:10,  maxH:13.5,tier:3},
  "Africa|Europe":               {minKm:1500, maxKm:6500,  minH:3,   maxH:8,   tier:2},
  "Africa|Middle East":          {minKm:1500, maxKm:5500,  minH:3,   maxH:7,   tier:2},
  "Africa|North America":        {minKm:9500, maxKm:12500, minH:12,  maxH:15,  tier:3},
  "Africa|Oceania":              {minKm:9000, maxKm:12500, minH:11,  maxH:15,  tier:3},
  "Africa|South America":        {minKm:3000, maxKm:8500,  minH:4,   maxH:10,  tier:2},
  "Africa|South Asia":           {minKm:3500, maxKm:6500,  minH:5,   maxH:8,   tier:2},
  "Africa|Southeast Asia":       {minKm:7000, maxKm:9500,  minH:8.5, maxH:11.5,tier:3},
  "East Asia|East Asia":         {minKm:800,  maxKm:3500,  minH:1.5, maxH:5,   tier:1},
  "East Asia|Europe":            {minKm:8500, maxKm:10500, minH:10,  maxH:13,  tier:3},
  "East Asia|Middle East":       {minKm:6500, maxKm:9000,  minH:8,   maxH:11,  tier:3},
  "East Asia|North America":     {minKm:9000, maxKm:12000, minH:11,  maxH:14,  tier:3},
  "East Asia|Oceania":           {minKm:6000, maxKm:9500,  minH:8,   maxH:11.5,tier:3},
  "East Asia|South America":     {minKm:16000,maxKm:19000, minH:19,  maxH:22,  tier:3},
  "East Asia|South Asia":        {minKm:3500, maxKm:6500,  minH:5,   maxH:8,   tier:2},
  "East Asia|Southeast Asia":    {minKm:2000, maxKm:5000,  minH:3,   maxH:6.5, tier:2},
  "Europe|Europe":               {minKm:500,  maxKm:3500,  minH:1,   maxH:4.5, tier:1},
  "Europe|Middle East":          {minKm:2500, maxKm:5500,  minH:4,   maxH:7,   tier:2},
  "Europe|North America":        {minKm:5500, maxKm:7500,  minH:7,   maxH:9,   tier:2},
  "Europe|Oceania":              {minKm:14000,maxKm:17500, minH:17,  maxH:21,  tier:3},
  "Europe|South America":        {minKm:8000, maxKm:11000, minH:10,  maxH:13,  tier:3},
  "Europe|South Asia":           {minKm:5500, maxKm:8000,  minH:7,   maxH:10,  tier:2},
  "Europe|Southeast Asia":       {minKm:9000, maxKm:12000, minH:11,  maxH:14,  tier:3},
  "Middle East|Middle East":     {minKm:300,  maxKm:3000,  minH:1,   maxH:4,   tier:1},
  "Middle East|North America":   {minKm:9500, maxKm:11500, minH:12,  maxH:14,  tier:3},
  "Middle East|Oceania":         {minKm:9000, maxKm:12500, minH:11,  maxH:15,  tier:3},
  "Middle East|South America":   {minKm:11000,maxKm:13000, minH:13,  maxH:16,  tier:3},
  "Middle East|South Asia":      {minKm:1500, maxKm:4000,  minH:3,   maxH:5.5, tier:1},
  "Middle East|Southeast Asia":  {minKm:5000, maxKm:7500,  minH:6.5, maxH:9.5, tier:2},
  "North America|North America": {minKm:500,  maxKm:4500,  minH:1,   maxH:6,   tier:1},
  "North America|Oceania":       {minKm:10500,maxKm:14000, minH:13,  maxH:17,  tier:3},
  "North America|South America": {minKm:3500, maxKm:9000,  minH:5,   maxH:11,  tier:2},
  "North America|South Asia":    {minKm:11000,maxKm:13000, minH:14,  maxH:16,  tier:3},
  "North America|Southeast Asia":{minKm:12000,maxKm:14500, minH:15,  maxH:18,  tier:3},
  "Oceania|Oceania":             {minKm:500,  maxKm:5500,  minH:1,   maxH:7,   tier:2},
  "South America|South America": {minKm:1000, maxKm:5000,  minH:1.5, maxH:7,   tier:2},
  "South America|South Asia":    {minKm:14000,maxKm:16000, minH:17,  maxH:19,  tier:3},
  "South America|Southeast Asia":{minKm:15500,maxKm:18500, minH:18,  maxH:21,  tier:3},
  "South America|Oceania":       {minKm:11000,maxKm:14000, minH:13,  maxH:16,  tier:3},
  "South Asia|South Asia":       {minKm:500,  maxKm:3000,  minH:1,   maxH:4.5, tier:1},
  "South Asia|Southeast Asia":   {minKm:2000, maxKm:4500,  minH:3,   maxH:6,   tier:2},
  "South Asia|Oceania":          {minKm:6000, maxKm:11000, minH:8,   maxH:13,  tier:3},
  "Southeast Asia|Southeast Asia":{minKm:300, maxKm:3500,  minH:1,   maxH:4.5, tier:1},
  "Southeast Asia|Oceania":      {minKm:3500, maxKm:8000,  minH:5,   maxH:10,  tier:2}
};

function maRegionPairKey(r1, r2) {
  return [r1, r2].sort().join('|');
}

function maLookupRegionPair(r1, r2) {
  return MA_REGION_PAIRS[maRegionPairKey(r1, r2)] || null;
}

/* ── 3. AIRCRAFT BY TIER ─────────────────────────────────────────────── */
const MA_AIRCRAFT = {
  1: ['Airbus A320', 'Boeing 737-800', 'Boeing 737-900ER', 'Boeing 737 MAX 8', 'Boeing 737 MAX 9'],
  2: ['Airbus A330-900neo', 'Boeing 787-8', 'Boeing 787-9', 'Airbus A321neo'],
  3: ['Airbus A350-900', 'Airbus A350-1000', 'Boeing 777-300ER', 'Boeing 787-10', 'Boeing 777-9', 'Airbus A380']
};

const MA_CLASSES = {
  1: ['economy', 'business'],
  2: ['economy', 'premium', 'business'],
  3: ['economy', 'premium', 'business', 'first']
};

const MA_CLASS_META = {
  economy:  { label: 'Economy',         mult: 1 },
  premium:  { label: 'Premium Economy', mult: 1.55 },
  business: { label: 'Business',        mult: 2.6 },
  first:    { label: 'First',           mult: 4.3 }
};

/* Tier label strings for display */
const MA_TIER_LABEL = {
  1: 'Short-haul',
  2: 'Medium-haul',
  3: 'Long-haul'
};

/* ── 4. LOOKUP HELPERS ───────────────────────────────────────────────── */
function maNormalize(str) { return (str || '').trim().toLowerCase(); }

function maFindAirport(input) {
  const s = maNormalize(input);
  /* try IATA code first */
  if (MA_BY_CODE[s.toUpperCase()]) return MA_BY_CODE[s.toUpperCase()];
  /* try city name */
  if (MA_BY_NAME[s]) return MA_BY_NAME[s];
  /* partial match */
  return MA_AIRPORTS.find(a => a.city.toLowerCase().includes(s) || s.includes(a.city.toLowerCase())) || null;
}

function maResolveTier(from, to) {
  const f = maFindAirport(from);
  const t = maFindAirport(to);
  if (f && t) {
    const pair = maLookupRegionPair(f.region, t.region);
    if (pair) return pair.tier;
  }
  /* fallback: hash-based */
  const roll = maHash(maNormalize(from) + '|' + maNormalize(to)) % 10;
  if (roll < 3) return 1;
  if (roll < 8) return 2;
  return 3;
}

function maRouteInfo(from, to) {
  const f = maFindAirport(from);
  const t = maFindAirport(to);
  if (!f || !t) return null;
  const pair = maLookupRegionPair(f.region, t.region);
  if (!pair) return null;
  return { fromAirport: f, toAirport: t, pair };
}

/* ── 5. HASH / RNG ───────────────────────────────────────────────────── */
function maHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function maSeededRandom(seed) {
  let t = seed >>> 0;
  return function() {
    t = (t + 0x6D2B79F5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── 6. FLIGHT GENERATION ───────────────────────────────────────────── */
function maGenerateFlights(from, to, depart, passengers) {
  const tier = maResolveTier(from, to);
  const aircraftList = MA_AIRCRAFT[tier];
  const classes = MA_CLASSES[tier];
  const seed = maHash(maNormalize(from) + '|' + maNormalize(to) + '|' + (depart || ''));
  const rand = maSeededRandom(seed);

  /* Derive realistic duration from region-pair table */
  const info = maRouteInfo(from, to);
  let durMinBase;
  if (info) {
    const minM = info.pair.minH * 60;
    const maxM = info.pair.maxH * 60;
    durMinBase = minM + rand() * (maxM - minM);
  } else {
    durMinBase = tier === 1 ? (90 + rand() * 120)
               : tier === 2 ? (240 + rand() * 240)
               : (480 + rand() * 480);
  }

  /* Derive realistic distance */
  let distKm = null;
  if (info) {
    distKm = Math.round(info.pair.minKm + rand() * (info.pair.maxKm - info.pair.minKm));
  }

  const flightCount = 3 + Math.floor(rand() * 2);
  const flights = [];

  for (let i = 0; i < flightCount; i++) {
    const aircraft = aircraftList[Math.floor(rand() * aircraftList.length)];
    const durMinutes = Math.round(durMinBase + (rand() * 40 - 20));
    const stops = (tier === 1 && rand() < 0.35) ? 1 : 0;
    const depMinutes = Math.round((5 + rand() * 17) * 60 / 5) * 5;
    const arrMinutes = (depMinutes + durMinutes) % (24 * 60);
    const arrDayOffset = Math.floor((depMinutes + durMinutes) / (24 * 60));
    const basePriceEconomy = Math.round(
      (tier === 1 ? 90 : tier === 2 ? 480 : 780) +
      rand() * (tier === 1 ? 160 : tier === 2 ? 420 : 900)
    );
    const flightNumber = 'MA ' + (100 + Math.floor(rand() * 800));
    const prices = {};
    classes.forEach(c => { prices[c] = Math.round(basePriceEconomy * MA_CLASS_META[c].mult / 5) * 5; });

    flights.push({
      id: 'f' + i + '-' + seed,
      flightNumber, aircraft, tier, stops, durMinutes, distKm,
      depMinutes, arrMinutes, arrDayOffset, classes, prices
    });
  }

  flights.sort((a, b) => a.prices.economy - b.prices.economy);
  return { tier, from, to, depart, passengers, flights };
}

/* ── 7. FORMATTING ───────────────────────────────────────────────────── */
function maFormatTime(mins) {
  mins = ((mins % (24 * 60)) + 24 * 60) % (24 * 60);
  let h = Math.floor(mins / 60); const m = mins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if (h === 0) h = 12;
  return h + ':' + String(m).padStart(2, '0') + ' ' + ampm;
}

function maFormatDuration(mins) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return h + 'h ' + String(m).padStart(2, '0') + 'm';
}

function maFormatDate(d) {
  if (!d) return 'Any date';
  try {
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) { return d; }
}

function maPassengerCount(p) {
  if (!p) return 1;
  const n = parseInt(p, 10);
  return isNaN(n) ? 1 : n;
}

/* ── 8. SEAT MAPS ────────────────────────────────────────────────────── */
function maSeatConfig(tier, cabin) {
  const layouts = {
    economy:  { cols: ['A','B','C','D','E','F','G','H'], aisleAfter: 2, aisleAfter2: 6 },
    premium:  { cols: ['A','B','C','D','E','F','G'],     aisleAfter: 2, aisleAfter2: 5 },
    business: { cols: ['A','C','D','F'],                  aisleAfter: 1, aisleAfter2: 3 },
    first:    { cols: ['A','K'],                          aisleAfter: 1 }
  };
  const narrowLayouts = {
    economy:  { cols: ['A','B','C','D','E','F'], aisleAfter: 3 },
    business: { cols: ['A','B','C','D','E','F'], aisleAfter: 3 }
  };
  const base = tier === 1 ? (narrowLayouts[cabin] || narrowLayouts.economy) : (layouts[cabin] || layouts.economy);
  const rowCounts = {
    1: { economy: 24, business: 4 },
    2: { economy: 26, premium: 5,  business: 6 },
    3: { economy: 30, premium: 6,  business: 7, first: 4 }
  };
  const startRows = {
    1: { economy: 7,  business: 1 },
    2: { economy: 15, premium: 9,  business: 1 },
    3: { economy: 18, premium: 11, business: 4, first: 1 }
  };
  return {
    cols: base.cols,
    aisleAfter: base.aisleAfter,
    aisleAfter2: base.aisleAfter2 || null,
    rows: (rowCounts[tier] || rowCounts[2])[cabin] || 20,
    startRow: (startRows[tier] || startRows[2])[cabin] || 1
  };
}

function maGenerateSeats(seed, config) {
  const rand = maSeededRandom(seed);
  const rows = [];
  for (let r = 0; r < config.rows; r++) {
    const rowNum = config.startRow + r;
    const seatsByCol = {};
    config.cols.forEach(col => {
      seatsByCol[col] = { id: rowNum + col, row: rowNum, col, occupied: rand() < 0.3 };
    });
    rows.push({ rowNum, seatsByCol });
  }
  return rows;
}

/* ── 9. SESSION STORAGE ──────────────────────────────────────────────── */
function maSaveSelection(obj)  { try { sessionStorage.setItem('ma_selection', JSON.stringify(obj)); } catch(e){} }
function maLoadSelection()     { try { return JSON.parse(sessionStorage.getItem('ma_selection')); } catch(e){ return null; } }
function maSaveSeat(seat)      { try { sessionStorage.setItem('ma_seat', JSON.stringify(seat)); } catch(e){} }
function maLoadSeat()          { try { return JSON.parse(sessionStorage.getItem('ma_seat')); } catch(e){ return null; } }
function maClearBooking()      { try { sessionStorage.removeItem('ma_selection'); sessionStorage.removeItem('ma_seat'); } catch(e){} }
