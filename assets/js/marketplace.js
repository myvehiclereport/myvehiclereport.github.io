// Sample vehicles (replace with Firestore later)
const sampleVehicles = [
  { id: "1", make: "Toyota", model: "Camry", year: 2020, price: 18500, mileage: 32500, location: "Los Angeles, CA", image: "🚗", verified: true, transmission: "Automatic", fuelType: "Gasoline" },
  { id: "2", make: "Honda", model: "Civic", year: 2019, price: 16500, mileage: 28700, location: "Miami, FL", image: "🚙", verified: true, transmission: "Automatic", fuelType: "Gasoline" },
  { id: "3", make: "Ford", model: "F-150", year: 2021, price: 32500, mileage: 18500, location: "Dallas, TX", image: "🛻", verified: true, transmission: "Automatic", fuelType: "Gasoline" },
  { id: "4", make: "BMW", model: "3 Series", year: 2022, price: 42500, mileage: 12500, location: "New York, NY", image: "🚘", verified: false, transmission: "Automatic", fuelType: "Gasoline" }
];

function displayVehicles(vehicles) {
  const grid = document.getElementById('vehicleGrid');
  if (!vehicles.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No vehicles found</h3><p>Try adjusting your search filters</p></div>`;
    return;
  }
  grid.innerHTML = vehicles.map(v => `
    <div class="vehicle-card" data-id="${v.id}">
      <div class="vehicle-image">${v.image}</div>
      <div class="vehicle-details">
        <div class="vehicle-make-model">${v.make} ${v.model}</div>
        <div class="vehicle-year-price">
          <span class="vehicle-year">${v.year}</span>
          <span class="vehicle-price">$${v.price.toLocaleString()}</span>
        </div>
        <div class="vehicle-specs">
          <span class="vehicle-spec">📏 ${v.mileage.toLocaleString()} mi</span>
          <span class="vehicle-spec">⚙️ ${v.transmission}</span>
          <span class="vehicle-spec">⛽ ${v.fuelType}</span>
        </div>
        <div class="vehicle-location">📍 ${v.location}</div>
        ${v.verified ? '<div class="verified-badge">✓ Verified Report</div>' : ''}
        <button class="view-details-btn" onclick="viewVehicleDetails('${v.id}')">View Details & Contact</button>
      </div>
    </div>`).join('');
}

function filterVehicles() {
  const s = document.getElementById('searchInput').value.toLowerCase();
  const make = document.getElementById('makeFilter').value;
  const price = document.getElementById('priceFilter').value;
  const year = document.getElementById('yearFilter').value;

  const filtered = sampleVehicles.filter(v => {
    const matchesSearch = !s || [v.make, v.model, v.location].some(f => f.toLowerCase().includes(s));
    const matchesMake = !make || v.make === make;
    const matchesPrice = !price || (
      price === '0-5000' ? v.price < 5000 :
      price === '5000-10000' ? v.price <= 10000 && v.price >= 5000 :
      price === '10000-20000' ? v.price <= 20000 && v.price >= 10000 :
      price === '20000-50000' ? v.price <= 50000 && v.price >= 20000 :
      price === '50000+' ? v.price > 50000 : true
    );
    const matchesYear = !year || (
      year === '2020-2025' ? v.year >= 2020 :
      year === '2015-2019' ? v.year >= 2015 && v.year <= 2019 :
      year === '2010-2014' ? v.year >= 2010 && v.year <= 2014 :
      year === '2000-2009' ? v.year >= 2000 && v.year <= 2009 :
      year === '1990-1999' ? v.year >= 1990 && v.year <= 1999 : true
    );
    return matchesSearch && matchesMake && matchesPrice && matchesYear;
  });
  displayVehicles(filtered);
}

function viewVehicleDetails(id) {
  const v = sampleVehicles.find(x => x.id === id);
  if (v) {
    alert(`${v.make} ${v.model} (${v.year})\nPrice: $${v.price.toLocaleString()}\nMileage: ${v.mileage.toLocaleString()} mi\nLocation: ${v.location}\n\nUse the My Vehicle Report app to contact the seller.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => displayVehicles(sampleVehicles), 1000);
  ['searchInput','makeFilter','priceFilter','yearFilter'].forEach(id => {
    document.getElementById(id).addEventListener('input', filterVehicles);
    document.getElementById(id).addEventListener('change', filterVehicles);
  });
});
