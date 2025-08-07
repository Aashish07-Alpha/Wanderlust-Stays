if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

// Test the filtering functionality
async function testFilters() {
  try {
    // Connect to MongoDB
    const MONGO_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/wanderlust";
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');

    // Test different filter queries
    console.log('\n=== Testing Filters ===\n');

    // Test trending filter
    const trendingListings = await Listing.find({ isTrending: true });
    console.log(`Trending listings: ${trendingListings.length}`);
    trendingListings.forEach(listing => {
      console.log(`- ${listing.title} (${listing.category})`);
    });

    // Test iconic cities filter
    const iconicCitiesListings = await Listing.find({ category: 'iconic-cities' });
    console.log(`\nIconic Cities listings: ${iconicCitiesListings.length}`);
    iconicCitiesListings.forEach(listing => {
      console.log(`- ${listing.title} (${listing.location})`);
    });

    // Test rooms filter
    const roomsListings = await Listing.find({ category: 'rooms' });
    console.log(`\nRooms listings: ${roomsListings.length}`);
    roomsListings.forEach(listing => {
      console.log(`- ${listing.title} (${listing.location})`);
    });

    // Test search functionality
    const searchResults = await Listing.find({
      title: { $regex: new RegExp('beach', 'i') }
    });
    console.log(`\nSearch results for 'beach': ${searchResults.length}`);
    searchResults.forEach(listing => {
      console.log(`- ${listing.title}`);
    });

    console.log('\n=== Filter Test Complete ===');
    
  } catch (error) {
    console.error('Error testing filters:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the test
testFilters(); 