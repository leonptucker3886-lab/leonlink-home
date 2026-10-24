/* LeonLink game intro bridge. Drop-in kept for every game: <script src="/ll-intro.js" data-cat="arcade|regular|casino|kids" [data-game="Name"] defer></script>
   Loads the shared full intro (/intro/leonlink-intro.js): game NAME on every loading screen, arcade runner art, block-figure soldier for regular games, falling cards for casino.
   Once per session per page; tap/any key skips; fires ll-intro-done; fails open. */
(function(){
  function open_(){try{window.dispatchEvent(new Event('ll-intro-done'));}catch(e){}}
  try{
    var s=document.currentScript||{},ds=s.dataset||{},cat=ds.cat||'regular';
    var style={arcade:'arcade',casino:'casino',regular:'normal',kids:'normal'}[cat]||'normal';
    var x=document.createElement('script');x.src='/intro/leonlink-intro.js?v=20261024';
    x.dataset.style=style;x.dataset.once='1';if(ds.game)x.dataset.game=ds.game;
    x.onerror=open_;(document.head||document.documentElement).appendChild(x);
  }catch(e){open_();}
})();
