// marketplace.js - Updated for new design
const sampleVehicles = [
  { 
    id: "1", 
    make: "Toyota", 
    model: "Camry XSE", 
    year: 2020, 
    price: 19800, 
    mileage: 32500, 
    location: "Los Angeles, CA", 
    image: "https://images.unsplash.com/photo-1600708899185-92f944b99c8a?auto=format&fit=crop&w=900&q=80", 
    verified: true, 
    transmission: "Automatic", 
    fuelType: "Gasoline",
    condition: "Excellent",
    color: "Silver"
  },
  { 
    id: "2", 
    make: "Honda", 
    model: "Civic Sport", 
    year: 2019, 
    price: 16750, 
    mileage: 41000, 
    location: "Seattle, WA", 
    image: "https://images.unsplash.com/photo-1623984132419-7ddc5e59b6f5?auto=format&fit=crop&w=900&q=80", 
    verified: true, 
    transmission: "CVT", 
    fuelType: "Gasoline",
    condition: "Good",
    color: "Black"
  },
  { 
    id: "3", 
    make: "Ford", 
    model: "F-150 XLT", 
    year: 2021, 
    price: 33400, 
    mileage: 21500, 
    location: "Dallas, TX", 
    image: "https://images.unsplash.com/photo-1611524819194-6e0c1d23345b?auto=format&fit=crop&w=900&q=80", 
    verified: true, 
    transmission: "Automatic", 
    fuelType: "Gasoline",
    condition: "Like New",
    color: "Blue"
  },
  { 
    id: "4", 
    make: "BMW", 
    model: "330i xDrive", 
    year: 2022, 
    price: 42950, 
    mileage: 14500, 
    location: "New York, NY", 
    image: "https://images.unsplash.com/photo-1605559424843-9e2b5aa8de09?auto=format&fit=crop&w=900&q=80", 
    verified: false, 
    transmission: "Automatic", 
    fuelType: "Gasoline",
    condition: "Excellent",
    color: "White"
  }
];

function displayVehicles(vehicles) {
  const grid = document.getElementById("vehicleGrid");
  if (!grid) return;

  if (!vehicles.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No vehicles found</h3>
        <p>Try adjusting your search filters to see more results.</p>
      </div>`;
    return;
  }

  grid.innerHTML = vehicles.map(vehicle => `
    <div class="vehicle-card">
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" loading="lazy">
        <div class="vehicle-badge">${vehicle.condition}</div>
      </div>
      <div class="vehicle-content">
        <div class="vehicle-header">
          <div>
            <h3 class="vehicle-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
            <div class="vehicle-meta">
              <div class="meta-item">
                <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>${vehicle.location}</span>
              </div>
            </div>
          </div>
          <div class="vehicle-price">$${vehicle.price.toLocaleString()}</div>
        </div>
        
        <div class="vehicle-specs">
          <div class="spec-item">
            <span class="spec-label">Mileage</span>
            <span class="spec-value">${vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Transmission</span>
            <span class="spec-value">${vehicle.transmission}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Fuel Type</span>
            <span class="spec-value">${vehicle.fuelType}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Color</span>
            <span class="spec-value">${vehicle.color}</span>
          </div>
        </div>
        
        ${vehicle.verified ? `
          <div class="verified-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Verified Vehicle Report
          </div>
        ` : ''}
        
        <div class="vehicle-actions">
          <button class="btn btn-secondary" onclick="saveVehicle('${vehicle.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Save
          </button>
          <a href="/marketplace/vehicle.html?id=${vehicle.id}" class="btn btn-primary">
            View Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

function saveVehicle(vehicleId) {
  // Implementation for saving vehicles to favorites
  console.log('Saving vehicle:', vehicleId);
  // Add your save functionality here
}

// Filter function remains the same as before
function filterVehicles() {
  const s = document.getElementById("searchInput").value.toLowerCase();
  const make = document.getElementById("makeFilter").value;
  const price = document.getElementById("priceFilter").value;
  const year = document.getElementById("yearFilter").value;

  const filtered = sampleVehicles.filter(v => {
    const matchesSearch = !s || [v.make, v.model, v.location].some(f => f.toLowerCase().includes(s));
    const matchesMake = !make || v.make === make;
    const matchesPrice =
      !price ||
      (price === "0-5000"
        ? v.price < 5000
        : price === "5000-10000"
        ? v.price <= 10000 && v.price >= 5000
        : price === "10000-20000"
        ? v.price <= 20000 && v.price >= 10000
        : price === "20000-50000"
        ? v.price <= 50000 && v.price >= 20000
        : price === "50000+"
        ? v.price > 50000
        : true);
    const matchesYear =
      !year ||
      (year === "2020-2025"
        ? v.year >= 2020
        : year === "2015-2019"
        ? v.year >= 2015 && v.year <= 2019
        : year === "2010-2014"
        ? v.year >= 2010 && v.year <= 2014
        : year === "2000-2009"
        ? v.year >= 2000 && v.year <= 2009
        : year === "1990-1999"
        ? v.year >= 1990 && v.year <= 1999
        : true);
    return matchesSearch && matchesMake && matchesPrice && matchesYear;
  });

  displayVehicles(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  displayVehicles(sampleVehicles);
  ["searchInput", "makeFilter", "priceFilter", "yearFilter"].forEach(id => {
    document.getElementById(id).addEventListener("input", filterVehicles);
    document.getElementById(id).addEventListener("change", filterVehicles);
  });
});
