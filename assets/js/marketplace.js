// Sample vehicles (replace with Firestore later)
const sampleVehicles = [
  { id: "1", make: "Toyota", model: "Camry", year: 2020, price: 18500, mileage: 32500, location: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1600708899185-92f944b99c8a?auto=format&fit=crop&w=900&q=80", verified: true, transmission: "Automatic", fuelType: "Gasoline" },
  { id: "2", make: "Honda", model: "Civic", year: 2019, price: 16500, mileage: 28700, location: "Miami, FL", image: "https://images.unsplash.com/photo-1623984132419-7ddc5e59b6f5?auto=format&fit=crop&w=900&q=80", verified: true, transmission: "Automatic", fuelType: "Gasoline" },
  { id: "3", make: "Ford", model: "F-150", year: 2021, price: 32500, mileage: 18500, location: "Dallas, TX", image: "https://images.unsplash.com/photo-1611524819194-6e0c1d23345b?auto=format&fit=crop&w=900&q=80", verified: true, transmission: "Automatic", fuelType: "Gasoline" },
  { id: "4", make: "BMW", model: "3 Series", year: 2022, price: 42500, mileage: 12500, location: "New York, NY", image: "https://images.unsplash.com/photo-1605559424843-9e2b5aa8de09?auto=format&fit=crop&w=900&q=80", verified: false, transmission: "Automatic", fuelType: "Gasoline" }
];

function displayVehicles(vehicles) {
  const grid = document.getElementById("vehicleGrid");
  if (!grid) return;

  if (!vehicles.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No vehicles found</h3>
        <p>Try adjusting your search filters</p>
      </div>`;
    return;
  }

  grid.innerHTML = vehicles.map(v => `
    <div class="vehicle-row">
      <div class="vehicle-thumb">
        <img src="${v.image}" alt="${v.make} ${v.model}" loading="lazy">
      </div>
      <div class="vehicle-info">
        <h3>${v.year} ${v.make} ${v.model}</h3>
        <div class="vehicle-meta">
          <span>📍 ${v.location}</span>
          <span>📏 ${v.mileage.toLocaleString()} mi</span>
          <span>⚙️ ${v.transmission}</span>
          <span>⛽ ${v.fuelType}</span>
        </div>
        ${v.verified ? `<div class="verified-badge">✓ Verified Report</div>` : ""}
      </div>
      <div class="vehicle-actions">
        <div class="vehicle-price">$${v.price.toLocaleString()}</div>
        <button class="view-details-btn" onclick="window.location.href='/marketplace/vehicle.html?id=${v.id}'">
          View Details
        </button>
      </div>
    </div>
  `).join("");
}

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
