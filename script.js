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

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const slideMenu = document.getElementById('mobile-slide-menu');

  menuButton?.addEventListener('click', () => {
    const isVisible = slideMenu.style.display === 'block';
    slideMenu.style.display = isVisible ? 'none' : 'block';
  });

  // Optional: Close menu if clicked outside
  window.addEventListener('click', function (e) {
    if (!slideMenu.contains(e.target) && !menuButton.contains(e.target)) {
      slideMenu.style.display = 'none';
    }
  });
});

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



// Automatically set the active class on the current page's tab
document.addEventListener("DOMContentLoaded", function() {
  // Get the current URL path (relative path)
  let currentPage = window.location.pathname.split("/").pop();  // Get the last part of the URL path (page name)

  // Get all the navigation links
  let links = document.querySelectorAll('.nav-links a');

  // Loop through each link
  links.forEach(link => {
    // Compare the link's href (the page name) with the current page's name
    if (link.getAttribute('href') === currentPage) {
      // Add the 'active' class to the current link
      link.classList.add('active');
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  // current path bits
  const path = location.pathname.replace(/\/+$/, ''); // strip trailing slash
  const file = (path.split('/').pop() || 'index.html').toLowerCase();
  const fileNoExt = file.replace(/\.html?$/, '');

  const links = Array.from(document.querySelectorAll('.nav-links a'));

  // clear any previous active
  links.forEach(a => a.classList.remove('active'));

  // try exact filename match first
  let matched = false;
  links.forEach(a => {
    const hrefFile = (new URL(a.getAttribute('href'), location.origin))
      .pathname.split('/').pop().toLowerCase() || 'index.html';
    if (hrefFile === file) {
      a.classList.add('active');
      matched = true;
    }
  });

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
});



document.addEventListener('DOMContentLoaded', () => {
  // Get the current page (e.g., contact.html, products.html, etc.)
  const path = location.pathname.replace(/\/+$/, ''); // Strip any trailing slashes
  const file = (path.split('/').pop() || 'index.html').toLowerCase();
  const fileNoExt = file.replace(/\.html?$/, '');

  const links = Array.from(document.querySelectorAll('.nav-links a'));

  // Remove any active class
  links.forEach(a => a.classList.remove('active'));

  // Try exact match
  let matched = false;
  links.forEach(a => {
    const hrefFile = (new URL(a.getAttribute('href'), location.origin))
      .pathname.split('/').pop().toLowerCase() || 'index.html';
    if (hrefFile === file) {
      a.classList.add('active');
      matched = true;
    }
  });

  // If no exact match, check base name (without extension)
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
});
