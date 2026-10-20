/* Meridian Air — member dashboard: membership card, points tracker, next flight */
(function () {
  var CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500&family=Libre+Baskerville&display=swap');
  .md{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:22px;font-family:'Lato','Helvetica Neue',Arial,sans-serif;font-weight:300;color:#fff}
  .md-col{display:flex;flex-direction:column;gap:16px}
  .md-card{position:relative;border-radius:22px;padding:24px 26px;overflow:hidden;min-height:150px}
  .md-member{background:linear-gradient(145deg,#5a5b60,#46474c);min-height:230px;flex:1}
  .md-logo{font-family:'Libre Baskerville',Georgia,serif;font-size:24px;font-weight:400}
  .md-tag{position:absolute;right:26px;top:30px;font-size:12px;font-weight:400;letter-spacing:.2em}
  .md-chip{position:absolute;left:26px;top:86px;width:52px;height:40px;border:1px solid rgba(255,255,255,.55);border-radius:8px}
  .md-tier{position:absolute;right:26px;bottom:22px;text-align:right;font-size:15px;line-height:1.25}
  .md-name{position:absolute;left:26px;bottom:22px;font-size:15px;font-weight:400;letter-spacing:.06em;text-transform:uppercase}
  .md-sky{background:linear-gradient(120deg,#6f8fb8 0%,#c79bb8 58%,#7a6aa5 100%)}
  .md-sunset{background:linear-gradient(180deg,#7ea0c4 0%,#d7a07a 68%,#4a352c 100%);min-height:230px;flex:1}
  .md-wing{position:absolute;right:0;bottom:0;width:70%;height:60%;opacity:.55;pointer-events:none}
  .md-card>*{position:relative}
  .md-card>.md-wing{position:absolute}
  .md-label{font-size:21px}
  .md-big{font-size:38px;font-weight:500;margin:6px 0 10px}
  .md-bar{height:7px;border-radius:99px;background:rgba(255,255,255,.3);overflow:hidden;max-width:260px}
  .md-bar>div{height:100%;background:#fff;border-radius:99px}
  .md-sm{font-size:13px;margin-top:8px;font-weight:400}
  .md-dep{background:#1c1c1e;min-height:120px}.md-arr{background:#0000c8;min-height:120px}
  .md-code{font-size:42px;font-weight:500;letter-spacing:.02em;line-height:1}
  .md-city{font-size:22px;margin-top:14px;display:flex;justify-content:space-between;gap:10px}
  .md-time{font-weight:500}
  .md-t1{font-size:22px}.md-t2{font-size:15px;margin-top:10px;font-weight:400;line-height:1.6}
  .md-btn{display:inline-block;margin-top:14px;color:#fff;border:1px solid rgba(255,255,255,.8);border-radius:99px;padding:8px 18px;text-decoration:none;font-size:13px;font-weight:400}
  @media(max-width:700px){.md{grid-template-columns:1fr}}`;

  var WING = '<svg class="md-wing" viewBox="0 0 300 120" preserveAspectRatio="none"><path d="M300 0 L0 84 L36 98 L300 34Z" fill="#fff"/></svg>';

  function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function times(r) {
    if (r.depMinutes != null) return r;
    try {
      var g = maGenerateFlights(r.from, r.to, r.depart, r.passengers);
      var f = g.flights.filter(function (x) { return x.flightNumber === r.flightNumber; })[0];
      if (f) return { depMinutes: f.depMinutes, arrMinutes: f.arrMinutes, arrDayOffset: f.arrDayOffset, durMinutes: f.durMinutes };
    } catch (e) {}
    return { depMinutes: 0, arrMinutes: null, arrDayOffset: 0 };
  }

  function myTrips(email) {
    var codes = [], out = [], me = String(email).toLowerCase();
    try { codes = JSON.parse(localStorage.getItem('ma_reservations') || '[]'); } catch (e) {}
    codes.forEach(function (c) {
      var r = maLoadReservation(c);
      if (!r || !r.depart) return;
      var owner = r.owner ? String(r.owner).toLowerCase() === me
        : !!(r.contact && r.contact.email && String(r.contact.email).toLowerCase() === me);
      if (!owner) return;
      var t = times(r), dep = new Date(r.depart + 'T00:00:00');
      dep.setHours(Math.floor(t.depMinutes / 60), t.depMinutes % 60, 0, 0);
      out.push({ r: r, t: t, dep: dep });
    });
    return out;
  }

  function until(ms) {
    var m = Math.round(ms / 60000);
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60);
    return h < 48 ? h + 'h ' + (m % 60) + 'm' : Math.floor(h / 24) + ' days';
  }

  window.maBuildDashboard = function (o) {
    if (!document.getElementById('md-css')) {
      var st = document.createElement('style'); st.id = 'md-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var trips = myTrips(o.email), now = Date.now();
    var up = trips.filter(function (t) { return t.dep.getTime() > now - 7200000; }).sort(function (a, b) { return a.dep - b.dep; });
    var next = up[0];
    var last = trips.slice().sort(function (a, b) { return new Date(b.r.createdAt) - new Date(a.r.createdAt); })[0];
    var cur = o.tiers[o.idx], nx = (!o.isVip && o.idx < 4) ? o.tiers[o.idx + 1] : null;
    var tierName = o.isVip ? 'VIP' : cur.name;

    var prog;
    if (nx) {
      var base = cur.pts, pct = Math.min(100, Math.round((o.pts - base) / (nx.pts - base) * 100));
      prog = '<div class="md-bar"><div style="width:' + pct + '%"></div></div><div class="md-sm">' + (nx.pts - o.pts).toLocaleString() + ' points to ' + esc(nx.name) + '</div>';
    } else if (o.isVip) {
      prog = '<div class="md-sm">VIP member · 10% booking discount active</div>';
    } else {
      prog = '<div class="md-bar"><div style="width:100%"></div></div><div class="md-sm">Top points rank reached</div>';
    }
    if (last && last.r.pointsEarned) prog += '<div class="md-sm">+' + Number(last.r.pointsEarned).toLocaleString() + ' points on your last trip</div>';

    var member = '<div class="md-card md-member"><div class="md-logo">Meridian Air</div><div class="md-tag">EVERY LONGITUDE</div><div class="md-chip"></div>' +
      '<div class="md-name">' + esc(o.name) + '</div><div class="md-tier">' + esc(tierName.toLowerCase()) + '<br>member</div></div>';

    var points = '<div class="md-card md-sky">' + WING + '<div class="md-label">Total Points Earned</div><div class="md-big">' + Number(o.pts).toLocaleString() + '</div>' + prog + '</div>';

    var ticket, dep, arr;
    if (next) {
      var r = next.r, t = next.t, fa = maFindAirport(r.from), ta = maFindAirport(r.to);
      var plus = t.arrDayOffset > 0 ? ' +' + t.arrDayOffset + 'd' : '';
      var when = next.dep.getTime() > now ? 'Departs in ' + until(next.dep.getTime() - now) : 'Departing now';
      ticket = '<div class="md-card md-sunset">' + WING + '<div class="md-t1">Next Flight</div><div class="md-t2">' +
        esc(next.dep.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })) + '<br>' +
        esc(r.flightNumber || '') + ' · Ref ' + esc(r.code) + '<br>' + esc(when) + '</div><a class="md-btn" href="find.html">Manage booking →</a></div>';
      dep = '<div class="md-card md-dep"><div class="md-code">' + esc(fa ? fa.code : r.from) + '</div><div class="md-city"><span>' + esc(fa ? fa.city : '') + '</span><span class="md-time">' + maFormatTime(t.depMinutes) + '</span></div></div>';
      arr = '<div class="md-card md-arr"><div class="md-code">' + esc(ta ? ta.code : r.to) + '</div><div class="md-city"><span>' + esc(ta ? ta.city + ', ' + ta.country : '') + '</span><span class="md-time">' + (t.arrMinutes != null ? maFormatTime(t.arrMinutes) + plus : '') + '</span></div></div>';
    } else {
      ticket = '<div class="md-card md-sunset">' + WING + '<div class="md-t1">Next Flight</div><div class="md-t2">No upcoming flights yet.</div><a class="md-btn" href="index.html">Book a flight →</a></div>';
      dep = '<div class="md-card md-dep"><div class="md-code">—</div><div class="md-city"><span>Where to next?</span></div></div>';
      arr = '<div class="md-card md-arr"><div class="md-code">—</div><div class="md-city"><span>Book to see your trip</span></div></div>';
    }
    return '<div class="md"><div class="md-col">' + member + ticket + '</div><div class="md-col">' + points + dep + arr + '</div></div>';
  };
})();
