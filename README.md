<<<<<<< HEAD
# 🏖️ WanderLust - Vacation Rental Platform

A modern, professional vacation rental platform built with Node.js, Express, MongoDB, and Bootstrap. Discover amazing places to stay around the world with a beautiful, user-friendly interface.

![WanderLust](https://img.shields.io/badge/WanderLust-Vacation%20Rental%20Platform-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple)

## ✨ Features

### 🏠 **Property Management**
- **Create & Edit Listings**: Add your properties with detailed descriptions
- **Image Upload**: Cloudinary integration for high-quality property images
- **Category Filtering**: Browse by trending, rooms, iconic cities, mountains, castles, pools, camping, farms, arctic, domes, and boats
- **Search Functionality**: Find properties by location or keywords

### 👤 **User Experience**
- **User Authentication**: Secure signup/login with Passport.js
- **Professional Profiles**: Comprehensive user profiles with booking history
- **Favorites System**: Heart icons to save favorite properties
- **Responsive Design**: Beautiful UI that works on all devices

### 💳 **Booking & Payments**
- **Razorpay Integration**: Secure payment processing
- **Booking Management**: View and manage all your bookings
- **Payment Verification**: Secure payment confirmation
- **Booking History**: Track all your past and upcoming trips

### 🗺️ **Location & Maps**
- **Interactive Maps**: Mapbox integration showing property locations
- **Location Badges**: Professional location display with badges
- **Geolocation**: Find properties near your location

### ⭐ **Reviews & Ratings**
- **Review System**: Rate and review properties
- **Star Ratings**: Visual rating display
- **Review Management**: Edit and delete your reviews

### 🎨 **Professional UI/UX**
- **Modern Design**: Clean, professional interface
- **Bootstrap 5.3.3**: Latest responsive framework
- **Font Awesome Icons**: Beautiful iconography
- **Gradient Effects**: Modern visual elements
- **Toast Notifications**: User feedback system

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DB_URL=mongodb://localhost:27017/wanderlust
   
   # Session Secret
   SESSION_SECRET=your_session_secret_here
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Mapbox (for maps)
   MAP_TOKEN=your_mapbox_access_token
   
   # Razorpay (for payments)
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:8080`

## 🛠️ Technology Stack

### **Backend**
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Passport.js**: Authentication middleware
- **Multer**: File upload handling
- **Cloudinary**: Image storage and optimization

### **Frontend**
- **Bootstrap 5.3.3**: CSS framework
- **Font Awesome 6.7.2**: Icon library
- **EJS**: Template engine
- **Mapbox GL JS**: Interactive maps
- **Razorpay**: Payment gateway

### **Payment & Maps**
- **Razorpay**: Secure payment processing
- **Mapbox**: Interactive maps and geolocation
- **Crypto**: Payment signature verification

## 📁 Project Structure

```
wanderlust/
├── controllers/          # Route controllers
│   ├── listings.js      # Listing management
│   ├── users.js         # User authentication
│   ├── reviews.js       # Review system
│   ├── bookings.js      # Booking management
│   └── payment.js       # Payment processing
├── models/              # Database models
│   ├── listing.js       # Property listings
│   ├── user.js          # User accounts
│   ├── review.js        # Property reviews
│   └── booking.js       # Booking records
├── routes/              # API routes
│   ├── listings.js      # Listing routes
│   ├── users.js         # User routes
│   ├── reviews.js       # Review routes
│   ├── bookings.js      # Booking routes
│   └── payment.js       # Payment routes
├── views/               # EJS templates
│   ├── layouts/         # Page layouts
│   ├── includes/        # Reusable components
│   ├── listings/        # Listing pages
│   ├── users/           # User pages
│   └── bookings/        # Booking pages
├── public/              # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   └── images/          # Static images
├── middleware/          # Custom middleware
├── utils/               # Utility functions
└── app.js              # Main application file
```

## 🎯 Key Features Explained

### **1. Professional UI Design**
- **Modern color scheme** with gradients and shadows
- **Responsive layout** that works on all devices
- **Professional typography** with proper spacing
- **Interactive elements** with smooth animations

### **2. Property Listings**
- **Grid layout** with hover effects
- **Category filtering** with professional icons
- **Search functionality** with enhanced search bar
- **Image optimization** with Cloudinary

### **3. User Profiles**
- **Comprehensive profiles** with statistics dashboard
- **Booking history** with detailed information
- **Review management** with star ratings
- **Account settings** with privacy controls

### **4. Booking System**
- **Date selection** with validation
- **Guest management** with capacity limits
- **Price calculation** with tax options
- **Payment processing** with Razorpay

### **5. Interactive Maps**
- **Location markers** with property information
- **Navigation controls** for zoom and pan
- **Geolocation** to find nearby properties
- **Professional styling** with rounded corners

## 🔧 Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URL` | MongoDB connection string | Yes |
| `SESSION_SECRET` | Session encryption key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `MAP_TOKEN` | Mapbox access token | No |
| `RAZORPAY_KEY_ID` | Razorpay public key | No |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | No |

### **Database Setup**
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `wanderlust`
3. Update the `DB_URL` in your `.env` file

### **Cloudinary Setup**
1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Add them to your `.env` file

### **Mapbox Setup (Optional)**
1. Create a Mapbox account
2. Generate an access token
3. Add it to your `.env` file as `MAP_TOKEN`

### **Razorpay Setup (Optional)**
1. Create a Razorpay account
2. Get your API keys from the dashboard
3. Add them to your `.env` file

## 🚀 Deployment

### **Local Development**
```bash
npm run dev
```

### **Production**
```bash
npm start
```

### **Environment Variables for Production**
Make sure to set all required environment variables in your production environment.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with enhanced UI
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Streamlined interface with mobile-first design

## 🎨 UI Components

### **Professional Cards**
- **Hover effects** with smooth animations
- **Gradient backgrounds** for visual appeal
- **Shadow effects** for depth and dimension
- **Rounded corners** for modern appearance

### **Interactive Elements**
- **Heart icons** for favorites
- **Share buttons** for social sharing
- **Toast notifications** for user feedback
- **Loading states** for better UX

### **Color Scheme**
- **Primary**: Blue gradient (#3b82f6 → #1d4ed8)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#dc2626)
- **Neutral**: Gray scale (#6b7280, #374151)

## 🔒 Security Features

- **Password hashing** with bcrypt
- **Session management** with secure cookies
- **CSRF protection** for form submissions
- **Input validation** and sanitization
- **Payment verification** with signature validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bootstrap** for the responsive framework
- **Font Awesome** for the beautiful icons
- **Mapbox** for the interactive maps
- **Razorpay** for the payment processing
- **Cloudinary** for the image management

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Made with ❤️ for amazing travel experiences** 
=======
efihoio
>>>>>>> b8ccf80aa9a4aafbcb7cfa745de9fadc1eb48554
