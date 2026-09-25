const icon=document.createElement("link");icon.rel="icon";icon.href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2214%22 fill=%22%2317354a%22/><text x=%2232%22 y=%2241%22 text-anchor=%22middle%22 font-size=%2230%22 font-family=%22Georgia%22 fill=%22%23f1ca76%22>E3</text></svg>";document.head.append(icon);
const pages=[["Home","index.html"],["About Rhea","about.html"],["Rhea’s E3 Framework","e3-method.html"],["Coaching","coaching.html"],["Programs","programs.html"],["Wheel of Life","wheel-of-life.html"],["Stories & Media","insights.html"],["Contact","contact.html"]];
const current=location.pathname.split("/").pop()||"index.html";
const nav=pages.map(([label,href])=>`<a href="${href}"${href===current?' class="active" aria-current="page"':""}>${label}</a>`).join("");
document.querySelector("[data-header]").innerHTML=`
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="nav-wrap">
<a class="brand" href="index.html" aria-label="Coach Rhea Bheda home"><strong>Coach Rhea Bheda</strong><span>Transformation Coach · Creator of E3</span></a>
<nav class="nav-links" id="site-nav" aria-label="Primary navigation">${nav}</nav>
<a class="nav-cta" href="index.html#check-in">Find your starting point</a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">☰</button>
</div></header>`;
document.querySelector("[data-footer]").innerHTML=`
<section class="cta-strip" aria-labelledby="cta-title"><div class="section-inner"><div><h2 id="cta-title">Start with one honest reflection.</h2><p>Notice what keeps repeating, name what you need, and choose one useful next step.</p></div><a class="button" href="index.html#check-in">Find your starting point</a></div></section>
<footer class="site-footer"><div class="section-inner"><div class="footer-grid">
<div><h3>Coach Rhea Bheda</h3><p>Transformation Coach, Yoga & Meditation Facilitator, and creator of the E3 Transformation Framework. Based in Dubai, working with clients globally.</p></div>
<div><h3>Explore</h3><a href="about.html">About Rhea</a><a href="e3-method.html">Rhea’s E3 Framework</a><a href="coaching.html">Coaching</a><a href="programs.html">Programs</a></div>
<div><h3>Continue</h3><a href="wheel-of-life.html">Wheel of Life</a><a href="insights.html#client-stories">Client Stories</a><a href="insights.html">Insights & Media</a><a href="index.html#faq">FAQs</a><a href="contact.html">Contact</a></div>
</div><div class="footer-bottom">© <span data-year></span> Coach Rhea Bheda. All rights reserved.</div></div></footer>`;
document.querySelector("[data-year]").textContent=new Date().getFullYear();
const toggle=document.querySelector(".menu-toggle");const menu=document.querySelector(".nav-links");
toggle.addEventListener("click",()=>{const open=!menu.classList.contains("open");menu.classList.toggle("open",open);document.body.classList.toggle("menu-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close menu":"Open menu");toggle.textContent=open?"×":"☰"});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menu.classList.contains("open"))toggle.click()});
document.querySelectorAll(".affirmation-card").forEach(card=>{const front=card.querySelector(".card-front");const back=card.querySelector(".card-back");const setState=flipped=>{card.classList.toggle("is-flipped",flipped);card.setAttribute("aria-pressed",String(flipped));front.setAttribute("aria-hidden",String(flipped));back.setAttribute("aria-hidden",String(!flipped))};setState(false);card.addEventListener("click",()=>setState(!card.classList.contains("is-flipped")))});
document.querySelectorAll(".faq-list details").forEach(item=>item.addEventListener("toggle",()=>{if(!item.open)return;document.querySelectorAll(".faq-list details").forEach(other=>{if(other!==item)other.open=false})}));

