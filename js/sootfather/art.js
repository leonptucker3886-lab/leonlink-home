"use strict";
/* Sootfather - art.js (split from sootfather.html, Phase 0; behaviour unchanged) */

/* ---------- portraits ---------- */
function drawBust(who,x,y,s){
  ax.save();ax.translate(x,y);ax.scale(s,s);
  const skin='#e8b98d';
  if(who==='you'){ // bald, red backwards cap, goatee
    ax.fillStyle=skin;ax.beginPath();ax.arc(0,0,34,0,7);ax.fill();
    ax.fillStyle='#ffffff55';ax.beginPath();ax.ellipse(-8,-12,10,6,-.5,0,7);ax.fill();
    ax.fillStyle='#c22f2f';ax.beginPath();ax.arc(-3,-6,32,Math.PI*.85,Math.PI*2.02);ax.fill();
    ax.fillRect(-52,-16,30,13);ax.fillStyle='#8f1f1f';ax.fillRect(-52,-6,30,5);
    ax.fillStyle='#4a3a30';ax.beginPath();ax.ellipse(6,22,10,8,0,0,7);ax.fill();
    ax.fillStyle='#1a1a22';ax.beginPath();ax.arc(12,-4,4.5,0,7);ax.fill();
    ax.strokeStyle='#c9a227';ax.lineWidth=3;ax.beginPath();ax.arc(0,0,38,0,7);ax.stroke();
  }else if(who==='sal'){ // the Don: silver hair, suit, cigar
    ax.fillStyle=skin;ax.beginPath();ax.arc(0,0,34,0,7);ax.fill();
    ax.fillStyle='#cfcfcf';ax.beginPath();ax.arc(0,-14,33,Math.PI,0);ax.fill();
    ax.fillStyle='#1c1c24';ax.fillRect(-34,22,68,40);
    ax.fillStyle='#8f1f2f';ax.beginPath();ax.moveTo(0,24);ax.lineTo(-8,50);ax.lineTo(8,50);ax.fill();
    ax.fillStyle='#1a1a22';ax.beginPath();ax.arc(-11,-4,4,0,7);ax.arc(11,-4,4,0,7);ax.fill();
    ax.fillStyle='#6b4a2a';ax.fillRect(18,12,22,7);ax.fillStyle='#e07020';ax.beginPath();ax.arc(42,15,3,0,7);ax.fill();
  }else if(who==='vin'){ // consigliere: glasses, thin
    ax.fillStyle=skin;ax.beginPath();ax.arc(0,0,32,0,7);ax.fill();
    ax.fillStyle='#3a2c1c';ax.beginPath();ax.arc(0,-16,31,Math.PI,0);ax.fill();ax.fillRect(-31,-16,10,22);ax.fillRect(21,-16,10,22);
    ax.strokeStyle='#111';ax.lineWidth=2.5;ax.beginPath();ax.arc(-11,-2,9,0,7);ax.arc(11,-2,9,0,7);ax.moveTo(-2,-2);ax.lineTo(2,-2);ax.stroke();
    ax.fillStyle='#1a1a22';ax.beginPath();ax.arc(-11,-2,3,0,7);ax.arc(11,-2,3,0,7);ax.fill();
    ax.fillStyle='#2a2a34';ax.fillRect(-32,24,64,36);
  }else if(who==='punk'){ // punk kid: mohawk
    ax.fillStyle='#d8a37d';ax.beginPath();ax.arc(0,0,30,0,7);ax.fill();
    ax.fillStyle='#c22f8f';for(let i=-2;i<=2;i++){ax.beginPath();ax.moveTo(i*10-4,-24);ax.lineTo(i*10+4,-24);ax.lineTo(i*10,-52);ax.fill()}
    ax.fillStyle='#1a1a22';ax.beginPath();ax.arc(-10,-2,4,0,7);ax.arc(10,-2,4,0,7);ax.fill();
    ax.strokeStyle='#1a1a22';ax.lineWidth=3;ax.beginPath();ax.arc(0,12,10,.3,Math.PI-.3);ax.stroke();
  }else if(who==='brick'){ // brick: huge jaw
    ax.fillStyle='#c89878';ax.beginPath();ax.arc(0,-4,30,0,7);ax.fill();
    ax.fillStyle='#c89878';ax.fillRect(-22,6,44,26);
    ax.fillStyle='#241a12';ax.fillRect(-30,-26,60,12);
    ax.fillStyle='#a02020';ax.beginPath();ax.arc(-10,-6,4,0,7);ax.arc(10,-6,4,0,7);ax.fill();
    ax.strokeStyle='#5a2a1a';ax.lineWidth=4;ax.beginPath();ax.moveTo(-14,22);ax.lineTo(14,22);ax.stroke();
  }else if(who==='ash'){ // rival boss: scar, slick hair
    ax.fillStyle='#d8a37d';ax.beginPath();ax.arc(0,0,33,0,7);ax.fill();
    ax.fillStyle='#14141c';ax.beginPath();ax.arc(0,-12,32,Math.PI*1.02,Math.PI*1.98);ax.fill();
    ax.strokeStyle='#a02020';ax.lineWidth=3;ax.beginPath();ax.moveTo(-16,-14);ax.lineTo(-6,8);ax.stroke();
    ax.fillStyle='#1a1a22';ax.beginPath();ax.arc(-11,-2,4,0,7);ax.arc(11,-2,4,0,7);ax.fill();
    ax.fillStyle='#0f0f16';ax.beginPath();ax.ellipse(0,24,12,5,0,0,7);ax.fill();
  }else if(who==='goon'){ // task force: cap + sunglasses
    ax.fillStyle='#c89878';ax.beginPath();ax.arc(0,0,32,0,7);ax.fill();
    ax.fillStyle='#1c2a44';ax.beginPath();ax.arc(0,-8,31,Math.PI,0);ax.fill();ax.fillRect(-31,-12,62,8);
    ax.fillStyle='#0a0a10';ax.fillRect(-24,-6,48,12);
    ax.fillStyle='#2a2a34';ax.fillRect(-32,24,64,36);
  }else if(who==='grey'){ // councilman: grey suit, fake smile
    ax.fillStyle='#d8b08d';ax.beginPath();ax.arc(0,0,33,0,7);ax.fill();
    ax.fillStyle='#888';ax.beginPath();ax.arc(-14,-16,10,0,7);ax.arc(14,-16,10,0,7);ax.fill();
    ax.fillStyle='#3a3a48';ax.fillRect(-33,22,66,40);
    ax.fillStyle='#c9a227';ax.beginPath();ax.moveTo(0,24);ax.lineTo(-7,48);ax.lineTo(7,48);ax.fill();
    ax.strokeStyle='#1a1a22';ax.lineWidth=3;ax.beginPath();ax.arc(0,6,14,.25,Math.PI-.25);ax.stroke();
  }
  ax.restore();
}

