/* Meridian Air — member dashboard: membership card, points tracker, next flight */
(function () {
  var CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500&family=Libre+Baskerville&display=swap');
  .md{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:26px;font-family:'Lato','Helvetica Neue',Arial,sans-serif;font-weight:300;color:#fff}
  .md *{box-sizing:border-box}
  .md-col{display:flex;flex-direction:column;gap:16px;min-width:0}
  .md-card{position:relative;border-radius:24px;overflow:hidden;padding:26px 30px}
  .md-in{position:relative;z-index:2}
  .md-abs{position:absolute;z-index:2}
  .md-member{background:linear-gradient(145deg,#5a5b60,#4b4c51);min-height:300px;flex:1}
  .md-logo{font-family:'Libre Baskerville',Georgia,serif;font-size:26px;font-weight:400;letter-spacing:.01em}
  .md-tag{right:30px;top:32px;font-size:13px;font-weight:400;letter-spacing:.24em}
  .md-chip{left:30px;top:92px;width:56px;height:44px}
  .md-tier{right:30px;bottom:82px;text-align:right;font-size:16px;line-height:1.25;font-weight:300}
  .md-name{left:30px;bottom:26px;font-size:15px;font-weight:400;letter-spacing:.1em;text-transform:uppercase}
  .md-orbs{right:28px;bottom:22px;width:78px;height:50px}
  .md-sky{background:url('Wing.png') center/cover no-repeat,linear-gradient(115deg,#6f8fb8 0%,#a996b8 45%,#c99bb6 70%,#7d6aa8 100%);min-height:200px}
  .md-sunset{background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.28) 100%),url('wing%203.png') center/cover no-repeat,linear-gradient(180deg,#6f93bd 0%,#a6a2b0 35%,#d7a07a 68%,#4a352c 100%);min-height:260px;flex:1}
  .md-label{font-size:25px;font-weight:300;opacity:.95;text-shadow:0 1px 8px rgba(0,0,0,.25)}
  .md-big{font-size:46px;font-weight:400;margin:8px 0 6px;letter-spacing:.01em;text-shadow:0 1px 8px rgba(0,0,0,.25)}
  .md-bar{height:6px;border-radius:99px;background:rgba(255,255,255,.3);overflow:hidden;max-width:280px;margin-top:6px}
  .md-bar>div{height:100%;background:#fff;border-radius:99px}
  .md-sm{font-size:13px;margin-top:6px;font-weight:400;opacity:.95;text-shadow:0 1px 6px rgba(0,0,0,.3)}
  .md-route{position:relative;display:flex;flex-direction:column;gap:16px}
  .md-dep{background:#1d1d1f;min-height:200px}.md-arr{background:#0000c8;min-height:200px}
  .md-code{font-size:58px;font-weight:400;letter-spacing:.02em;line-height:1;margin-top:6px}
  .md-city{position:absolute;left:30px;right:30px;bottom:26px;font-size:27px;display:flex;justify-content:space-between;gap:10px;align-items:baseline;z-index:2}
  .md-time{font-weight:400;font-size:25px;white-space:nowrap}
  .md-path{position:absolute;left:57%;top:100px;bottom:70px;border-left:2px dashed #fff;z-index:5;pointer-events:none}
  .md-path:before{content:'';position:absolute;left:-10px;top:-14px;width:18px;height:18px;border:2px solid #fff;border-radius:50%;background:#1d1d1f}
  .md-plane{position:absolute;left:calc(57% - 27px);top:calc(50% + 4px);width:54px;height:54px;z-index:6;pointer-events:none}
  .md-t1{font-size:25px;font-weight:300;text-shadow:0 1px 8px rgba(0,0,0,.3)}
  .md-dots{right:30px;top:30px;font-size:26px;letter-spacing:2px;line-height:1}
  .md-t2{font-size:13.5px;margin-top:10px;font-weight:400;line-height:1.7;max-width:60%;text-shadow:0 1px 6px rgba(0,0,0,.35)}
  .md-title{position:absolute;left:30px;bottom:22px;font-size:54px;font-weight:400;line-height:1.05;z-index:2;text-shadow:0 2px 12px rgba(0,0,0,.35)}
  .md-go{position:absolute;right:30px;bottom:30px;width:96px;height:96px;border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;z-index:3;background:rgba(0,0,0,.08)}
  .md-go:hover{background:rgba(255,255,255,.18)}
  @media(max-width:760px){.md{grid-template-columns:1fr}.md-title{font-size:42px}.md-code{font-size:48px}}`;

  var CHIP = '<svg class="md-abs md-chip" viewBox="0 0 56 44" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1.3"><rect x="1" y="1" width="54" height="42" rx="9"/><path d="M1 15h14c5 0 5 4 5 7s0 7-5 7H1M55 15H41c-5 0-5 4-5 7s0 7 5 7h14M20 1v10M36 1v10M20 33v10M36 33v10M20 22h16"/></svg>';
  var ORBS = '<svg class="md-abs md-orbs" viewBox="0 0 78 50"><circle cx="26" cy="25" r="24" fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.55)"/><circle cx="52" cy="25" r="24" fill="rgba(255,255,255,.28)" stroke="rgba(255,255,255,.55)"/></svg>';
  var PLANE = '<svg class="md-plane" viewBox="0 0 24 24" fill="#fff"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
  var ARROW = '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/></svg>';

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

    var prog = '';
    if (nx) {
      var base = cur.pts, pct = Math.min(100, Math.round((o.pts - base) / (nx.pts - base) * 100));
      prog = '<div class="md-bar"><div style="width:' + pct + '%"></div></div><div class="md-sm">' + (nx.pts - o.pts).toLocaleString() + ' points to ' + esc(nx.name) + '</div>';
    } else if (o.isVip) {
      prog = '<div class="md-sm">VIP member · 10% booking discount active</div>';
    } else {
      prog = '<div class="md-bar"><div style="width:100%"></div></div><div class="md-sm">Top points rank reached</div>';
    }
    if (last && last.r.pointsEarned) prog += '<div class="md-sm">+' + Number(last.r.pointsEarned).toLocaleString() + ' points on your last trip</div>';

    var member = '<div class="md-card md-member"><div class="md-in md-logo">Meridian Air</div><div class="md-abs md-tag">EVERY LONGITUDE</div>' + CHIP +
      '<div class="md-abs md-tier">' + esc(tierName.toLowerCase()) + '<br>member</div><div class="md-abs md-name">' + esc(o.name) + '</div>' + ORBS + '</div>';

    var points = '<div class="md-card md-sky"><div class="md-in"><div class="md-label">Total Points Earned</div><div class="md-big">' + Number(o.pts).toLocaleString() + '</div>' + prog + '</div></div>';

    var ticket, dep, arr;
    if (next) {
      var r = next.r, t = next.t, fa = maFindAirport(r.from), ta = maFindAirport(r.to);
      var plus = t.arrDayOffset > 0 ? ' +' + t.arrDayOffset + 'd' : '';
      var when = next.dep.getTime() > now ? 'Departs in ' + until(next.dep.getTime() - now) : 'Departing now';
      ticket = '<div class="md-card md-sunset"><div class="md-in"><div class="md-t1">Ticket Details</div><div class="md-t2">' +
        esc(next.dep.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })) + '<br>' +
        esc(r.flightNumber || '') + ' · Ref ' + esc(r.code) + '<br>' + esc(when) + '</div></div>' +
        '<div class="md-abs md-dots">···</div><div class="md-title">Meridian<br>Air</div><a class="md-go" href="find.html" aria-label="Manage booking">' + ARROW + '</a></div>';
      dep = '<div class="md-card md-dep"><div class="md-in md-code">' + esc(fa ? fa.code : r.from) + '</div><div class="md-city"><span>' + esc(fa ? fa.city : '') + '</span><span class="md-time">' + maFormatTime(t.depMinutes) + '</span></div></div>';
      arr = '<div class="md-card md-arr"><div class="md-in md-code">' + esc(ta ? ta.code : r.to) + '</div><div class="md-city"><span>' + esc(ta ? ta.city + ', ' + ta.country : '') + '</span><span class="md-time">' + (t.arrMinutes != null ? maFormatTime(t.arrMinutes) + plus : '') + '</span></div></div>';
    } else {
      ticket = '<div class="md-card md-sunset"><div class="md-in"><div class="md-t1">Ticket Details</div><div class="md-t2">No upcoming flights yet.</div></div>' +
        '<div class="md-abs md-dots">···</div><div class="md-title">Meridian<br>Air</div><a class="md-go" href="index.html" aria-label="Book a flight">' + ARROW + '</a></div>';
      dep = '<div class="md-card md-dep"><div class="md-in md-code">—</div><div class="md-city"><span>Where to next?</span></div></div>';
      arr = '<div class="md-card md-arr"><div class="md-in md-code">—</div><div class="md-city"><span>Book to see your trip</span></div></div>';
    }
    var route = '<div class="md-route">' + dep + arr + (next ? '<div class="md-path"></div>' + PLANE : '') + '</div>';
    return '<div class="md"><div class="md-col">' + member + ticket + '</div><div class="md-col">' + points + route + '</div></div>';
  };
})();
