/* ============================================================
   B S PROPERTY — Main Application Logic
   ============================================================ */

// ── State ──────────────────────────────────────────────────────
let activeArea   = 'All';
let activeType   = 'All';
let activePropId = null;

// ── DOM ready ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderLocations();
  renderListings();
  initSearch();
  initScrollAnimations();
  handleDeepLink();
});

// ================================================================
//  NAVBAR
// ================================================================
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ================================================================
//  SEARCH + FILTERS
// ================================================================
function initSearch() {
  const searchLoc  = document.getElementById('search-location');
  const searchType = document.getElementById('search-type');
  const searchBtn  = document.getElementById('search-btn');

  searchBtn.addEventListener('click', () => {
    const loc  = searchLoc.value;
    const type = searchType.value;

    if (loc  !== 'all') activeArea = loc;
    if (type !== 'all') activeType = type;

    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    setTimeout(renderListings, 600);

    document.querySelectorAll('.filter-btn[data-area]').forEach(b => {
      b.classList.toggle('active', b.dataset.area === activeArea);
    });
    document.querySelectorAll('.filter-btn[data-type]').forEach(b => {
      b.classList.toggle('active', b.dataset.type === activeType);
    });
  });

  // Area filter buttons
  document.querySelectorAll('.filter-btn[data-area]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeArea = btn.dataset.area;
      document.querySelectorAll('.filter-btn[data-area]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderListings();
    });
  });

  // Type filter buttons
  document.querySelectorAll('.filter-btn[data-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type;
      document.querySelectorAll('.filter-btn[data-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderListings();
    });
  });
}

// ================================================================
//  PROPERTY LISTINGS RENDER
// ================================================================
function renderListings() {
  const grid = document.getElementById('property-grid');
  let filtered = PROPERTIES.filter(p => {
    const areaMatch = activeArea === 'All' || p.area === activeArea;
    const typeMatch = activeType === 'All' || p.type === activeType;
    return areaMatch && typeMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No properties found</h3>
        <p>Try a different area or property type.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => propCardHTML(p)).join('');

  // Animate cards in
  grid.querySelectorAll('.prop-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.45s ease, transform 0.45s ease, background var(--transition)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 70);
    card.addEventListener('click', () => openDetail(p.id));
  });
}

function propCardHTML(p) {
  return `
    <div class="prop-card" data-id="${p.id}" role="listitem">
      <div class="prop-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="prop-tag">${p.furnishing}</span>
        <span class="prop-type-tag">${p.type}</span>
      </div>
      <div class="prop-card-body">
        <div class="prop-rent">₹${formatRent(p.rent)}<span> /month</span></div>
        <div class="prop-name">${p.name}</div>
        <div class="prop-location">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          ${p.location}
        </div>
        <div class="prop-specs">
          <div class="prop-spec">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <strong>${p.bedrooms}</strong>&nbsp;BHK
          </div>
          <div class="prop-spec">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="1"/>
            </svg>
            <strong>${p.sqft}</strong>&nbsp;sq.ft
          </div>
          <div class="prop-spec">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ${p.available}
          </div>
        </div>
        <div class="prop-card-actions">
          <button class="btn btn-primary" style="flex:1;justify-content:center;font-size:0.72rem;padding:10px 18px;" onclick="event.stopPropagation();openDetail('${p.id}')">View Property</button>
          <button class="btn btn-outline" style="padding:10px 14px;" onclick="event.stopPropagation();shareProperty('${p.id}')" title="Share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ================================================================
//  LOCATIONS
// ================================================================
function renderLocations() {
  const grid = document.getElementById('locations-grid');
  grid.innerHTML = LOCATIONS.map(loc => `
    <div class="loc-card fade-section" data-name="${loc.name}" onclick="filterByLocation('${loc.name}')">
      <img src="${loc.img}" alt="${loc.name}" loading="lazy" />
      <div class="loc-overlay"></div>
      <span class="loc-count">${loc.count} listing${loc.count > 1 ? 's' : ''}</span>
      <div class="loc-text">
        <div class="loc-name">${loc.name}</div>
        <div class="loc-tagline">${loc.tagline}</div>
      </div>
    </div>
  `).join('');
}

function filterByLocation(name) {
  activeArea = name;
  document.querySelectorAll('.filter-btn[data-area]').forEach(b => {
    b.classList.toggle('active', b.dataset.area === name);
  });
  document.querySelectorAll('.loc-card').forEach(c => {
    c.classList.toggle('active-filter', c.dataset.name === name);
  });
  document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  setTimeout(renderListings, 600);
}

// ================================================================
//  PROPERTY DETAIL PAGE
// ================================================================
function openDetail(id) {
  const prop = PROPERTIES.find(p => p.id === id);
  if (!prop) return;
  activePropId = id;

  history.pushState({ propId: id }, '', `#property/${id}`);

  const page = document.getElementById('detail-page');
  page.innerHTML = detailPageHTML(prop);
  page.classList.add('open');
  document.body.style.overflow = 'hidden';
  page.scrollTop = 0;

  page.querySelector('#back-btn').addEventListener('click', closeDetail);
  page.querySelector('#share-detail-btn').addEventListener('click', () => shareProperty(id));
}

