const icon=document.createElement("link");icon.rel="icon";icon.href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2214%22 fill=%22%2317354a%22/><text x=%2232%22 y=%2241%22 text-anchor=%22middle%22 font-size=%2230%22 font-family=%22Georgia%22 fill=%22%23f1ca76%22>E3</text></svg>";document.head.append(icon);
const pages=[["Home","index.html"],["About Rhea","about.html"],["The E3 Method","e3-method.html"],["Coaching","coaching.html"],["Programs","programs.html"],["Wheel of Life","wheel-of-life.html"],["Testimonials","testimonials.html"],["Insights","insights.html"],["Contact","contact.html"]];
const current=location.pathname.split("/").pop()||"index.html";
const nav=pages.map(([label,href])=>`<a href="${href}"${href===current?' class="active" aria-current="page"':""}>${label}</a>`).join("");
document.querySelector("[data-header]").innerHTML=`
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="nav-wrap">
<a class="brand" href="index.html" aria-label="Coach Rhea Bheda home"><strong>Coach Rhea Bheda</strong><span>Embrace · Empower · Evolve</span></a>
<nav class="nav-links" id="site-nav" aria-label="Primary navigation">${nav}</nav>
<a class="nav-cta" href="contact.html">Start your transformation</a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">☰</button>
</div></header>`;
document.querySelector("[data-footer]").innerHTML=`
<section class="cta-strip" aria-labelledby="cta-title"><div class="section-inner"><div><h2 id="cta-title">Ready to own your reality?</h2><p>Begin with a thoughtful conversation about where you are and where you want to go.</p></div><a class="button" href="contact.html">Start your transformation</a></div></section>
<footer class="site-footer"><div class="section-inner"><div class="footer-grid">
<div><h3>Coach Rhea Bheda</h3><p>Transformation Coach, Yoga & Meditation Facilitator, and creator of the E3 Framework. Based in Dubai, working with clients globally.</p></div>
<div><h3>Explore</h3><a href="about.html">About Rhea</a><a href="e3-method.html">The E3 Method</a><a href="coaching.html">Coaching</a><a href="programs.html">Programs</a></div>
<div><h3>Continue</h3><a href="wheel-of-life.html">Wheel of Life</a><a href="testimonials.html">Testimonials</a><a href="insights.html">Insights</a><a href="contact.html">Contact</a></div>
</div><div class="footer-bottom">© <span data-year></span> Coach Rhea Bheda. All rights reserved.</div></div></footer>`;
document.querySelector("[data-year]").textContent=new Date().getFullYear();
const toggle=document.querySelector(".menu-toggle");const menu=document.querySelector(".nav-links");
toggle.addEventListener("click",()=>{const open=!menu.classList.contains("open");menu.classList.toggle("open",open);document.body.classList.toggle("menu-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close menu":"Open menu");toggle.textContent=open?"×":"☰"});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menu.classList.contains("open"))toggle.click()});
