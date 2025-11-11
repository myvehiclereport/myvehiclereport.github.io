// /assets/js/vehicle.js

// Sample fake vehicles dataset
const vehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry XSE",
    year: 2020,
    price: 19800,
    mileage: 32500,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1600708899185-92f944b99c8a?auto=format&fit=crop&w=1200&q=80",
    condition: "Used - Excellent",
    fuelType: "Gasoline",
    transmission: "Automatic",
    color: "Silver",
    vin: "4T1BF1FK0LU123456",
    verified: true,
    description:
      "Clean title, single owner, well-maintained sedan with no accidents. Comes with a complete My Vehicle Report history. Perfect daily driver with great fuel efficiency and reliability.",
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic Sport",
    year: 2019,
    price: 16750,
    mileage: 41000,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1623984132419-7ddc5e59b6f5?auto=format&fit=crop&w=1200&q=80",
    condition: "Used - Good",
    fuelType: "Gasoline",
    transmission: "CVT",
    color: "Black",
    vin: "2HGFC2F68KH512345",
    verified: true,
    description:
      "Reliable compact car with great gas mileage. Recently serviced, all maintenance records included. Bluetooth, backup camera, and sport trim.",
  },
  {
    id: "3",
    make: "Ford",
    model: "F-150 XLT",
    year: 2021,
    price: 33400,
    mileage: 21500,
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1611524819194-6e0c1d23345b?auto=format&fit=crop&w=1200&q=80",
    condition: "Used - Like New",
    fuelType: "Gasoline",
    transmission: "Automatic",
    color: "Blue",
    vin: "1FTEW1EP2MFA12345",
    verified: true,
    description:
      "One-owner truck with low miles. Comes with My Vehicle Report verified service record and upgraded towing package. Ready for work or play.",
  },
  {
    id: "4",
    make: "BMW",
    model: "330i xDrive",
    year: 2022,
    price: 42950,
    mileage: 14500,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1605559424843-9e2b5aa8de09?auto=format&fit=crop&w=1200&q=80",
    condition: "Used - Excellent",
    fuelType: "Gasoline",
    transmission: "Automatic",
    color: "White",
    vin: "WBA5R1C02LF123456",
    verified: false,
    description:
      "Luxury sedan with all-wheel drive, premium interior, and excellent handling. Detailed vehicle report available through My Vehicle Report.",
  },
  {
    id: "5",
    make: "Tesla",
    model: "Model 3 Long Range",
    year: 2021,
    price: 43900,
    mileage: 18600,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1601924582971-c9e3d553af82?auto=format&fit=crop&w=1200&q=80",
    condition: "Used - Excellent",
    fuelType: "Electric",
    transmission: "Automatic",
    color: "Pearl White",
    vin: "5YJ3E1EA5MF123456",
    verified: true,
    description:
      "Fully electric sedan with dual-motor AWD, premium connectivity, and full self-driving hardware. Includes verified My Vehicle Report with charging history.",
  },
];

// Helper: get ID from URL
function getVehicleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function loadVehicleDetails() {
  const id = getVehicleId();
  const vehicle = vehicles.find((v) => v.id === id);

  const container = document.getElementById("vehicleDetail");

  if (!vehicle) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🚗</div>
        <h3>Vehicle not found</h3>
        <p>Return to the marketplace to browse other listings.</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="vehicle-card" style="max-width:850px;margin:auto;">
      <div class="vehicle-image">
        <img src="${vehicle.image}" 
             alt="${vehicle.make} ${vehicle.model}" 
             style="width:100%;height:320px;object-fit:cover;border-radius:12px 12px 0 0;">
      </div>
      <div class="vehicle-details">
        <h2 class="vehicle-make-model">${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
        <div class="vehicle-year-price">
          <span class="vehicle-year">${vehicle.condition}</span>
          <span class="vehicle-price">$${vehicle.price.toLocaleString()}</span>
        </div>
        <div class="vehicle-specs">
          <span>📍 ${vehicle.location}</span>
          <span>⚙️ ${vehicle.transmission}</span>
          <span>⛽ ${vehicle.fuelType}</span>
          <span>🎨 ${vehicle.color}</span>
          <span>🧾 ${vehicle.mileage.toLocaleString()} miles</span>
        </div>
        ${vehicle.verified
          ? `<div class="verified-badge">✓ Verified My Vehicle Report</div>`
          : `<div class="verified-badge" style="background:rgba(255,255,255,0.05);color:#999;">Unverified Listing</div>`}
        <p style="margin-top:1rem;color:#d1d5db;">${vehicle.description}</p>
        <p style="margin-top:1rem;font-size:0.9rem;color:#9ca3af;">VIN: ${vehicle.vin}</p>
        <button class="view-details-btn" onclick="contactSeller('${vehicle.make} ${vehicle.model}')">
          Contact Seller
        </button>
      </div>
    </div>
  `;
}

function contactSeller(vehicleName) {
  alert(
    `To contact the seller for ${vehicleName}, please use the My Vehicle Report mobile app or send us an inquiry form (feature coming soon).`
  );
}

document.addEventListener("DOMContentLoaded", loadVehicleDetails);
