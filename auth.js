/* Meridian Air — shared header auth buttons (demo, browser-only) */
(function () {
  var s = null;
  try { s = JSON.parse(localStorage.getItem('ma_user')); } catch (e) {}

  var VIP_POINTS = 3000;
  var VIP_DISCOUNT = 10;

  var css = document.createElement('style');
  css.textContent =
    '.ma-auth{display:flex;align-items:center;gap:12px;font-family:"Helvetica Neue",Arial,sans-serif;font-size:13px}' +
    '.ma-auth a,.ma-auth button{font:inherit;text-decoration:none;cursor:pointer;color:#4E7288;background:none;border:none;padding:0}' +
    '.ma-auth a:hover,.ma-auth button:hover{color:#0A2A43}' +
    '.ma-auth .ma-cta{color:#fff;background:#0A2A43;border-radius:4px;padding:9px 16px;font-weight:600}' +
    '.ma-auth .ma-cta:hover{background:#11486B;color:#fff}' +
    '.ma-auth .ma-hi{color:#0A2A43;font-weight:600}' +
    '.ma-auth .ma-vip{background:linear-gradient(135deg,#e5c36b,#b88624);color:#fff;border-radius:999px;padding:3px 9px;font-size:10px;letter-spacing:.12em;font-weight:700}' +
    '.ma-auth .ma-points{color:#b88624;font-weight:700}';
  document.head.appendChild(css);

  var box = document.createElement('div');
  box.className = 'ma-auth';

  if (s && s.email) {
    var pts = Math.max(0, Number(s.points || 0));
    var isVip = !!s.vip || pts >= VIP_POINTS;

    if (isVip) {
      var g = document.createElement('style');
      g.textContent =
        ':root{--ink:#5A4410;--ink-soft:#B88624;--paper:#FFF9E8;--navy:#3D2D08;--blue:#C99A32}' +
        '.ma-auth a,.ma-auth button{color:#8A6516}' +
        '.ma-auth a:hover,.ma-auth button:hover{color:#5A4410}' +
        '.ma-auth .ma-hi{color:#5A4410}' +
        '.ma-auth .ma-points{color:#b88624}' +
        '.ma-auth .ma-cta{background:#B88624;color:#fff}' +
        '.ma-auth .ma-cta:hover{background:#8A6516;color:#fff}';
      document.head.appendChild(g);
    }

    var hi = document.createElement('span');
    hi.className = 'ma-hi';
    hi.textContent = 'Hi, ' + (s.name || 'member');
    box.appendChild(hi);
    if (isVip) {
      var v = document.createElement('span');
      v.className = 'ma-vip';
      v.textContent = 'VIP';
      box.appendChild(v);
    }

    var pb = document.createElement('button');
    pb.type = 'button';
    pb.className = 'ma-points';
    pb.textContent = 'Points: ' + pts.toLocaleString() + (isVip ? ' \u00b7 ' + VIP_DISCOUNT + '% VIP discount' : ' \u00b7 ' + (VIP_POINTS - pts).toLocaleString() + ' to VIP');
    pb.onclick = function () {
      alert('Points: ' + pts.toLocaleString() + '\n' + (isVip ? 'VIP active: ' + VIP_DISCOUNT + '% discount on bookings.' : (VIP_POINTS - pts).toLocaleString() + ' more points to unlock VIP and ' + VIP_DISCOUNT + '% off.'));
    };
    box.appendChild(pb);

    var out = document.createElement('button');
    out.type = 'button';
    out.textContent = 'Log out';
    out.onclick = function () { localStorage.removeItem('ma_user'); location.reload(); };
    box.appendChild(out);
  } else {
    box.innerHTML =
      '<a href="login.html">Log in</a>' +
      '<a class="ma-cta" href="login.html?mode=signup">Create account</a>';
  }

  var h = document.querySelector('header');
  if (h) h.appendChild(box);
})();
