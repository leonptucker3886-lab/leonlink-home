/* LeonLink notepad widget v1 — popup notes, anywhere on the site.
   No dependencies, no backend, no installs. Notes live in this browser's
   localStorage under ll_notes. Inert on any failure: it never throws
   into the host page. */
(function () {
  'use strict';
  try {
    if (window.LLNotepad) return;
    var KEY = 'll_notes';
    var btn = null, panel = null, area = null, savedEl = null, timer = null;

    function load() {
      try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; }
    }
    function save() {
      try { localStorage.setItem(KEY, area.value); } catch (e) {}
      if (savedEl) {
        var d = new Date();
        savedEl.textContent = 'Saved ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      }
    }
    function scheduleSave() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(save, 300);
    }
    function build() {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = '✎ Notes';
      btn.setAttribute('aria-label', 'Open notepad');
      btn.style.cssText = 'position:fixed;left:16px;bottom:76px;z-index:9990;background:#22e6c8;color:#041016;font:800 14px system-ui,sans-serif;border:0;border-radius:999px;padding:11px 18px;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.45)';
      btn.onclick = toggle;
      document.body.appendChild(btn);

      panel = document.createElement('div');
      panel.style.cssText = 'position:fixed;left:16px;bottom:136px;z-index:9991;width:320px;max-width:92vw;background:#0d1220;color:#f2f5f7;border:1px solid rgba(255,255,255,.16);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.55);display:none;flex-direction:column;overflow:hidden';
      var head = document.createElement('div');
      head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.12)';
      var title = document.createElement('strong');
      title.textContent = 'Notepad';
      title.style.cssText = 'font:900 16px system-ui,sans-serif';
      var close = document.createElement('button');
      close.type = 'button';
      close.textContent = '×';
      close.style.cssText = 'background:transparent;border:0;color:#f2f5f7;font-size:22px;cursor:pointer;line-height:1';
      close.onclick = toggle;
      head.appendChild(title);
      head.appendChild(close);
      panel.appendChild(head);

      area = document.createElement('textarea');
      area.value = load();
      area.placeholder = 'Capture it while you read — paste, type, save. It stays in this browser.';
      area.style.cssText = 'width:100%;height:220px;background:transparent;color:#f2f5f7;border:0;outline:0;padding:12px 14px;font:15px/1.55 system-ui,sans-serif;resize:vertical';
      area.addEventListener('input', scheduleSave);
      panel.appendChild(area);

      var foot = document.createElement('div');
      foot.style.cssText = 'display:flex;gap:8px;align-items:center;padding:10px 12px;border-top:1px solid rgba(255,255,255,.12)';
      savedEl = document.createElement('span');
      savedEl.style.cssText = 'flex:1;font:600 12px system-ui,sans-serif;color:rgba(242,245,247,.6)';
      savedEl.textContent = area.value ? 'Restored' : 'Empty';
      var copy = document.createElement('button');
      copy.type = 'button';
      copy.textContent = 'Copy';
      var clear = document.createElement('button');
      clear.type = 'button';
      clear.textContent = 'Clear';
      [copy, clear].forEach(function (b) {
        b.style.cssText = 'background:rgba(255,255,255,.1);color:#f2f5f7;border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:7px 14px;font:700 13px system-ui,sans-serif;cursor:pointer';
      });
      copy.onclick = function () {
        var t = area.value;
        if (!t) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(t).then(function () { savedEl.textContent = 'Copied'; })
            .catch(function () { fallbackCopy(); });
        } else fallbackCopy();
      };
      function fallbackCopy() {
        try {
          area.focus(); area.select();
          document.execCommand('copy');
          savedEl.textContent = 'Copied';
        } catch (e) { savedEl.textContent = 'Copy failed — select it by hand'; }
      }
      clear.onclick = function () {
        if (!area.value) return;
        if (window.confirm('Clear your notepad?')) { area.value = ''; save(); }
      };
      foot.appendChild(savedEl);
      foot.appendChild(copy);
      foot.appendChild(clear);
      panel.appendChild(foot);
      document.body.appendChild(panel);
    }
    function toggle() {
      if (!panel) return;
      var open = panel.style.display === 'flex';
      if (open) { save(); panel.style.display = 'none'; }
      else { panel.style.display = 'flex'; area.focus(); }
    }
    function open() {
      if (panel) { panel.style.display = 'flex'; area.focus(); }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
    window.LLNotepad = { open: open, toggle: toggle };
  } catch (e) { /* inert on failure */ }
})();
