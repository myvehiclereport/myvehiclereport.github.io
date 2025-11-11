// vehicle.js - Updated with professional styling
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
    description: "Clean title, single owner, well-maintained sedan with no accidents. Comes with a complete My Vehicle Report history. Perfect daily driver with great fuel efficiency and reliability.",
    features: ["Backup Camera", "Bluetooth", "Leather Seats", "Sunroof", "Keyless Entry"],
    seller: {
      name: "Auto Elite Motors",
      rating: 4.8,
      reviews: 127,
      contact: "(555) 123-4567"
    }
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
    description: "Reliable compact car with great gas mileage. Recently serviced, all maintenance records included. Bluetooth, backup camera, and sport trim.",
    features: ["Backup Camera", "Apple CarPlay", "Sport Trim", "Alloy Wheels"],
    seller: {
      name: "Pacific Auto Sales",
      rating: 4.6,
      reviews: 89,
      contact: "(555) 234-5678"
    }
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
    description: "One-owner truck with low miles. Comes with My Vehicle Report verified service record and upgraded towing package. Ready for work or play.",
    features: ["Towing Package", "4WD", "Touchscreen", "Backup Camera", "Bed Liner"],
    seller: {
      name: "Lone Star Trucks",
      rating: 4.9,
      reviews: 203,
      contact: "(555) 345-6789"
    }
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
    description: "Luxury sedan with all-wheel drive, premium interior, and excellent handling. Detailed vehicle report available through My Vehicle Report.",
    features: ["Leather Interior", "Navigation", "Premium Sound", "Heated Seats", "Sunroof"],
    seller: {
      name: "Metro Luxury Autos",
      rating: 4.7,
      reviews: 156,
      contact: "(555) 456-7890"
    }
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
    description: "Fully electric sedan with dual-motor AWD, premium connectivity, and full self-driving hardware. Includes verified My Vehicle Report with charging history.",
    features: ["Autopilot", "Premium Interior", "Glass Roof", "Wireless Charging", "Premium Sound"],
    seller: {
      name: "Sunshine EV Motors",
      rating: 4.8,
      reviews: 94,
      contact: "(555) 567-8901"
    }
  }
];

// Get the vehicle ID from the URL
function getVehicleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function loadVehicleDetails() {
  const id = getVehicleId();
  const vehicle = vehicles.find(v => v.id === id);
  const container = document.getElementById("vehicleDetail");

  if (!container) return;

  if (!vehicle) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🚗</div>
        <h3>Vehicle not found</h3>
        <p>Return to the marketplace to browse other listings.</p>
        <a href="/marketplace/" class="btn btn-primary" style="margin-top: 1rem;">
          Back to Marketplace
        </a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="vehicle-detail-container">
      <nav class="breadcrumb">
        <a href="/marketplace/" class="breadcrumb-link">Marketplace</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${vehicle.year} ${vehicle.make} ${vehicle.model}</span>
      </nav>

      <div class="vehicle-detail-card">
        <div class="detail-gallery">
          <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
          <div class="vehicle-badge">${vehicle.condition}</div>
        </div>

        <div class="detail-content">
          <div class="detail-header">
            <div>
              <h1 class="detail-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
              <p class="detail-subtitle">${vehicle.location}</p>
            </div>
            <div class="detail-price">$${vehicle.price.toLocaleString()}</div>
          </div>

          <div class="detail-grid">
            <div>
              <div class="specs-grid">
                <div class="spec-card">
                  <h4>Mileage</h4>
                  <p>${vehicle.mileage.toLocaleString()} miles</p>
                </div>
                <div class="spec-card">
                  <h4>Transmission</h4>
                  <p>${vehicle.transmission}</p>
                </div>
                <div class="spec-card">
                  <h4>Fuel Type</h4>
                  <p>${vehicle.fuelType}</p>
                </div>
                <div class="spec-card">
                  <h4>Color</h4>
                  <p>${vehicle.color}</p>
                </div>
                <div class="spec-card">
                  <h4>VIN</h4>
                  <p style="font-family: monospace; font-size: 0.875rem;">${vehicle.vin}</p>
                </div>
                <div class="spec-card">
                  <h4>Condition</h4>
                  <p>${vehicle.condition}</p>
                </div>
              </div>

              ${vehicle.verified ? `
                <div class="verified-badge" style="margin: 1.5rem 0;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Verified My Vehicle Report Available
                </div>
              ` : `
                <div class="verified-badge" style="background: rgba(100, 116, 139, 0.1); color: var(--text-muted); margin: 1.5rem 0;">
                  Unverified Listing - Report Not Available
                </div>
              `}

              <div class="description-section">
                <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Vehicle Description</h3>
                <p style="color: var(--text-secondary); line-height: 1.7;">${vehicle.description}</p>
              </div>

              ${vehicle.features ? `
                <div class="features-section" style="margin-top: 2rem;">
                  <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Key Features</h3>
                  <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
                    ${vehicle.features.map(feature => `
                      <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>${feature}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>

            <div class="seller-actions">
              <div class="seller-info" style="margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Seller Information</h3>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                  <div style="width: 48px; height: 48px; background: var(--accent-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                    ${vehicle.seller.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style="font-weight: 600; color: var(--text-primary);">${vehicle.seller.name}</div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      ${vehicle.seller.rating} (${vehicle.seller.reviews} reviews)
                    </div>
                  </div>
                </div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">
                  <strong>Contact:</strong> ${vehicle.seller.contact}
                </div>
              </div>

              <div class="action-buttons">
                <button class="btn btn-primary btn-full" onclick="contactSeller('${vehicle.make} ${vehicle.model}', '${vehicle.seller.name}')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                  </svg>
                  Contact Seller
                </button>
                <button class="btn btn-secondary btn-full" onclick="saveVehicle('${vehicle.id}')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                  Save Vehicle
                </button>
                <button class="btn btn-secondary btn-full" onclick="window.location.href='/marketplace/'">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back to Marketplace
                </button>
              </div>

              ${vehicle.verified ? `
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(5, 150, 105, 0.05); border: 1px solid rgba(5, 150, 105, 0.2); border-radius: var(--radius-md);">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <strong style="color: var(--success);">Vehicle Report Available</strong>
                  </div>
                  <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0;">
                    Full vehicle history report includes accident history, service records, and ownership timeline.
                  </p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function contactSeller(vehicleName, sellerName) {
  // In a real application, this would open a contact form or modal
  alert(`Contact ${sellerName} about the ${vehicleName}\n\nPhone: [Seller Phone]\nEmail: [Seller Email]\n\nFull contact features coming soon in our next update.`);
}

function saveVehicle(vehicleId) {
  // Implementation for saving vehicles to favorites
  console.log('Saving vehicle:', vehicleId);
  alert('Vehicle saved to your favorites!');
}

// Add breadcrumb styles
const style = document.createElement('style');
style.textContent = `
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
  }
  
  .breadcrumb-link {
    color: var(--accent-primary);
    text-decoration: none;
  }
  
  .breadcrumb-link:hover {
    text-decoration: underline;
  }
  
  .breadcrumb-separator {
    color: var(--border-medium);
  }
  
  .breadcrumb-current {
    color: var(--text-secondary);
  }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", loadVehicleDetails);
