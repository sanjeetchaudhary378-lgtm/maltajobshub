const JOBS=[
{name:"Customer Service Representative",cat:"Customer Service",place:"Malta",type:"Full-time",desc:"Customer-facing role. Verify the original vacancy and requirements before applying."},
{name:"Office Administrator",cat:"Office & Admin",place:"Malta",type:"Full-time",desc:"Administrative support, organization and communication skills."},
{name:"Hotel Front Office",cat:"Hospitality",place:"Malta",type:"Full-time",desc:"Guest service and front-office responsibilities."},
{name:"Restaurant Supervisor",cat:"Hospitality",place:"Malta",type:"Full-time",desc:"Team coordination and customer service in hospitality."},
{name:"Warehouse Operative",cat:"Warehouse & Logistics",place:"Malta",type:"Full-time",desc:"Warehouse and logistics support; requirements vary by employer."},
{name:"Sales Assistant",cat:"Sales",place:"Malta",type:"Part-time / Full-time",desc:"Customer service and sales support."},
{name:"Care Support Worker",cat:"Care & Support",place:"Malta",type:"Full-time",desc:"Support role; check qualification and employer requirements."}
];
function renderJobs(){
 const grid=document.getElementById('jobGrid'); if(!grid)return;
 const input=document.getElementById('jobSearch'), select=document.getElementById('category');
 function draw(){
   const q=(input.value||'').toLowerCase(), c=select.value;
   const data=JOBS.filter(j=>(!c||j.cat===c)&&(!q||`${j.name} ${j.cat} ${j.desc}`.toLowerCase().includes(q)));
   grid.innerHTML=data.map(j=>`<article class="job-card"><span class="tag">${j.cat}</span><h3>${j.name}</h3><p>📍 ${j.place} · ${j.type}</p><p>${j.desc}</p><a class="btn primary" href="resources.html">Application guide</a></article>`).join('');
   document.getElementById('noJobs').hidden=data.length>0;
 }
 input.addEventListener('input',draw);select.addEventListener('change',draw);
 const params=new URLSearchParams(location.search); const cat=params.get('category'); if(cat){select.value={hospitality:'Hospitality','customer-service':'Customer Service',office:'Office & Admin',warehouse:'Warehouse & Logistics',sales:'Sales',care:'Care & Support'}[cat]||'';}
 draw();
}
function calculateSalary(){
 const g=Math.max(0,Number(document.getElementById('gross')?.value||0)), other=Math.max(0,Number(document.getElementById('other')?.value||0));
 // Deliberately simplified educational estimate. Replace with current official rules before using commercially.
 const social=Math.min(g*.10,238.15);
 const annual=Math.max(0,g*12-social*12-other*12);
 let tax=0;
 if(annual>9100) tax+=(Math.min(annual,14500)-9100)*.15;
 if(annual>14500) tax+=(Math.min(annual,19500)-14500)*.25;
 if(annual>19500) tax+=(Math.min(annual,60000)-19500)*.25;
 if(annual>60000) tax+=(annual-60000)*.35;
 const net=Math.max(0,g-social-tax/12-other);
 const el=document.getElementById('net'); if(el)el.textContent='€'+net.toFixed(0);
}
document.addEventListener('DOMContentLoaded',()=>{
 const form=document.getElementById('cvForm');
 if(form)form.addEventListener('submit',e=>{
   e.preventDefault(); const d=new FormData(form);
   const subject=encodeURIComponent(`MaltaJobsHub CV request — ${d.get('package')}`);
   const body=encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nTarget job: ${d.get('job')}\nPackage: ${d.get('package')}\nMessage: ${d.get('message')}`);
   location.href=`mailto:hello@example.com?subject=${subject}&body=${body}`;
 });
 const menu=document.querySelector('.menu'), nav=document.querySelector('nav');
 if(menu)menu.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.flexDirection='column';nav.style.position='absolute';nav.style.top='72px';nav.style.right='4%';nav.style.background='#fff';nav.style.padding='18px';nav.style.boxShadow='0 12px 30px rgba(0,0,0,.12)'});
});
