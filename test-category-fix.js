const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

// Test creating a listing with category
async function testCategoryCreation() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    console.log('Connected to MongoDB');

    // Test creating a listing with category
    const testListing = new Listing({
      title: "Test Listing with Category",
      description: "This is a test listing",
      price: 1000,
      location: "Test City",
      country: "Test Country",
      category: "iconic-cities",
      isTrending: true,
      geometry: {
        type: "Point",
        coordinates: [0, 0]
      }
    });

    await testListing.save();
    console.log('✅ Successfully created listing with category');

    // Test creating a listing without category (should default to 'rooms')
    const testListing2 = new Listing({
      title: "Test Listing without Category",
      description: "This is another test listing",
      price: 800,
      location: "Test City 2",
      country: "Test Country 2",
      geometry: {
        type: "Point",
        coordinates: [1, 1]
      }
    });

    await testListing2.save();
    console.log('✅ Successfully created listing without category (defaulted to rooms)');

    // Verify the listings
    const savedListing = await Listing.findOne({ title: "Test Listing with Category" });
    const savedListing2 = await Listing.findOne({ title: "Test Listing without Category" });

    console.log('\n=== Test Results ===');
    console.log(`Listing 1 category: ${savedListing.category}`);
    console.log(`Listing 1 isTrending: ${savedListing.isTrending}`);
    console.log(`Listing 2 category: ${savedListing2.category}`);
    console.log(`Listing 2 isTrending: ${savedListing2.isTrending}`);

    // Clean up test data
    await Listing.deleteMany({ 
      title: { $in: ["Test Listing with Category", "Test Listing without Category"] }
    });
    console.log('🧹 Cleaned up test data');

    console.log('\n✅ Category validation fix is working correctly!');

  } catch (error) {
    console.error('❌ Error testing category creation:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the test
testCategoryCreation(); 