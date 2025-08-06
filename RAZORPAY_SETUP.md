# Razorpay Payment Gateway Setup Guide

## 🚀 **Complete Payment Integration**

This guide will help you set up Razorpay payment gateway for your WanderLust application.

## 📋 **Prerequisites**

1. **Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **Node.js & npm**: Already installed
3. **MongoDB**: Already configured

## 🔧 **Step 1: Environment Variables Setup**

Create a `.env` file in your project root with the following variables:

```env
# Database Configuration
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust

# Mapbox Configuration
MAP_TOKEN=your_mapbox_token_here

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_test_key_id_here
RAZORPAY_KEY_SECRET=your_test_key_secret_here

# Session Secret
SESSION_SECRET=mysupersecretcode
```

## 🔑 **Step 2: Get Razorpay API Keys**

### **For Testing (Recommended)**:
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up/Login to your account
3. Go to **Settings** → **API Keys**
4. Generate a new key pair
5. Copy the **Key ID** and **Key Secret**

### **For Production**:
1. Contact Razorpay support to activate live mode
2. Use live keys instead of test keys
3. Update environment variables with live keys

## 🛠️ **Step 3: Install Dependencies**

The Razorpay package is already installed. If not, run:

```bash
npm install razorpay
```

## 🧪 **Step 4: Test the Integration**

### **Test Cards for Development**:
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### **Test UPI IDs**:
- **Success**: success@razorpay
- **Failure**: failure@razorpay

## 🔍 **Step 5: Verify Setup**

1. **Start your server**:
   ```bash
   npm start
   ```

2. **Navigate to a listing page**
3. **Fill in booking details** (dates, guests)
4. **Click "Reserve Now"**
5. **Complete payment using test cards**

## 📁 **Files Created/Modified**

### **New Files**:
- `controllers/payment.js` - Payment logic
- `routes/payment.js` - Payment routes
- `RAZORPAY_SETUP.md` - This guide

### **Modified Files**:
- `app.js` - Added payment routes and JSON middleware
- `views/layouts/boilerplate.ejs` - Added Razorpay script
- `views/listings/show.ejs` - Added payment integration

## 🔧 **API Endpoints**

### **Create Order**:
```
POST /payment/create-order
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "booking_1234567890"
}
```

### **Verify Payment**:
```
POST /payment/verify
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

## 🛡️ **Security Features**

✅ **Signature Verification**: All payments are verified using HMAC-SHA256
✅ **Amount Validation**: Prevents invalid amounts
✅ **User Authentication**: Only logged-in users can make payments
✅ **Error Handling**: Comprehensive error messages
✅ **Environment Variables**: Secure key storage

## 🎯 **Payment Flow**

1. **User fills booking details** (dates, guests)
2. **Clicks "Reserve Now"**
3. **System calculates total price**
4. **Creates Razorpay order**
5. **Opens Razorpay checkout modal**
6. **User completes payment**
7. **System verifies payment signature**
8. **Saves booking to database**
9. **Shows success message**

## 🐛 **Troubleshooting**

### **Common Issues**:

1. **"Razorpay is not configured"**
   - Check your `.env` file
   - Ensure `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set

2. **"Invalid amount"**
   - Make sure dates are selected
   - Check price calculation logic

3. **"Payment verification failed"**
   - Check your key secret
   - Ensure proper signature verification

4. **Modal not opening**
   - Check browser console for errors
   - Ensure Razorpay script is loaded

### **Debug Mode**:
Check server console for detailed logs:
- Request body received
- Amount validation
- Order creation status
- Payment verification

## 🚀 **Production Deployment**

1. **Use Live Keys**: Replace test keys with live keys
2. **HTTPS Required**: Razorpay requires HTTPS in production
3. **Webhook Setup**: Configure webhooks for payment notifications
4. **Error Monitoring**: Set up proper error logging

## 📞 **Support**

- **Razorpay Docs**: [docs.razorpay.com](https://docs.razorpay.com)
- **Test Cards**: [razorpay.com/docs/payments/test-cards](https://razorpay.com/docs/payments/test-cards)
- **API Reference**: [razorpay.com/docs/api](https://razorpay.com/docs/api)

## ✅ **Verification Checklist**

- [ ] Environment variables set
- [ ] Razorpay package installed
- [ ] Payment routes added to app.js
- [ ] Razorpay script loaded in layout
- [ ] Payment functions added to listing page
- [ ] Test payment successful
- [ ] Booking saved after payment
- [ ] Error handling working

Your payment integration is now complete! 🎉 