// ll-flipdeck.js — swipe deck of flip cards above the homepage hero.
// One card visible at a time. Swipe/drag left-right (or arrows/dots)
// moves to the next card with a pop-in. Tap the card body flips it;
// Go links navigate normally. No-JS fallback: all cards stack and the
// Go links still work.
// Phone tap fix (Nov 4): after a tap, mobile browsers fire emulated
// mouse events. Without a guard, mouseup re-ran the tap logic and
// flipped the card straight back off, so taps looked dead while
// desktop clicks worked. touchend now cancels the emulated sequence
// for non-link taps, and mouse handlers ignore anything arriving
// within 600ms of a touch.
(function () {
  var deck = document.getElementById('ll-flipdeck');
  if (!deck) return;
  var cards = deck.querySelectorAll('.ll-card');
  if (!cards.length) return;
  var dots = deck.querySelectorAll('.ll-dot');
  var idx = 0;
  deck.classList.add('ll-js');

  function show(i, pop) {
    idx = (i + cards.length) % cards.length;
    cards.forEach(function (c, j) {
      c.classList.toggle('on', j === idx);
      c.classList.remove('flipped');
    });
    dots.forEach(function (d, j) { d.classList.toggle('on', j === idx); });
    if (pop) {
      var cur = cards[idx];
      cur.classList.remove('pop');
      void cur.offsetWidth;
      cur.classList.add('pop');
    }
  }

  dots.forEach(function (d, j) {
    d.addEventListener('click', function () { show(j, true); });
  });
  var prev = deck.querySelector('.ll-prev');
  var next = deck.querySelector('.ll-next');
  if (prev) prev.addEventListener('click', function () { show(idx - 1, true); });
  if (next) next.addEventListener('click', function () { show(idx + 1, true); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1, true);
    if (e.key === 'ArrowRight') show(idx + 1, true);
  });

  var vp = deck.querySelector('.ll-viewport');
  var x0 = null, y0 = null, moved = false, lastTouchEnd = 0;
  function start(x, y) { x0 = x; y0 = y; moved = false; }
  function move(x, y) {
    if (x0 === null) return;
    if (Math.abs(x - x0) > 12 || Math.abs(y - y0) > 12) moved = true;
  }
  function end(x, y, target) {
    if (x0 === null) return;
    var dx = x - x0, dy = y - y0;
    x0 = null; y0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) show(idx + 1, true); else show(idx - 1, true);
      return;
    }
    if (!moved && target && !target.closest('a')) {
      var card = target.closest('.ll-card');
      if (card) card.classList.toggle('flipped');
    }
  }
  function freshMouse() { return Date.now() - lastTouchEnd < 600; }
  vp.addEventListener('touchstart', function (e) {
    var t = e.touches[0]; start(t.clientX, t.clientY);
  }, { passive: true });
  vp.addEventListener('touchmove', function (e) {
    if (x0 === null) return;
    var t = e.touches[0];
    move(t.clientX, t.clientY);
    if (Math.abs(t.clientX - x0) > 12 && Math.abs(t.clientX - x0) > Math.abs(t.clientY - y0)) {
      e.preventDefault();
    }
  }, { passive: false });
  vp.addEventListener('touchend', function (e) {
    lastTouchEnd = Date.now();
    var t = e.changedTouches[0];
    if (!e.target.closest('a')) e.preventDefault();
    end(t.clientX, t.clientY, e.target);
  }, { passive: false });
  vp.addEventListener('mousedown', function (e) { if (freshMouse()) return; start(e.clientX, e.clientY); });
  vp.addEventListener('mousemove', function (e) { if (freshMouse()) return; move(e.clientX, e.clientY); });
  vp.addEventListener('mouseup', function (e) { if (freshMouse()) return; end(e.clientX, e.clientY, e.target); });

  show(0, false);
})();
