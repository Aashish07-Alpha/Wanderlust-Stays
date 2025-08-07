# Environment Variables Setup for Production

## Required Environment Variables

To fix the deployment issues, you need to set up these environment variables in your Render dashboard:

### 1. Database Configuration
```
DB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
```

**How to get this:**
- Sign up for MongoDB Atlas (free tier available)
- Create a new cluster
- Get your connection string from the "Connect" button
- Replace `your_username`, `your_password`, and `your_cluster` with your actual values

### 2. Session Configuration
```
SESSION_SECRET=your_super_secret_session_key_here
```

**How to generate:**
- Use a strong random string (at least 32 characters)
- You can generate one online or use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Environment
```
NODE_ENV=production
```

## Setting Environment Variables in Render

1. Go to your Render dashboard
2. Select your WanderLust service
3. Go to "Environment" tab
4. Add the variables above with your actual values
5. Save and redeploy

## Optional Environment Variables

If you're using additional features:

### Cloudinary (for image uploads)
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

### Mapbox (for maps)
```
MAPBOX_TOKEN=your_mapbox_token
```

### Razorpay (for payments)
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## After Setting Environment Variables

1. Redeploy your application in Render
2. The database connection errors should be resolved
3. The template errors should be fixed
4. Your site should work properly

## Testing Locally

Create a `.env` file in your project root with the same variables for local testing.
