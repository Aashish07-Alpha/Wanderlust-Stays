# WanderLust Filter Feature

## Overview
The WanderLust application now includes a comprehensive filtering system that allows users to filter listings by various categories including trending rooms, iconic cities, and other accommodation types.

## Features Implemented

### 1. Category-Based Filtering
- **Trending**: Shows listings marked as trending
- **Rooms**: Standard room accommodations
- **Iconic Cities**: Listings in major cities
- **Mountains**: Mountain retreats and cabins
- **Castles**: Historic castle accommodations
- **Amazing Pools**: Properties with exceptional pool facilities
- **Camping**: Outdoor camping experiences
- **Farms**: Farm stays and rural accommodations
- **Arctic**: Cold weather destinations
- **Domes**: Unique dome-shaped accommodations
- **Boats**: Water-based accommodations

### 2. Search Functionality
- Text-based search across listing titles
- Combined with category filters
- Real-time search results

### 3. UI Enhancements
- Interactive filter buttons with icons
- Active filter highlighting
- Clear all filters option
- Results counter showing number of listings
- Responsive design for mobile devices

## Database Schema Updates

### Listing Model Changes
```javascript
// Added to listingSchema
category: {
  type: String,
  enum: ['trending', 'rooms', 'iconic-cities', 'mountains', 'castles', 
         'amazing-pools', 'camping', 'farms', 'arctic', 'domes', 'boats'],
  default: 'rooms'
},
isTrending: {
  type: Boolean,
  default: false
}
```

## API Endpoints

### GET /listings
Supports query parameters:
- `category`: Filter by specific category
- `search`: Search in listing titles
- `trending`: Filter trending listings (alternative)

**Example URLs:**
- `/listings?category=trending` - Show trending listings
- `/listings?category=iconic-cities` - Show iconic city listings
- `/listings?search=beach` - Search for beach-related listings
- `/listings?category=trending&search=modern` - Combined filter and search

## Frontend Features

### Filter UI
- Clickable filter buttons with FontAwesome icons
- Active state highlighting
- Clear all filters functionality
- Search bar integration

### JavaScript Functionality
- Dynamic URL building for filters
- State management for active filters
- Responsive filter interactions

## Usage Examples

### For Users
1. **Filter by Category**: Click any filter button to see listings in that category
2. **Search**: Use the search bar to find specific listings
3. **Combine Filters**: Use search with category filters
4. **Clear Filters**: Click "Clear All" to reset filters

### For Developers
1. **Add New Categories**: Update the enum in the listing model
2. **Modify Filter Logic**: Edit the controller's index method
3. **Update UI**: Add new filter buttons in the index.ejs template

## Testing

Run the test script to verify filtering functionality:
```bash
node test-filters.js
```

## Future Enhancements
- Price range filtering
- Location-based filtering
- Advanced search with multiple criteria
- Filter persistence across sessions
- Filter analytics and popular searches 