/* Meridian Air — real great-circle distances (loaded after booking.js) */
(function () {
  /* [latitude, longitude] in degrees */
  var C = {
    ATL:[33.6407,-84.4277], PEK:[40.0799,116.6031], LAX:[33.9416,-118.4085], DXB:[25.2532,55.3657],
    HND:[35.5494,139.7798], ORD:[41.9742,-87.9073], LHR:[51.4700,-0.4543], PVG:[31.1443,121.8083],
    CDG:[49.0097,2.5479], DFW:[32.8998,-97.0403], AMS:[52.3105,4.7683], HKG:[22.3080,113.9185],
    CAN:[23.3959,113.3080], FRA:[50.0379,8.5622], SIN:[1.3644,103.9915], ICN:[37.4602,126.4407],
    DEN:[39.8561,-104.6737], DEL:[28.5562,77.1000], BOM:[19.0896,72.8656], BLR:[13.1986,77.7066],
    CGK:[-6.1256,106.6559], JFK:[40.6413,-73.7781], KUL:[2.7456,101.7099], SFO:[37.6213,-122.3790],
    CTU:[30.5785,103.9471], MAD:[40.4983,-3.5676], BKK:[13.6900,100.7501], LAS:[36.0840,-115.1537],
    TFU:[30.3125,104.4417], SEA:[47.4502,-122.3088], MCO:[28.4312,-81.3081], EWR:[40.6895,-74.1745],
    CLT:[35.2144,-80.9473], PHX:[33.4342,-112.0116], IAH:[29.9902,-95.3368], MIA:[25.7959,-80.2870],
    SZX:[22.6393,113.8107], MUC:[48.3538,11.7861], SYD:[-33.9399,151.1753], FCO:[41.8003,12.2389],
    LGW:[51.1537,-0.1821], KMG:[25.1019,102.9292], XIY:[34.4471,108.7516], MNL:[14.5086,121.0194],
    NRT:[35.7720,140.3929], SVO:[55.9726,37.4146], MSP:[44.8848,-93.2223], DTW:[42.2162,-83.3554],
    BOS:[42.3656,-71.0096], PHL:[39.8744,-75.2424], LGA:[40.7769,-73.8740], FLL:[26.0742,-80.1506],
    BWI:[39.1774,-76.6684], SLC:[40.7899,-111.9791], SAN:[32.7338,-117.1933], IAD:[38.9531,-77.4565],
    TPA:[27.9755,-82.5332], MDW:[41.7868,-87.7522], HNL:[21.3187,-157.9225], PDX:[45.5898,-122.5951],
    SNA:[33.6757,-117.8683], STL:[38.7487,-90.3700], BDL:[41.9389,-72.6832], AUS:[30.1975,-97.6664],
    BNE:[-27.3942,153.1218], MEL:[-37.6690,144.8410], AKL:[-37.0082,174.7850], YVR:[49.1967,-123.1815],
    YYZ:[43.6777,-79.6248], YUL:[45.4706,-73.7408], MEX:[19.4361,-99.0719], GRU:[-23.4356,-46.4731],
    GIG:[-22.8100,-43.2506], EZE:[-34.8222,-58.5358], SCL:[-33.3930,-70.7858], BOG:[4.7016,-74.1469],
    LIM:[-12.0219,-77.1143], CPT:[-33.9715,18.6021], JNB:[-26.1392,28.2460], CAI:[30.1219,31.4056],
    CMN:[33.3675,-7.5898], ADD:[8.9779,38.7993], NBO:[-1.3192,36.9278], IST:[41.2753,28.7519],
    SAW:[40.8986,29.3092], ATH:[37.9364,23.9445], ZRH:[47.4647,8.5492], VIE:[48.1103,16.5697],
    CPH:[55.6180,12.6508], ARN:[59.6498,17.9238], OSL:[60.1976,11.1004], HEL:[60.3172,24.9633],
    DUB:[53.4264,-6.2499], BRU:[50.9010,4.4856], GVA:[46.2381,6.1089], LIS:[38.7742,-9.1342],
    BCN:[41.2974,2.0833], DOH:[25.2731,51.6081], RUH:[24.9576,46.6988], JED:[21.6796,39.1565],
    MCT:[23.5933,58.2844]
  };
  window.MA_COORDS = C;

  function rad(d) { return d * Math.PI / 180; }

  /* great-circle distance in nautical miles between two IATA codes (null if unknown) */
  window.maDistanceNm = function (codeA, codeB) {
    var a = C[codeA], b = C[codeB];
    if (!a || !b || codeA === codeB) return null;
    var dLat = rad(b[0] - a[0]), dLon = rad(b[1] - a[1]);
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var km = 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
    return Math.round(km / 1.852);
  };

  /* wrap the generator so every flight uses the real distance */
  var baseGenerate = window.maGenerateFlights;
  window.maGenerateFlights = function (from, to, depart, passengers) {
    var res = baseGenerate(from, to, depart, passengers);
    var fa = maFindAirport(from), ta = maFindAirport(to);
    var nm = (fa && ta) ? window.maDistanceNm(fa.code, ta.code) : null;
    if (!nm) return res;
    var km = Math.round(nm * 1.852);
    res.flights.forEach(function (f, i) {
      f.distNm = nm;
      f.distKm = km;
      /* duration follows distance: ~820 km/h cruise + 35 min taxi/climb (+45 min if 1 stop) */
      var jitter = ((i * 7) % 21) - 10;
      var dur = Math.round(km / 820 * 60 + 35 + (f.stops ? 45 : 0) + jitter);
      f.durMinutes = Math.max(45, dur);
      var total = f.depMinutes + f.durMinutes;
      f.arrMinutes = total % (24 * 60);
      f.arrDayOffset = Math.floor(total / (24 * 60));
    });
    return res;
  };
})();