function closeDetail() {
  const page = document.getElementById('detail-page');
  page.classList.remove('open');
  document.body.style.overflow = '';
  history.pushState({}, '', window.location.pathname);
}

function handleDeepLink() {
  const hash = window.location.hash;
  if (hash.startsWith('#property/')) {
    const id = hash.replace('#property/', '');
    openDetail(id);
  }
  window.addEventListener('popstate', (e) => {
    if (!e.state?.propId) closeDetail();
  });
}

function detailPageHTML(p) {
  const whatsappMsg = encodeURIComponent(
    `Hello! I am interested in renting "${p.name}" at ${p.location}.\n\nRent: ₹${formatRent(p.rent)}/month\nBedrooms: ${p.bedrooms} BHK\n\nKindly share more details. Thank you.`
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMsg}`;

  const amenitiesHTML = p.amenities.map(a => `<div class="amenity-item">${a}</div>`).join('');

  const galleryImgs = p.gallery.length >= 3
    ? `<img class="main-img" src="${p.gallery[0]}" alt="${p.name}" />
       <img src="${p.gallery[1]}" alt="${p.name} interior" />
       <img src="${p.gallery[2]}" alt="${p.name} view" />`
    : `<img class="main-img" src="${p.image}" alt="${p.name}" style="grid-row:1/3" />`;

  return `
    <!-- Detail Header -->
    <div class="detail-header">
      <div class="container">
        <div class="detail-header-inner">
          <button class="back-btn" id="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to Listings
          </button>
          <div class="footer-logo" style="font-size:0.75rem;">B S Property</div>
          <div class="pill pill-gold">Demo Listing</div>
        </div>
      </div>
    </div>

    <!-- Detail Body -->
    <div class="detail-body">
      <div class="container">

        <!-- Gallery -->
        <div class="detail-gallery">
          ${galleryImgs}
        </div>

        <!-- Content -->
        <div class="detail-content">

          <!-- Left -->
          <div>
            <span class="section-label">${p.area} · ${p.type}</span>
            <h1 class="detail-title">${p.name}</h1>
            <div style="display:flex;align-items:center;gap:7px;color:var(--muted);font-size:0.82rem;margin-top:6px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              ${p.location}
            </div>

            <div class="detail-rent">₹${formatRent(p.rent)} <small>/ month</small></div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
              <span class="pill pill-gold">${p.furnishing}</span>
              <span class="pill pill-green">Available: ${p.available}</span>
              <span class="pill pill-gold">${p.floor}</span>
            </div>

            <div class="detail-specs">
              <div class="detail-spec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                <strong>${p.bedrooms} Bedrooms</strong>
              </div>
              <div class="detail-spec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
                <strong>${p.bathrooms} Bathrooms</strong>
              </div>
              <div class="detail-spec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="1"/>
                </svg>
                <strong>${p.sqft} sq.ft</strong>
              </div>
            </div>

            <div class="detail-desc">${p.description}</div>

            <div class="amenities-title">Amenities &amp; Features</div>
            <div class="amenities-grid">${amenitiesHTML}</div>

            <div style="margin-top:36px;padding:16px 20px;border:1px solid var(--border);background:rgba(255,255,255,0.015);">
              <p style="font-size:0.75rem;color:var(--muted);line-height:1.7;">
                ⚠ <strong style="color:var(--warm-white);font-weight:500;">Demo Website</strong> — This is a fictional sample listing for demonstration purposes only.
                All property details, prices, and images are illustrative.
              </p>
            </div>
          </div>

          <!-- Right: Inquiry -->
          <div class="inquiry-card">
            <h3>Inquire About This Property</h3>
            <p>Connect with our team via WhatsApp for immediate assistance and to arrange a viewing.</p>

            <div class="inquiry-info">
              <div class="inquiry-row">
                <span>Monthly Rent</span>
                <span style="font-family:var(--serif);font-size:1.05rem;">₹${formatRent(p.rent)}</span>
              </div>
              <div class="inquiry-row">
                <span>Furnishing</span>
                <span>${p.furnishing}</span>
              </div>
              <div class="inquiry-row">
                <span>Availability</span>
                <span>${p.available}</span>
              </div>
              <div class="inquiry-row">
                <span>Area</span>
                <span>${p.sqft} sq.ft</span>
              </div>
            </div>

            <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%;justify-content:center;text-decoration:none;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Inquire on WhatsApp
            </a>

            <button class="share-btn" id="share-detail-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share This Property
            </button>
          </div>

        </div>
      </div>
    </div>`;
}

// ================================================================
//  SHARE
// ================================================================
function shareProperty(id) {
  const url = `${window.location.origin}${window.location.pathname}#property/${id}`;
  if (navigator.share) {
    const prop = PROPERTIES.find(p => p.id === id);
    navigator.share({ title: prop?.name || 'B S Property', url });
  } else {
    navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard.'));
  }
}

// ================================================================
//  SCROLL ANIMATIONS
// ================================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
}

// ================================================================
//  HELPERS
// ================================================================
function formatRent(n) {
  if (n >= 100000) return (n / 100000).toFixed(n % 100000 === 0 ? 0 : 1) + 'L';
  return n.toLocaleString('en-IN');
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
