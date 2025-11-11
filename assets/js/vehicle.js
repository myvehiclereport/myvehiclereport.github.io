// Mock sample data — replace with Firestore query later
const sampleVehicles = [
  { id: "1", make: "Toyota", model: "Camry", year: 2020, price: 18500, mileage: 32500, location: "Los Angeles, CA", verified: true, image: "🚗", transmission: "Automatic", fuelType: "Gasoline", description: "A reliable and well-maintained sedan with low mileage and full service history." },
  { id: "2", make: "Honda", model: "Civic", year: 2019, price: 16500, mileage: 28700, location: "Miami, FL", verified: true, image: "🚙", transmission: "Automatic", fuelType: "Gasoline", description: "Clean title Civic with great fuel efficiency and modern tech features." },
  { id: "3", make: "Ford", model: "F-150", year: 2021, price: 32500, mileage: 18500, location: "Dallas, TX", verified: true, image: "🛻", transmission: "Automatic", fuelType: "Gasoline", description: "Powerful pickup truck with spacious interior and towing package." }
];

// Get ID from URL
function getVehicleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Render details
function renderVehicle(vehicle) {
  const container = document.getElementById("vehicleDetail");

  if (!vehicle) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <h3>Vehicle not found</h3>
        <p>This listing may have been removed or sold.</p>
        <a href="/marketplace/" class="view-details-btn" style="width:auto">Back to Marketplace</a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="vehicle-card" style="max-width:800px;margin:auto">
      <div class="vehicle-image" style="height:250px;font-size:5rem">${vehicle.image}</div>
      <div class="vehicle-details">
        <h2 style="font-size:1.8rem;margin-bottom:.5rem">${vehicle.make} ${vehicle.model}</h2>
        <div class="vehicle-year-price">
          <span class="vehicle-year">${vehicle.year}</span>
          <span class="vehicle-price">$${vehicle.price.toLocaleString()}</span>
        </div>
        ${vehicle.verified ? '<div class="verified-badge">✓ Verified Report</div>' : ''}
        <p style="margin:1rem 0;color:#ccc">${vehicle.description}</p>
        <div class="vehicle-specs">
          <span class="vehicle-spec">📏 ${vehicle.mileage.toLocaleString()} mi</span>
          <span class="vehicle-spec">⚙️ ${vehicle.transmission}</span>
          <span class="vehicle-spec">⛽ ${vehicle.fuelType}</span>
        </div>
        <p>📍 <strong>${vehicle.location}</strong></p>
        <button class="view-details-btn" style="margin-top:1.5rem" onclick="contactSeller('${vehicle.id}')">Contact Seller</button>
      </div>
    </div>`;
}

// Temporary contact action
function contactSeller(id) {
  alert(`To contact the seller of vehicle #${id}, please use the My Vehicle Report mobile app.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = getVehicleId();
  const vehicle = sampleVehicles.find(v => v.id === id);
  renderVehicle(vehicle);
});