const checkin=document.querySelector("[data-checkin]");
if(checkin){
  const patternStep=checkin.querySelector('[data-checkin-step="pattern"]');
  const desireStep=checkin.querySelector('[data-checkin-step="desire"]');
  const result=checkin.querySelector("[data-checkin-result]");
  const progress=[...checkin.querySelectorAll(".checkin-progress span")];
  let selectedPattern="";
  const patterns={
    overthinking:{title:"Create space between uncertainty and decision.",copy:"You may not need more information. You may need a steadier way to hear what you already know. Coach Rhea’s E3 Framework can help you notice the story beneath the overthinking, identify what is yours to choose, and practise one clear response.",link:"coaching.html"},
    reaction:{title:"Build a pause before the response.",copy:"Strong emotions carry information, but they do not have to make every decision. E3 helps you acknowledge what is present, reclaim your choice, and rehearse a response you can respect later.",link:"e3-method.html#e3-practice"},
    boundaries:{title:"Make room for an honest yes or no.",copy:"A boundary often begins by recognising what you feel and need. Through E3, you can meet the discomfort without judgment, own the choice available to you, and practise clearer language.",link:"e3-method.html#e3-practice"},
    direction:{title:"Listen for what matters beneath the momentum.",copy:"When life is full, clarity can get buried under expectations and habit. The Wheel of Life can help you see the wider pattern before you decide what deserves attention first.",link:"wheel-of-life.html#wheel-activity"}
  };
  const showStep=step=>{patternStep.hidden=step!=="pattern";desireStep.hidden=step!=="desire";result.hidden=step!=="result";progress.forEach((item,index)=>item.classList.toggle("is-active",index===(step==="pattern"?0:step==="desire"?1:2)))};
  checkin.querySelectorAll("[data-pattern]").forEach(button=>button.addEventListener("click",()=>{selectedPattern=button.dataset.pattern;showStep("desire")}));
  checkin.querySelectorAll("[data-desire]").forEach(button=>button.addEventListener("click",()=>{const item=patterns[selectedPattern];const desire=button.dataset.desire;checkin.querySelector("[data-checkin-title]").textContent=item.title;checkin.querySelector("[data-checkin-copy]").textContent=`${item.copy} Your focus is ${desire}. Use that to guide your next step.`;checkin.querySelector("[data-checkin-link]").href=item.link;showStep("result")}));
  checkin.querySelector("[data-checkin-back]").addEventListener("click",()=>showStep("pattern"));
  checkin.querySelector("[data-checkin-reset]").addEventListener("click",()=>{selectedPattern="";showStep("pattern")});
}

const e3Practice=document.querySelector("[data-e3-practice]");
if(e3Practice){
  e3Practice.addEventListener("submit",event=>{
    event.preventDefault();
    const situation=e3Practice.querySelector("[data-e3-situation]").value;
    const embrace=e3Practice.querySelector("[data-e3-embrace]").value.trim();
    const empower=e3Practice.querySelector("[data-e3-empower]").value;
    const evolve=e3Practice.querySelector("[data-e3-evolve]").value.trim();
    const result=e3Practice.querySelector("[data-e3-result]");
    const output=e3Practice.querySelector("[data-e3-output]");
    if(!embrace||!empower||!evolve){
      output.textContent="Complete the three E3 prompts so your reflection can connect what you notice, what you can influence, and what you will practise.";
    }else{
      output.textContent=`With ${situation}, you noticed: “${embrace}” That is your Embrace moment. You identified ${empower} as yours to influence. That is Empower. Your Evolve practice is: “${evolve}” Keep the step small enough to repeat.`;
    }
    result.hidden=false;
    result.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
}

const wheelActivity=document.querySelector("[data-wheel-activity]");
if(wheelActivity){
  const sliders=[...wheelActivity.querySelectorAll("[data-wheel-area]")];
  const shape=wheelActivity.querySelector("[data-wheel-shape]");
  const heading=wheelActivity.querySelector("[data-wheel-heading]");
  const copy=wheelActivity.querySelector("[data-wheel-copy]");
  const updateWheel=()=>{
    const points=sliders.map((slider,index)=>{
      const angle=(-90+index*45)*Math.PI/180;
      const radius=Number(slider.value)*9;
      slider.closest(".wheel-control").querySelector("output").textContent=slider.value;
      return `${110+Math.cos(angle)*radius},${110+Math.sin(angle)*radius}`;
    }).join(" ");
    shape.setAttribute("points",points);
    const lowest=[...sliders].sort((a,b)=>Number(a.value)-Number(b.value))[0];
    heading.textContent=`${lowest.dataset.wheelArea} may be asking for more attention.`;
    copy.textContent=`You rated this area ${lowest.value} out of 10. Before trying to fix everything, ask what one kind, realistic choice could support it this week.`;
  };
  sliders.forEach(slider=>slider.addEventListener("input",updateWheel));
  updateWheel();
}
