// ebay-api.js
class EbayAPI {
  constructor() {
    this.clientId = 'TrevorAb-MyVehicl-SBX-56e5d96a0-205d7e54';
    this.clientSecret = 'SBX-6e5d96a04361-9785-4de9-b9ea-4761';
    this.devId = '38fb2296-6ff7-411b-a09f-646c175e3b5f';
    this.baseURL = 'https://api.sandbox.ebay.com'; // Sandbox for testing
    // this.baseURL = 'https://api.ebay.com'; // Production
    this.accessToken = null;
  }

  async getAccessToken() {
    try {
      const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
      const response = await fetch(`${this.baseURL}/identity/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`
        },
        body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  async searchVehicles(params = {}) {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    try {
      const queryParams = new URLSearchParams({
        'OPERATION-NAME': 'findItemsAdvanced',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': this.clientId,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': '',
        'keywords': params.keywords || 'vehicle car',
        'categoryId': '6001', // Vehicles category
        'paginationInput.entriesPerPage': params.limit || '50',
        'sortOrder': 'BestMatch'
      });

      // Add optional filters
      if (params.minPrice) queryParams.append('itemFilter(0).name', 'MinPrice');
      if (params.minPrice) queryParams.append('itemFilter(0).value', params.minPrice);
      if (params.maxPrice) queryParams.append('itemFilter(1).name', 'MaxPrice');
      if (params.maxPrice) queryParams.append('itemFilter(1).value', params.maxPrice);
      if (params.condition) queryParams.append('itemFilter(2).name', 'Condition');
      if (params.condition) queryParams.append('itemFilter(2).value', params.condition);

      const response = await fetch(`${this.baseURL}/services/search/FindingService/v1?${queryParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.transformEbayData(data);
    } catch (error) {
      console.error('Error searching eBay vehicles:', error);
      return [];
    }
  }

  transformEbayData(ebayData) {
    if (!ebayData.findItemsAdvancedResponse || 
        !ebayData.findItemsAdvancedResponse[0].searchResult ||
        !ebayData.findItemsAdvancedResponse[0].searchResult[0].item) {
      return [];
    }

    const items = ebayData.findItemsAdvancedResponse[0].searchResult[0].item;
    
    return items.map(item => {
      const listing = item[0];
      return {
        id: listing.itemId[0],
        make: this.extractMakeFromTitle(listing.title[0]),
        model: this.extractModelFromTitle(listing.title[0]),
        year: this.extractYearFromTitle(listing.title[0]),
        price: parseFloat(listing.sellingStatus[0].currentPrice[0].__value__),
        mileage: this.extractMileageFromTitle(listing.title[0]),
        location: listing.location ? listing.location[0] : 'Location not specified',
        image: listing.galleryURL ? listing.galleryURL[0] : '/assets/images/vehicle-placeholder.jpg',
        verified: false, // eBay listings aren't verified by your system
        transmission: 'Unknown',
        fuelType: 'Unknown',
        condition: listing.condition ? listing.condition[0].conditionDisplayName[0] : 'Used',
        description: listing.title[0],
        source: 'ebay',
        url: listing.viewItemURL[0]
      };
    }).filter(vehicle => vehicle.price > 0); // Filter out invalid listings
  }

  extractMakeFromTitle(title) {
    const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Nissan', 'Hyundai', 'Kia', 'Volkswagen'];
    for (const make of makes) {
      if (title.toLowerCase().includes(make.toLowerCase())) {
        return make;
      }
    }
    return 'Unknown';
  }

  extractModelFromTitle(title) {
    // Simple model extraction - you might want to make this more sophisticated
    const make = this.extractMakeFromTitle(title);
    if (make !== 'Unknown') {
      const withoutMake = title.replace(new RegExp(make, 'i'), '').trim();
      const words = withoutMake.split(' ');
      return words[0] || 'Unknown';
    }
    return 'Unknown';
  }

  extractYearFromTitle(title) {
    const yearMatch = title.match(/\b(19|20)\d{2}\b/);
    return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear() - 5;
  }

  extractMileageFromTitle(title) {
    const mileageMatch = title.match(/\b(\d{1,3}(?:,\d{3})*)\s*(?:miles?|mi)\b/i);
    if (mileageMatch) {
      return parseInt(mileageMatch[1].replace(/,/g, ''));
    }
    return Math.floor(Math.random() * 100000) + 10000; // Fallback
  }

  async getItemDetails(itemId) {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    try {
      const queryParams = new URLSearchParams({
        'OPERATION-NAME': 'getSingleItem',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': this.clientId,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': '',
        'itemId': itemId,
        'IncludeSelector': 'Description,Details,ItemSpecifics'
      });

      const response = await fetch(`${this.baseURL}/shopping?${queryParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting item details:', error);
      return null;
    }
  }
}

// Create global instance
window.ebayAPI = new EbayAPI();
