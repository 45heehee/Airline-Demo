/* Meridian Air — shared booking logic used by results.html, seats.html, checkout.html */

const MA_CITY_DB = {
  // narrow-body / short-haul network
  'new york': {code:'JFK', tier:'narrow'}, 'jfk': {code:'JFK', tier:'narrow'},
  'toronto': {code:'YYZ', tier:'narrow'}, 'yyz': {code:'YYZ', tier:'narrow'},
  'chicago': {code:'ORD', tier:'narrow'}, 'ord': {code:'ORD', tier:'narrow'},
  // wide-body / medium-haul network
  'london': {code:'LHR', tier:'wide'}, 'lhr': {code:'LHR', tier:'wide'},
  'paris': {code:'CDG', tier:'wide'}, 'cdg': {code:'CDG', tier:'wide'},
  'frankfurt': {code:'FRA', tier:'wide'}, 'fra': {code:'FRA', tier:'wide'},
  'rome': {code:'FCO', tier:'wide'}, 'fco': {code:'FCO', tier:'wide'},
  'amsterdam': {code:'AMS', tier:'wide'}, 'ams': {code:'AMS', tier:'wide'},
  'seoul': {code:'ICN', tier:'wide'}, 'icn': {code:'ICN', tier:'wide'},
  'sao paulo': {code:'GRU', tier:'wide'}, 'são paulo': {code:'GRU', tier:'wide'}, 'gru': {code:'GRU', tier:'wide'},
  'mexico city': {code:'MEX', tier:'wide'}, 'mex': {code:'MEX', tier:'wide'},
  'bogota': {code:'BOG', tier:'wide'}, 'bogotá': {code:'BOG', tier:'wide'}, 'bog': {code:'BOG', tier:'wide'},
  'cairo': {code:'CAI', tier:'wide'}, 'cai': {code:'CAI', tier:'wide'},
  'johannesburg': {code:'JNB', tier:'wide'}, 'jnb': {code:'JNB', tier:'wide'},
  // flagship / long & ultra-long-haul network
  'tokyo': {code:'HND', tier:'flagship'}, 'hnd': {code:'HND', tier:'flagship'},
  'singapore': {code:'SIN', tier:'flagship'}, 'sin': {code:'SIN', tier:'flagship'},
  'hong kong': {code:'HKG', tier:'flagship'}, 'hkg': {code:'HKG', tier:'flagship'},
  'sydney': {code:'SYD', tier:'flagship'}, 'syd': {code:'SYD', tier:'flagship'},
  'dubai': {code:'DXB', tier:'flagship'}, 'dxb': {code:'DXB', tier:'flagship'},
  'doha': {code:'DOH', tier:'flagship'}, 'doh': {code:'DOH', tier:'flagship'},
  'auckland': {code:'AKL', tier:'flagship'}, 'akl': {code:'AKL', tier:'flagship'},
  'perth': {code:'PER', tier:'flagship'}, 'per': {code:'PER', tier:'flagship'},
  'houston': {code:'IAH', tier:'flagship'}, 'iah': {code:'IAH', tier:'flagship'}
};

const MA_AIRCRAFT = {
  narrow:   ['Airbus A320', 'Boeing 737-800', 'Boeing 737-900ER'],
  wide:     ['Airbus A330-900neo', 'Boeing 787-9', 'Boeing 777-200ER'],
  flagship: ['Airbus A350-900', 'Boeing 777-300ER', 'Boeing 787-10', 'Airbus A350-1000']
};

const MA_CLASSES = {
  narrow:   ['economy', 'business'],
  wide:     ['economy', 'premium', 'business'],
  flagship: ['economy', 'premium', 'business', 'first']
};

const MA_CLASS_META = {
  economy:  { label: 'Economy',          mult: 1 },
  premium:  { label: 'Premium Economy',  mult: 1.55 },
  business: { label: 'Business',         mult: 2.6 },
  first:    { label: 'First',            mult: 4.3 }
};

function maNormalize(str) { return (str || '').trim().toLowerCase(); }

function maHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function maSeededRandom(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6D2B79F5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function maResolveTier(from, to) {
  const tiers = ['narrow', 'wide', 'flagship'];
  const f = MA_CITY_DB[maNormalize(from)];
  const t = MA_CITY_DB[maNormalize(to)];
  if (f && t) return tiers[Math.max(tiers.indexOf(f.tier), tiers.indexOf(t.tier))];
  if (f) return f.tier;
  if (t) return t.tier;
  const roll = maHash(maNormalize(from) + '|' + maNormalize(to)) % 10;
  if (roll < 3) return 'narrow';
  if (roll < 8) return 'wide';
  return 'flagship';
}

function maGenerateFlights(from, to, depart, passengers) {
  const tier = maResolveTier(from, to);
  const aircraftList = MA_AIRCRAFT[tier];
  const classes = MA_CLASSES[tier];
  const seed = maHash(maNormalize(from) + '|' + maNormalize(to) + '|' + (depart || ''));
  const rand = maSeededRandom(seed);

  const durMinBase = tier === 'narrow' ? (90 + rand() * 150)
                    : tier === 'wide'   ? (300 + rand() * 240)
                    : (600 + rand() * 480);

  const flightCount = 3 + Math.floor(rand() * 2);
  const flights = [];

  for (let i = 0; i < flightCount; i++) {
    const aircraft = aircraftList[Math.floor(rand() * aircraftList.length)];
    const durMinutes = Math.round(durMinBase + (rand() * 40 - 20));
    const stops = (tier === 'narrow' && rand() < 0.35) ? 1 : 0;
    const depMinutes = Math.round((5 + rand() * 17) * 60 / 5) * 5;
    const arrMinutes = (depMinutes + durMinutes) % (24 * 60);
    const arrDayOffset = Math.floor((depMinutes + durMinutes) / (24 * 60));
    const basePriceEconomy = Math.round(
      (tier === 'narrow' ? 90 : tier === 'wide' ? 480 : 780) +
      rand() * (tier === 'narrow' ? 160 : tier === 'wide' ? 420 : 900)
    );
    const flightNumber = 'MA ' + (100 + Math.floor(rand() * 800));

    const prices = {};
    classes.forEach(c => { prices[c] = Math.round(basePriceEconomy * MA_CLASS_META[c].mult / 5) * 5; });

    flights.push({
      id: 'f' + i + '-' + seed,
      flightNumber, aircraft, tier, stops, durMinutes,
      depMinutes, arrMinutes, arrDayOffset, classes, prices
    });
  }

  flights.sort((a, b) => a.prices.economy - b.prices.economy);
  return { tier, from, to, depart, passengers, flights };
}

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

/* ---------- Seat maps ---------- */
function maSeatConfig(tier, cabin) {
  const layouts = {
    economy:  { cols: ['A','B','C','D','E','F','G','H'], aisleAfter: 2, aisleAfter2: 6 },
    premium:  { cols: ['A','B','C','D','E','F','G'],       aisleAfter: 2, aisleAfter2: 5 },
    business: { cols: ['A','C','D','F'],                    aisleAfter: 1, aisleAfter2: 3 },
    first:    { cols: ['A','K'],                            aisleAfter: 1 }
  };
  const narrowLayouts = {
    economy:  { cols: ['A','B','C','D','E','F'], aisleAfter: 3 },
    business: { cols: ['A','B','C','D','E','F'], aisleAfter: 3 }
  };
  const base = tier === 'narrow' ? narrowLayouts[cabin] : layouts[cabin];

  const rowCounts = {
    narrow:   { economy: 24, business: 4 },
    wide:     { economy: 26, premium: 5, business: 6 },
    flagship: { economy: 30, premium: 6, business: 7, first: 4 }
  };
  const startRows = {
    narrow:   { economy: 7,  business: 1 },
    wide:     { economy: 15, premium: 9,  business: 1 },
    flagship: { economy: 18, premium: 11, business: 4, first: 1 }
  };

  return {
    cols: base.cols,
    aisleAfter: base.aisleAfter,
    aisleAfter2: base.aisleAfter2 || null,
    rows: rowCounts[tier][cabin],
    startRow: startRows[tier][cabin]
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

/* ---------- sessionStorage helpers ---------- */
function maSaveSelection(obj) { sessionStorage.setItem('ma_selection', JSON.stringify(obj)); }
function maLoadSelection() { try { return JSON.parse(sessionStorage.getItem('ma_selection')); } catch (e) { return null; } }
function maSaveSeat(seat) { sessionStorage.setItem('ma_seat', JSON.stringify(seat)); }
function maLoadSeat() { try { return JSON.parse(sessionStorage.getItem('ma_seat')); } catch (e) { return null; } }
function maClearBooking() { sessionStorage.removeItem('ma_selection'); sessionStorage.removeItem('ma_seat'); }
