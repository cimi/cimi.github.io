(this["webpackJsonppenrose-triangle"]=this["webpackJsonppenrose-triangle"]||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);n(9);var i=n(2),a=n(0),r=n(6),o=n(7),d=n(4),s=n(5),w=n(3),h=new w.a({closeOnTop:!0});w.a.toggleHide();var p={perspectiveCamera:!1};h.add(p,"perspectiveCamera").listen().name("Perspective camera");var c=()=>{var e=new a.u,t=(e,t)=>({x:(e.x||0)+(t.x||0),y:(e.y||0)+(t.y||0),z:(e.z||0)+(t.z||0)}),n=e=>new a.l(Object.assign({emissive:468276,side:a.d,flatShading:!0},{color:e})),w=e=>Math.abs(Math.sin(e.rotation.z))>.015&&Math.abs(Math.cos(e.rotation.z))>.015,h={x:3.5,y:0,z:0},c=[16736568,41864,986895],v=(()=>{var e=new a.n(45,window.innerWidth/window.innerHeight,1,5e3);return e.position.set(25,25,25),e.rotation.set(-Math.PI/4,0,0),e})(),m=(()=>{var e=new a.m(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,1,5e3);return e.position.set(30,30,30),e.lookAt(new a.A(5,5,5)),e.zoom=30,e.rotation.z=Math.PI,e.updateProjectionMatrix(),e})(),g=m,l=(()=>{var e=new a.C({antialias:!0});return e.setPixelRatio(window.devicePixelRatio),e.setSize(window.innerWidth,window.innerHeight),e.setClearColor(16777117,1),document.body.appendChild(e.domElement),new r.a(e)})(),u=new d.a(e,g);l.addPass(u);var z,x=new o.a;l.addPass(x),(()=>{var t=[];t[0]=new a.q(16777215,1,0),t[1]=new a.q(16777215,1,0),t[2]=new a.q(16777215,1,0),t[0].position.set(0,200,0),t[1].position.set(200,0,100),t.forEach(t=>e.add(t))})(),(()=>{var r=(e,t,r)=>{var o=Object(i.a)(Object(i.a)(Object(i.a)({},e),t),{},{widthSegments:1,heightSegments:1,depthSegments:1}),d=new a.g,s=new a.a(o.width,o.height,o.depth,o.widthSegments,o.heightSegments,o.depthSegments);return d.add(((e,t)=>{var i=[];return i.push(n(t[0])),i.push(n(t[0])),i.push(n(t[1])),i.push(n(t[1])),i.push(n(t[2])),i.push(n(t[2])),new a.k(e,i)})(s,r)),d.position.set(o.x,o.y,o.z),d};[r({width:1,height:1,depth:16},h,c),r({width:1,height:14,depth:1},t(h,{y:7.5,z:7.5}),c),r({width:16,height:1,depth:1},t(h,{x:-7.5,z:-7.5}),c)].forEach(t=>e.add(t))})(),(()=>{var i=({x:e,y:t,z:i},r)=>{var o=new a.p(1,1,1),d=n(r),s=new a.k(o,d);return s.position.set(e,t,i),s};e.add(i(t(h,{x:1,y:15,z:8}),c[2])),e.add(i(t(h,{y:15,z:8}),c[2]))})();var y=()=>{requestAnimationFrame(y),(g=p.perspectiveCamera?v:m).isPerspectiveCamera&&(z||((z=new s.a(g,l.renderer.domElement)).enableZoom=!1,z.update())),g.isOrthographicCamera&&w(g)&&(g.rotation.z+=.025),u.camera=g,u.scene=e,l.render()},C=e=>{for(;g.isOrthographicCamera&&!w(g);)g.rotation.z+=.025,g.updateProjectionMatrix()},b=e=>{p.perspectiveCamera=!p.perspectiveCamera},k=e=>{g.aspect=1,g.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("keydown",e=>{switch(e.keyCode){case 32:C();break;case 13:b()}}),window.addEventListener("click",C),window.addEventListener("dblclick",b),window.addEventListener("resize",k),window.addEventListener("orientationchange",k),y()};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));window.onload=()=>{c()},"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},8:function(e,t,n){e.exports=n(10)},9:function(e,t,n){}},[[8,1,2]]]);
//# sourceMappingURL=main.2f0294e3.chunk.js.map