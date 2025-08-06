const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

async function migrateCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    console.log('Connected to MongoDB');

    // Find all listings that don't have a category field
    const listingsWithoutCategory = await Listing.find({ category: { $exists: false } });
    console.log(`Found ${listingsWithoutCategory.length} listings without category`);

    if (listingsWithoutCategory.length > 0) {
      // Update all listings to have default category and isTrending
      const updateResult = await Listing.updateMany(
        { category: { $exists: false } },
        { 
          $set: { 
            category: 'rooms',
            isTrending: false
          } 
        }
      );
      
      console.log(`Updated ${updateResult.modifiedCount} listings with default category`);
    }

    // Also update listings that don't have isTrending field
    const listingsWithoutTrending = await Listing.find({ isTrending: { $exists: false } });
    console.log(`Found ${listingsWithoutTrending.length} listings without isTrending`);

    if (listingsWithoutTrending.length > 0) {
      const updateResult = await Listing.updateMany(
        { isTrending: { $exists: false } },
        { $set: { isTrending: false } }
      );
      
      console.log(`Updated ${updateResult.modifiedCount} listings with isTrending field`);
    }

    // Verify the migration
    const totalListings = await Listing.countDocuments();
    const listingsWithCategory = await Listing.countDocuments({ category: { $exists: true } });
    const listingsWithTrending = await Listing.countDocuments({ isTrending: { $exists: true } });

    console.log('\n=== Migration Summary ===');
    console.log(`Total listings: ${totalListings}`);
    console.log(`Listings with category: ${listingsWithCategory}`);
    console.log(`Listings with isTrending: ${listingsWithTrending}`);

    if (totalListings === listingsWithCategory && totalListings === listingsWithTrending) {
      console.log('✅ Migration completed successfully!');
    } else {
      console.log('❌ Migration incomplete');
    }

  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrateCategories(); 