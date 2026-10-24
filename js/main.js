var W=[
{t:"Guten Morgen",c:"portrait",y:"2026",w:1,g:"url(assets/images/photo-1.JPG) center/cover"},
{t:"Beach",c:"travel",y:"2026",g:"url(assets/images/photo-2.JPG) center/cover"},
{t:"Bakery",c:"street",y:"2026",g:"url(assets/images/photo-3.JPG) center/cover"},
{t:"Event",c:"portrait",y:"2026",g:"url(assets/images/photo-4.JPG) center/cover"},
{t:"Birthday",c:"travel",y:"2026",w:1,g:"url(assets/images/photo-5.JPG) center/cover"},
{t:"Event",c:"street",y:"2026",g:"url(assets/images/photo-6.JPG) center/cover"},
{t:"Bakery",c:"travel",y:"2026",g:"url(assets/images/photo-7.JPG) center/cover"},
{t:"Travel",c:"portrait",y:"2026",g:"url(assets/images/photo-8.JPG) center/cover"}
];
var $=function(i){return document.getElementById(i)},DUR=5500,cur=0,timer,raf;
// name letters, fitted to frame width
var nm=$("name"),NAME="Britney Jessica Saslim";
NAME.split("").forEach(function(ch,i){var b=document.createElement("b");b.textContent=ch===" "?"\u00a0":ch;b.style.setProperty("--i",i);nm.appendChild(b)});
function fit(){nm.style.fontSize="100px";var w=(nm.parentNode.clientWidth-64)*.9,s=nm.scrollWidth-64,f=100*w/s,cap=innerHeight*.2;nm.style.fontSize=Math.min(f,cap)+"px"}
fit();addEventListener("resize",fit);if(document.fonts)document.fonts.ready.then(fit);
// slides + thumbs
var sl=$("slides"),th=$("th");
W.slice(0,5).forEach(function(p,i){
 var s=document.createElement("div");s.className="slide";s.innerHTML="<i></i>";s.firstChild.style.setProperty("--g",p.g);sl.appendChild(s);
 var b=document.createElement("button");b.style.setProperty("--g",p.g);b.setAttribute("aria-label",p.t);b.onclick=function(){go(i,true)};th.appendChild(b)});
function go(i,manual){
 cur=i;var S=sl.children,T=th.children,m=$("ttl");
 for(var k=0;k<S.length;k++){S[k].classList.toggle("on",k===i);T[k].classList.toggle("on",k===i)}
 m.classList.add("out");
 setTimeout(function(){m.firstChild.textContent=W[i].t;m.classList.remove("out");m.classList.add("pre");void m.offsetWidth;m.classList.remove("pre")},550);
 $("cnt").textContent=(i+1)+"/5";
 var pg=$("pg");pg.style.transition="none";pg.style.width="0";void pg.offsetWidth;pg.style.transition="width "+DUR+"ms linear";pg.style.width="100%";
 clearTimeout(timer);timer=setTimeout(function(){go((cur+1)%5)},DUR);
}
setTimeout(function(){go(0)},900);
// clock
function tick(){$("clk").textContent=new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Jakarta"})}tick();setInterval(tick,20000);
// theme
$("tg").onclick=function(){var r=document.documentElement,d=r.dataset.theme==="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);r.dataset.theme=d?"light":"dark"};
// grid
var grid=$("grid"),lb=$("lb");
W.forEach(function(p){
 var f=document.createElement("figure");f.dataset.c=p.c;if(p.w)f.className="w";
 f.innerHTML="<div class='im'></div><figcaption><span>"+p.t+"</span><span>"+p.y+"</span></figcaption>";
 f.firstChild.style.setProperty("--g",p.g);
 f.onclick=function(){$("lbi").style.background=p.g;$("lbc").textContent=p.t+" — "+p.y;lb.classList.add("open")};
 grid.appendChild(f)});
lb.onclick=function(){lb.classList.remove("open")};
addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("open")});
document.querySelectorAll(".filters button").forEach(function(b){b.onclick=function(){
 document.querySelectorAll(".filters button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");
 grid.querySelectorAll("figure").forEach(function(f){f.classList.toggle("hide",b.dataset.f!=="all"&&f.dataset.c!==b.dataset.f)})}});
// reveal on scroll + counters
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add("in");
 e.target.querySelectorAll&&e.target.querySelectorAll("[data-n]").forEach(function(n){var t=+n.dataset.n,s=performance.now();(function u(now){var p=Math.min(1,(now-s)/1400);n.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(u)})(s)});
 io.unobserve(e.target)})},{threshold:.12});
document.querySelectorAll(".rv,figure").forEach(function(e){io.observe(e)});
// parallax + hero drift
var fr=$("frame");
function par(){var h=innerHeight;grid.querySelectorAll("figure:not(.hide)").forEach(function(f){var r=f.getBoundingClientRect();if(r.bottom<0||r.top>h)return;f.firstChild.style.transform="translateY("+((r.top+r.height/2-h/2)*-.08)+"px)"});
 nm.style.transform="translateY("+Math.min(scrollY,600)*.25+"px)";raf=0}
addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(par)},{passive:true});par();
// cursor
if(matchMedia("(pointer:fine)").matches){var c=$("cur"),x=0,y=0,tx=0,ty=0;c.style.display="block";
 addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY});
 (function l(){x+=(tx-x)*.18;y+=(ty-y)*.18;c.style.transform="translate("+(x-c.offsetWidth/2)+"px,"+(y-c.offsetHeight/2)+"px)";requestAnimationFrame(l)})();
 document.addEventListener("mouseover",function(e){c.classList.toggle("big",!!e.target.closest("figure"))})}
