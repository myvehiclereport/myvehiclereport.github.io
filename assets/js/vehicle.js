// Mock vehicle data — replace with Firestore later
const sampleVehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: 18500,
    mileage: 32500,
    location: "Los Angeles, CA",
    verified: true,
    images: [
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
    ],
    transmission: "Automatic",
    fuelType: "Gasoline",
    description: "Reliable sedan with complete service history and clean title. Great for daily commutes with top safety ratings.",
    seller: { name: "AutoStar LA", rating: 4.9, type: "Dealer" }
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2019,
    price: 16500,
    mileage: 28700,
    location: "Miami, FL",
    verified: true,
    images: [
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
    ],
    transmission: "Automatic",
    fuelType: "Gasoline",
    description: "Sporty Civic in excellent condition. One owner, smoke-free, includes full vehicle report.",
    seller: { name: "CarHaus Miami", rating: 4.7, type: "Dealer" }
  }
];

function getVehicleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// ----- Render the detail view -----
function renderVehicle(vehicle) {
  const container = document.getElementById("vehicleDetail");

  if (!vehicle) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <h3>Vehicle not found</h3>
        <p>This listing may have been removed.</p>
        <a href="/marketplace/" class="view-details-btn" style="width:auto">Back to Marketplace</a>
      </div>`;
    return;
  }

  // Create slides for all images
  const slides = vehicle.images
    .map(img => `<div class="carousel-slide" style="background-image:url('${img}')"></div>`)
    .join("");

  // Dots
  const dots = vehicle.images
    .map((_, i) => `<div class="carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}"></div>`)
    .join("");

  container.innerHTML = `
    <div class="vehicle-card" style="max-width:850px;margin:auto;">
      <div class="carousel">
        <div class="carousel-track">${slides}</div>
        <button class="carousel-btn prev">❮</button>
        <button class="carousel-btn next">❯</button>
        <div class="carousel-dots">${dots}</div>
      </div>

      <div class="vehicle-details">
        <h2 style="font-size:1.9rem;font-weight:700;margin-bottom:.4rem">${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
        <div class="vehicle-year-price">
          <span class="vehicle-year">📍 ${vehicle.location}</span>
          <span class="vehicle-price">$${vehicle.price.toLocaleString()}</span>
        </div>
        ${vehicle.verified ? '<div class="verified-badge">✓ Verified Report</div>' : ''}
        <p style="margin:1rem 0;color:#cfd3da;font-size:1.05rem">${vehicle.description}</p>

        <div class="vehicle-specs" style="margin:1.2rem 0;">
          <span class="vehicle-spec">📏 ${vehicle.mileage.toLocaleString()} mi</span>
          <span class="vehicle-spec">⚙️ ${vehicle.transmission}</span>
          <span class="vehicle-spec">⛽ ${vehicle.fuelType}</span>
        </div>

        <div style="margin-top:1.5rem;border-top:1px solid var(--border);padding-top:1.2rem;text-align:left;">
          <h3 style="color:var(--accent-blue);font-size:1.1rem;">Seller Information</h3>
          <p style="margin-top:0.3rem;">🏢 <strong>${vehicle.seller.name}</strong> (${vehicle.seller.type})</p>
          <p>⭐ ${vehicle.seller.rating.toFixed(1)} / 5.0</p>
        </div>

        <button class="view-details-btn" style="margin-top:2rem;font-size:1rem;" onclick="contactSeller('${vehicle.id}')">
          Contact Seller
        </button>
      </div>
    </div>`;

  setupCarousel();
}

// ----- Carousel functionality -----
function setupCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-btn.next");
  const prevButton = document.querySelector(".carousel-btn.prev");
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  let currentIndex = 0;

  function updateCarousel(index) {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      currentIndex = parseInt(e.target.dataset.index);
      updateCarousel(currentIndex);
    });
  });

  // Swipe gestures for mobile
  let startX = 0;
  track.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextButton.click();
    if (endX - startX > 50) prevButton.click();
  });
}

// ----- Contact Seller -----
function contactSeller(id) {
  alert(`To contact the seller of vehicle #${id}, please use the My Vehicle Report mobile app or in-app chat.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = getVehicleId();
  const vehicle = sampleVehicles.find(v => v.id === id);
  renderVehicle(vehicle);
});
