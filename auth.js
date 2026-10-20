/* Meridian Air — shared header auth buttons + age checks (demo, browser-only) */
(function () {
  var s = null, db = {};
  try { s = JSON.parse(localStorage.getItem('ma_user')); } catch (e) {}
  try { db = JSON.parse(localStorage.getItem('ma_users')) || {}; } catch (e) {}

  var VIP_DISCOUNT = 10, MIN_AGE = 18, GRACE_DAYS = 7, DAY = 86400000;
  var TIERS = [['Waypoint', 0], ['Horizon', 5000], ['Summit', 15000], ['Apex', 35000], ['Northstar', 75000]];

  function ageOf(v) {
    var b = new Date(v + 'T00:00:00'), t = new Date();
    var a = t.getFullYear() - b.getFullYear(), m = t.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
    return a;
  }

  var needsWarning = false, daysLeft = 7;
  if (s && s.email) {
    var u = db[s.email];
    if (u && u.dob) {
      if (ageOf(u.dob) < MIN_AGE) {
        localStorage.removeItem('ma_user');
        location.replace('login.html?banned=1');
        return;
      }
    } else {
      needsWarning = true;
      if (u) {
        if (!u.dobDeadline) {
          u.dobDeadline = Date.now() + GRACE_DAYS * DAY;
          db[s.email] = u;
          localStorage.setItem('ma_users', JSON.stringify(db));
        }
        if (Date.now() > u.dobDeadline) {
          localStorage.removeItem('ma_user');
          location.replace('login.html?verify=1');
          return;
        }
        daysLeft = Math.max(1, Math.ceil((u.dobDeadline - Date.now()) / DAY));
      }
    }
  }

  var css = document.createElement('style');
  css.textContent =
    '.ma-auth{display:flex;align-items:center;gap:12px;font-family:"Helvetica Neue",Arial,sans-serif;font-size:13px}' +
    '.ma-auth a,.ma-auth button{font:inherit;text-decoration:none;cursor:pointer;color:#4E7288;background:none;border:none;padding:0}' +
    '.ma-auth a:hover,.ma-auth button:hover{color:#0A2A43}' +
    '.ma-auth .ma-cta{color:#fff;background:#0A2A43;border-radius:4px;padding:9px 16px;font-weight:600}' +
    '.ma-auth .ma-cta:hover{background:#11486B;color:#fff}' +
    '.ma-auth .ma-hi{color:#0A2A43;font-weight:600}' +
    '.ma-auth .ma-vip{background:linear-gradient(135deg,#12B8C8,#11486B);color:#fff;border-radius:999px;padding:3px 9px;font-size:10px;letter-spacing:.12em;font-weight:700}' +
    '.ma-auth .ma-points{color:#11486B;font-weight:700}' +
    '.ma-warn{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;padding:11px 18px;background:#FEF3F2;border-bottom:1px solid #FDA29B;color:#912018;font-family:"Helvetica Neue",Arial,sans-serif;font-size:13px}' +
    '.ma-warn a{background:#912018;color:#fff;border-radius:4px;padding:6px 12px;font-weight:600;text-decoration:none}' +
    '.ma-warn button{background:none;border:none;color:#912018;cursor:pointer;font:inherit;text-decoration:underline}' +
    '.ma-modal{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;background:rgba(10,42,67,.55);font-family:"Helvetica Neue",Arial,sans-serif}' +
    '.ma-modal .box{background:#fff;max-width:420px;width:calc(100% - 40px);border-radius:10px;border-top:6px solid #D92D20;padding:26px 26px 22px;box-shadow:0 24px 60px rgba(0,0,0,.35)}' +
    '.ma-modal h3{font-family:Georgia,serif;font-weight:400;font-size:22px;color:#912018;margin-bottom:10px}' +
    '.ma-modal p{font-size:14px;line-height:1.55;color:#0A2A43;margin-bottom:18px}' +
    '.ma-modal .btns{display:flex;gap:10px;flex-wrap:wrap}' +
    '.ma-modal a,.ma-modal button{font:inherit;font-size:13px;font-weight:600;border-radius:4px;padding:10px 16px;cursor:pointer;text-decoration:none}' +
    '.ma-modal a{background:#0A2A43;color:#fff;border:1px solid #0A2A43}' +
    '.ma-modal button{background:#fff;color:#0A2A43;border:1px solid #0A2A43}';
  document.head.appendChild(css);

  if (needsWarning) {
    var w = document.createElement('div');
    w.className = 'ma-warn';
    w.setAttribute('role', 'alert');
    w.innerHTML = '<span><strong>Warning:</strong> your date of birth is not provided. Add it within ' + daysLeft + ' day' + (daysLeft === 1 ? '' : 's') + ' or your account will be put on hold until you do.</span>' +
      '<a href="profile.html">Add date of birth</a><button type="button">Dismiss</button>';
    w.querySelector('button').onclick = function () { w.remove(); };
    document.body.insertBefore(w, document.body.firstChild);

    var seen = false;
    try { seen = sessionStorage.getItem('ma_dob_popup') === '1'; } catch (e) {}
    if (!seen) {
      try { sessionStorage.setItem('ma_dob_popup', '1'); } catch (e) {}
      var m = document.createElement('div');
      m.className = 'ma-modal';
      m.setAttribute('role', 'alertdialog');
      m.innerHTML = '<div class="box"><h3>Warning: date of birth missing</h3>' +
        '<p>Your account has no date of birth. Members must be 18 or older. Add yours within ' + daysLeft + ' day' + (daysLeft === 1 ? '' : 's') + ' or your account will be banned until you do.</p>' +
        '<div class="btns"><a href="profile.html">Add date of birth</a><button type="button">Remind me later</button></div></div>';
      m.querySelector('button').onclick = function () { m.remove(); };
      document.body.appendChild(m);
    }
  }

  var box = document.createElement('div');
  box.className = 'ma-auth';

  if (s && s.email) {
    var pts = Math.max(0, Number(s.points || 0));
    var isVip = !!s.vip;
    var rank = 'Waypoint';
    for (var i = 0; i < TIERS.length; i++) { if (pts >= TIERS[i][1]) rank = TIERS[i][0]; }
    if (isVip) rank = 'VIP';

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
    pb.title = 'View your profile';
    pb.textContent = 'Points: ' + pts.toLocaleString() + ' \u00b7 ' + rank + (isVip ? ' \u00b7 ' + VIP_DISCOUNT + '% discount' : '');
    pb.onclick = function () { location.href = 'profile.html'; };
    box.appendChild(pb);

    var out = document.createElement('button');
    out.type = 'button';
    out.textContent = 'Log out';
    out.onclick = function () { try { sessionStorage.removeItem('ma_dob_popup'); } catch (e) {} localStorage.removeItem('ma_user'); location.reload(); };
    box.appendChild(out);
  } else {
    box.innerHTML =
      '<a href="login.html">Log in</a>' +
      '<a class="ma-cta" href="login.html?mode=signup">Create account</a>';
  }

  var h = document.querySelector('header');
  if (h) h.appendChild(box);
})();
