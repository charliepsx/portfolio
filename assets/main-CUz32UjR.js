import{S as _,P as O,W as b,A as C,D as A}from"./three-Dn1MS982.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const S="modulepreload",D=function(o){return"/portfolio/"+o},y={},h=function(t,r,i){let e=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));e=Promise.allSettled(r.map(c=>{if(c=D(c),c in y)return;y[c]=!0;const m=c.endsWith(".css"),E=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${E}`))return;const l=document.createElement("link");if(l.rel=m?"stylesheet":S,m||(l.as="script"),l.crossOrigin="",l.href=c,a&&l.setAttribute("nonce",a),document.head.appendChild(l),m)return new Promise((v,P)=>{l.addEventListener("load",v),l.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return e.then(s=>{for(const a of s||[])a.status==="rejected"&&n(a.reason);return t().catch(n)})},f=document.getElementById("canvas-container"),g=f.clientWidth,w=f.clientHeight,p=new _,d=new O(50,g/w,.1,1e3),u=new b({antialias:!0});u.setSize(g,w);u.setClearColor(1842204);f.appendChild(u.domElement);const R=new C(16777215,1);p.add(R);const L=new A(16777215,2);L.position.set(1,1,1).normalize();d.add(L);p.add(d);const T=async()=>{const{OrbitControls:o}=await h(async()=>{const{OrbitControls:t}=await import("./three-Dn1MS982.js").then(r=>r.O);return{OrbitControls:t}},[]);return new o(d,u.domElement)},x=async()=>{const{GLTFLoader:o}=await h(async()=>{const{GLTFLoader:e}=await import("./three-Dn1MS982.js").then(n=>n.G);return{GLTFLoader:e}},[]),{DRACOLoader:t}=await h(async()=>{const{DRACOLoader:e}=await import("./three-Dn1MS982.js").then(n=>n.a);return{DRACOLoader:e}},[]),r=new t;r.setDecoderPath("three/examples/jsm/libs/draco/");const i=new o;return i.setDRACOLoader(r),i},F=(o,t)=>{console.log("Starting model load..."),o.load("assets/spyrocup.glb",r=>{console.log("Model loaded successfully with Draco compression!");const i=r.scene;i.traverse(e=>{e.isMesh&&e.material.map&&(e.material.map.anisotropy=u.capabilities.getMaxAnisotropy())}),p.add(i),i.position.set(0,-1,0),i.scale.set(1,1,1),G(i,t)},void 0,r=>{console.error("Error loading model:",r)})};d.position.set(0,1.5,-4);const G=(o,t)=>{function r(){requestAnimationFrame(r),o&&(o.rotation.y+=.01),t.update(),u.render(p,d)}r()},I=async()=>{const o=await x(),t=await T();F(o,t)};I();window.addEventListener("resize",()=>{const o=f.clientWidth,t=f.clientHeight;u.setSize(o,t),d.aspect=o/t,d.updateProjectionMatrix()});