/* ---------- scenes ---------- */
let rain=[];
function drawScene(dt){
  sceneT+=dt;
  const w=art.width,h=art.height;
  const g=ax.createLinearGradient(0,0,0,h);
  if(scene==='club'){g.addColorStop(0,'#141020');g.addColorStop(1,'#241a10')}
  else if(scene==='roof'){g.addColorStop(0,'#0b0b1e');g.addColorStop(.7,'#3a1f4d');g.addColorStop(1,'#141020')}
  else{g.addColorStop(0,'#0a0a16');g.addColorStop(.75,'#1c1c34');g.addColorStop(1,'#0e0e18')}
  ax.fillStyle=g;ax.fillRect(0,0,w,h);
  // moon
  ax.fillStyle='#f5f0d8';ax.beginPath();ax.arc(w*.82,h*.2,Math.min(w,h)*.055,0,7);ax.fill();
  ax.fillStyle='#ffffff66';for(let i=0;i<24;i++)ax.fillRect((i*197)%w,(i*131)%(h*.4),2,2);
  const horizon=h*.72;
  if(scene==='club'){
    ax.fillStyle='#1d1626';ax.fillRect(0,horizon,w,h-horizon);
    ax.fillStyle='#c9a22733';ax.fillRect(0,horizon,w,3);
    // card table
    ax.fillStyle='#1e3a24';ax.beginPath();ax.ellipse(w/2,h*.88,w*.3,h*.1,0,0,7);ax.fill();
    ax.fillStyle='#f0e9d8';for(let i=0;i<5;i++)ax.fillRect(w/2-w*.2+i*w*.09,h*.86,22,30);
    // hanging lamp
    ax.strokeStyle='#444';ax.lineWidth=3;ax.beginPath();ax.moveTo(w/2,0);ax.lineTo(w/2,h*.3);ax.stroke();
    ax.fillStyle='#e8c84a';ax.beginPath();ax.moveTo(w/2-26,h*.38);ax.lineTo(w/2+26,h*.38);ax.lineTo(w/2,h*.28);ax.fill();
    const lg=ax.createRadialGradient(w/2,h*.4,10,w/2,h*.4,120);lg.addColorStop(0,'#e8c84a22');lg.addColorStop(1,'transparent');
    ax.fillStyle=lg;ax.fillRect(0,0,w,h);
  }else if(scene==='map'){
    ax.fillStyle='#0d0d16';ax.fillRect(0,0,w,h);
    ax.strokeStyle='#1c3a5c';ax.lineWidth=w*.08;ax.beginPath();
    ax.moveTo(w*.64,0);ax.quadraticCurveTo(w*.5,h*.5,w*.74,h);ax.stroke();
    ax.strokeStyle='#22222e';ax.lineWidth=2;
    for(let i=1;i<6;i++){ax.beginPath();ax.moveTo(w*i/6,0);ax.lineTo(w*i/6,h);ax.stroke();
      ax.beginPath();ax.moveTo(0,h*i/6);ax.lineTo(w,h*i/6);ax.stroke()}
    ax.textAlign='center';
    ax.fillStyle='#c9a227';ax.font='bold '+Math.round(w*.055)+'px Georgia,serif';
    ax.fillText('SOOT CITY',w*.5,h*.07);
    ax.fillStyle='#4a4a5e';ax.font=Math.round(w*.032)+'px sans-serif';
    ax.fillText('LITTLE SOOTY',w*.24,h*.14);
    ax.fillText('THE DOCKS',w*.82,h*.47);
    ax.fillText('UPTOWN',w*.3,h*.92);
    for(const pn of pins){
      const px=pn.x*w,py=pn.y*h;
      if(pn.label==='!'){
        const pl=1+Math.sin(sceneT*5)*.18;
        ax.fillStyle='#e8c84a';ax.beginPath();ax.arc(px,py,17*pl,0,7);ax.fill();
        ax.fillStyle='#141005';ax.font='bold 22px sans-serif';ax.fillText('!',px,py+8);
      }else{
        ax.fillStyle=pn.cls;ax.beginPath();ax.arc(px,py,14,0,7);ax.fill();
        ax.fillStyle='#0b0b12';ax.font='bold 15px sans-serif';ax.fillText(pn.label,px,py+5);
      }
    }
  }else{
    // rooftops + chimneys silhouette
    ax.fillStyle='#101018';
    const off=(sceneT*8)%(w*.3);
    for(let x=-off;x<w;x+=w*.3){
      const bh=h*rnd(.12,.2);
      ax.fillRect(x,horizon-bh,w*.24,bh);
      ax.fillRect(x+w*.05,horizon-bh-h*.09,w*.05,h*.09); // chimney
      ax.fillRect(x+w*.15,horizon-bh-h*.06,w*.04,h*.06);
    }
    ax.fillStyle='#0a0a12';ax.fillRect(0,horizon,w,h-horizon);
    // street lamps
    for(let x=w*.1;x<w;x+=w*.4){
      ax.strokeStyle='#2c2c40';ax.lineWidth=4;ax.beginPath();ax.moveTo(x,horizon);ax.lineTo(x,horizon-h*.16);ax.stroke();
      ax.fillStyle='#ffe9a8';ax.beginPath();ax.arc(x,horizon-h*.16,6,0,7);ax.fill();
    }
    // rain
    if(rain.length<60&&Math.random()<.6)rain.push({x:rnd(0,w),y:-10,v:rnd(300,500)});
    ax.strokeStyle='#ffffff22';ax.lineWidth=1.5;ax.beginPath();
    for(const r of rain){ax.moveTo(r.x,r.y);ax.lineTo(r.x-4,r.y+14);r.y+=r.v*dt;if(r.y>h)r.y=-10}
    ax.stroke();
  }
  // smoke wisps on roof scenes
  if(scene==='roof'){
    ax.fillStyle='#ffffff10';
    for(let i=0;i<4;i++){const sx=w*(.15+i*.22)+Math.sin(sceneT+i)*10;
      ax.beginPath();ax.arc(sx,h*.3-((sceneT*20+i*40)%(h*.25)),14,0,7);ax.fill()}
  }
  // busts (not on the map)
  if(scene!=='map'){
    if(foePortrait)drawBust(foePortrait,w*.72,h*.52,Math.min(w,h)/300);
    drawBust('you',w*.26,h*.55,Math.min(w,h)/330);
  }
  // letterbox fade into panel
  const fg=ax.createLinearGradient(0,h*.8,0,h);fg.addColorStop(0,'transparent');fg.addColorStop(1,'#0b0b12');
  ax.fillStyle=fg;ax.fillRect(0,h*.8,w,h*.2);
}

