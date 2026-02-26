// Product grid logic
const productGrid = document.querySelector('.product-grid');
if (productGrid) {
  const products = [
    {
      name: "VINVIK Car Shampoo",
      image: "https://via.placeholder.com/300x200?text=Car+Shampoo",
      desc: "Foamy, shine-enhancing car wash formula."
    },
    {
      name: "VINVIK Dish Wash",
      image: "https://via.placeholder.com/300x200?text=Dish+Wash",
      desc: "Tough on grease, soft on hands."
    },
    {
      name: "VINVIK Floor Cleaner",
      image: "https://via.placeholder.com/300x200?text=Floor+Cleaner",
      desc: "Kills 99.9% germs with floral freshness."
    }
  ];

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
    `;
    productGrid.appendChild(card);
  });
}



(function () {
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function animateCount(el, target, duration = 1400) {
    const start = performance.now();
    const from = 0;
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(t);
      const value = Math.round(from + (target - from) * eased);
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.animated) return;           // prevent re-run
      el.dataset.animated = "1";
      const target = parseFloat(el.dataset.target || "0");
      const dur = parseInt(el.dataset.duration || "1400", 10);
      animateCount(el, target, dur);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll(".countup").forEach(el => observer.observe(el));
})();



  // fallback: match without .html (covers URLs like /about)
  if (!matched) {
    links.forEach(a => {
      const hrefBase = (new URL(a.getAttribute('href'), location.origin))
        .pathname.split('/').pop().toLowerCase().replace(/\.html?$/, '');
      if (hrefBase === fileNoExt) {
        a.classList.add('active');
        matched = true;
      }
    });
  }

  // final fallback for root path -> index.html
  if (!matched && (file === '' || file === '/')) {
    const home = document.querySelector('.nav-links a[href$="index.html"]');
    if (home) home.classList.add('active');
}


// ==============================
// Mobile hamburger for .nav-links
// ==============================
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  if (!nav) return;
  nav.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav-links");
  const toggle = document.getElementById("menu-toggle");
  if (!nav || !toggle) return;

  // Close menu when a link is clicked (mobile)
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) nav.classList.remove("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("open");
    }
  });
});